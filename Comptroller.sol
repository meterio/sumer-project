// Sources flattened with hardhat v2.9.3 https://hardhat.org

// File contracts/ErrorReporter.sol

pragma solidity 0.5.16;

contract ComptrollerErrorReporter {
    enum Error {
        NO_ERROR,
        UNAUTHORIZED,
        COMPTROLLER_MISMATCH,
        INSUFFICIENT_SHORTFALL,
        INSUFFICIENT_LIQUIDITY,
        INVALID_CLOSE_FACTOR,
        INVALID_COLLATERAL_FACTOR,
        INVALID_LIQUIDATION_INCENTIVE,
        MARKET_NOT_ENTERED,
        MARKET_NOT_LISTED,
        MARKET_ALREADY_LISTED,
        MATH_ERROR,
        NONZERO_BORROW_BALANCE,
        PRICE_ERROR,
        REJECTION,
        SNAPSHOT_ERROR,
        TOO_MANY_ASSETS,
        TOO_MUCH_REPAY
    }

    enum FailureInfo {
        ACCEPT_ADMIN_PENDING_ADMIN_CHECK,
        ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK,
        EXIT_MARKET_BALANCE_OWED,
        EXIT_MARKET_REJECTION,
        SET_CLOSE_FACTOR_OWNER_CHECK,
        SET_CLOSE_FACTOR_VALIDATION,
        SET_COLLATERAL_FACTOR_OWNER_CHECK,
        SET_COLLATERAL_FACTOR_NO_EXISTS,
        SET_COLLATERAL_FACTOR_VALIDATION,
        SET_COLLATERAL_FACTOR_WITHOUT_PRICE,
        SET_IMPLEMENTATION_OWNER_CHECK,
        SET_LIQUIDATION_INCENTIVE_OWNER_CHECK,
        SET_LIQUIDATION_INCENTIVE_VALIDATION,
        SET_MAX_ASSETS_OWNER_CHECK,
        SET_PENDING_ADMIN_OWNER_CHECK,
        SET_PENDING_IMPLEMENTATION_OWNER_CHECK,
        SET_PRICE_ORACLE_OWNER_CHECK,
        SUPPORT_MARKET_EXISTS,
        SUPPORT_MARKET_OWNER_CHECK,
        SET_PAUSE_GUARDIAN_OWNER_CHECK,
        SET_EQUAL_ASSET_GROUP_OWNER_CHECK
    }

    /**
      * @dev `error` corresponds to enum Error; `info` corresponds to enum FailureInfo, and `detail` is an arbitrary
      * contract-specific code that enables us to report opaque error codes from upgradeable contracts.
      **/
    event Failure(uint error, uint info, uint detail);

    /**
      * @dev use this when reporting a known error from the money market or a non-upgradeable collaborator
      */
    function fail(Error err, FailureInfo info) internal returns (uint) {
        emit Failure(uint(err), uint(info), 0);

        return uint(err);
    }

    /**
      * @dev use this when reporting an opaque error from an upgradeable collaborator contract
      */
    function failOpaque(Error err, FailureInfo info, uint opaqueError) internal returns (uint) {
        emit Failure(uint(err), uint(info), opaqueError);

        return uint(err);
    }
}

contract TokenErrorReporter {
    enum Error {
        NO_ERROR,
        UNAUTHORIZED,
        BAD_INPUT,
        COMPTROLLER_REJECTION,
        COMPTROLLER_CALCULATION_ERROR,
        INTEREST_RATE_MODEL_ERROR,
        INVALID_ACCOUNT_PAIR,
        INVALID_CLOSE_AMOUNT_REQUESTED,
        INVALID_COLLATERAL_FACTOR,
        MATH_ERROR,
        MARKET_NOT_FRESH,
        MARKET_NOT_LISTED,
        TOKEN_INSUFFICIENT_ALLOWANCE,
        TOKEN_INSUFFICIENT_BALANCE,
        TOKEN_INSUFFICIENT_CASH,
        TOKEN_TRANSFER_IN_FAILED,
        TOKEN_TRANSFER_OUT_FAILED
    }

    /*
     * Note: FailureInfo (but not Error) is kept in alphabetical order
     *       This is because FailureInfo grows significantly faster, and
     *       the order of Error has some meaning, while the order of FailureInfo
     *       is entirely arbitrary.
     */
    enum FailureInfo {
        ACCEPT_ADMIN_PENDING_ADMIN_CHECK,
        ACCRUE_INTEREST_ACCUMULATED_INTEREST_CALCULATION_FAILED,
        ACCRUE_INTEREST_BORROW_RATE_CALCULATION_FAILED,
        ACCRUE_INTEREST_NEW_BORROW_INDEX_CALCULATION_FAILED,
        ACCRUE_INTEREST_NEW_TOTAL_BORROWS_CALCULATION_FAILED,
        ACCRUE_INTEREST_NEW_TOTAL_RESERVES_CALCULATION_FAILED,
        ACCRUE_INTEREST_SIMPLE_INTEREST_FACTOR_CALCULATION_FAILED,
        BORROW_ACCUMULATED_BALANCE_CALCULATION_FAILED,
        BORROW_ACCRUE_INTEREST_FAILED,
        BORROW_CASH_NOT_AVAILABLE,
        BORROW_FRESHNESS_CHECK,
        BORROW_NEW_TOTAL_BALANCE_CALCULATION_FAILED,
        BORROW_NEW_ACCOUNT_BORROW_BALANCE_CALCULATION_FAILED,
        BORROW_MARKET_NOT_LISTED,
        BORROW_COMPTROLLER_REJECTION,
        LIQUIDATE_ACCRUE_BORROW_INTEREST_FAILED,
        LIQUIDATE_ACCRUE_COLLATERAL_INTEREST_FAILED,
        LIQUIDATE_COLLATERAL_FRESHNESS_CHECK,
        LIQUIDATE_COMPTROLLER_REJECTION,
        LIQUIDATE_COMPTROLLER_CALCULATE_AMOUNT_SEIZE_FAILED,
        LIQUIDATE_CLOSE_AMOUNT_IS_UINT_MAX,
        LIQUIDATE_CLOSE_AMOUNT_IS_ZERO,
        LIQUIDATE_FRESHNESS_CHECK,
        LIQUIDATE_LIQUIDATOR_IS_BORROWER,
        LIQUIDATE_REPAY_BORROW_FRESH_FAILED,
        LIQUIDATE_SEIZE_BALANCE_INCREMENT_FAILED,
        LIQUIDATE_SEIZE_BALANCE_DECREMENT_FAILED,
        LIQUIDATE_SEIZE_COMPTROLLER_REJECTION,
        LIQUIDATE_SEIZE_LIQUIDATOR_IS_BORROWER,
        LIQUIDATE_SEIZE_TOO_MUCH,
        MINT_ACCRUE_INTEREST_FAILED,
        MINT_COMPTROLLER_REJECTION,
        MINT_EXCHANGE_CALCULATION_FAILED,
        MINT_EXCHANGE_RATE_READ_FAILED,
        MINT_FRESHNESS_CHECK,
        MINT_NEW_ACCOUNT_BALANCE_CALCULATION_FAILED,
        MINT_NEW_TOTAL_SUPPLY_CALCULATION_FAILED,
        MINT_TRANSFER_IN_FAILED,
        MINT_TRANSFER_IN_NOT_POSSIBLE,
        REDEEM_ACCRUE_INTEREST_FAILED,
        REDEEM_COMPTROLLER_REJECTION,
        REDEEM_EXCHANGE_TOKENS_CALCULATION_FAILED,
        REDEEM_EXCHANGE_AMOUNT_CALCULATION_FAILED,
        REDEEM_EXCHANGE_RATE_READ_FAILED,
        REDEEM_FRESHNESS_CHECK,
        REDEEM_NEW_ACCOUNT_BALANCE_CALCULATION_FAILED,
        REDEEM_NEW_TOTAL_SUPPLY_CALCULATION_FAILED,
        REDEEM_TRANSFER_OUT_NOT_POSSIBLE,
        REDUCE_RESERVES_ACCRUE_INTEREST_FAILED,
        REDUCE_RESERVES_ADMIN_CHECK,
        REDUCE_RESERVES_CASH_NOT_AVAILABLE,
        REDUCE_RESERVES_FRESH_CHECK,
        REDUCE_RESERVES_VALIDATION,
        REPAY_BEHALF_ACCRUE_INTEREST_FAILED,
        REPAY_BORROW_ACCRUE_INTEREST_FAILED,
        REPAY_BORROW_ACCUMULATED_BALANCE_CALCULATION_FAILED,
        REPAY_BORROW_COMPTROLLER_REJECTION,
        REPAY_BORROW_FRESHNESS_CHECK,
        REPAY_BORROW_NEW_ACCOUNT_BORROW_BALANCE_CALCULATION_FAILED,
        REPAY_BORROW_NEW_TOTAL_BALANCE_CALCULATION_FAILED,
        REPAY_BORROW_TRANSFER_IN_NOT_POSSIBLE,
        SET_COLLATERAL_FACTOR_OWNER_CHECK,
        SET_COLLATERAL_FACTOR_VALIDATION,
        SET_COMPTROLLER_OWNER_CHECK,
        SET_INTEREST_RATE_MODEL_ACCRUE_INTEREST_FAILED,
        SET_INTEREST_RATE_MODEL_FRESH_CHECK,
        SET_INTEREST_RATE_MODEL_OWNER_CHECK,
        SET_MAX_ASSETS_OWNER_CHECK,
        SET_ORACLE_MARKET_NOT_LISTED,
        SET_PENDING_ADMIN_OWNER_CHECK,
        SET_RESERVE_FACTOR_ACCRUE_INTEREST_FAILED,
        SET_RESERVE_FACTOR_ADMIN_CHECK,
        SET_RESERVE_FACTOR_FRESH_CHECK,
        SET_RESERVE_FACTOR_BOUNDS_CHECK,
        TRANSFER_COMPTROLLER_REJECTION,
        TRANSFER_NOT_ALLOWED,
        TRANSFER_NOT_ENOUGH,
        TRANSFER_TOO_MUCH,
        ADD_RESERVES_ACCRUE_INTEREST_FAILED,
        ADD_RESERVES_FRESH_CHECK,
        ADD_RESERVES_TRANSFER_IN_NOT_POSSIBLE
    }

    /**
      * @dev `error` corresponds to enum Error; `info` corresponds to enum FailureInfo, and `detail` is an arbitrary
      * contract-specific code that enables us to report opaque error codes from upgradeable contracts.
      **/
    event Failure(uint error, uint info, uint detail);

    /**
      * @dev use this when reporting a known error from the money market or a non-upgradeable collaborator
      */
    function fail(Error err, FailureInfo info) internal returns (uint) {
        emit Failure(uint(err), uint(info), 0);

        return uint(err);
    }

    /**
      * @dev use this when reporting an opaque error from an upgradeable collaborator contract
      */
    function failOpaque(Error err, FailureInfo info, uint opaqueError) internal returns (uint) {
        emit Failure(uint(err), uint(info), opaqueError);

        return uint(err);
    }
}


