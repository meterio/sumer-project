// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract ComptrollerStorage {
  /// @notice Indicator that this is a Comptroller contract (for inspection)
  bool public constant isComptroller = true;
  /**
   * @notice Administrator for this contract
   */
  address public admin;

  address public underWriterAdmin;
  /**
   * @notice Oracle which gives the price of any given asset
   */
  address public oracle;

  /**
   * @notice Multiplier used to calculate the maximum repayAmount when liquidating a borrow
   */
  uint256 public closeFactorMantissa;

  /**
   * @notice Multiplier representing the discount on collateral that a liquidator receives
   */
  uint256 public liquidationIncentiveMantissa;

  /// @notice The initial COMP index for a market
  uint224 public constant compInitialIndex = 1e36;

  string internal constant INSUFFICIENT_LIQUIDITY = 'insufficient liquidity';
  string internal constant MARKET_NOT_LISTED = 'market not listed';
  string internal constant UNAUTHORIZED = 'unauthorized';
  string internal constant PRICE_ERROR = 'price error';
  string internal constant SNAPSHOT_ERROR = 'snapshot error';
  /**
   * @notice Per-account mapping of "assets you are in", capped by maxAssets
   */
  mapping(address => address[]) public accountAssets;
  /// @notice Whether or not this market is listed
  /// @notice Per-market mapping of "accounts in this asset"
  /// @notice Whether or not this market receives COMP
  struct Market {
    bool isListed;
    uint8 equalAssetGrouId;
    mapping(address => bool) accountMembership;
    bool isComped;
  }

  /**
   * @notice Official mapping of cTokens -> Market metadata
   * @dev Used e.g. to determine if a market is supported
   */
  mapping(address => Market) public markets;

  /// @notice The market's last updated compBorrowIndex or compSupplyIndex
  /// @notice The block number the index was last updated at
  struct CompMarketState {
    uint224 index;
    uint32 block;
  }

  /// @notice A list of all markets
  address[] public allMarkets;

  /// @notice The COMP market supply state for each market
  mapping(address => CompMarketState) public compSupplyState;

  /// @notice The COMP market borrow state for each market
  mapping(address => CompMarketState) public compBorrowState;

  /// @notice The COMP borrow index for each market for each supplier as of the last time they accrued COMP
  mapping(address => mapping(address => uint256)) public compSupplierIndex;

  /// @notice The COMP borrow index for each market for each borrower as of the last time they accrued COMP
  mapping(address => mapping(address => uint256)) public compBorrowerIndex;

  /// @notice The COMP accrued but not yet transferred to each user
  mapping(address => uint256) public compAccrued;
  /// @notice The portion of COMP that each contributor receives per block
  mapping(address => uint256) public compContributorSpeeds;

  /// @notice Last block at which a contributor's COMP rewards have been allocated
  mapping(address => uint256) public lastContributorBlock;
  /// @notice The rate at which comp is distributed to the corresponding borrow market (per block)
  mapping(address => uint256) public compBorrowSpeeds;

  /// @notice The rate at which comp is distributed to the corresponding supply market (per block)
  mapping(address => uint256) public compSupplySpeeds;
  
  mapping(address => uint256) public maxSupply;

  /// @notice Emitted when an admin supports a market
  event MarketListed(address cToken);

  /// @notice Emitted when an account enters a market
  event MarketEntered(address cToken, address account);

  /// @notice Emitted when an account exits a market
  event MarketExited(address cToken, address account);

  /// @notice Emitted when close factor is changed by admin
  event NewCloseFactor(uint256 oldCloseFactorMantissa, uint256 newCloseFactorMantissa);

  /// @notice Emitted when liquidation incentive is changed by admin
  event NewLiquidationIncentive(uint256 oldLiquidationIncentiveMantissa, uint256 newLiquidationIncentiveMantissa);

  /// @notice Emitted when price oracle is changed
  event NewPriceOracle(address oldPriceOracle, address newPriceOracle);

  /// @notice Emitted when a new borrow-side COMP speed is calculated for a market
  event CompBorrowSpeedUpdated(address indexed cToken, uint256 newSpeed);

  /// @notice Emitted when a new supply-side COMP speed is calculated for a market
  event CompSupplySpeedUpdated(address indexed cToken, uint256 newSpeed);

  /// @notice Emitted when a new COMP speed is set for a contributor
  event ContributorCompSpeedUpdated(address indexed contributor, uint256 newSpeed);

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

  /// @notice Emitted when COMP is granted by admin
  event CompGranted(address recipient, uint256 amount);

  event SetMaxSupply(address indexed cToken, uint256 amount);
}
