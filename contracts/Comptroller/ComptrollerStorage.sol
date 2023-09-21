// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ComptrollerStorage {
  /// @notice Indicator that this is a Comptroller contract (for inspection)
  bool public constant isComptroller = true;

  /**
   * @notice Multiplier used to calculate the maximum repayAmount when liquidating a borrow
   */
  uint256 public closeFactorMantissa;

  /**
   * @notice Multiplier representing the discount on collateral that a liquidator receives
   */
  uint256 public heteroLiquidationIncentiveMantissa;

  string internal constant INSUFFICIENT_LIQUIDITY = 'insufficient liquidity';
  string internal constant MARKET_NOT_LISTED = 'market not listed';
  string internal constant UNAUTHORIZED = 'unauthorized';
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
    uint8 assetGroupId;
    mapping(address => bool) accountMembership;
    bool isComped;
  }

  /**
   * @notice Official mapping of cTokens -> Market metadata
   * @dev Used e.g. to determine if a market is supported
   */
  mapping(address => Market) public markets;

  /// @notice A list of all markets
  address[] public allMarkets;

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
  event NewLiquidationIncentive(
    uint256 oldHeteroIncentive,
    uint256 newHeteroIncentive,
    uint256 oldHomoIncentive,
    uint256 newHomoIncentive,
    uint256 oldSutokenIncentive,
    uint256 newSutokenIncentive
  );

  /// @notice Emitted when price oracle is changed
  event NewPriceOracle(address oldPriceOracle, address newPriceOracle);

  event SetMaxSupply(address indexed cToken, uint256 amount);

  /*
    Liquidation Incentive for repaying homogeneous token
  */
  uint256 public homoLiquidationIncentiveMantissa;

  /*
    Liquidation Incentive for repaying sutoken
  */
  uint256 public sutokenLiquidationIncentiveMantissa;
}
