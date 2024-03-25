// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import '../Exponential/ExponentialNoError.sol';
import '../Interface/IComptroller.sol';
import '../Interface/ICTokenExternal.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';

contract CompLogic is AccessControlEnumerableUpgradeable {
  using ExponentialNoError for uint256;
  using ExponentialNoError for Exp;
  using ExponentialNoError for Double;

  /// @notice The market's last updated compBorrowIndex or compSupplyIndex
  /// @notice The block number the index was last updated at
  struct CompMarketState {
    uint224 index;
    uint32 block;
  }
  address public comp;

  IComptroller public comptroller;
  /// @notice The COMP accrued but not yet transferred to each user
  mapping(address => uint256) public compAccrued;
  /// @notice The portion of COMP that each contributor receives per block
  mapping(address => uint256) public compContributorSpeeds;
  /// @notice The initial COMP index for a market
  uint224 public constant compInitialIndex = 1e36;
  /// @notice Last block at which a contributor's COMP rewards have been allocated
  mapping(address => uint256) public lastContributorBlock;
  /// @notice The COMP borrow index for each market for each supplier as of the last time they accrued COMP
  mapping(address => mapping(address => uint256)) public compSupplierIndex;
  /// @notice The COMP borrow index for each market for each borrower as of the last time they accrued COMP
  mapping(address => mapping(address => uint256)) public compBorrowerIndex;
  /// @notice The rate at which comp is distributed to the corresponding supply market (per block)
  mapping(address => uint256) public compSupplySpeeds;
  /// @notice The rate at which comp is distributed to the corresponding borrow market (per block)
  mapping(address => uint256) public compBorrowSpeeds;
  /// @notice The COMP market supply state for each market
  mapping(address => CompMarketState) public compSupplyState;
  /// @notice The COMP market borrow state for each market
  mapping(address => CompMarketState) public compBorrowState;

  /// @notice Emitted when COMP is granted by admin
  event CompGranted(address recipient, uint256 amount);
  /// @notice Emitted when a new COMP speed is set for a contributor
  event ContributorCompSpeedUpdated(address indexed contributor, uint256 newSpeed);
  /// @notice Emitted when a new supply-side COMP speed is calculated for a market
  event CompSupplySpeedUpdated(address indexed cToken, uint256 newSpeed);
  /// @notice Emitted when a new borrow-side COMP speed is calculated for a market
  event CompBorrowSpeedUpdated(address indexed cToken, uint256 newSpeed);
  /// @notice Emitted when COMP is distributed to a supplier
  event DistributedSupplierComp(
    address indexed cToken,
    address indexed supplier,
    uint256 compDelta,
    uint256 compSupplyIndex
  );

  /// @notice Emitted when COMP is distributed to a borrower
  event DistributedBorrowerComp(
    address indexed cToken,
    address indexed borrower,
    uint256 compDelta,
    uint256 compBorrowIndex
  );

  modifier onlyComptroller() {
    require(msg.sender == address(comptroller), 'only comptroller');
    _;
  }

  function initialize(address _admin, address _comp) external initializer {
    comp = _comp;
    _setupRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  event SetComptroller(address comptroller);

  function setComptroller(IComptroller _comptroller) external onlyRole(DEFAULT_ADMIN_ROLE) {
    comptroller = _comptroller;
    emit SetComptroller(address(comptroller));
  }

  /*** Comp Distribution ***/

  /**
   * @notice Set COMP speed for a single market
   * @param cToken The market whose COMP speed to update
   * @param supplySpeed New supply-side COMP speed for market
   * @param borrowSpeed New borrow-side COMP speed for market
   */
  function setCompSpeed(address cToken, uint256 supplySpeed, uint256 borrowSpeed) external onlyComptroller {
    _setCompSpeedInternal(cToken, supplySpeed, borrowSpeed);
  }

  function _setCompSpeedInternal(address cToken, uint256 supplySpeed, uint256 borrowSpeed) private {
    (bool isListed, , ) = comptroller.markets(cToken);
    require(isListed, 'market not listed');
    require(supplySpeed > 0, 'invalid supplySpeed');
    require(borrowSpeed > 0, 'invlaid borrowSpeed');

    if (compSupplySpeeds[cToken] != supplySpeed) {
      // Supply speed updated so let's update supply state to ensure that
      //  1. COMP accrued properly for the old speed, and
      //  2. COMP accrued at the new speed starts after this block.
      _updateCompSupplyIndex(cToken);

      // Update speed and emit event
      compSupplySpeeds[cToken] = supplySpeed;
      emit CompSupplySpeedUpdated(cToken, supplySpeed);
    }

    if (compBorrowSpeeds[cToken] != borrowSpeed) {
      // Borrow speed updated so let's update borrow state to ensure that
      //  1. COMP accrued properly for the old speed, and
      //  2. COMP accrued at the new speed starts after this block.
      Exp memory borrowIndex = Exp({mantissa: ICToken(cToken).borrowIndex()});
      _updateCompBorrowIndex(cToken, borrowIndex);

      // Update speed and emit event
      compBorrowSpeeds[cToken] = borrowSpeed;
      emit CompBorrowSpeedUpdated(cToken, borrowSpeed);
    }
  }

  /**
   * @notice Accrue COMP to the market by updating the supply index
   * @param cToken The market whose supply index to update
   * @dev Index is a cumulative sum of the COMP per cToken accrued.
   */
  function updateCompSupplyIndex(address cToken) external onlyComptroller {
    _updateCompSupplyIndex(cToken);
  }

  function _updateCompSupplyIndex(address cToken) private {
    CompMarketState storage supplyState = compSupplyState[cToken];
    uint256 supplySpeed = compSupplySpeeds[cToken];
    uint32 blockNumber = block.number.safe32('block number exceeds 32 bits');
    uint256 deltaBlocks = uint256(blockNumber).sub_(uint256(supplyState.block));
    if (deltaBlocks != 0 && supplySpeed != 0) {
      uint256 supplyTokens = ICToken(cToken).totalSupply();
      uint256 _compAccrued = deltaBlocks.mul_(supplySpeed);
      Double memory ratio = supplyTokens > 0 ? _compAccrued.fraction(supplyTokens) : Double({mantissa: 0});
      supplyState.index = Double({mantissa: supplyState.index}).add_(ratio).mantissa.safe224(
        'new index exceeds 224 bits'
      );
      supplyState.block = blockNumber;
    } else if (deltaBlocks > 0) {
      supplyState.block = blockNumber;
    }
  }

  /**
   * @notice Accrue COMP to the market by updating the borrow index
   * @param cToken The market whose borrow index to update
   * @dev Index is a cumulative sum of the COMP per cToken accrued.
   */

  function updateCompBorrowIndex(address cToken, Exp memory marketBorrowIndex) external onlyComptroller {
    _updateCompBorrowIndex(cToken, marketBorrowIndex);
  }

  function _updateCompBorrowIndex(address cToken, Exp memory marketBorrowIndex) private {
    CompMarketState storage borrowState = compBorrowState[cToken];
    uint256 borrowSpeed = compBorrowSpeeds[cToken];
    uint32 blockNumber = block.number.safe32('block number exceeds 32 bits');
    uint256 deltaBlocks = uint256(blockNumber).sub_(uint256(borrowState.block));
    if (deltaBlocks > 0 && borrowSpeed > 0) {
      uint256 borrowAmount = ICToken(cToken).totalBorrows().div_(marketBorrowIndex);
      uint256 _compAccrued = deltaBlocks.mul_(borrowSpeed);
      Double memory ratio = borrowAmount > 0 ? _compAccrued.fraction(borrowAmount) : Double({mantissa: 0});
      borrowState.index = Double({mantissa: borrowState.index}).add_(ratio).mantissa.safe224(
        'new index exceeds 224 bits'
      );
      borrowState.block = blockNumber;
    } else if (deltaBlocks > 0) {
      borrowState.block = blockNumber;
    }
  }

  /**
   * @notice Calculate COMP accrued by a supplier and possibly transfer it to them
   * @param cToken The market in which the supplier is interacting
   * @param supplier The address of the supplier to distribute COMP to
   */

  function distributeSupplierComp(address cToken, address supplier) external onlyComptroller {
    _distributeSupplierComp(cToken, supplier);
  }

  function _distributeSupplierComp(address cToken, address supplier) private {
    // This check should be as gas efficient as possible as distributeSupplierComp is called in many places.
    // - We really don't want to call an external contract as that's quite expensive.

    CompMarketState storage supplyState = compSupplyState[cToken];
    uint256 supplyIndex = supplyState.index;
    uint256 supplierIndex = compSupplierIndex[cToken][supplier];

    // Update supplier's index to the current index since we are distributing accrued COMP
    compSupplierIndex[cToken][supplier] = supplyIndex;

    if (supplierIndex == 0 && supplyIndex >= compInitialIndex) {
      // Covers the case where users supplied tokens before the market's supply state index was set.
      // Rewards the user with COMP accrued from the start of when supplier rewards were first
      // set for the market.
      supplierIndex = compInitialIndex;
    }

    // Calculate change in the cumulative sum of the COMP per cToken accrued
    Double memory deltaIndex = Double({mantissa: supplyIndex.sub_(supplierIndex)});

    uint256 supplierTokens = ICToken(cToken).balanceOf(supplier);

    // Calculate COMP accrued: cTokenAmount * accruedPerCTokenInterface
    uint256 supplierDelta = supplierTokens.mul_(deltaIndex);

    uint256 supplierAccrued = compAccrued[supplier].add_(supplierDelta);
    compAccrued[supplier] = supplierAccrued;

    emit DistributedSupplierComp(cToken, supplier, supplierDelta, supplyIndex);
  }

  /**
   * @notice Calculate COMP accrued by a borrower and possibly transfer it to them
   * @dev Borrowers will not begin to accrue until after the first interaction with the protocol.
   * @param cToken The market in which the borrower is interacting
   * @param borrower The address of the borrower to distribute COMP to
   */
  function distributeBorrowerComp(
    address cToken,
    address borrower,
    Exp memory marketBorrowIndex
  ) external onlyComptroller {
    _distributeBorrowerComp(cToken, borrower, marketBorrowIndex);
  }

  function _distributeBorrowerComp(address cToken, address borrower, Exp memory marketBorrowIndex) private {
    // This check should be as gas efficient as possible as distributeBorrowerComp is called in many places.
    // - We really don't want to call an external contract as that's quite expensive.

    CompMarketState storage borrowState = compBorrowState[cToken];
    uint256 borrowIndex = borrowState.index;
    uint256 borrowerIndex = compBorrowerIndex[cToken][borrower];

    // Update borrowers's index to the current index since we are distributing accrued COMP
    compBorrowerIndex[cToken][borrower] = borrowIndex;

    if (borrowerIndex == 0 && borrowIndex >= compInitialIndex) {
      // Covers the case where users borrowed tokens before the market's borrow state index was set.
      // Rewards the user with COMP accrued from the start of when borrower rewards were first
      // set for the market.
      borrowerIndex = compInitialIndex;
    }

    // Calculate change in the cumulative sum of the COMP per borrowed unit accrued
    Double memory deltaIndex = Double({mantissa: borrowIndex.sub_(borrowerIndex)});

    uint256 borrowerAmount = ICToken(cToken).borrowBalanceStored(borrower).div_(marketBorrowIndex);

    // Calculate COMP accrued: cTokenAmount * accruedPerBorrowedUnit
    uint256 borrowerDelta = borrowerAmount.mul_(deltaIndex);

    uint256 borrowerAccrued = compAccrued[borrower].add_(borrowerDelta);
    compAccrued[borrower] = borrowerAccrued;

    emit DistributedBorrowerComp(cToken, borrower, borrowerDelta, borrowIndex);
  }

  /**
   * @notice Calculate additional accrued COMP for a contributor since last accrual
   * @param contributor The address to calculate contributor rewards for
   */
  function updateContributorRewards(address contributor) public {
    uint256 compSpeed = compContributorSpeeds[contributor];
    uint256 blockNumber = block.number;
    uint256 deltaBlocks = blockNumber.sub_(lastContributorBlock[contributor]);
    if (deltaBlocks > 0 && compSpeed > 0) {
      uint256 newAccrued = deltaBlocks.mul_(compSpeed);
      uint256 contributorAccrued = compAccrued[contributor].add_(newAccrued);

      compAccrued[contributor] = contributorAccrued;
      lastContributorBlock[contributor] = blockNumber;
    }
  }

  /**
   * @notice Claim all the comp accrued by holder in all markets
   * @param holder The address to claim COMP for
   */
  function claimSumer(address holder) public {
    return claimSumer(holder, comptroller.getAllMarkets());
  }

  /**
   * @notice Claim all the comp accrued by holder in the specified markets
   * @param holder The address to claim COMP for
   * @param cTokens The list of markets to claim COMP in
   */
  function claimSumer(address holder, address[] memory cTokens) public {
    address[] memory holders = new address[](1);
    holders[0] = holder;
    claimSumer(holders, cTokens, true, true);
  }

  /**
   * @notice Claim all comp accrued by the holders
   * @param holders The addresses to claim COMP for
   * @param cTokens The list of markets to claim COMP in
   * @param borrowers Whether or not to claim COMP earned by borrowing
   * @param suppliers Whether or not to claim COMP earned by supplying
   */
  function claimSumer(address[] memory holders, address[] memory cTokens, bool borrowers, bool suppliers) public {
    for (uint256 i = 0; i < cTokens.length; ++i) {
      address cToken = cTokens[i];
      (bool isListed, , ) = comptroller.markets(cToken);
      require(isListed, 'market not listed');
      if (borrowers) {
        Exp memory borrowIndex = Exp({mantissa: ICToken(cToken).borrowIndex()});
        _updateCompBorrowIndex(cToken, borrowIndex);
        for (uint256 j = 0; j < holders.length; j++) {
          _distributeBorrowerComp(cToken, holders[j], borrowIndex);
        }
      }
      if (suppliers) {
        _updateCompSupplyIndex(cToken);
        for (uint256 j = 0; j < holders.length; j++) {
          _distributeSupplierComp(cToken, holders[j]);
        }
      }
    }
    for (uint256 j = 0; j < holders.length; j++) {
      compAccrued[holders[j]] = grantCompInternal(holders[j], compAccrued[holders[j]]);
    }
  }

  /**
   * @notice Transfer COMP to the user
   * @dev Note: If there is not enough COMP, we do not perform the transfer at all.
   * @param user The address of the user to transfer COMP to
   * @param amount The amount of COMP to (possibly) transfer
   * @return The amount of COMP which was NOT transferred to the user
   */
  function grantCompInternal(address user, uint256 amount) private returns (uint256) {
    address[] memory markets = comptroller.getAssetsIn(user);
    /***
        for (uint i = 0; i < allMarkets.length; ++i) {
            address market = address(allMarkets[i]);
        ***/
    for (uint256 i = 0; i < markets.length; ++i) {
      address market = address(markets[i]);
      bool noOriginalSpeed = compBorrowSpeeds[market] == 0;
      bool invalidSupply = noOriginalSpeed && compSupplierIndex[market][user] > 0;
      bool invalidBorrow = noOriginalSpeed && compBorrowerIndex[market][user] > 0;

      if (invalidSupply || invalidBorrow) {
        return amount;
      }
    }

    uint256 compRemaining = ICToken(comp).balanceOf(address(this));
    if (amount > 0 && amount <= compRemaining) {
      comp.call(abi.encodeWithSignature('transfer(address,uint256)', user, amount));
      return 0;
    }
    return amount;
  }

  function initializeMarket(address cToken, uint32 blockNumber) external onlyComptroller {
    CompMarketState storage supplyState = compSupplyState[cToken];
    CompMarketState storage borrowState = compBorrowState[cToken];
    /*
     * Update market state indices
     */
    if (supplyState.index == 0) {
      // Initialize supply state index with default value
      supplyState.index = compInitialIndex;
    }
    if (borrowState.index == 0) {
      // Initialize borrow state index with default value
      borrowState.index = compInitialIndex;
    }
    /*
     * Update market state block numbers
     */
    supplyState.block = borrowState.block = blockNumber;
  }

  /*** Comp Distribution Admin ***/
  /**
   * @notice Transfer COMP to the recipient
   * @dev Note: If there is not enough COMP, we do not perform the transfer at all.
   * @param recipient The address of the recipient to transfer COMP to
   * @param amount The amount of COMP to (possibly) transfer
   */
  function _grantComp(address recipient, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
    uint256 amountLeft = grantCompInternal(recipient, amount);
    require(amountLeft == 0, 'insufficient comp for grant');
    emit CompGranted(recipient, amount);
  }

  /**
   * @notice Set COMP borrow and supply speeds for the specified markets.
   * @param cTokens The markets whose COMP speed to update.
   * @param supplySpeeds New supply-side COMP speed for the corresponding market.
   * @param borrowSpeeds New borrow-side COMP speed for the corresponding market.
   */
  function _setCompSpeeds(
    address[] memory cTokens,
    uint256[] memory supplySpeeds,
    uint256[] memory borrowSpeeds
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    uint256 numTokens = cTokens.length;
    require(
      numTokens == supplySpeeds.length && numTokens == borrowSpeeds.length,
      'Comptroller::_setCompSpeeds invalid input'
    );

    for (uint256 i = 0; i < numTokens; ++i) {
      _setCompSpeedInternal(cTokens[i], supplySpeeds[i], borrowSpeeds[i]);
    }
  }

  /**
   * @notice Set COMP speed for a single contributor
   * @param contributor The contributor whose COMP speed to update
   * @param compSpeed New COMP speed for contributor
   */
  function _setContributorCompSpeed(address contributor, uint256 compSpeed) public onlyRole(DEFAULT_ADMIN_ROLE) {
    // note that COMP speed could be set to 0 to halt liquidity rewards for a contributor
    updateContributorRewards(contributor);
    if (compSpeed == 0) {
      // release storage
      delete lastContributorBlock[contributor];
    } else {
      lastContributorBlock[contributor] = block.number;
    }
    compContributorSpeeds[contributor] = compSpeed;

    emit ContributorCompSpeedUpdated(contributor, compSpeed);
  }

  function calculateComp(address holder) external view returns (uint256) {
    address[] memory cTokens = comptroller.getAllMarkets();
    uint256 accrued = compAccrued[holder];
    for (uint256 i = 0; i < cTokens.length; ++i) {
      address cToken = cTokens[i];
      Exp memory marketBorrowIndex = Exp({mantissa: ICToken(cToken).borrowIndex()});
      // _updateCompBorrowIndex
      CompMarketState memory borrowState = compBorrowState[cToken];
      uint256 borrowSpeed = compBorrowSpeeds[cToken];
      uint32 blockNumber = block.number.safe32('block number exceeds 32 bits');
      uint256 borrowDeltaBlocks = uint256(blockNumber).sub_(uint256(borrowState.block));
      if (borrowDeltaBlocks > 0 && borrowSpeed > 0) {
        uint256 borrowAmount = ICToken(cToken).totalBorrows().div_(marketBorrowIndex);
        uint256 _compAccrued = borrowDeltaBlocks.mul_(borrowSpeed);
        Double memory ratio = borrowAmount > 0 ? _compAccrued.fraction(borrowAmount) : Double({mantissa: 0});
        borrowState.index = Double({mantissa: borrowState.index}).add_(ratio).mantissa.safe224(
          'new index exceeds 224 bits'
        );
        borrowState.block = blockNumber;
      } else if (borrowDeltaBlocks > 0) {
        borrowState.block = blockNumber;
      }
      // _distributeBorrowerComp
      uint256 borrowIndex = borrowState.index;
      uint256 borrowerIndex = compBorrowerIndex[cToken][holder];
      if (borrowerIndex == 0 && borrowIndex >= compInitialIndex) {
        borrowerIndex = compInitialIndex;
      }
      Double memory borrowDeltaIndex = Double({mantissa: borrowIndex.sub_(borrowerIndex)});
      uint256 borrowerAmount = ICToken(cToken).borrowBalanceStored(holder).div_(marketBorrowIndex);
      uint256 borrowerDelta = borrowerAmount.mul_(borrowDeltaIndex);
      accrued = accrued.add_(borrowerDelta);
      // _updateCompSupplyIndex
      CompMarketState memory supplyState = compSupplyState[cToken];
      uint256 supplySpeed = compSupplySpeeds[cToken];
      uint256 supplyDeltaBlocks = uint256(blockNumber).sub_(uint256(supplyState.block));
      if (supplyDeltaBlocks > 0 && supplySpeed > 0) {
        uint256 supplyTokens = ICToken(cToken).totalSupply();
        uint256 _compAccrued = supplyDeltaBlocks.mul_(supplySpeed);
        Double memory ratio = supplyTokens > 0 ? _compAccrued.fraction(supplyTokens) : Double({mantissa: 0});
        supplyState.index = Double({mantissa: supplyState.index}).add_(ratio).mantissa.safe224(
          'new index exceeds 224 bits'
        );
        supplyState.block = blockNumber;
      } else if (supplyDeltaBlocks > 0) {
        supplyState.block = blockNumber;
      }
      // _distributeSupplierComp
      uint256 supplyIndex = supplyState.index;
      uint256 supplierIndex = compSupplierIndex[cToken][holder];
      if (supplierIndex == 0 && supplyIndex >= compInitialIndex) {
        supplierIndex = compInitialIndex;
      }
      Double memory supplyDeltaIndex = Double({mantissa: supplyIndex.sub_(supplierIndex)});
      uint256 supplierTokens = ICToken(cToken).balanceOf(holder);
      uint256 supplierDelta = supplierTokens.mul_(supplyDeltaIndex);
      accrued = accrued.add_(supplierDelta);
    }
    return accrued;
  }
}