// File contracts/ExponentialNoError.sol

pragma solidity 0.5.16;

/**
 * @title Exponential module for storing fixed-precision decimals
 * @author Compound
 * @notice Exp is a struct which stores decimals with a fixed precision of 18 decimal places.
 *         Thus, if we wanted to store the 5.1, mantissa would store 5.1e18. That is:
 *         `Exp({mantissa: 5100000000000000000})`.
 */
contract ExponentialNoError {
    uint constant expScale = 1e18;
    uint constant doubleScale = 1e36;
    uint constant halfExpScale = expScale/2;
    uint constant mantissaOne = expScale;

    struct Exp {
        uint mantissa;
    }

    struct Double {
        uint mantissa;
    }

    /**
     * @dev Truncates the given exp to a whole number value.
     *      For example, truncate(Exp{mantissa: 15 * expScale}) = 15
     */
    function truncate(Exp memory exp) pure internal returns (uint) {
        // Note: We are not using careful math here as we're performing a division that cannot fail
        return exp.mantissa / expScale;
    }

    /**
     * @dev Multiply an Exp by a scalar, then truncate to return an unsigned integer.
     */
    function mul_ScalarTruncate(Exp memory a, uint scalar) pure internal returns (uint) {
        Exp memory product = mul_(a, scalar);
        return truncate(product);
    }

    /**
     * @dev Multiply an Exp by a scalar, truncate, then add an to an unsigned integer, returning an unsigned integer.
     */
    function mul_ScalarTruncateAddUInt(Exp memory a, uint scalar, uint addend) pure internal returns (uint) {
        Exp memory product = mul_(a, scalar);
        return add_(truncate(product), addend);
    }

    /**
     * @dev Checks if first Exp is less than second Exp.
     */
    function lessThanExp(Exp memory left, Exp memory right) pure internal returns (bool) {
        return left.mantissa < right.mantissa;
    }

    /**
     * @dev Checks if left Exp <= right Exp.
     */
    function lessThanOrEqualExp(Exp memory left, Exp memory right) pure internal returns (bool) {
        return left.mantissa <= right.mantissa;
    }

    /**
     * @dev Checks if left Exp > right Exp.
     */
    function greaterThanExp(Exp memory left, Exp memory right) pure internal returns (bool) {
        return left.mantissa > right.mantissa;
    }

    /**
     * @dev returns true if Exp is exactly zero
     */
    function isZeroExp(Exp memory value) pure internal returns (bool) {
        return value.mantissa == 0;
    }

    function safe224(uint n, string memory errorMessage) pure internal returns (uint224) {
        require(n < 2**224, errorMessage);
        return uint224(n);
    }

    function safe32(uint n, string memory errorMessage) pure internal returns (uint32) {
        require(n < 2**32, errorMessage);
        return uint32(n);
    }

    function add_(Exp memory a, Exp memory b) pure internal returns (Exp memory) {
        return Exp({mantissa: add_(a.mantissa, b.mantissa)});
    }

    function add_(Double memory a, Double memory b) pure internal returns (Double memory) {
        return Double({mantissa: add_(a.mantissa, b.mantissa)});
    }

    function add_(uint a, uint b) pure internal returns (uint) {
        return add_(a, b, "addition overflow");
    }

    function add_(uint a, uint b, string memory errorMessage) pure internal returns (uint) {
        uint c = a + b;
        require(c >= a, errorMessage);
        return c;
    }

    function sub_(Exp memory a, Exp memory b) pure internal returns (Exp memory) {
        return Exp({mantissa: sub_(a.mantissa, b.mantissa)});
    }

    function sub_(Double memory a, Double memory b) pure internal returns (Double memory) {
        return Double({mantissa: sub_(a.mantissa, b.mantissa)});
    }

    function sub_(uint a, uint b) pure internal returns (uint) {
        return sub_(a, b, "subtraction underflow");
    }

    function sub_(uint a, uint b, string memory errorMessage) pure internal returns (uint) {
        require(b <= a, errorMessage);
        return a - b;
    }

    function mul_(Exp memory a, Exp memory b) pure internal returns (Exp memory) {
        return Exp({mantissa: mul_(a.mantissa, b.mantissa) / expScale});
    }

    function mul_(Exp memory a, uint b) pure internal returns (Exp memory) {
        return Exp({mantissa: mul_(a.mantissa, b)});
    }

    function mul_(uint a, Exp memory b) pure internal returns (uint) {
        return mul_(a, b.mantissa) / expScale;
    }

    function mul_(Double memory a, Double memory b) pure internal returns (Double memory) {
        return Double({mantissa: mul_(a.mantissa, b.mantissa) / doubleScale});
    }

    function mul_(Double memory a, uint b) pure internal returns (Double memory) {
        return Double({mantissa: mul_(a.mantissa, b)});
    }

    function mul_(uint a, Double memory b) pure internal returns (uint) {
        return mul_(a, b.mantissa) / doubleScale;
    }

    function mul_(uint a, uint b) pure internal returns (uint) {
        return mul_(a, b, "multiplication overflow");
    }

    function mul_(uint a, uint b, string memory errorMessage) pure internal returns (uint) {
        if (a == 0 || b == 0) {
            return 0;
        }
        uint c = a * b;
        require(c / a == b, errorMessage);
        return c;
    }

    function div_(Exp memory a, Exp memory b) pure internal returns (Exp memory) {
        return Exp({mantissa: div_(mul_(a.mantissa, expScale), b.mantissa)});
    }

    function div_(Exp memory a, uint b) pure internal returns (Exp memory) {
        return Exp({mantissa: div_(a.mantissa, b)});
    }

    function div_(uint a, Exp memory b) pure internal returns (uint) {
        return div_(mul_(a, expScale), b.mantissa);
    }

    function div_(Double memory a, Double memory b) pure internal returns (Double memory) {
        return Double({mantissa: div_(mul_(a.mantissa, doubleScale), b.mantissa)});
    }

    function div_(Double memory a, uint b) pure internal returns (Double memory) {
        return Double({mantissa: div_(a.mantissa, b)});
    }

    function div_(uint a, Double memory b) pure internal returns (uint) {
        return div_(mul_(a, doubleScale), b.mantissa);
    }

    function div_(uint a, uint b) pure internal returns (uint) {
        return div_(a, b, "divide by zero");
    }

    function div_(uint a, uint b, string memory errorMessage) pure internal returns (uint) {
        require(b > 0, errorMessage);
        return a / b;
    }

    function fraction(uint a, uint b) pure internal returns (Double memory) {
        return Double({mantissa: div_(mul_(a, doubleScale), b)});
    }
}


