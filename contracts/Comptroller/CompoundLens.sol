// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './Interfaces/ICToken.sol';
import './Interfaces/IPriceOracle.sol';
import './Interfaces/IGovernorAlpha.sol';
import './Interfaces/IComptroller.sol';
import './Interfaces/IGovernorBravo.sol';
import './Interfaces/IUnderwriterAdmin.sol';
import '../Exponential/ExponentialNoError.sol';
import './ComptrollerStorage.sol';

contract CompoundLens {
  using ExponentialNoError for uint256;
  using ExponentialNoError for Exp;
  using ExponentialNoError for Double;
  struct CTokenMetadata {
    address cToken;
    uint256 exchangeRateCurrent;
    uint256 supplyRatePerBlock;
    uint256 borrowRatePerBlock;
    uint256 reserveFactorMantissa;
    uint256 totalBorrows;
    uint256 totalReserves;
    uint256 totalSupply;
    uint256 totalCash;
    bool isListed;
    // uint256 collateralFactorMantissa;
    address underlyingAssetAddress;
    uint256 cTokenDecimals;
    uint256 underlyingDecimals;
    bool isCToken;
    bool isCEther;

    uint256 borrowCap;
    uint256 depositCap;
    uint256 liquidationIncentive;

    uint8 groupId;
    uint256 intraRate;
    uint256 mintRate;
    uint256 interRate;

    uint256 discountRate;
  }

  struct GroupInfo {
    uint256 intraRate;
    uint256 mintRate;
    uint256 interRate;
  }

  function cTokenMetadata(ICToken cToken) public returns (CTokenMetadata memory) {
    IComptroller comptroller = IComptroller(address(cToken.comptroller()));
    IUnderwriterAdmin ua = IUnderwriterAdmin(comptroller.underWriterAdmin());

    // get underlying info
    address underlyingAssetAddress;
    uint256 underlyingDecimals;
    if (cToken.isCEther()) {
      underlyingAssetAddress = address(0);
      underlyingDecimals = 18;
    } else {
      underlyingAssetAddress = cToken.underlying();
      underlyingDecimals = ICToken(cToken.underlying()).decimals();
    }

    // get group info
    (bool isListed, uint8 assetGroupId) = comptroller.markets(address(cToken));
    IUnderwriterAdmin.AssetGroup memory group = ua.getAssetGroup(assetGroupId);
    GroupInfo memory gi;
    if (cToken.isCToken()) {
      gi.intraRate = group.intraCRateMantissa;
      gi.interRate = group.intraCRateMantissa;
      gi.mintRate = group.intraMintRateMantissa;
    }else{
      gi.intraRate = group.intraSuRateMantissa;
      gi.interRate = group.intraSuRateMantissa;
      gi.mintRate = group.intraSuRateMantissa;
    }

    return
      CTokenMetadata({
        cToken: address(cToken),
        exchangeRateCurrent: cToken.exchangeRateCurrent(),
        supplyRatePerBlock: cToken.supplyRatePerBlock(),
        borrowRatePerBlock: cToken.borrowRatePerBlock(),
        reserveFactorMantissa: cToken.reserveFactorMantissa(),
        totalBorrows: cToken.totalBorrows(),
        totalReserves: cToken.totalReserves(),
        totalSupply: cToken.totalSupply(),
        totalCash: cToken.getCash(),
        isListed: isListed,
        underlyingAssetAddress: underlyingAssetAddress,
        cTokenDecimals: cToken.decimals(),
        underlyingDecimals: underlyingDecimals,
        isCToken: cToken.isCToken(),
        isCEther: cToken.isCEther(),
        borrowCap: ua._getMarketBorrowCap(address(cToken)),
        depositCap: ComptrollerStorage(address(comptroller)).maxSupply(address(cToken)),
        liquidationIncentive: comptroller.liquidationIncentiveMantissa(),

        groupId: assetGroupId,
        intraRate: gi.intraRate,
        interRate: gi.interRate,
        mintRate: gi.mintRate,

        discountRate: cToken.getDiscountRate()
      });
  }

  function cTokenMetadataAll(ICToken[] calldata cTokens) external returns (CTokenMetadata[] memory) {
    uint256 cTokenCount = cTokens.length;
    CTokenMetadata[] memory res = new CTokenMetadata[](cTokenCount);
    for (uint256 i = 0; i < cTokenCount; i++) {
      res[i] = cTokenMetadata(cTokens[i]);
    }
    return res;
  }

  struct CTokenBalances {
    address cToken;
    bool isCToken;
    bool isCEther;
    uint256 balanceOf;
    uint256 borrowBalanceCurrent;
    uint256 balanceOfUnderlying;
    uint256 tokenBalance;
    uint256 tokenAllowance;
  }

  function cTokenBalances(ICToken cToken, address payable account) public returns (CTokenBalances memory) {
    uint256 balanceOf = cToken.balanceOf(account);
    uint256 borrowBalanceCurrent = cToken.borrowBalanceCurrent(account);
    uint256 balanceOfUnderlying = cToken.balanceOfUnderlying(account);
    uint256 tokenBalance;
    uint256 tokenAllowance;

    if (cToken.isCEther()) {
      tokenBalance = account.balance;
      tokenAllowance = account.balance;
    } else {
      ICToken underlying = ICToken(cToken.underlying());
      tokenBalance = underlying.balanceOf(account);
      tokenAllowance = underlying.allowance(account, address(cToken));
    }

    return
      CTokenBalances({
        cToken: address(cToken),
        isCToken: cToken.isCToken(),
        isCEther: cToken.isCEther(),
        balanceOf: balanceOf,
        borrowBalanceCurrent: borrowBalanceCurrent,
        balanceOfUnderlying: balanceOfUnderlying,
        tokenBalance: tokenBalance,
        tokenAllowance: tokenAllowance
      });
  }

  function cTokenBalancesAll(ICToken[] calldata cTokens, address payable account)
    external
    returns (CTokenBalances[] memory)
  {
    uint256 cTokenCount = cTokens.length;
    CTokenBalances[] memory res = new CTokenBalances[](cTokenCount);
    for (uint256 i = 0; i < cTokenCount; i++) {
      res[i] = cTokenBalances(cTokens[i], account);
    }
    return res;
  }

  struct CTokenUnderlyingPrice {
    address cToken;
    uint256 underlyingPrice;
  }

  function cTokenUnderlyingPrice(ICToken cToken) public view returns (CTokenUnderlyingPrice memory) {
    IComptroller comptroller = IComptroller(address(cToken.comptroller()));
    IPriceOracle priceOracle = IPriceOracle(comptroller.oracle());

    return
      CTokenUnderlyingPrice({
        cToken: address(cToken),
        underlyingPrice: priceOracle.getUnderlyingPrice(address(cToken))
      });
  }

  function cTokenUnderlyingPriceAll(ICToken[] calldata cTokens) external view returns (CTokenUnderlyingPrice[] memory) {
    uint256 cTokenCount = cTokens.length;
    CTokenUnderlyingPrice[] memory res = new CTokenUnderlyingPrice[](cTokenCount);
    for (uint256 i = 0; i < cTokenCount; i++) {
      res[i] = cTokenUnderlyingPrice(cTokens[i]);
    }
    return res;
  }

  struct AccountLimits {
    address[] markets;
    uint256 liquidity;
    uint256 shortfall;
  }

  function getAccountLimits(IComptroller comptroller, address account) public returns (AccountLimits memory) {
    (uint256 errorCode, uint256 liquidity, uint256 shortfall) = comptroller.getAccountLiquidity(account);
    require(errorCode == 0);

    return AccountLimits({markets: comptroller.getAssetsIn(account), liquidity: liquidity, shortfall: shortfall});
  }

  struct GovReceipt {
    uint256 proposalId;
    bool hasVoted;
    bool support;
    uint96 votes;
  }

  function getGovReceipts(
    IGovernorAlpha governor,
    address voter,
    uint256[] memory proposalIds
  ) public view returns (GovReceipt[] memory) {
    uint256 proposalCount = proposalIds.length;
    GovReceipt[] memory res = new GovReceipt[](proposalCount);
    for (uint256 i = 0; i < proposalCount; i++) {
      IGovernorAlpha.Receipt memory receipt;

      (receipt.hasVoted, receipt.support, receipt.votes) = governor.getReceipt(proposalIds[i], voter);
      res[i] = GovReceipt({
        proposalId: proposalIds[i],
        hasVoted: receipt.hasVoted,
        support: receipt.support,
        votes: receipt.votes
      });
    }
    return res;
  }

  struct GovBravoReceipt {
    uint256 proposalId;
    bool hasVoted;
    uint8 support;
    uint96 votes;
  }

  function getGovBravoReceipts(
    IGovernorBravo governor,
    address voter,
    uint256[] memory proposalIds
  ) public view returns (GovBravoReceipt[] memory) {
    uint256 proposalCount = proposalIds.length;
    GovBravoReceipt[] memory res = new GovBravoReceipt[](proposalCount);
    for (uint256 i = 0; i < proposalCount; i++) {
      IGovernorBravo.Receipt memory receipt = governor.getReceipt(proposalIds[i], voter);
      res[i] = GovBravoReceipt({
        proposalId: proposalIds[i],
        hasVoted: receipt.hasVoted,
        support: receipt.support,
        votes: receipt.votes
      });
    }
    return res;
  }

  struct GovProposal {
    uint256 proposalId;
    address proposer;
    uint256 eta;
    address[] targets;
    uint256[] values;
    string[] signatures;
    bytes[] calldatas;
    uint256 startBlock;
    uint256 endBlock;
    uint256 forVotes;
    uint256 againstVotes;
    bool canceled;
    bool executed;
  }

  function setProposal(
    GovProposal memory res,
    IGovernorAlpha governor,
    uint256 proposalId
  ) internal view {
    (
      ,
      address proposer,
      uint256 eta,
      uint256 startBlock,
      uint256 endBlock,
      uint256 forVotes,
      uint256 againstVotes,
      bool canceled,
      bool executed
    ) = governor.proposals(proposalId);
    res.proposalId = proposalId;
    res.proposer = proposer;
    res.eta = eta;
    res.startBlock = startBlock;
    res.endBlock = endBlock;
    res.forVotes = forVotes;
    res.againstVotes = againstVotes;
    res.canceled = canceled;
    res.executed = executed;
  }

  function getGovProposals(IGovernorAlpha governor, uint256[] calldata proposalIds)
    external
    view
    returns (GovProposal[] memory)
  {
    GovProposal[] memory res = new GovProposal[](proposalIds.length);
    for (uint256 i = 0; i < proposalIds.length; i++) {
      (
        address[] memory targets,
        uint256[] memory values,
        string[] memory signatures,
        bytes[] memory calldatas
      ) = governor.getActions(proposalIds[i]);
      res[i] = GovProposal({
        proposalId: 0,
        proposer: address(0),
        eta: 0,
        targets: targets,
        values: values,
        signatures: signatures,
        calldatas: calldatas,
        startBlock: 0,
        endBlock: 0,
        forVotes: 0,
        againstVotes: 0,
        canceled: false,
        executed: false
      });
      setProposal(res[i], governor, proposalIds[i]);
    }
    return res;
  }

  struct GovBravoProposal {
    uint256 proposalId;
    address proposer;
    uint256 eta;
    address[] targets;
    uint256[] values;
    string[] signatures;
    bytes[] calldatas;
    uint256 startBlock;
    uint256 endBlock;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
    bool canceled;
    bool executed;
  }

  function setBravoProposal(
    GovBravoProposal memory res,
    IGovernorBravo governor,
    uint256 proposalId
  ) internal view {
    IGovernorBravo.Proposal memory p = governor.proposals(proposalId);

    res.proposalId = proposalId;
    res.proposer = p.proposer;
    res.eta = p.eta;
    res.startBlock = p.startBlock;
    res.endBlock = p.endBlock;
    res.forVotes = p.forVotes;
    res.againstVotes = p.againstVotes;
    res.abstainVotes = p.abstainVotes;
    res.canceled = p.canceled;
    res.executed = p.executed;
  }

  function getGovBravoProposals(IGovernorBravo governor, uint256[] calldata proposalIds)
    external
    view
    returns (GovBravoProposal[] memory)
  {
    GovBravoProposal[] memory res = new GovBravoProposal[](proposalIds.length);
    for (uint256 i = 0; i < proposalIds.length; i++) {
      (
        address[] memory targets,
        uint256[] memory values,
        string[] memory signatures,
        bytes[] memory calldatas
      ) = governor.getActions(proposalIds[i]);
      res[i] = GovBravoProposal({
        proposalId: 0,
        proposer: address(0),
        eta: 0,
        targets: targets,
        values: values,
        signatures: signatures,
        calldatas: calldatas,
        startBlock: 0,
        endBlock: 0,
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0,
        canceled: false,
        executed: false
      });
      setBravoProposal(res[i], governor, proposalIds[i]);
    }
    return res;
  }

  struct CompBalanceMetadata {
    uint256 balance;
    uint256 votes;
    address delegate;
  }

  function getCompBalanceMetadata(ICToken comp, address account) external view returns (CompBalanceMetadata memory) {
    return
      CompBalanceMetadata({
        balance: comp.balanceOf(account),
        votes: uint256(comp.getCurrentVotes(account)),
        delegate: comp.delegates(account)
      });
  }

  struct CompBalanceMetadataExt {
    uint256 balance;
    uint256 votes;
    address delegate;
    uint256 allocated;
  }

  function getCompBalanceMetadataExt(
    ICToken comp,
    IComptroller comptroller,
    address account
  ) external returns (CompBalanceMetadataExt memory) {
    uint256 balance = comp.balanceOf(account);
    comptroller.claimComp(account);
    uint256 newBalance = comp.balanceOf(account);
    uint256 accrued = comptroller.compAccrued(account);
    uint256 total = add(accrued, newBalance, 'sum comp total');
    uint256 allocated = sub(total, balance, 'sub allocated');

    return
      CompBalanceMetadataExt({
        balance: balance,
        votes: uint256(comp.getCurrentVotes(account)),
        delegate: comp.delegates(account),
        allocated: allocated
      });
  }

  struct CompVotes {
    uint256 blockNumber;
    uint256 votes;
  }

  function getCompVotes(
    ICToken comp,
    address account,
    uint32[] calldata blockNumbers
  ) external view returns (CompVotes[] memory) {
    CompVotes[] memory res = new CompVotes[](blockNumbers.length);
    for (uint256 i = 0; i < blockNumbers.length; i++) {
      res[i] = CompVotes({
        blockNumber: uint256(blockNumbers[i]),
        votes: uint256(comp.getPriorVotes(account, blockNumbers[i]))
      });
    }
    return res;
  }

  function compareStrings(string memory a, string memory b) internal pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function add(
    uint256 a,
    uint256 b,
    string memory errorMessage
  ) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a, errorMessage);
    return c;
  }

  function sub(
    uint256 a,
    uint256 b,
    string memory errorMessage
  ) internal pure returns (uint256) {
    require(b <= a, errorMessage);
    uint256 c = a - b;
    return c;
  }

  /**
   * @notice Calculate number of tokens of collateral asset to seize given an underlying amount
   * @dev Used in liquidation (called in ICToken(cToken).liquidateBorrowFresh)
   * @param cTokenBorrowed The address of the borrowed cToken
   * @param cTokenCollateral The address of the collateral cToken
   * @param actualRepayAmount The amount of cTokenBorrowed underlying to convert into cTokenCollateral tokens
   * @return (errorCode, number of cTokenCollateral tokens to be seized in a liquidation)
   */
  function liquidateCalculateSeizeTokens(
    address cTokenBorrowed,
    address cTokenCollateral,
    uint256 actualRepayAmount,
    IComptroller comptroller
  ) external view returns (uint256, uint256) {
    /* Read oracle prices for borrowed and collateral markets */
    address oracle = comptroller.oracle();
    uint256 priceBorrowedMantissa = IPriceOracle(oracle).getUnderlyingPrice(address(cTokenBorrowed));
    uint256 priceCollateralMantissa = IPriceOracle(oracle).getUnderlyingPrice(address(cTokenCollateral));
    require(priceBorrowedMantissa > 0 && priceCollateralMantissa > 0, 'PRICE_ERROR');

    /*
     * Get the exchange rate and calculate the number of collateral tokens to seize:
     *  seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
     *  seizeTokens = seizeAmount / exchangeRate
     *   = actualRepayAmount * (liquidationIncentive * priceBorrowed) / (priceCollateral * exchangeRate)
     */
    uint256 exchangeRateMantissa = ICToken(cTokenCollateral).exchangeRateStored(); // Note: reverts on error
    uint256 seizeTokens;
    Exp memory numerator;
    Exp memory denominator;
    Exp memory ratio;

    numerator = Exp({mantissa: comptroller.liquidationIncentiveMantissa()}).mul_(
      Exp({mantissa: priceBorrowedMantissa})
    );
    denominator = Exp({mantissa: priceCollateralMantissa}).mul_(
      Exp({mantissa: exchangeRateMantissa})
    );
    ratio = numerator.div_(denominator);

    seizeTokens = ratio.mul_ScalarTruncate(actualRepayAmount);

    return (uint256(0), seizeTokens);
  }

  /**
   * @notice Returns true if the given cToken market has been deprecated
   * @dev All borrows in a deprecated cToken market can be immediately liquidated
   * @param cToken The market to check if deprecated
   */
  function isDeprecated(address cToken, IComptroller comptroller) public view returns (bool) {
    return
      comptroller.marketGroupId(cToken) == 0 &&
      //borrowGuardianPaused[cToken] == true &&
      IUnderwriterAdmin(comptroller.underWriterAdmin())._getBorrowPaused(cToken) &&
      ICToken(cToken).reserveFactorMantissa() == 1e18;
  }

  /**
   * @notice Checks if the liquidation should be allowed to occur
   * @param cTokenBorrowed Asset which was borrowed by the borrower
   * @param cTokenCollateral Asset which was used as collateral and will be seized
   * @param liquidator The address repaying the borrow and seizing the collateral
   * @param borrower The address of the borrower
   * @param repayAmount The amount of underlying being repaid
   */
  function liquidateBorrowAllowed(
    address cTokenBorrowed,
    address cTokenCollateral,
    address liquidator,
    address borrower,
    uint256 repayAmount,
    IComptroller comptroller
  ) external view returns (uint256) {
    // Shh - currently unused: liquidator;

    require(comptroller.isListed(cTokenBorrowed) && comptroller.isListed(cTokenCollateral), 'MARKET_NOT_LISTED');

    uint256 borrowBalance = ICToken(cTokenBorrowed).borrowBalanceStored(borrower);

    /* allow accounts to be liquidated if the market is deprecated */
    if (isDeprecated(cTokenBorrowed, comptroller)) {
      require(borrowBalance >= repayAmount, 'too much repay');
    } else {
      /* The borrower must have shortfall in order to be liquidatable */
      (, , uint256 shortfall) = comptroller.getHypotheticalAccountLiquidity(borrower, cTokenBorrowed, 0, 0);

      require(shortfall > 0, 'insufficient shortfall');

      /* The liquidator may not repay more than what is allowed by the closeFactor */
      uint256 maxClose = Exp({mantissa: comptroller.closeFactorMantissa()}).mul_ScalarTruncate(
        borrowBalance
      );
      require(repayAmount <= maxClose, 'too much repay');
    }
    return uint256(0);
  }
}
