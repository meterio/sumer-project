// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './ComptrollerStorage.sol';
import '../Exponential/ExponentialNoError.sol';
import './Interfaces/ICToken.sol';
import './Interfaces/IUnderwriterAdmin.sol';
import './Interfaces/IPriceOracle.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';

interface ICompLogic {
  function setCompSpeed(address cToken, uint256 supplySpeed, uint256 borrowSpeed) external;

  function updateCompSupplyIndex(address cToken) external;

  function updateCompBorrowIndex(address cToken, Exp memory marketBorrowIndex) external;

  function distributeSupplierComp(address cToken, address supplier) external;

  function distributeBorrowerComp(address cToken, address borrower, Exp memory marketBorrowIndex) external;

  function initializeMarket(address cToken, uint32 blockNumber) external;
}

interface IAccountLiquidity {
  function getHypotheticalAccountLiquidity(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  ) external view returns (uint256, uint256, uint256);
}

/**
 * @title Compound's Comptroller Contract
 * @author Compound
 */
contract Comptroller is AccessControlEnumerableUpgradeable, ComptrollerStorage {
  using ExponentialNoError for uint256;
  using ExponentialNoError for Exp;
  using ExponentialNoError for Double;

  ICompLogic public compLogic;
  IUnderwriterAdmin public underWriterAdmin;
  IPriceOracle public oracle;
  IAccountLiquidity public accountLiquidity;

  bytes32 public constant COMP_LOGIC = keccak256('COMP_LOGIC');

  address public timelock;

  function initialize(
    address _admin,
    IPriceOracle _oracle,
    IUnderwriterAdmin _underWriterAdmin,
    ICompLogic _compLogic,
    IAccountLiquidity _accountLiquidity,
    uint256 _closeFactorMantissa,
    uint256 _heteroLiquidationIncentiveMantissa,
    uint256 _homoLiquidationIncentiveMantissa,
    uint256 _sutokenLiquidationIncentiveMantissa
  ) external initializer {
    _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    // Set comptroller's oracle to newOracle
    oracle = _oracle;
    // Emit NewPriceOracle(oldOracle, newOracle)
    emit NewPriceOracle(address(0), address(_oracle));
    compLogic = _compLogic;

    accountLiquidity = _accountLiquidity;

    closeFactorMantissa = _closeFactorMantissa;
    emit NewCloseFactor(0, _closeFactorMantissa);

    // Set liquidation incentive to new incentive
    heteroLiquidationIncentiveMantissa = _heteroLiquidationIncentiveMantissa;
    homoLiquidationIncentiveMantissa = _homoLiquidationIncentiveMantissa;
    sutokenLiquidationIncentiveMantissa = _sutokenLiquidationIncentiveMantissa;
    // Emit event with old incentive, new incentive
    emit NewLiquidationIncentive(
      0,
      _heteroLiquidationIncentiveMantissa,
      0,
      _homoLiquidationIncentiveMantissa,
      0,
      _sutokenLiquidationIncentiveMantissa
    );

    underWriterAdmin = _underWriterAdmin;
  }

  /*** Assets You Are In ***/

  /**
   * @notice Returns the assets an account has entered
   * @param account The address of the account to pull assets for
   * @return A dynamic list with the assets the account has entered
   */
  function getAssetsIn(address account) external view returns (address[] memory) {
    address[] memory assetsIn = accountAssets[account];

    return assetsIn;
  }

  /**
   * @notice Returns whether the given account is entered in the given asset
   * @param account The address of the account to check
   * @param cToken The cToken to check
   * @return True if the account is in the asset, otherwise false.
   */
  function checkMembership(address account, address cToken) external view returns (bool) {
    return markets[cToken].accountMembership[account];
  }

  function isListed(address asset) external view returns (bool) {
    return markets[asset].isListed;
  }

  function marketGroupId(address asset) external view returns (uint8) {
    return markets[asset].assetGroupId;
  }

  /**
   * @notice Add assets to be included in account liquidity calculation
   * @param cTokens The list of addresses of the cToken markets to be enabled
   * @return Success indicator for whether each corresponding market was entered
   */
  function enterMarkets(address[] memory cTokens) public returns (uint256[] memory) {
    uint256 len = cTokens.length;

    uint256[] memory results = new uint256[](len);
    for (uint256 i = 0; i < len; ++i) {
      address cToken = cTokens[i];
      //IUnderwriterAdmin.AssetGroup memory eqAssets = underWriterAdmin.getAssetGroup(cToken);
      //results[i] = uint(addToMarketInternal(cToken, msg.sender, eqAssets.groupName, eqAssets.rateMantissas));
      results[i] = uint256(addToMarketInternal(cToken, msg.sender));
    }

    return results;
  }

  /**
   * @notice Add the market to the borrower's "assets in" for liquidity calculations
   * @param cToken The market to enter
   * @param borrower The address of the account to modify
   * @return Success indicator for whether the market was entered
   */
  function addToMarketInternal(address cToken, address borrower) internal returns (uint256) {
    Market storage marketToJoin = markets[cToken];

    require(marketToJoin.isListed, MARKET_NOT_LISTED);

    if (marketToJoin.accountMembership[borrower]) {
      // already joined
      return uint256(0);
    }

    // survived the gauntlet, add to list
    // NOTE: we store these somewhat redundantly as a significant optimization
    //  this avoids having to iterate through the list for the most common use cases
    //  that is, only when we need to perform liquidity checks
    //  and not whenever we want to check if an account is in a particular market
    marketToJoin.accountMembership[borrower] = true;
    accountAssets[borrower].push(cToken);

    // all tokens are grouped with equal assets.
    //addToEqualAssetGroupInternal(cToken, borrower, eqAssetGroup, rateMantissa);

    emit MarketEntered(cToken, borrower);

    return uint256(0);
  }

  /**
   * @notice Removes asset from sender's account liquidity calculation
   * @dev Sender must not have an outstanding borrow balance in the asset,
   *  or be providing necessary collateral for an outstanding borrow.
   * @param cTokenAddress The address of the asset to be removed
   * @return Whether or not the account successfully exited the market
   */
  function exitMarket(address cTokenAddress) external returns (uint256) {
    address cToken = cTokenAddress;
    /* Get sender tokensHeld and amountOwed underlying from the cToken */
    (uint256 oErr, uint256 tokensHeld, uint256 amountOwed, ) = ICToken(cToken).getAccountSnapshot(msg.sender);
    require(oErr == 0, SNAPSHOT_ERROR); // semi-opaque error code

    /* Fail if the sender has a borrow balance */
    require(amountOwed == 0, 'nonzero borrow balance');

    /* Fail if the sender is not permitted to redeem all of their tokens */
    redeemAllowedInternal(cTokenAddress, msg.sender, tokensHeld);

    Market storage marketToExit = markets[cToken];

    /* Return true if the sender is not already ‘in’ the market */
    if (!marketToExit.accountMembership[msg.sender]) {
      return uint256(0);
    }

    /* Set cToken account membership to false */
    delete marketToExit.accountMembership[msg.sender];

    /* Delete cToken from the account’s list of assets */
    // load into memory for faster iteration
    address[] memory userAssetList = accountAssets[msg.sender];
    uint256 len = userAssetList.length;
    uint256 assetIndex = len;
    for (uint256 i = 0; i < len; ++i) {
      if (userAssetList[i] == cToken) {
        assetIndex = i;
        break;
      }
    }

    // We *must* have found the asset in the list or our redundant data structure is broken
    assert(assetIndex < len);

    // copy last item in list to location of item to be removed, reduce length by 1
    address[] storage storedList = accountAssets[msg.sender];
    storedList[assetIndex] = storedList[storedList.length - 1];
    storedList.pop();

    // remove the same
    //exitEqualAssetGroupInternal(cTokenAddress, msg.sender);

    emit MarketExited(cToken, msg.sender);

    return uint256(0);
  }

  /*** Policy Hooks ***/

  /**
   * @notice Checks if the account should be allowed to mint tokens in the given market
   * @param cToken The market to verify the mint against
   * @param minter The account which would get the minted tokens
   * @param mintAmount The amount of underlying being supplied to the market in exchange for tokens
   * @return 0 if the mint is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function mintAllowed(address cToken, address minter, uint256 mintAmount) external returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!mintGuardianPaused[cToken], "mint is paused");
    require(!underWriterAdmin._getMintPaused(cToken), 'mint paused');

    // Shh - currently unused: minter; mintAmount;

    require(markets[cToken].isListed, MARKET_NOT_LISTED);

    /* Get minter's cToken balance*/
    (uint256 oErr, uint256 tokensHeld, uint256 amountOwed, ) = ICToken(cToken).getAccountSnapshot(minter);
    require(oErr == 0, SNAPSHOT_ERROR); // semi-opaque error code

    // only enter market automatically at the first time
    if ((!markets[cToken].accountMembership[minter]) && (tokensHeld == 0) && (amountOwed == 0)) {
      // only cTokens may call mintAllowed if minter not in market
      require(msg.sender == cToken, 'sender must be cToken');

      // attempt to add borrower to the market
      addToMarketInternal(msg.sender, minter);

      // it should be impossible to break the important invariant
      assert(markets[cToken].accountMembership[minter]);
    }

    // Keep the flywheel moving
    compLogic.updateCompSupplyIndex(cToken);
    compLogic.distributeSupplierComp(cToken, minter);

    require(
      maxSupply[cToken] == 0 ||
        (maxSupply[cToken] > 0 && ICToken(cToken).totalSupply().add_(mintAmount) <= maxSupply[cToken]),
      'cToken > maxSupply'
    );

    return uint256(0);
  }

  /**
   * @notice Checks if the account should be allowed to redeem tokens in the given market
   * @param cToken The market to verify the redeem against
   * @param redeemer The account which would redeem the tokens
   * @param redeemTokens The number of cTokens to exchange for the underlying asset in the market
   * @return 0 if the redeem is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function redeemAllowed(address cToken, address redeemer, uint256 redeemTokens) external returns (uint256) {
    redeemAllowedInternal(cToken, redeemer, redeemTokens);

    // Keep the flywheel moving
    compLogic.updateCompSupplyIndex(cToken);
    compLogic.distributeSupplierComp(cToken, redeemer);

    return uint256(0);
  }

  function redeemAllowedInternal(
    address cToken,
    address redeemer,
    uint256 redeemTokens
  ) internal view returns (uint256) {
    require(markets[cToken].isListed, MARKET_NOT_LISTED);

    /* If the redeemer is not 'in' the market, then we can bypass the liquidity check */
    if (!markets[cToken].accountMembership[redeemer]) {
      return uint256(0);
    }

    /* Otherwise, perform a hypothetical liquidity check to guard against shortfall */
    (, , uint256 shortfall) = accountLiquidity.getHypotheticalAccountLiquidity(redeemer, cToken, redeemTokens, 0);
    require(shortfall == 0, INSUFFICIENT_LIQUIDITY);

    return uint256(0);
  }

  /**
   * @notice Validates redeem and reverts on rejection. May emit logs.
   * @param cToken Asset being redeemed
   * @param redeemer The address redeeming the tokens
   * @param redeemAmount The amount of the underlying asset being redeemed
   * @param redeemTokens The number of tokens being redeemed
   */
  function redeemVerify(address cToken, address redeemer, uint256 redeemAmount, uint256 redeemTokens) external {
    // Shh - currently unused: cToken; redeemer;

    // Require tokens is zero or amount is also zero
    if (redeemTokens == 0 && redeemAmount > 0) {
      revert('redeemTokens zero');
    }
  }

  /**
   * @notice Checks if the account should be allowed to borrow the underlying asset of the given market
   * @param cToken The market to verify the borrow against
   * @param borrower The account which would borrow the asset
   * @param borrowAmount The amount of underlying the account would borrow
   * @return 0 if the borrow is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function borrowAllowed(address cToken, address borrower, uint256 borrowAmount) external returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!borrowGuardianPaused[cToken], "borrow is paused");
    require(!underWriterAdmin._getBorrowPaused(cToken), 'borrow paused');

    require(markets[cToken].isListed, MARKET_NOT_LISTED);

    if (!markets[cToken].accountMembership[borrower]) {
      // only cTokens may call borrowAllowed if borrower not in market
      require(msg.sender == cToken, 'sender must be cToken');

      // attempt to add borrower to the market
      addToMarketInternal(msg.sender, borrower);

      // it should be impossible to break the important invariant
      assert(markets[cToken].accountMembership[borrower]);
    }

    require(oracle.getUnderlyingPrice(cToken) > 0, 'PRICE_ERROR');

    //uint borrowCap = borrowCaps[cToken];
    uint256 borrowCap = underWriterAdmin._getMarketBorrowCap(cToken);
    // Borrow cap of 0 corresponds to unlimited borrowing
    if (borrowCap != 0) {
      uint256 totalBorrows = ICToken(cToken).totalBorrows();
      uint256 nextTotalBorrows = totalBorrows.add_(borrowAmount);
      require(nextTotalBorrows < borrowCap, 'borrow cap reached');
    }

    (, , uint256 shortfall) = accountLiquidity.getHypotheticalAccountLiquidity(borrower, cToken, 0, borrowAmount);
    require(shortfall <= 0, INSUFFICIENT_LIQUIDITY);

    // Keep the flywheel moving
    Exp memory borrowIndex = Exp({mantissa: ICToken(cToken).borrowIndex()});
    compLogic.updateCompBorrowIndex(cToken, borrowIndex);
    compLogic.distributeBorrowerComp(cToken, borrower, borrowIndex);

    return uint256(0);
  }

  /**
   * @notice Checks if the account should be allowed to repay a borrow in the given market
   * @param cToken The market to verify the repay against
   * @param payer The account which would repay the asset
   * @param borrower The account which would borrowed the asset
   * @param repayAmount The amount of the underlying asset the account would repay
   * @return 0 if the repay is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function repayBorrowAllowed(
    address cToken,
    address payer,
    address borrower,
    uint256 repayAmount
  ) external returns (uint256) {
    // Shh - currently unused: repayAmount;

    require(markets[cToken].isListed, MARKET_NOT_LISTED);

    // Keep the flywheel moving
    Exp memory borrowIndex = Exp({mantissa: ICToken(cToken).borrowIndex()});
    compLogic.updateCompBorrowIndex(cToken, borrowIndex);
    compLogic.distributeBorrowerComp(cToken, borrower, borrowIndex);

    return uint256(0);
  }

  /**
   * @notice Checks if the seizing of assets should be allowed to occur
   * @param cTokenCollateral Asset which was used as collateral and will be seized
   * @param cTokenBorrowed Asset which was borrowed by the borrower
   * @param liquidator The address repaying the borrow and seizing the collateral
   * @param borrower The address of the borrower
   * @param seizeTokens The number of collateral tokens to seize
   */
  function seizeAllowed(
    address cTokenCollateral,
    address cTokenBorrowed,
    address liquidator,
    address borrower,
    uint256 seizeTokens
  ) external returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!seizeGuardianPaused, "seize is paused");
    require(!underWriterAdmin._getSeizePaused(), 'seize paused');

    // Shh - currently unused: seizeTokens;

    require(markets[cTokenCollateral].isListed && markets[cTokenBorrowed].isListed, MARKET_NOT_LISTED);

    require(ICToken(cTokenCollateral).comptroller() == ICToken(cTokenBorrowed).comptroller(), 'comptroller mismatch');

    // Keep the flywheel moving
    compLogic.updateCompSupplyIndex(cTokenCollateral);
    compLogic.distributeSupplierComp(cTokenCollateral, borrower);
    compLogic.distributeSupplierComp(cTokenCollateral, liquidator);

    return uint256(0);
  }

  /**
   * @notice Checks if the account should be allowed to transfer tokens in the given market
   * @param cToken The market to verify the transfer against
   * @param src The account which sources the tokens
   * @param dst The account which receives the tokens
   * @param transferTokens The number of cTokens to transfer
   * @return 0 if the transfer is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function transferAllowed(
    address cToken,
    address src,
    address dst,
    uint256 transferTokens
  ) external returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!transferGuardianPaused, "transfer is paused");
    require(!underWriterAdmin._getTransferPaused(), 'transfer paused');

    // Currently the only consideration is whether or not
    //  the src is allowed to redeem this many tokens
    redeemAllowedInternal(cToken, src, transferTokens);

    // Keep the flywheel moving
    compLogic.updateCompSupplyIndex(cToken);
    compLogic.distributeSupplierComp(cToken, src);
    compLogic.distributeSupplierComp(cToken, dst);

    return uint256(0);
  }

  /*** Liquidity/Liquidation Calculations ***/

  /**
     * @notice Determine the current account liquidity wrt collateral requirements
     * @return (possible error code (semi-opaque),
                account liquidity in excess of collateral requirements,
     *          account shortfall below collateral requirements)
     */
  function getAccountLiquidity(address account) public view returns (uint256, uint256, uint256) {
    (uint256 err, uint256 liquidity, uint256 shortfall) = accountLiquidity.getHypotheticalAccountLiquidity(
      account,
      address(0),
      0,
      0
    );

    return (uint256(err), liquidity, shortfall);
  }

  /**
     * @notice Determine what the account liquidity would be if the given amounts were redeemed/borrowed
     * @param cTokenModify The market to hypothetically redeem/borrow in
     * @param account The account to determine liquidity for
     * @param redeemTokens The number of tokens to hypothetically redeem
     * @param borrowAmount The amount of underlying to hypothetically borrow
     * @return (possible error code (semi-opaque),
                hypothetical account liquidity in excess of collateral requirements,
     *          hypothetical account shortfall below collateral requirements)
     */
  function getHypotheticalAccountLiquidity(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  ) public view returns (uint256, uint256, uint256) {
    (uint256 err, uint256 liquidity, uint256 shortfall) = accountLiquidity.getHypotheticalAccountLiquidity(
      account,
      address(cTokenModify),
      redeemTokens,
      borrowAmount
    );
    return (uint256(err), liquidity, shortfall);
  }

  /*** Admin Functions ***/

  function setMaxSupply(address cToken, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    // Check caller is admin
    maxSupply[cToken] = amount;
    emit SetMaxSupply(cToken, amount);
    return uint256(0);
  }

  function setTimelock(address _timelock) public onlyRole(DEFAULT_ADMIN_ROLE) {
    timelock = _timelock;
  }

  /**
   * @notice Sets a new price oracle for the comptroller
   * @dev Admin function to set a new price oracle
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _setPriceOracle(IPriceOracle newOracle) public onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    // Check caller is admin
    // Track the old oracle for the comptroller
    IPriceOracle oldOracle = oracle;
    // Set comptroller's oracle to newOracle
    oracle = newOracle;
    // Emit NewPriceOracle(oldOracle, newOracle)
    emit NewPriceOracle(address(oldOracle), address(newOracle));
    return uint256(0);
  }

  /**
   * @notice Sets the closeFactor used when liquidating borrows
   * @dev Admin function to set closeFactor
   * @param newCloseFactorMantissa New close factor, scaled by 1e18
   * @return uint 0=success, otherwise a failure
   */
  function _setCloseFactor(uint256 newCloseFactorMantissa) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    require(newCloseFactorMantissa > 0, 'newCloseFactorMantissa=0');
    // Check caller is admin
    uint256 oldCloseFactorMantissa = closeFactorMantissa;
    closeFactorMantissa = newCloseFactorMantissa;
    emit NewCloseFactor(oldCloseFactorMantissa, closeFactorMantissa);

    return uint256(0);
  }

  function _setUnderWriterAdmin(
    IUnderwriterAdmin underWriter
  ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (IUnderwriterAdmin) {
    // Check caller is admin
    require(address(underWriter) != address(0), 'Address is Zero!');
    underWriterAdmin = underWriter;
    return underWriter;
  }

  /**
   * @notice Sets liquidationIncentive
   * @dev Admin function to set liquidationIncentive
   * @param newHeteroLiquidationIncentiveMantissa New liquidationIncentive scaled by 1e18 for hetero assets
   * @param newHomoLiquidationIncentiveMantissa New liquidationIncentive scaled by 1e18 for homo assets
   * @param newSutokenLiquidationIncentiveMantissa New liquidationIncentive scaled by 1e18 for sutoken assets
   * @return uint 0=success, otherwise a failure. (See ErrorReporter for details)
   */
  function _setLiquidationIncentive(
    uint256 newHeteroLiquidationIncentiveMantissa,
    uint256 newHomoLiquidationIncentiveMantissa,
    uint256 newSutokenLiquidationIncentiveMantissa
  ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    // Check caller is admin
    // Save current value for use in log
    uint256 oldHetero = heteroLiquidationIncentiveMantissa;
    uint256 oldHomo = homoLiquidationIncentiveMantissa;
    uint256 oldSutoken = sutokenLiquidationIncentiveMantissa;
    // Set liquidation incentive to new incentive
    heteroLiquidationIncentiveMantissa = newHeteroLiquidationIncentiveMantissa;
    homoLiquidationIncentiveMantissa = newHomoLiquidationIncentiveMantissa;
    sutokenLiquidationIncentiveMantissa = newSutokenLiquidationIncentiveMantissa;
    // Emit event with old incentive, new incentive
    emit NewLiquidationIncentive(
      oldHetero,
      newHeteroLiquidationIncentiveMantissa,
      oldHomo,
      newHomoLiquidationIncentiveMantissa,
      oldSutoken,
      newSutokenLiquidationIncentiveMantissa
    );
    return uint256(0);
  }

  /**
   * @notice Add the market to the markets mapping and set it as listed
   * @dev Admin function to set isListed and add support for the market
   * @param cToken The address of the market (token) to list
   * @return uint 0=success, otherwise a failure. (See enum uint256 for details)
   */
  function _supportMarket(address cToken, uint8 groupId) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    require(!markets[cToken].isListed, 'market already listed');

    // ICToken(cToken).isCToken(); // Sanity check to make sure its really a address
    (bool success, ) = cToken.call(abi.encodeWithSignature('isCToken()'));
    require(success && isContract(cToken), 'contract error!');

    // Note that isComped is not in active use anymore
    // markets[cToken] = Market({isListed: true, isComped: false, assetGroupId: groupId});
    Market storage market = markets[cToken];
    market.isListed = true;
    market.assetGroupId = groupId;

    _addMarketInternal(cToken);
    _initializeMarket(cToken);

    emit MarketListed(cToken);

    return uint256(0);
  }

  function _addMarketInternal(address cToken) internal {
    for (uint256 i = 0; i < allMarkets.length; ++i) {
      require(allMarkets[i] != cToken, 'market already added');
    }
    allMarkets.push(cToken);
  }

  function _initializeMarket(address cToken) internal {
    uint32 blockNumber = block.number.safe32('block number exceeds 32 bits');
    compLogic.initializeMarket(cToken, blockNumber);
  }

  function setCompSpeed(
    address cToken,
    uint256 supplySpeed,
    uint256 borrowSpeed
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    compLogic.setCompSpeed(cToken, supplySpeed, borrowSpeed);
  }

  function setComptroller(ICompLogic _compLogic) external onlyRole(DEFAULT_ADMIN_ROLE) {
    compLogic = _compLogic;
  }

  function setAccountLiquidity(IAccountLiquidity _accountLiquidity) external onlyRole(DEFAULT_ADMIN_ROLE) {
    accountLiquidity = _accountLiquidity;
  }

  /**
   * @notice Return all of the markets
   * @dev The automatic getter may be used to access an individual market.
   * @return The list of market addresses
   */
  function getAllMarkets() public view returns (address[] memory) {
    return allMarkets;
  }

  /**
   * @dev Returns true if `account` is a contract.
   *
   * [IMPORTANT]
   * ====
   * It is unsafe to assume that an address for which this function returns
   * false is an externally-owned account (EOA) and not a contract.
   *
   * Among others, `isContract` will return false for the following
   * types of addresses:
   *
   *  - an externally-owned account
   *  - a contract in construction
   *  - an address where a contract will be created
   *  - an address where a contract lived, but was destroyed
   * ====
   */
  function isContract(address account) internal view returns (bool) {
    return account.code.length > 0;
  }

  function liquidationIncentiveMantissa() public view returns (uint256, uint256, uint256) {
    return (heteroLiquidationIncentiveMantissa, homoLiquidationIncentiveMantissa, sutokenLiquidationIncentiveMantissa);
  }
}