// File contracts/ComptrollerStorage.sol

pragma solidity 0.5.16;


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
  /**
   * @notice eqAssetGroup, cToken -> equal assets info.
   */
  //mapping(address => EqualAssets) public eqAssetGroup;
  mapping(address => uint256) public maxSupply;
}


// File contracts/Comptroller.sol

pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;



interface CTokenInterface {
  function comptroller() external view returns(address);

  function reserveFactorMantissa() external view returns(uint256);

  function borrowIndex() external view returns(uint256);

  function totalBorrows() external view returns(uint256);

  function totalSupply() external view returns(uint256);

  function isCToken() external view returns(bool);

  function balanceOf(address owner) external view returns (uint256);

  function getAccountSnapshot(address account)
    external
    view
    returns (
      uint256,
      uint256,
      uint256,
      uint256
    );

  function borrowBalanceStored(address account) external view returns (uint256);

  function exchangeRateStored() external view returns (uint256);
}

interface UnderwriterAdminInterface {
  /// @notice EqualAssets, contains information of groupName and rateMantissas
  struct EqualAssets {
    uint8 groupId;
    string groupName;
    uint256 inGroupCTokenRateMantissa;
    uint256 inGroupSuTokenRateMantissa;
    uint256 interGroupCTokenRateMantissa;
    uint256 interGroupSuTokenRateMantissa;
  }

  function getEqAssetGroupNum() external view returns (uint8);

  function getEqAssetGroup(uint8 groupId) external view returns (EqualAssets memory);

  function _getMintPaused(address cToken) external returns (bool);

  function _getTransferPaused() external view returns (bool);

  function _getBorrowPaused(address cToken) external view returns (bool);

  function _getSeizePaused() external view returns (bool);

  function getCompAddress() external view returns (address);

  function _getMarketBorrowCap(address cToken) external view returns (uint256);

  function _getSuTokenRateMantissa() external view returns (uint256);
}

interface PriceOracle {
  /**
   * @notice Get the underlying price of a cToken asset
   * @param cToken The cToken to get the underlying price of
   * @return The underlying asset price mantissa (scaled by 1e18).
   *  Zero means the price is unavailable.
   */
  function getUnderlyingPrice(address cToken) external view returns (uint256);
}

interface IUnitroller {

  function admin() external view returns(address);
  
