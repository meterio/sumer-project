pragma solidity >=0.5.16;


contract UnitrollerAdminStorage {
  /**
   * @notice Administrator for this contract
   */
  address public admin;

  /**
   * @notice Pending administrator for this contract
   */
  address public pendingAdmin;

  /**
   * @notice Active brains of Unitroller
   */
  address public comptrollerImplementation;

  /**
   * @notice Pending brains of Unitroller
   */
  address public pendingComptrollerImplementation;

  /**
   * @notice Gov token address  Move to Admin
   */
  //address public governanceToken;

  address public underWriterAdmin;
}

contract ComptrollerV1Storage is UnitrollerAdminStorage {
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

  /**
   * @notice Max number of assets a single account can participate in (borrow or use as collateral)
   */
  uint256 public maxAssets;

  /**
   * @notice Per-account mapping of "assets you are in", capped by maxAssets
   */
  mapping(address => address[]) public accountAssets;
}

contract ComptrollerV2Storage is ComptrollerV1Storage {
  struct Market {
    /// @notice Whether or not this market is listed
    bool isListed;
    /**
     * @notice Multiplier representing the most one can borrow against their collateral in this market.
     *  For instance, 0.9 to allow borrowing 90% of collateral value.
     *  Must be between 0 and 1, and stored as a mantissa.
     */
    //uint collateralFactorMantissa;
    uint8 equalAssetGrouId;
    /// @notice Per-market mapping of "accounts in this asset"
    mapping(address => bool) accountMembership;
    /// @notice Whether or not this market receives COMP
    bool isComped;
  }

  /**
   * @notice Official mapping of cTokens -> Market metadata
   * @dev Used e.g. to determine if a market is supported
   */
  mapping(address => Market) public markets;

  /**
   * @notice The Pause Guardian can pause certain actions as a safety mechanism.
   *  Actions which allow users to remove their own assets cannot be paused.
   *  Liquidation / seizing / transfer can only be paused globally, not by market.
   */
  /***  Move to Admin
    address public pauseGuardian;
    bool public _mintGuardianPaused;
    bool public _borrowGuardianPaused;
    bool public transferGuardianPaused;
    bool public seizeGuardianPaused;
    mapping(address => bool) public mintGuardianPaused;
    mapping(address => bool) public borrowGuardianPaused;
    ***/
}

contract ComptrollerV3Storage is ComptrollerV2Storage {
  struct CompMarketState {
    /// @notice The market's last updated compBorrowIndex or compSupplyIndex
    uint224 index;
    /// @notice The block number the index was last updated at
    uint32 block;
  }

  /// @notice A list of all markets
  address[] public allMarkets;

  /// @notice The rate at which the flywheel distributes COMP, per block
  uint256 public compRate;

  /// @notice The portion of compRate that each market currently receives
  mapping(address => uint256) public compSpeeds;

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
}

contract ComptrollerV4Storage is ComptrollerV3Storage {
  /***** Moved to Admin
    // @notice The borrowCapGuardian can set borrowCaps to any number for any market. Lowering the borrow cap could disable borrowing on the given market.
    address public borrowCapGuardian;

    // @notice Borrow caps enforced by borrowAllowed for each cToken address. Defaults to zero which corresponds to unlimited borrowing.
    mapping(address => uint) public borrowCaps;
    ****/
}

contract ComptrollerV5Storage is ComptrollerV4Storage {
  /// @notice The portion of COMP that each contributor receives per block
  mapping(address => uint256) public compContributorSpeeds;

  /// @notice Last block at which a contributor's COMP rewards have been allocated
  mapping(address => uint256) public lastContributorBlock;
}

contract ComptrollerV6Storage is ComptrollerV5Storage {
  /// @notice The rate at which comp is distributed to the corresponding borrow market (per block)
  mapping(address => uint256) public compBorrowSpeeds;

  /// @notice The rate at which comp is distributed to the corresponding supply market (per block)
  mapping(address => uint256) public compSupplySpeeds;
}

contract ComptrollerV7Storage is ComptrollerV6Storage {
  /// @notice The equal assests members
  /**
    struct EqualAssetsMember {
        address token;
        uint collateralMantissa;
    }
    ***/
  /// @notice allEqualAssestsGroups, some of groups have multiple member and some of groups
  /// only 1 member. Groups should have all members in the markets
  /// EqualAssestsGroup[] public allEqualAssestsGroups;
  /**
   * @notice Per-account mapping of "assets you are in", capped by maxAssets
   */
  //mapping(address => mapping(string => EqualAssetsGroup)) public allEqualAssetsGroups;
  //mapping(address => mapping(string => EqualAssetsMember[])) public allEqualAssetsMembers;
  //mapping(address => string[]) public allEqualAssetsGroupNames;
  /***
    /// @notice EqualAssets, contains information of groupName and rateMantissas
    struct EqualAssets {
        string groupName;
        uint rateMantissas;
    }
***/
  /**
   * @notice eqAssetGroup, cToken -> equal assets info.
   */
  //mapping(address => EqualAssets) public eqAssetGroup;
  mapping(address => uint256) public maxSupply;
}