  /**
   * @notice Accepts new implementation of comptroller. msg.sender must be pendingImplementation
   * @dev Admin function for new implementation to accept it's role as implementation
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _acceptImplementation() external returns (uint256) ;
}
/**
 * @title Compound's Comptroller Contract
 * @author Compound
 */
contract Comptroller is ComptrollerV7Storage, ComptrollerErrorReporter, ExponentialNoError {
    bool public constant isComptroller = true;
  /// @notice Emitted when an admin supports a market
  event MarketListed(address cToken);

  /// @notice Emitted when an account enters a market
  event MarketEntered(address cToken, address account);

  /// @notice Emitted when an account exits a market
  event MarketExited(address cToken, address account);

  /// @notice Emitted when close factor is changed by admin
  event NewCloseFactor(uint256 oldCloseFactorMantissa, uint256 newCloseFactorMantissa);

  /// @notice Emitted when a collateral factor is changed by admin
  event NewCollateralFactor(address cToken, uint256 oldCollateralFactorMantissa, uint256 newCollateralFactorMantissa);

  /// @notice Emitted when liquidation incentive is changed by admin
  event NewLiquidationIncentive(uint256 oldLiquidationIncentiveMantissa, uint256 newLiquidationIncentiveMantissa);

  /// @notice Emitted when price oracle is changed
  event NewPriceOracle(address oldPriceOracle, address newPriceOracle);

  /// @notice Emitted when pause guardian is changed
  event NewPauseGuardian(address oldPauseGuardian, address newPauseGuardian);

  /// @notice Emitted when an action is paused globally
  event ActionPaused(string action, bool pauseState);

  /// @notice Emitted when an action is paused on a market
  event ActionPaused(address cToken, string action, bool pauseState);

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

  /// @notice Emitted when borrow cap for a cToken is changed
  event NewBorrowCap(address indexed cToken, uint256 newBorrowCap);

  /// @notice Emitted when borrow cap guardian is changed
  event NewBorrowCapGuardian(address oldBorrowCapGuardian, address newBorrowCapGuardian);

  /// @notice Emitted when COMP is granted by admin
  event CompGranted(address recipient, uint256 amount);

  event SetMaxSupply(address indexed cToken, uint256 amount);

  /// @notice The initial COMP index for a market
  uint224 public constant compInitialIndex = 1e36;

  // closeFactorMantissa must be strictly greater than this value
  uint256 internal constant CLOSE_FACTOR_MIN_MANTISSA = 0.05e18; // 0.05

  // closeFactorMantissa must not exceed this value
  uint256 internal constant CLOSE_FACTOR_MAX_MANTISSA = 0.9e18; // 0.9

  // No collateralFactorMantissa may exceed this value
  uint256 internal constant COLLATERAL_FACTOR_MAX_MANTISSA = 0.9e18; // 0.9

  /***
    constructor(address _gov) public {
        admin = msg.sender;
        governanceToken = _gov;
    }
  ***/
  constructor() public {
    admin = msg.sender;
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

  /**
   * @notice Add assets to be included in account liquidity calculation
   * @param cTokens The list of addresses of the cToken markets to be enabled
   * @return Success indicator for whether each corresponding market was entered
   */
  function enterMarkets(address[] memory cTokens) public  returns (uint256[] memory) {
    uint256 len = cTokens.length;

    uint256[] memory results = new uint256[](len);
    for (uint256 i = 0; i < len; i++) {
      address cToken = cTokens[i];
      //UnderwriterAdminInterface.EqualAssets memory eqAssets = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroup(cToken);
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
  function addToMarketInternal(address cToken, address borrower) internal returns (Error) {
    Market storage marketToJoin = markets[cToken];

    if (!marketToJoin.isListed) {
      // market is not listed, cannot join
      return Error.MARKET_NOT_LISTED;
    }

    if (marketToJoin.accountMembership[borrower]) {
      // already joined
      return Error.NO_ERROR;
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

    return Error.NO_ERROR;
  }

  /**
   * @notice Removes asset from sender's account liquidity calculation
   * @dev Sender must not have an outstanding borrow balance in the asset,
   *  or be providing necessary collateral for an outstanding borrow.
   * @param cTokenAddress The address of the asset to be removed
   * @return Whether or not the account successfully exited the market
   */
  function exitMarket(address cTokenAddress) external  returns (uint256) {
    address cToken = cTokenAddress;
    /* Get sender tokensHeld and amountOwed underlying from the cToken */
    (uint256 oErr, uint256 tokensHeld, uint256 amountOwed, ) = CTokenInterface(cToken).getAccountSnapshot(msg.sender);
    require(oErr == 0, 'exitMarket: getAccountSnapshot failed'); // semi-opaque error code

    /* Fail if the sender has a borrow balance */
    if (amountOwed != 0) {
      return fail(Error.NONZERO_BORROW_BALANCE, FailureInfo.EXIT_MARKET_BALANCE_OWED);
    }

    /* Fail if the sender is not permitted to redeem all of their tokens */
    uint256 allowed = redeemAllowedInternal(cTokenAddress, msg.sender, tokensHeld);
    if (allowed != 0) {
      return failOpaque(Error.REJECTION, FailureInfo.EXIT_MARKET_REJECTION, allowed);
    }

    Market storage marketToExit = markets[cToken];

    /* Return true if the sender is not already ???in??? the market */
    if (!marketToExit.accountMembership[msg.sender]) {
      return uint256(Error.NO_ERROR);
    }

    /* Set cToken account membership to false */
    delete marketToExit.accountMembership[msg.sender];

    /* Delete cToken from the account???s list of assets */
    // load into memory for faster iteration
    address[] memory userAssetList = accountAssets[msg.sender];
    uint256 len = userAssetList.length;
    uint256 assetIndex = len;
    for (uint256 i = 0; i < len; i++) {
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

    return uint256(Error.NO_ERROR);
  }

  /*** Policy Hooks ***/

  /**
   * @notice Checks if the account should be allowed to mint tokens in the given market
   * @param cToken The market to verify the mint against
   * @param minter The account which would get the minted tokens
   * @param mintAmount The amount of underlying being supplied to the market in exchange for tokens
   * @return 0 if the mint is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function mintAllowed(
    address cToken,
    address minter,
    uint256 mintAmount
  ) external  returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!mintGuardianPaused[cToken], "mint is paused");
    require(!UnderwriterAdminInterface(underWriterAdmin)._getMintPaused(cToken), 'mint is paused');

    // Shh - currently unused
    minter;
    mintAmount;

    if (!markets[cToken].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    /* Get minter's cToken balance*/
    (uint256 oErr, uint256 tokensHeld, uint256 amountOwed, ) = CTokenInterface(cToken).getAccountSnapshot(minter);
    require(oErr == 0, 'mintAllowed: getAccountSnapshot failed'); // semi-opaque error code

    // only enter market automatically at the first time
    if ((!markets[cToken].accountMembership[minter]) && (tokensHeld == 0) && (amountOwed == 0)) {
      // only cTokens may call mintAllowed if minter not in market
      require(msg.sender == cToken, 'sender must be cToken');

      // attempt to add borrower to the market
      Error err = addToMarketInternal(address(msg.sender), minter);
      if (err != Error.NO_ERROR) {
        return uint256(err);
      }

      // it should be impossible to break the important invariant
      assert(markets[cToken].accountMembership[minter]);
    }

    // Keep the flywheel moving
    updateCompSupplyIndex(cToken);
    distributeSupplierComp(cToken, minter);

    require(
      maxSupply[cToken] == 0 ||
        (maxSupply[cToken] > 0 && add_(CTokenInterface(cToken).totalSupply(), mintAmount) <= maxSupply[cToken]),
      'cToken over max supply'
    );

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates mint and reverts on rejection. May emit logs.
   * @param cToken Asset being minted
   * @param minter The address minting the tokens
   * @param actualMintAmount The amount of the underlying asset being minted
   * @param mintTokens The number of tokens being minted
   */
  function mintVerify(
    address cToken,
    address minter,
    uint256 actualMintAmount,
    uint256 mintTokens
  ) external  {
    // Shh - currently unused
    cToken;
    minter;
    actualMintAmount;
    mintTokens;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
  }

  /**
   * @notice Checks if the account should be allowed to redeem tokens in the given market
   * @param cToken The market to verify the redeem against
   * @param redeemer The account which would redeem the tokens
   * @param redeemTokens The number of cTokens to exchange for the underlying asset in the market
   * @return 0 if the redeem is allowed, otherwise a semi-opaque error code (See ErrorReporter.sol)
   */
  function redeemAllowed(
    address cToken,
    address redeemer,
    uint256 redeemTokens
  ) external  returns (uint256) {
    uint256 allowed = redeemAllowedInternal(cToken, redeemer, redeemTokens);
    if (allowed != uint256(Error.NO_ERROR)) {
      return allowed;
    }

    // Keep the flywheel moving
    updateCompSupplyIndex(cToken);
    distributeSupplierComp(cToken, redeemer);

    return uint256(Error.NO_ERROR);
  }

  function redeemAllowedInternal(
    address cToken,
    address redeemer,
    uint256 redeemTokens
  ) internal view returns (uint256) {
    if (!markets[cToken].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    /* If the redeemer is not 'in' the market, then we can bypass the liquidity check */
    if (!markets[cToken].accountMembership[redeemer]) {
      return uint256(Error.NO_ERROR);
    }

    /* Otherwise, perform a hypothetical liquidity check to guard against shortfall */
    (Error err, , uint256 shortfall) = getHypotheticalAccountLiquidityInternal(redeemer, cToken, redeemTokens, 0);
    if (err != Error.NO_ERROR) {
      return uint256(err);
    }
    if (shortfall > 0) {
      return uint256(Error.INSUFFICIENT_LIQUIDITY);
    }

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates redeem and reverts on rejection. May emit logs.
   * @param cToken Asset being redeemed
   * @param redeemer The address redeeming the tokens
   * @param redeemAmount The amount of the underlying asset being redeemed
   * @param redeemTokens The number of tokens being redeemed
   */
  function redeemVerify(
    address cToken,
    address redeemer,
    uint256 redeemAmount,
    uint256 redeemTokens
  ) external  {
    // Shh - currently unused
    cToken;
    redeemer;

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
  function borrowAllowed(
    address cToken,
    address borrower,
    uint256 borrowAmount
  ) external  returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!borrowGuardianPaused[cToken], "borrow is paused");
    require(!UnderwriterAdminInterface(underWriterAdmin)._getBorrowPaused(cToken), 'borrow is paused');

    if (!markets[cToken].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    if (!markets[cToken].accountMembership[borrower]) {
      // only cTokens may call borrowAllowed if borrower not in market
      require(msg.sender == cToken, 'sender must be cToken');

      // attempt to add borrower to the market
      Error err = addToMarketInternal(address(msg.sender), borrower);
      if (err != Error.NO_ERROR) {
        return uint256(err);
      }

      // it should be impossible to break the important invariant
      assert(markets[cToken].accountMembership[borrower]);
    }

    if (PriceOracle(oracle).getUnderlyingPrice(cToken) == 0) {
      return uint256(Error.PRICE_ERROR);
    }

    //uint borrowCap = borrowCaps[cToken];
    uint256 borrowCap = UnderwriterAdminInterface(underWriterAdmin)._getMarketBorrowCap(cToken);
    // Borrow cap of 0 corresponds to unlimited borrowing
    if (borrowCap != 0) {
      uint256 totalBorrows = CTokenInterface(cToken).totalBorrows();
      uint256 nextTotalBorrows = add_(totalBorrows, borrowAmount);
      require(nextTotalBorrows < borrowCap, 'market borrow cap reached');
    }

    (Error err, , uint256 shortfall) = getHypotheticalAccountLiquidityInternal(borrower, cToken, 0, borrowAmount);
    if (err != Error.NO_ERROR) {
      return uint256(err);
    }
    if (shortfall > 0) {
      return uint256(Error.INSUFFICIENT_LIQUIDITY);
    }

    // Keep the flywheel moving
    Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
    updateCompBorrowIndex(cToken, borrowIndex);
    distributeBorrowerComp(cToken, borrower, borrowIndex);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates borrow and reverts on rejection. May emit logs.
   * @param cToken Asset whose underlying is being borrowed
   * @param borrower The address borrowing the underlying
   * @param borrowAmount The amount of the underlying asset requested to borrow
   */
  function borrowVerify(
    address cToken,
    address borrower,
    uint256 borrowAmount
  ) external  {
    // Shh - currently unused
    cToken;
    borrower;
    borrowAmount;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
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
  ) external  returns (uint256) {
    // Shh - currently unused
    payer;
    borrower;
    repayAmount;

    if (!markets[cToken].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    // Keep the flywheel moving
    Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
    updateCompBorrowIndex(cToken, borrowIndex);
    distributeBorrowerComp(cToken, borrower, borrowIndex);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates repayBorrow and reverts on rejection. May emit logs.
   * @param cToken Asset being repaid
   * @param payer The address repaying the borrow
   * @param borrower The address of the borrower
   * @param actualRepayAmount The amount of underlying being repaid
   */
  function repayBorrowVerify(
    address cToken,
    address payer,
    address borrower,
    uint256 actualRepayAmount,
    uint256 borrowerIndex
  ) external  {
    // Shh - currently unused
    cToken;
    payer;
    borrower;
    actualRepayAmount;
    borrowerIndex;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
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
    uint256 repayAmount
  ) external  returns (uint256) {
    // Shh - currently unused
    liquidator;

    if (!markets[cTokenBorrowed].isListed || !markets[cTokenCollateral].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    uint256 borrowBalance = CTokenInterface(cTokenBorrowed).borrowBalanceStored(borrower);

    /* allow accounts to be liquidated if the market is deprecated */
    if (isDeprecated(cTokenBorrowed)) {
      require(borrowBalance >= repayAmount, 'Can not repay more than the total borrow');
    } else {
      /* The borrower must have shortfall in order to be liquidatable */
      (Error err, , uint256 shortfall) = getHypotheticalAccountLiquidityInternal(borrower, cTokenBorrowed, 0, 0);
      if (err != Error.NO_ERROR) {
        return uint256(err);
      }

      if (shortfall == 0) {
        return uint256(Error.INSUFFICIENT_SHORTFALL);
      }

      /* The liquidator may not repay more than what is allowed by the closeFactor */
      uint256 maxClose = mul_ScalarTruncate(Exp({mantissa: closeFactorMantissa}), borrowBalance);
      if (repayAmount > maxClose) {
        return uint256(Error.TOO_MUCH_REPAY);
      }
    }
    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates liquidateBorrow and reverts on rejection. May emit logs.
   * @param cTokenBorrowed Asset which was borrowed by the borrower
   * @param cTokenCollateral Asset which was used as collateral and will be seized
   * @param liquidator The address repaying the borrow and seizing the collateral
   * @param borrower The address of the borrower
   * @param actualRepayAmount The amount of underlying being repaid
   */
  function liquidateBorrowVerify(
    address cTokenBorrowed,
    address cTokenCollateral,
    address liquidator,
    address borrower,
    uint256 actualRepayAmount,
    uint256 seizeTokens
  ) external  {
    // Shh - currently unused
    cTokenBorrowed;
    cTokenCollateral;
    liquidator;
    borrower;
    actualRepayAmount;
    seizeTokens;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
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
  ) external  returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!seizeGuardianPaused, "seize is paused");
    require(!UnderwriterAdminInterface(underWriterAdmin)._getSeizePaused(), 'seize is paused');

    // Shh - currently unused
    seizeTokens;

    if (!markets[cTokenCollateral].isListed || !markets[cTokenBorrowed].isListed) {
      return uint256(Error.MARKET_NOT_LISTED);
    }

    if (CTokenInterface(cTokenCollateral).comptroller() != CTokenInterface(cTokenBorrowed).comptroller()) {
      return uint256(Error.COMPTROLLER_MISMATCH);
    }

    // Keep the flywheel moving
    updateCompSupplyIndex(cTokenCollateral);
    distributeSupplierComp(cTokenCollateral, borrower);
    distributeSupplierComp(cTokenCollateral, liquidator);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates seize and reverts on rejection. May emit logs.
   * @param cTokenCollateral Asset which was used as collateral and will be seized
   * @param cTokenBorrowed Asset which was borrowed by the borrower
   * @param liquidator The address repaying the borrow and seizing the collateral
   * @param borrower The address of the borrower
   * @param seizeTokens The number of collateral tokens to seize
   */
  function seizeVerify(
    address cTokenCollateral,
    address cTokenBorrowed,
    address liquidator,
    address borrower,
    uint256 seizeTokens
  ) external  {
    // Shh - currently unused
    cTokenCollateral;
    cTokenBorrowed;
    liquidator;
    borrower;
    seizeTokens;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
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
  ) external  returns (uint256) {
    // Pausing is a very serious situation - we revert to sound the alarms
    //require(!transferGuardianPaused, "transfer is paused");
    require(!UnderwriterAdminInterface(underWriterAdmin)._getTransferPaused(), 'transfer is paused');

    // Currently the only consideration is whether or not
    //  the src is allowed to redeem this many tokens
    uint256 allowed = redeemAllowedInternal(cToken, src, transferTokens);
    if (allowed != uint256(Error.NO_ERROR)) {
      return allowed;
    }

    // Keep the flywheel moving
    updateCompSupplyIndex(cToken);
    distributeSupplierComp(cToken, src);
    distributeSupplierComp(cToken, dst);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Validates transfer and reverts on rejection. May emit logs.
   * @param cToken Asset being transferred
   * @param src The account which sources the tokens
   * @param dst The account which receives the tokens
   * @param transferTokens The number of cTokens to transfer
   */
  function transferVerify(
    address cToken,
    address src,
    address dst,
    uint256 transferTokens
  ) external  {
    // Shh - currently unused
    cToken;
    src;
    dst;
    transferTokens;

    // Shh - we don't ever want this hook to be marked pure
    // if (false) {
    //   maxAssets = maxAssets;
    // }
  }

  /*** Liquidity/Liquidation Calculations ***/

  /**
   * @dev Local vars for avoiding stack-depth limits in calculating account liquidity.
   *  Note that `cTokenBalance` is the number of cTokens the account owns in the market,
   *  whereas `borrowBalance` is the amount of underlying that the account has borrowed.
   */
  struct AccountLiquidityLocalVars {
    uint8 equalAssetsGroupNum;
    uint8 assetGroupId;
    uint256 sumCollateral;
    uint256 sumBorrowPlusEffects;
    uint256 cTokenBalance;
    uint256 borrowBalance;
    uint256 exchangeRateMantissa;
    uint256 oraclePriceMantissa;
    Exp collateralFactor;
    Exp exchangeRate;
    Exp oraclePrice;
    Exp tokensToDenom;
    Exp inGroupCTokenCollateralRate;
    Exp interGroupCTokenCollateralRate;
    Exp inGroupSuTokenCollateralRate;
    Exp interGroupSuTokenCollateralRate;
    Exp suTokenCollateralRate;
    Exp borrowCollateralRate;
    bool isSuToken;
  }

  struct AccountGroupLocalVars {
    uint8 groupId;
    uint256 cTokenBalanceSum;
    uint256 cTokenBorrowSum;
    uint256 suTokenBalanceSum;
    uint256 suTokenBorrowSum;
  }

  /**
     * @notice Determine the current account liquidity wrt collateral requirements
     * @return (possible error code (semi-opaque),
                account liquidity in excess of collateral requirements,
     *          account shortfall below collateral requirements)
     */
  function getAccountLiquidity(address account)
    public
    view
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    (Error err, uint256 liquidity, uint256 shortfall) = getHypotheticalAccountLiquidityInternal(
      account,
      address(0),
      0,
      0
    );

    return (uint256(err), liquidity, shortfall);
  }

  /**
     * @notice Determine the current account liquidity wrt collateral requirements
     * @return (possible error code,
                account liquidity in excess of collateral requirements,
     *          account shortfall below collateral requirements)
     */
  function getAccountLiquidityInternal(address account)
    internal
    view
    returns (
      Error,
      uint256,
      uint256
    )
  {
    return getHypotheticalAccountLiquidityInternal(account, address(0), 0, 0);
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
  )
    public
    view
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    (Error err, uint256 liquidity, uint256 shortfall) = getHypotheticalAccountLiquidityInternal(
      account,
      address(cTokenModify),
      redeemTokens,
      borrowAmount
    );
    return (uint256(err), liquidity, shortfall);
  }

  function ghlp(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  )
    public
    view
    returns (
      Exp memory a,
      uint256 scalar,
      uint256 addend
    )
  {
    redeemTokens;
    borrowAmount;
    AccountLiquidityLocalVars memory vars; // Holds all our calculation results
    uint256 oErr;

    vars.equalAssetsGroupNum = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroupNum();
    AccountGroupLocalVars[] memory groupVars = new AccountGroupLocalVars[](vars.equalAssetsGroupNum);

    if ((cTokenModify != address(0)) && !CTokenInterface(cTokenModify).isCToken()) {
      vars.isSuToken = true;
    } else {
      vars.isSuToken = false;
    }

    // For each asset the account is in
    address[] memory assets = accountAssets[account];
    for (uint256 i = 0; i < assets.length; i++) {
      address asset = assets[i];

      //UnderwriterAdminInterface.EqualAssets memory eqAsset = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroup(asset);

      // Read the balances and exchange rate from the cToken
      (oErr, vars.cTokenBalance, vars.borrowBalance, vars.exchangeRateMantissa) = CTokenInterface(asset)
        .getAccountSnapshot(account);

      vars.exchangeRate = Exp({mantissa: vars.exchangeRateMantissa});

      // Get the normalized price of the asset
      vars.oraclePriceMantissa = PriceOracle(oracle).getUnderlyingPrice(asset);

      vars.oraclePrice = Exp({mantissa: vars.oraclePriceMantissa});

      // Pre-compute a conversion factor from tokens -> ether (normalized price value)
      vars.tokensToDenom = mul_(vars.exchangeRate, vars.oraclePriceMantissa);

      uint8 index;
      for (index = 0; index < vars.equalAssetsGroupNum; index++) {
        if (groupVars[index].groupId > 0) {
          if (groupVars[index].groupId == markets[address(asset)].equalAssetGrouId) {
            break;
          }
        } else {
          groupVars[index].groupId = markets[address(asset)].equalAssetGrouId;
          break;
        }
      }
      // require(index < vars.equalAssetsGroupNum);

      if (CTokenInterface(asset).isCToken()) {
        return (vars.exchangeRate, vars.cTokenBalance, groupVars[index].cTokenBalanceSum);
        // groupVars[index].cTokenBalanceSum = mul_ScalarTruncateAddUInt(
        //   vars.tokensToDenom,
        //   vars.cTokenBalance,
        //   groupVars[index].cTokenBalanceSum
        // );
      }
    }

    // These are safe, as the underflow condition is checked first
    // if (vars.sumCollateral > vars.sumBorrowPlusEffects) {
    //   return (Error.NO_ERROR, vars.sumCollateral - vars.sumBorrowPlusEffects, 0);
    // } else {
    //   return (Error.NO_ERROR, 0, vars.sumBorrowPlusEffects - vars.sumCollateral);
    // }
  }

  /**
     * @notice Determine what the account liquidity would be if the given amounts were redeemed/borrowed
     * @param cTokenModify The market to hypothetically redeem/borrow in
     * @param account The account to determine liquidity for
     * @param redeemTokens The number of tokens to hypothetically redeem
     * @param borrowAmount The amount of underlying to hypothetically borrow
     * @dev Note that we calculate the exchangeRateStored for each collateral cToken using stored data,
     *  without calculating accumulated interest.
     * @return (possible error code,
                hypothetical account liquidity in excess of collateral requirements,
     *          hypothetical account shortfall below collateral requirements)
     */
  function getHypotheticalAccountLiquidityInternal(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  )
    internal
    view
    returns (
      Error,
      uint256,
      uint256
    )
  {
    AccountLiquidityLocalVars memory vars; // Holds all our calculation results
    uint256 oErr;

    vars.equalAssetsGroupNum = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroupNum();
    AccountGroupLocalVars[] memory groupVars = new AccountGroupLocalVars[](vars.equalAssetsGroupNum);

    if ((cTokenModify != address(0)) && !CTokenInterface(cTokenModify).isCToken()) {
      vars.isSuToken = true;
    } else {
      vars.isSuToken = false;
    }

    // For each asset the account is in
    address[] memory assets = accountAssets[account];
    for (uint256 i = 0; i < assets.length; i++) {
      address asset = assets[i];

      //UnderwriterAdminInterface.EqualAssets memory eqAsset = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroup(asset);

      // Read the balances and exchange rate from the cToken
      (oErr, vars.cTokenBalance, vars.borrowBalance, vars.exchangeRateMantissa) = CTokenInterface(asset)
        .getAccountSnapshot(account);
      if (oErr != 0) {
        // semi-opaque error code, we assume NO_ERROR == 0 is invariant between upgrades
        return (Error.SNAPSHOT_ERROR, 0, 0);
      }
      vars.exchangeRate = Exp({mantissa: vars.exchangeRateMantissa});

      // Get the normalized price of the asset
      vars.oraclePriceMantissa = PriceOracle(oracle).getUnderlyingPrice(asset);
      if (vars.oraclePriceMantissa == 0) {
        return (Error.PRICE_ERROR, 0, 0);
      }
      vars.oraclePrice = Exp({mantissa: vars.oraclePriceMantissa});

      // Pre-compute a conversion factor from tokens -> ether (normalized price value)
      vars.tokensToDenom = mul_(vars.exchangeRate, vars.oraclePriceMantissa);

      uint8 index;
      for (index = 0; index < vars.equalAssetsGroupNum; index++) {
        if (groupVars[index].groupId > 0) {
          if (groupVars[index].groupId == markets[address(asset)].equalAssetGrouId) {
            break;
          }
        } else {
          groupVars[index].groupId = markets[address(asset)].equalAssetGrouId;
          break;
        }
      }
      // require(index < vars.equalAssetsGroupNum);

      if (CTokenInterface(asset).isCToken()) {
        groupVars[index].cTokenBalanceSum = mul_ScalarTruncateAddUInt(
          vars.tokensToDenom,
          vars.cTokenBalance,
          groupVars[index].cTokenBalanceSum
        );
        groupVars[index].cTokenBorrowSum = mul_ScalarTruncateAddUInt(
          mul_(vars.oraclePrice, expScale),
          vars.borrowBalance,
          groupVars[index].cTokenBorrowSum
        );

        if (asset == cTokenModify) {
          groupVars[index].cTokenBorrowSum = mul_ScalarTruncateAddUInt(
            vars.tokensToDenom,
            redeemTokens,
            groupVars[index].cTokenBorrowSum
          );
          groupVars[index].cTokenBorrowSum = mul_ScalarTruncateAddUInt(
            mul_(vars.oraclePrice, expScale),
            borrowAmount,
            groupVars[index].cTokenBorrowSum
          );
        }
      } else {
        groupVars[index].suTokenBalanceSum = mul_ScalarTruncateAddUInt(
          vars.tokensToDenom,
          vars.cTokenBalance,
          groupVars[index].suTokenBalanceSum
        );
        groupVars[index].suTokenBorrowSum = mul_ScalarTruncateAddUInt(
          mul_(vars.oraclePrice, expScale),
          vars.borrowBalance,
          groupVars[index].suTokenBorrowSum
        );

        if (asset == cTokenModify) {
          groupVars[index].suTokenBorrowSum = mul_ScalarTruncateAddUInt(
            vars.tokensToDenom,
            redeemTokens,
            groupVars[index].suTokenBorrowSum
          );
          groupVars[index].suTokenBorrowSum = mul_ScalarTruncateAddUInt(
            mul_(vars.oraclePrice, expScale),
            borrowAmount,
            groupVars[index].suTokenBorrowSum
          );
        }
      }
    }

    // Now loop all groups
    for (uint8 i = 0; i < vars.equalAssetsGroupNum; i++) {
      if (groupVars[i].groupId == 0) {
        continue;
      }

      // pre-process group information
      if (groupVars[i].cTokenBalanceSum >= groupVars[i].suTokenBorrowSum) {
        groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum - groupVars[i].suTokenBorrowSum;
        groupVars[i].suTokenBorrowSum = 0;
      } else {
        groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum - groupVars[i].cTokenBalanceSum;
        groupVars[i].cTokenBalanceSum = 0;
      }

      UnderwriterAdminInterface.EqualAssets memory equalAssetsGroup = UnderwriterAdminInterface(underWriterAdmin)
        .getEqAssetGroup(groupVars[i].groupId);

      vars.inGroupCTokenCollateralRate = Exp({mantissa: equalAssetsGroup.inGroupCTokenRateMantissa});
      vars.inGroupSuTokenCollateralRate = Exp({mantissa: equalAssetsGroup.inGroupSuTokenRateMantissa});
      vars.interGroupCTokenCollateralRate = Exp({mantissa: equalAssetsGroup.interGroupCTokenRateMantissa});
      vars.interGroupSuTokenCollateralRate = Exp({mantissa: equalAssetsGroup.interGroupSuTokenRateMantissa});
      vars.borrowCollateralRate = Exp({mantissa: expScale});

      vars.suTokenCollateralRate = Exp({
        mantissa: UnderwriterAdminInterface(underWriterAdmin)._getSuTokenRateMantissa()
      });

      if (groupVars[i].groupId == markets[address(cTokenModify)].equalAssetGrouId) {
        // assetModify is suToken
        if (vars.isSuToken) {
          vars.sumCollateral = mul_ScalarTruncateAddUInt(
            vars.suTokenCollateralRate,
            groupVars[i].cTokenBalanceSum,
            vars.sumCollateral
          );
          vars.sumCollateral = mul_ScalarTruncateAddUInt(
            vars.inGroupSuTokenCollateralRate,
            groupVars[i].suTokenBalanceSum,
            vars.sumCollateral
          );
        } else {
          vars.sumCollateral = mul_ScalarTruncateAddUInt(
            vars.inGroupCTokenCollateralRate,
            groupVars[i].cTokenBalanceSum,
            vars.sumCollateral
          );
          vars.sumCollateral = mul_ScalarTruncateAddUInt(
            vars.inGroupSuTokenCollateralRate,
            groupVars[i].suTokenBalanceSum,
            vars.sumCollateral
          );
        }

        vars.sumBorrowPlusEffects = mul_ScalarTruncateAddUInt(
          vars.borrowCollateralRate,
          groupVars[i].cTokenBorrowSum,
          vars.sumBorrowPlusEffects
        );
        vars.sumBorrowPlusEffects = mul_ScalarTruncateAddUInt(
          vars.borrowCollateralRate,
          groupVars[i].suTokenBorrowSum,
          vars.sumBorrowPlusEffects
        );
      } else {
        vars.sumCollateral = mul_ScalarTruncateAddUInt(
          vars.interGroupCTokenCollateralRate,
          groupVars[i].cTokenBalanceSum,
          vars.sumCollateral
        );
        vars.sumCollateral = mul_ScalarTruncateAddUInt(
          vars.interGroupSuTokenCollateralRate,
          groupVars[i].suTokenBalanceSum,
          vars.sumCollateral
        );

        vars.sumBorrowPlusEffects = mul_ScalarTruncateAddUInt(
          vars.borrowCollateralRate,
          groupVars[i].cTokenBorrowSum,
          vars.sumBorrowPlusEffects
        );
        vars.sumBorrowPlusEffects = mul_ScalarTruncateAddUInt(
          vars.borrowCollateralRate,
          groupVars[i].suTokenBorrowSum,
          vars.sumBorrowPlusEffects
        );
      }
    }

    // These are safe, as the underflow condition is checked first
    if (vars.sumCollateral > vars.sumBorrowPlusEffects) {
      return (Error.NO_ERROR, vars.sumCollateral - vars.sumBorrowPlusEffects, 0);
    } else {
      return (Error.NO_ERROR, 0, vars.sumBorrowPlusEffects - vars.sumCollateral);
    }
  }

  /**
   * @notice Calculate number of tokens of collateral asset to seize given an underlying amount
   * @dev Used in liquidation (called in CTokenInterface(cToken).liquidateBorrowFresh)
   * @param cTokenBorrowed The address of the borrowed cToken
   * @param cTokenCollateral The address of the collateral cToken
   * @param actualRepayAmount The amount of cTokenBorrowed underlying to convert into cTokenCollateral tokens
   * @return (errorCode, number of cTokenCollateral tokens to be seized in a liquidation)
   */
  function liquidateCalculateSeizeTokens(
    address cTokenBorrowed,
    address cTokenCollateral,
    uint256 actualRepayAmount
  ) external  view returns (uint256, uint256) {
    /* Read oracle prices for borrowed and collateral markets */
    uint256 priceBorrowedMantissa = PriceOracle(oracle).getUnderlyingPrice(address(cTokenBorrowed));
    uint256 priceCollateralMantissa = PriceOracle(oracle).getUnderlyingPrice(address(cTokenCollateral));
    if (priceBorrowedMantissa == 0 || priceCollateralMantissa == 0) {
      return (uint256(Error.PRICE_ERROR), 0);
    }

    /*
     * Get the exchange rate and calculate the number of collateral tokens to seize:
     *  seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
     *  seizeTokens = seizeAmount / exchangeRate
     *   = actualRepayAmount * (liquidationIncentive * priceBorrowed) / (priceCollateral * exchangeRate)
     */
    uint256 exchangeRateMantissa = CTokenInterface(cTokenCollateral).exchangeRateStored(); // Note: reverts on error
    uint256 seizeTokens;
    Exp memory numerator;
    Exp memory denominator;
    Exp memory ratio;

    numerator = mul_(Exp({mantissa: liquidationIncentiveMantissa}), Exp({mantissa: priceBorrowedMantissa}));
    denominator = mul_(Exp({mantissa: priceCollateralMantissa}), Exp({mantissa: exchangeRateMantissa}));
    ratio = div_(numerator, denominator);

    seizeTokens = mul_ScalarTruncate(ratio, actualRepayAmount);

    return (uint256(Error.NO_ERROR), seizeTokens);
  }

  /*** Admin Functions ***/

  function setMaxSupply(address cToken, uint256 amount) public returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_PRICE_ORACLE_OWNER_CHECK);
    }
    maxSupply[cToken] = amount;

    emit SetMaxSupply(cToken, amount);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Sets a new price oracle for the comptroller
   * @dev Admin function to set a new price oracle
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _setPriceOracle(address newOracle) public returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_PRICE_ORACLE_OWNER_CHECK);
    }

    // Track the old oracle for the comptroller
    address oldOracle = oracle;

    // Set comptroller's oracle to newOracle
    oracle = newOracle;

    // Emit NewPriceOracle(oldOracle, newOracle)
    emit NewPriceOracle(oldOracle, newOracle);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Sets the closeFactor used when liquidating borrows
   * @dev Admin function to set closeFactor
   * @param newCloseFactorMantissa New close factor, scaled by 1e18
   * @return uint 0=success, otherwise a failure
   */
  function _setCloseFactor(uint256 newCloseFactorMantissa) external returns (uint256) {
    // Check caller is admin
    require(msg.sender == admin, 'only admin can set close factor');

    uint256 oldCloseFactorMantissa = closeFactorMantissa;
    closeFactorMantissa = newCloseFactorMantissa;
    emit NewCloseFactor(oldCloseFactorMantissa, closeFactorMantissa);

    return uint256(Error.NO_ERROR);
  }

  function _setUnderWriterAdmin(address underWriter) external returns (address) {
    // Check caller is admin
    require(msg.sender == admin, 'only admin can set close factor');
    require(underWriter != address(0), 'Address is Zero!');
    underWriterAdmin = underWriter;
    return underWriter;
  }

  /**
   * @notice Sets liquidationIncentive
   * @dev Admin function to set liquidationIncentive
   * @param newLiquidationIncentiveMantissa New liquidationIncentive scaled by 1e18
   * @return uint 0=success, otherwise a failure. (See ErrorReporter for details)
   */
  function _setLiquidationIncentive(uint256 newLiquidationIncentiveMantissa) external returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_LIQUIDATION_INCENTIVE_OWNER_CHECK);
    }

    // Save current value for use in log
    uint256 oldLiquidationIncentiveMantissa = liquidationIncentiveMantissa;

    // Set liquidation incentive to new incentive
    liquidationIncentiveMantissa = newLiquidationIncentiveMantissa;

    // Emit event with old incentive, new incentive
    emit NewLiquidationIncentive(oldLiquidationIncentiveMantissa, newLiquidationIncentiveMantissa);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Add the market to the markets mapping and set it as listed
   * @dev Admin function to set isListed and add support for the market
   * @param cToken The address of the market (token) to list
   * @return uint 0=success, otherwise a failure. (See enum Error for details)
   */
  function _supportMarket(address cToken, uint8 groupId) external returns (uint256) {
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SUPPORT_MARKET_OWNER_CHECK);
    }

    if (markets[cToken].isListed) {
      return fail(Error.MARKET_ALREADY_LISTED, FailureInfo.SUPPORT_MARKET_EXISTS);
    }

    // CTokenInterface(cToken).isCToken(); // Sanity check to make sure its really a address
    (bool success, ) = cToken.call(abi.encodeWithSignature('isCToken()'));
    require(success && isContract(cToken), 'contract error!');

    // Note that isComped is not in active use anymore
    markets[cToken] = Market({isListed: true, isComped: false, equalAssetGrouId: groupId});

    _addMarketInternal(cToken);
    _initializeMarket(cToken);

    emit MarketListed(cToken);

    return uint256(Error.NO_ERROR);
  }

  function _addMarketInternal(address cToken) internal {
    for (uint256 i = 0; i < allMarkets.length; i++) {
      require(allMarkets[i] != cToken, 'market already added');
    }
    allMarkets.push(cToken);
  }

  function _initializeMarket(address cToken) internal {
    uint32 blockNumber = safe32(getBlockNumber(), 'block number exceeds 32 bits');

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

  function _become(address unitroller) public {
    require(msg.sender == IUnitroller(unitroller).admin(), 'only unitroller admin can change brains');
    require(IUnitroller(unitroller)._acceptImplementation() == 0, 'change not authorized');
  }

  /**
   * @notice Checks caller is admin, or this contract is becoming the new implementation
   */
  function adminOrInitializing() internal view returns (bool) {
    return msg.sender == admin || msg.sender == comptrollerImplementation;
  }

  /*** Comp Distribution ***/

  /**
   * @notice Set COMP speed for a single market
   * @param cToken The market whose COMP speed to update
   * @param supplySpeed New supply-side COMP speed for market
   * @param borrowSpeed New borrow-side COMP speed for market
   */
  function setCompSpeedInternal(
    address cToken,
    uint256 supplySpeed,
    uint256 borrowSpeed
  ) internal {
    Market storage market = markets[cToken];
    require(market.isListed, 'comp market is not listed');

    if (compSupplySpeeds[cToken] != supplySpeed) {
      // Supply speed updated so let's update supply state to ensure that
      //  1. COMP accrued properly for the old speed, and
      //  2. COMP accrued at the new speed starts after this block.
      updateCompSupplyIndex(cToken);

      // Update speed and emit event
      compSupplySpeeds[cToken] = supplySpeed;
      emit CompSupplySpeedUpdated(cToken, supplySpeed);
    }

    if (compBorrowSpeeds[cToken] != borrowSpeed) {
      // Borrow speed updated so let's update borrow state to ensure that
      //  1. COMP accrued properly for the old speed, and
      //  2. COMP accrued at the new speed starts after this block.
      Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
      updateCompBorrowIndex(cToken, borrowIndex);

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
  function updateCompSupplyIndex(address cToken) internal {
    CompMarketState storage supplyState = compSupplyState[cToken];
    uint256 supplySpeed = compSupplySpeeds[cToken];
    uint32 blockNumber = safe32(getBlockNumber(), 'block number exceeds 32 bits');
    uint256 deltaBlocks = sub_(uint256(blockNumber), uint256(supplyState.block));
    if (deltaBlocks > 0 && supplySpeed > 0) {
      uint256 supplyTokens = CTokenInterface(cToken).totalSupply();
      uint256 compAccrued = mul_(deltaBlocks, supplySpeed);
      Double memory ratio = supplyTokens > 0 ? fraction(compAccrued, supplyTokens) : Double({mantissa: 0});
      supplyState.index = safe224(
        add_(Double({mantissa: supplyState.index}), ratio).mantissa,
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
  function updateCompBorrowIndex(address cToken, Exp memory marketBorrowIndex) internal {
    CompMarketState storage borrowState = compBorrowState[cToken];
    uint256 borrowSpeed = compBorrowSpeeds[cToken];
    uint32 blockNumber = safe32(getBlockNumber(), 'block number exceeds 32 bits');
    uint256 deltaBlocks = sub_(uint256(blockNumber), uint256(borrowState.block));
    if (deltaBlocks > 0 && borrowSpeed > 0) {
      uint256 borrowAmount = div_(CTokenInterface(cToken).totalBorrows(), marketBorrowIndex);
      uint256 compAccrued = mul_(deltaBlocks, borrowSpeed);
      Double memory ratio = borrowAmount > 0 ? fraction(compAccrued, borrowAmount) : Double({mantissa: 0});
      borrowState.index = safe224(
        add_(Double({mantissa: borrowState.index}), ratio).mantissa,
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
  function distributeSupplierComp(address cToken, address supplier) internal {
    // TODO: Don't distribute supplier COMP if the user is not in the supplier market.
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
    Double memory deltaIndex = Double({mantissa: sub_(supplyIndex, supplierIndex)});

    uint256 supplierTokens = CTokenInterface(cToken).balanceOf(supplier);

    // Calculate COMP accrued: cTokenAmount * accruedPerCTokenInterface
    uint256 supplierDelta = mul_(supplierTokens, deltaIndex);

    uint256 supplierAccrued = add_(compAccrued[supplier], supplierDelta);
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
  ) internal {
    // TODO: Don't distribute supplier COMP if the user is not in the borrower market.
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
    Double memory deltaIndex = Double({mantissa: sub_(borrowIndex, borrowerIndex)});

    uint256 borrowerAmount = div_(CTokenInterface(cToken).borrowBalanceStored(borrower), marketBorrowIndex);

    // Calculate COMP accrued: cTokenAmount * accruedPerBorrowedUnit
    uint256 borrowerDelta = mul_(borrowerAmount, deltaIndex);

    uint256 borrowerAccrued = add_(compAccrued[borrower], borrowerDelta);
    compAccrued[borrower] = borrowerAccrued;

    emit DistributedBorrowerComp(cToken, borrower, borrowerDelta, borrowIndex);
  }

  /**
   * @notice Calculate additional accrued COMP for a contributor since last accrual
   * @param contributor The address to calculate contributor rewards for
   */
  function updateContributorRewards(address contributor) public {
    uint256 compSpeed = compContributorSpeeds[contributor];
    uint256 blockNumber = getBlockNumber();
    uint256 deltaBlocks = sub_(blockNumber, lastContributorBlock[contributor]);
    if (deltaBlocks > 0 && compSpeed > 0) {
      uint256 newAccrued = mul_(deltaBlocks, compSpeed);
      uint256 contributorAccrued = add_(compAccrued[contributor], newAccrued);

      compAccrued[contributor] = contributorAccrued;
      lastContributorBlock[contributor] = blockNumber;
    }
  }

  /**
   * @notice Claim all the comp accrued by holder in all markets
   * @param holder The address to claim COMP for
   */
  function claimComp(address holder) public {
    return claimComp(holder, allMarkets);
  }

  /**
   * @notice Claim all the comp accrued by holder in the specified markets
   * @param holder The address to claim COMP for
   * @param cTokens The list of markets to claim COMP in
   */
  function claimComp(address holder, address[] memory cTokens) public {
    address[] memory holders = new address[](1);
    holders[0] = holder;
    claimComp(holders, cTokens, true, true);
  }

  /**
   * @notice Claim all comp accrued by the holders
   * @param holders The addresses to claim COMP for
   * @param cTokens The list of markets to claim COMP in
   * @param borrowers Whether or not to claim COMP earned by borrowing
   * @param suppliers Whether or not to claim COMP earned by supplying
   */
  function claimComp(
    address[] memory holders,
    address[] memory cTokens,
    bool borrowers,
    bool suppliers
  ) public {
    for (uint256 i = 0; i < cTokens.length; i++) {
      address cToken = cTokens[i];
      require(markets[cToken].isListed, 'market must be listed');
      if (borrowers) {
        Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
        updateCompBorrowIndex(cToken, borrowIndex);
        for (uint256 j = 0; j < holders.length; j++) {
          distributeBorrowerComp(cToken, holders[j], borrowIndex);
        }
      }
      if (suppliers) {
        updateCompSupplyIndex(cToken);
        for (uint256 j = 0; j < holders.length; j++) {
          distributeSupplierComp(cToken, holders[j]);
        }
      }
    }
    for (uint256 j = 0; j < holders.length; j++) {
      compAccrued[holders[j]] = grantCompInternal(holders[j], compAccrued[holders[j]]);
    }
  }

  /**
   * @notice Transfer COMP to the user
   * @dev Note: If there is not enough COMP, we do not perform the transfer all.
   * @param user The address of the user to transfer COMP to
   * @param amount The amount of COMP to (possibly) transfer
   * @return The amount of COMP which was NOT transferred to the user
   */
  function grantCompInternal(address user, uint256 amount) internal returns (uint256) {
    address[] memory markets = accountAssets[user];
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

    address comp = UnderwriterAdminInterface(underWriterAdmin).getCompAddress();
    uint256 compRemaining = CTokenInterface(comp).balanceOf(address(this));
    if (amount > 0 && amount <= compRemaining) {
      comp.call(abi.encodeWithSignature('transfer(address,uint256)', user, amount));
      return 0;
    }
    return amount;
  }

  /*** Comp Distribution Admin ***/

  /**
   * @notice Transfer COMP to the recipient
   * @dev Note: If there is not enough COMP, we do not perform the transfer all.
   * @param recipient The address of the recipient to transfer COMP to
   * @param amount The amount of COMP to (possibly) transfer
   */
  function _grantComp(address recipient, uint256 amount) public {
    require(adminOrInitializing(), 'only admin can grant comp');
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
  ) public {
    require(adminOrInitializing(), 'only admin can set comp speed');

    uint256 numTokens = cTokens.length;
    require(
      numTokens == supplySpeeds.length && numTokens == borrowSpeeds.length,
      'Comptroller::_setCompSpeeds invalid input'
    );

    for (uint256 i = 0; i < numTokens; ++i) {
      setCompSpeedInternal(cTokens[i], supplySpeeds[i], borrowSpeeds[i]);
    }
  }

  /**
   * @notice Set COMP speed for a single contributor
   * @param contributor The contributor whose COMP speed to update
   * @param compSpeed New COMP speed for contributor
   */
  function _setContributorCompSpeed(address contributor, uint256 compSpeed) public {
    require(adminOrInitializing(), 'only admin can set comp speed');

    // note that COMP speed could be set to 0 to halt liquidity rewards for a contributor
    updateContributorRewards(contributor);
    if (compSpeed == 0) {
      // release storage
      delete lastContributorBlock[contributor];
    } else {
      lastContributorBlock[contributor] = getBlockNumber();
    }
    compContributorSpeeds[contributor] = compSpeed;

    emit ContributorCompSpeedUpdated(contributor, compSpeed);
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
   * @notice Returns true if the given cToken market has been deprecated
   * @dev All borrows in a deprecated cToken market can be immediately liquidated
   * @param cToken The market to check if deprecated
   */
  function isDeprecated(address cToken) public view returns (bool) {
    return
      markets[cToken].equalAssetGrouId == 0 &&
      //borrowGuardianPaused[cToken] == true &&
      UnderwriterAdminInterface(underWriterAdmin)._getBorrowPaused(cToken) &&
      CTokenInterface(cToken).reserveFactorMantissa() == 1e18;
  }

  function getBlockNumber() public view returns (uint256) {
    return block.number;
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
    // This method relies on extcodesize, which returns 0 for contracts in
    // construction, since the code is only stored at the end of the
    // constructor execution.

    uint256 size;
    // solhint-disable-next-line no-inline-assembly
    assembly {
      size := extcodesize(account)
    }
    return size > 0;
  }
}
