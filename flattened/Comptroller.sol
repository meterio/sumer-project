// Sources flattened with hardhat v2.9.3 https://hardhat.org

// File contracts/ComptrollerInterface.sol

pragma solidity ^0.5.16;

contract ComptrollerInterface {
    /// @notice Indicator that this is a Comptroller contract (for inspection)
    bool public constant isComptroller = true;

    /*** Assets You Are In ***/

    function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
    function exitMarket(address cToken) external returns (uint);

    /*** Policy Hooks ***/

    function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);
    function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;

    function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
    function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;

    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);
    function borrowVerify(address cToken, address borrower, uint borrowAmount) external;

    function repayBorrowAllowed(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount) external returns (uint);
    function repayBorrowVerify(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount,
        uint borrowerIndex) external;

    function liquidateBorrowAllowed(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount) external returns (uint);
    function liquidateBorrowVerify(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount,
        uint seizeTokens) external;

    function seizeAllowed(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external returns (uint);
    function seizeVerify(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external;

    function transferAllowed(address cToken, address src, address dst, uint transferTokens) external returns (uint);
    function transferVerify(address cToken, address src, address dst, uint transferTokens) external;

    /*** Liquidity/Liquidation Calculations ***/

    function liquidateCalculateSeizeTokens(
        address cTokenBorrowed,
        address cTokenCollateral,
        uint repayAmount) external view returns (uint, uint);
}


// File contracts/InterestRateModel.sol

pragma solidity ^0.5.16;

/**
  * @title Compound's InterestRateModel Interface
  * @author Compound
  */
contract InterestRateModel {
    /// @notice Indicator that this is an InterestRateModel contract (for inspection)
    bool public constant isInterestRateModel = true;

    /**
      * @notice Calculates the current borrow interest rate per block
      * @param cash The total amount of cash the market has
      * @param borrows The total amount of borrows the market has outstanding
      * @param reserves The total amount of reserves the market has
      * @return The borrow rate per block (as a percentage, and scaled by 1e18)
      */
    function getBorrowRate(uint cash, uint borrows, uint reserves) external view returns (uint);

    /**
      * @notice Calculates the current supply interest rate per block
      * @param cash The total amount of cash the market has
      * @param borrows The total amount of borrows the market has outstanding
      * @param reserves The total amount of reserves the market has
      * @param reserveFactorMantissa The current reserve factor the market has
      * @return The supply rate per block (as a percentage, and scaled by 1e18)
      */
    function getSupplyRate(uint cash, uint borrows, uint reserves, uint reserveFactorMantissa) external view returns (uint);

}


// File contracts/EIP20NonStandardInterface.sol

pragma solidity ^0.5.16;

/**
 * @title EIP20NonStandardInterface
 * @dev Version of ERC20 with no return values for `transfer` and `transferFrom`
 *  See https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca
 */
interface EIP20NonStandardInterface {

    /**
     * @notice Get the total number of tokens in circulation
     * @return The supply of tokens
     */
    function totalSupply() external view returns (uint256);

    /**
     * @notice Gets the balance of the specified address
     * @param owner The address from which the balance will be retrieved
     * @return The balance
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    ///
    /// !!!!!!!!!!!!!!
    /// !!! NOTICE !!! `transfer` does not return a value, in violation of the ERC-20 specification
    /// !!!!!!!!!!!!!!
    ///

    /**
      * @notice Transfer `amount` tokens from `msg.sender` to `dst`
      * @param dst The address of the destination account
      * @param amount The number of tokens to transfer
      */
    function transfer(address dst, uint256 amount) external;

    ///
    /// !!!!!!!!!!!!!!
    /// !!! NOTICE !!! `transferFrom` does not return a value, in violation of the ERC-20 specification
    /// !!!!!!!!!!!!!!
    ///

    /**
      * @notice Transfer `amount` tokens from `src` to `dst`
      * @param src The address of the source account
      * @param dst The address of the destination account
      * @param amount The number of tokens to transfer
      */
    function transferFrom(address src, address dst, uint256 amount) external;

    /**
      * @notice Approve `spender` to transfer up to `amount` from `src`
      * @dev This will overwrite the approval amount for `spender`
      *  and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)
      * @param spender The address of the account which may transfer tokens
      * @param amount The number of tokens that are approved
      * @return Whether or not the approval succeeded
      */
    function approve(address spender, uint256 amount) external returns (bool success);

    /**
      * @notice Get the current allowance from `owner` for `spender`
      * @param owner The address of the account which owns the tokens to be spent
      * @param spender The address of the account which may transfer tokens
      * @return The number of tokens allowed to be spent
      */
    function allowance(address owner, address spender) external view returns (uint256 remaining);

    /**
     * @dev Creates `amount` new tokens for `to`.
     * See {ERC20-_mint}.
     * Requirements:
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) external;
    
     /**
     * @dev Destroys `amount` tokens from the caller.
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) external;
    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     * See {ERC20-_burn} and {ERC20-allowance}.
     * Requirements:
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) external;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}


// File contracts/CTokenInterfaces.sol

pragma solidity ^0.5.16;



contract CTokenStorage {
  /**
   * @dev Guard variable for re-entrancy checks
   */
  bool internal _notEntered;

  /**
   * @notice EIP-20 token name for this token
   */
  string public name;

  /**
   * @notice EIP-20 token symbol for this token
   */
  string public symbol;

  /**
   * @notice EIP-20 token decimals for this token
   */
  uint8 public decimals;

  /**
   * @notice Maximum borrow rate that can ever be applied (.0005% / block)
   */

  uint256 internal constant borrowRateMaxMantissa = 0.0005e16;

  /**
   * @notice Maximum fraction of interest that can be set aside for reserves
   */
  uint256 internal constant reserveFactorMaxMantissa = 1e18;

  /**
   * @notice Administrator for this contract
   */
  address payable public admin;

  /**
   * @notice Pending administrator for this contract
   */
  address payable public pendingAdmin;

  /**
   * @notice Contract which oversees inter-cToken operations
   */
  ComptrollerInterface public comptroller;

  /**
   * @notice Model which tells what the current interest rate should be
   */
  InterestRateModel public interestRateModel;

  /**
   * @notice Initial exchange rate used when minting the first CTokens (used when totalSupply = 0)
   */
  uint256 internal initialExchangeRateMantissa;

  /**
   * @notice Fraction of interest currently set aside for reserves
   */
  uint256 public reserveFactorMantissa;

  /**
   * @notice Block number that interest was last accrued at
   */
  uint256 public accrualBlockNumber;

  /**
   * @notice Accumulator of the total earned interest rate since the opening of the market
   */
  uint256 public borrowIndex;

  /**
   * @notice Total amount of outstanding borrows of the underlying in this market
   */
  uint256 public totalBorrows;

  /**
   * @notice Total amount of reserves of the underlying held in this market
   */
  uint256 public totalReserves;

  /**
   * @notice Total number of tokens in circulation
   */
  uint256 public totalSupply;

  /**
   * @notice Official record of token balances for each account
   */
  mapping(address => uint256) internal accountTokens;

  /**
   * @notice Approved token transfer amounts on behalf of others
   */
  mapping(address => mapping(address => uint256)) internal transferAllowances;

  /**
   * @notice Container for borrow balance information
   * @member principal Total balance (with accrued interest), after applying the most recent balance-changing action
   * @member interestIndex Global borrowIndex as of the most recent balance-changing action
   */
  struct BorrowSnapshot {
    uint256 principal;
    uint256 interestIndex;
  }

  /**
   * @notice Mapping of account addresses to outstanding borrow balances
   */
  mapping(address => BorrowSnapshot) internal accountBorrows;

  /**
   * @notice Share of seized collateral that is added to reserves
   */
  uint256 public constant protocolSeizeShareMantissa = 2.8e16; //2.8%
}

contract CTokenInterface is CTokenStorage {
  /**
   * @notice Indicator that this is a CToken contract (for inspection)
   */
  bool public isCToken;
  bool public isCEther;

  /*** Market Events ***/

  /**
   * @notice Event emitted when interest is accrued
   */
  event AccrueInterest(uint256 cashPrior, uint256 interestAccumulated, uint256 borrowIndex, uint256 totalBorrows);

  /**
   * @notice Event emitted when tokens are minted
   */
  event Mint(address minter, uint256 mintAmount, uint256 mintTokens);

  /**
   * @notice Event emitted when tokens are redeemed
   */
  event Redeem(address redeemer, uint256 redeemAmount, uint256 redeemTokens);

  /**
   * @notice Event emitted when underlying is borrowed
   */
  event Borrow(address borrower, uint256 borrowAmount, uint256 accountBorrows, uint256 totalBorrows);

  /**
   * @notice Event emitted when a borrow is repaid
   */
  event RepayBorrow(address payer, address borrower, uint256 repayAmount, uint256 accountBorrows, uint256 totalBorrows);

  /**
   * @notice Event emitted when a borrow is liquidated
   */
  event LiquidateBorrow(
    address liquidator,
    address borrower,
    uint256 repayAmount,
    address cTokenCollateral,
    uint256 seizeTokens
  );

  /*** Admin Events ***/

  /**
   * @notice Event emitted when pendingAdmin is changed
   */
  event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin);

  /**
   * @notice Event emitted when pendingAdmin is accepted, which means admin is updated
   */
  event NewAdmin(address oldAdmin, address newAdmin);

  /**
   * @notice Event emitted when comptroller is changed
   */
  event NewComptroller(ComptrollerInterface oldComptroller, ComptrollerInterface newComptroller);

  /**
   * @notice Event emitted when interestRateModel is changed
   */
  event NewMarketInterestRateModel(InterestRateModel oldInterestRateModel, InterestRateModel newInterestRateModel);

  /**
   * @notice Event emitted when the reserve factor is changed
   */
  event NewReserveFactor(uint256 oldReserveFactorMantissa, uint256 newReserveFactorMantissa);

  /**
   * @notice Event emitted when the reserves are added
   */
  event ReservesAdded(address benefactor, uint256 addAmount, uint256 newTotalReserves);

  /**
   * @notice Event emitted when the reserves are reduced
   */
  event ReservesReduced(address admin, uint256 reduceAmount, uint256 newTotalReserves);

  /**
   * @notice EIP20 Transfer event
   */
  event Transfer(address indexed from, address indexed to, uint256 amount);

  /**
   * @notice EIP20 Approval event
   */
  event Approval(address indexed owner, address indexed spender, uint256 amount);

  /**
   * @notice Failure event
   */
  event Failure(uint256 error, uint256 info, uint256 detail);

  /*** User Interface ***/

  function transfer(address dst, uint256 amount) external returns (bool);

  function transferFrom(
    address src,
    address dst,
    uint256 amount
  ) external returns (bool);

  function approve(address spender, uint256 amount) external returns (bool);

  function allowance(address owner, address spender) external view returns (uint256);

  function balanceOf(address owner) external view returns (uint256);

  function balanceOfUnderlying(address owner) external returns (uint256);

  function getAccountSnapshot(address account)
    external
    view
    returns (
      uint256,
      uint256,
      uint256,
      uint256
    );

  function borrowRatePerBlock() external view returns (uint256);

  function supplyRatePerBlock() external view returns (uint256);

  function totalBorrowsCurrent() external returns (uint256);

  function borrowBalanceCurrent(address account) external returns (uint256);

  function borrowBalanceStored(address account) public view returns (uint256);

  function exchangeRateCurrent() public returns (uint256);

  function exchangeRateStored() public view returns (uint256);

  function getCash() external view returns (uint256);

  function accrueInterest() public returns (uint256);

  function seize(
    address liquidator,
    address borrower,
    uint256 seizeTokens
  ) external returns (uint256);

  /*** Admin Functions ***/

  function _setPendingAdmin(address payable newPendingAdmin) external returns (uint256);

  function _acceptAdmin() external returns (uint256);

  function _setComptroller(ComptrollerInterface newComptroller) public returns (uint256);

  function _setReserveFactor(uint256 newReserveFactorMantissa) external returns (uint256);

  function _reduceReserves(uint256 reduceAmount) external returns (uint256);

  function _setInterestRateModel(InterestRateModel newInterestRateModel) public returns (uint256);
}

contract CErc20Storage {
  /**
   * @notice Underlying asset for this CToken
   */
  address public underlying;
}

contract CErc20Interface is CErc20Storage {
  /*** User Interface ***/

  function mint(uint256 mintAmount) external returns (uint256);

  function redeem(uint256 redeemTokens) external returns (uint256);

  function redeemUnderlying(uint256 redeemAmount) external returns (uint256);

  function borrow(uint256 borrowAmount) external returns (uint256);

  function repayBorrow(uint256 repayAmount) external returns (uint256);

  function repayBorrowBehalf(address borrower, uint256 repayAmount) external returns (uint256);

  function liquidateBorrow(
    address borrower,
    uint256 repayAmount,
    CTokenInterface cTokenCollateral
  ) external returns (uint256);

  function sweepToken(EIP20NonStandardInterface token) external;

  /*** Admin Functions ***/

  function _addReserves(uint256 addAmount) external returns (uint256);
}

contract CDelegationStorage {
  /**
   * @notice Implementation address for this contract
   */
  address public implementation;
}

contract CDelegatorInterface is CDelegationStorage {
  /**
   * @notice Emitted when implementation is changed
   */
  event NewImplementation(address oldImplementation, address newImplementation);

  /**
   * @notice Called by the admin to update the implementation of the delegator
   * @param implementation_ The address of the new implementation for delegation
   * @param allowResign Flag to indicate whether to call _resignImplementation on the old implementation
   * @param becomeImplementationData The encoded bytes data to be passed to _becomeImplementation
   */
  function _setImplementation(
    address implementation_,
    bool allowResign,
    bytes memory becomeImplementationData
  ) public;
}

contract CDelegateInterface is CDelegationStorage {
  /**
   * @notice Called by the delegator on a delegate to initialize it for duty
   * @dev Should revert if any issues arise which make it unfit for delegation
   * @param data The encoded bytes data for any initialization
   */
  function _becomeImplementation(bytes memory data) public;

  /**
   * @notice Called by the delegator on a delegate to forfeit its responsibility
   */
  function _resignImplementation() public;
}


// File contracts/ErrorReporter.sol

pragma solidity ^0.5.16;

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


// File contracts/ComptrollerStorage.sol

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


// File contracts/Unitroller.sol

pragma solidity ^0.5.16;


/**
 * @title ComptrollerCore
 * @dev Storage for the comptroller is at this address, while execution is delegated to the `comptrollerImplementation`.
 * CTokens should reference this contract as their comptroller.
 */
contract Unitroller is UnitrollerAdminStorage, ComptrollerErrorReporter {

    /**
      * @notice Emitted when pendingComptrollerImplementation is changed
      */
    event NewPendingImplementation(address oldPendingImplementation, address newPendingImplementation);

    /**
      * @notice Emitted when pendingComptrollerImplementation is accepted, which means comptroller implementation is updated
      */
    event NewImplementation(address oldImplementation, address newImplementation);

    /**
      * @notice Emitted when pendingAdmin is changed
      */
    event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin);

    /**
      * @notice Emitted when pendingAdmin is accepted, which means admin is updated
      */
    event NewAdmin(address oldAdmin, address newAdmin);

    constructor() public {
        // Set admin to caller
        admin = msg.sender;
    }

    /*** Admin Functions ***/
    function _setPendingImplementation(address newPendingImplementation) public returns (uint) {

        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_PENDING_IMPLEMENTATION_OWNER_CHECK);
        }

        address oldPendingImplementation = pendingComptrollerImplementation;

        pendingComptrollerImplementation = newPendingImplementation;

        emit NewPendingImplementation(oldPendingImplementation, pendingComptrollerImplementation);

        return uint(Error.NO_ERROR);
    }

    /**
    * @notice Accepts new implementation of comptroller. msg.sender must be pendingImplementation
    * @dev Admin function for new implementation to accept it's role as implementation
    * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
    */
    function _acceptImplementation() public returns (uint) {
        // Check caller is pendingImplementation and pendingImplementation ≠ address(0)
        if (msg.sender != pendingComptrollerImplementation || pendingComptrollerImplementation == address(0)) {
            return fail(Error.UNAUTHORIZED, FailureInfo.ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK);
        }

        // Save current values for inclusion in log
        address oldImplementation = comptrollerImplementation;
        address oldPendingImplementation = pendingComptrollerImplementation;

        comptrollerImplementation = pendingComptrollerImplementation;

        pendingComptrollerImplementation = address(0);

        emit NewImplementation(oldImplementation, comptrollerImplementation);
        emit NewPendingImplementation(oldPendingImplementation, pendingComptrollerImplementation);

        return uint(Error.NO_ERROR);
    }


    /**
      * @notice Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
      * @dev Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
      * @param newPendingAdmin New pending admin.
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _setPendingAdmin(address newPendingAdmin) public returns (uint) {
        // Check caller = admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_PENDING_ADMIN_OWNER_CHECK);
        }

        // Save current value, if any, for inclusion in log
        address oldPendingAdmin = pendingAdmin;

        // Store pendingAdmin with value newPendingAdmin
        pendingAdmin = newPendingAdmin;

        // Emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin)
        emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin);

        return uint(Error.NO_ERROR);
    }

    /**
      * @notice Accepts transfer of admin rights. msg.sender must be pendingAdmin
      * @dev Admin function for pending admin to accept role and update admin
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _acceptAdmin() public returns (uint) {
        // Check caller is pendingAdmin and pendingAdmin ≠ address(0)
        if (msg.sender != pendingAdmin || msg.sender == address(0)) {
            return fail(Error.UNAUTHORIZED, FailureInfo.ACCEPT_ADMIN_PENDING_ADMIN_CHECK);
        }

        // Save current values for inclusion in log
        address oldAdmin = admin;
        address oldPendingAdmin = pendingAdmin;

        // Store admin with value pendingAdmin
        admin = pendingAdmin;

        // Clear the pending value
        pendingAdmin = address(0);

        emit NewAdmin(oldAdmin, admin);
        emit NewPendingAdmin(oldPendingAdmin, pendingAdmin);

        return uint(Error.NO_ERROR);
    }

    /**
     * @dev Delegates execution to an implementation contract.
     * It returns to the external caller whatever the implementation returns
     * or forwards reverts.
     */
    function () payable external {
        // delegate all other functions to current implementation
        (bool success, ) = comptrollerImplementation.delegatecall(msg.data);

        assembly {
              let free_mem_ptr := mload(0x40)
              returndatacopy(free_mem_ptr, 0, returndatasize)

              switch success
              case 0 { revert(free_mem_ptr, returndatasize) }
              default { return(free_mem_ptr, returndatasize) }
        }
    }
}


// File contracts/ExponentialNoError.sol

pragma solidity ^0.5.16;

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


// File contracts/CarefulMath.sol

pragma solidity ^0.5.16;

/**
  * @title Careful Math
  * @author Compound
  * @notice Derived from OpenZeppelin's SafeMath library
  *         https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol
  */
contract CarefulMath {

    /**
     * @dev Possible error codes that we can return
     */
    enum MathError {
        NO_ERROR,
        DIVISION_BY_ZERO,
        INTEGER_OVERFLOW,
        INTEGER_UNDERFLOW
    }

    /**
    * @dev Multiplies two numbers, returns an error on overflow.
    */
    function mulUInt(uint a, uint b) internal pure returns (MathError, uint) {
        if (a == 0) {
            return (MathError.NO_ERROR, 0);
        }

        uint c = a * b;

        if (c / a != b) {
            return (MathError.INTEGER_OVERFLOW, 0);
        } else {
            return (MathError.NO_ERROR, c);
        }
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function divUInt(uint a, uint b) internal pure returns (MathError, uint) {
        if (b == 0) {
            return (MathError.DIVISION_BY_ZERO, 0);
        }

        return (MathError.NO_ERROR, a / b);
    }

    /**
    * @dev Subtracts two numbers, returns an error on overflow (i.e. if subtrahend is greater than minuend).
    */
    function subUInt(uint a, uint b) internal pure returns (MathError, uint) {
        if (b <= a) {
            return (MathError.NO_ERROR, a - b);
        } else {
            return (MathError.INTEGER_UNDERFLOW, 0);
        }
    }

    /**
    * @dev Adds two numbers, returns an error on overflow.
    */
    function addUInt(uint a, uint b) internal pure returns (MathError, uint) {
        uint c = a + b;

        if (c >= a) {
            return (MathError.NO_ERROR, c);
        } else {
            return (MathError.INTEGER_OVERFLOW, 0);
        }
    }

    /**
    * @dev add a and b and then subtract c
    */
    function addThenSubUInt(uint a, uint b, uint c) internal pure returns (MathError, uint) {
        (MathError err0, uint sum) = addUInt(a, b);

        if (err0 != MathError.NO_ERROR) {
            return (err0, 0);
        }

        return subUInt(sum, c);
    }
}


// File contracts/Exponential.sol

pragma solidity ^0.5.16;


/**
 * @title Exponential module for storing fixed-precision decimals
 * @author Compound
 * @dev Legacy contract for compatibility reasons with existing contracts that still use MathError
 * @notice Exp is a struct which stores decimals with a fixed precision of 18 decimal places.
 *         Thus, if we wanted to store the 5.1, mantissa would store 5.1e18. That is:
 *         `Exp({mantissa: 5100000000000000000})`.
 */
contract Exponential is CarefulMath, ExponentialNoError {
    /**
     * @dev Creates an exponential from numerator and denominator values.
     *      Note: Returns an error if (`num` * 10e18) > MAX_INT,
     *            or if `denom` is zero.
     */
    function getExp(uint num, uint denom) pure internal returns (MathError, Exp memory) {
        (MathError err0, uint scaledNumerator) = mulUInt(num, expScale);
        if (err0 != MathError.NO_ERROR) {
            return (err0, Exp({mantissa: 0}));
        }

        (MathError err1, uint rational) = divUInt(scaledNumerator, denom);
        if (err1 != MathError.NO_ERROR) {
            return (err1, Exp({mantissa: 0}));
        }

        return (MathError.NO_ERROR, Exp({mantissa: rational}));
    }

    /**
     * @dev Adds two exponentials, returning a new exponential.
     */
    function addExp(Exp memory a, Exp memory b) pure internal returns (MathError, Exp memory) {
        (MathError error, uint result) = addUInt(a.mantissa, b.mantissa);

        return (error, Exp({mantissa: result}));
    }

    /**
     * @dev Subtracts two exponentials, returning a new exponential.
     */
    function subExp(Exp memory a, Exp memory b) pure internal returns (MathError, Exp memory) {
        (MathError error, uint result) = subUInt(a.mantissa, b.mantissa);

        return (error, Exp({mantissa: result}));
    }

    /**
     * @dev Multiply an Exp by a scalar, returning a new Exp.
     */
    function mulScalar(Exp memory a, uint scalar) pure internal returns (MathError, Exp memory) {
        (MathError err0, uint scaledMantissa) = mulUInt(a.mantissa, scalar);
        if (err0 != MathError.NO_ERROR) {
            return (err0, Exp({mantissa: 0}));
        }

        return (MathError.NO_ERROR, Exp({mantissa: scaledMantissa}));
    }

    /**
     * @dev Multiply an Exp by a scalar, then truncate to return an unsigned integer.
     */
    function mulScalarTruncate(Exp memory a, uint scalar) pure internal returns (MathError, uint) {
        (MathError err, Exp memory product) = mulScalar(a, scalar);
        if (err != MathError.NO_ERROR) {
            return (err, 0);
        }

        return (MathError.NO_ERROR, truncate(product));
    }

    /**
     * @dev Multiply an Exp by a scalar, truncate, then add an to an unsigned integer, returning an unsigned integer.
     */
    function mulScalarTruncateAddUInt(Exp memory a, uint scalar, uint addend) pure internal returns (MathError, uint) {
        (MathError err, Exp memory product) = mulScalar(a, scalar);
        if (err != MathError.NO_ERROR) {
            return (err, 0);
        }

        return addUInt(truncate(product), addend);
    }

    /**
     * @dev Divide an Exp by a scalar, returning a new Exp.
     */
    function divScalar(Exp memory a, uint scalar) pure internal returns (MathError, Exp memory) {
        (MathError err0, uint descaledMantissa) = divUInt(a.mantissa, scalar);
        if (err0 != MathError.NO_ERROR) {
            return (err0, Exp({mantissa: 0}));
        }

        return (MathError.NO_ERROR, Exp({mantissa: descaledMantissa}));
    }

    /**
     * @dev Divide a scalar by an Exp, returning a new Exp.
     */
    function divScalarByExp(uint scalar, Exp memory divisor) pure internal returns (MathError, Exp memory) {
        /*
          We are doing this as:
          getExp(mulUInt(expScale, scalar), divisor.mantissa)

          How it works:
          Exp = a / b;
          Scalar = s;
          `s / (a / b)` = `b * s / a` and since for an Exp `a = mantissa, b = expScale`
        */
        (MathError err0, uint numerator) = mulUInt(expScale, scalar);
        if (err0 != MathError.NO_ERROR) {
            return (err0, Exp({mantissa: 0}));
        }
        return getExp(numerator, divisor.mantissa);
    }

    /**
     * @dev Divide a scalar by an Exp, then truncate to return an unsigned integer.
     */
    function divScalarByExpTruncate(uint scalar, Exp memory divisor) pure internal returns (MathError, uint) {
        (MathError err, Exp memory fraction) = divScalarByExp(scalar, divisor);
        if (err != MathError.NO_ERROR) {
            return (err, 0);
        }

        return (MathError.NO_ERROR, truncate(fraction));
    }

    /**
     * @dev Multiplies two exponentials, returning a new exponential.
     */
    function mulExp(Exp memory a, Exp memory b) pure internal returns (MathError, Exp memory) {

        (MathError err0, uint doubleScaledProduct) = mulUInt(a.mantissa, b.mantissa);
        if (err0 != MathError.NO_ERROR) {
            return (err0, Exp({mantissa: 0}));
        }

        // We add half the scale before dividing so that we get rounding instead of truncation.
        //  See "Listing 6" and text above it at https://accu.org/index.php/journals/1717
        // Without this change, a result like 6.6...e-19 will be truncated to 0 instead of being rounded to 1e-18.
        (MathError err1, uint doubleScaledProductWithHalfScale) = addUInt(halfExpScale, doubleScaledProduct);
        if (err1 != MathError.NO_ERROR) {
            return (err1, Exp({mantissa: 0}));
        }

        (MathError err2, uint product) = divUInt(doubleScaledProductWithHalfScale, expScale);
        // The only error `div` can return is MathError.DIVISION_BY_ZERO but we control `expScale` and it is not zero.
        assert(err2 == MathError.NO_ERROR);

        return (MathError.NO_ERROR, Exp({mantissa: product}));
    }

    /**
     * @dev Multiplies two exponentials given their mantissas, returning a new exponential.
     */
    function mulExp(uint a, uint b) pure internal returns (MathError, Exp memory) {
        return mulExp(Exp({mantissa: a}), Exp({mantissa: b}));
    }

    /**
     * @dev Multiplies three exponentials, returning a new exponential.
     */
    function mulExp3(Exp memory a, Exp memory b, Exp memory c) pure internal returns (MathError, Exp memory) {
        (MathError err, Exp memory ab) = mulExp(a, b);
        if (err != MathError.NO_ERROR) {
            return (err, ab);
        }
        return mulExp(ab, c);
    }

    /**
     * @dev Divides two exponentials, returning a new exponential.
     *     (a/scale) / (b/scale) = (a/scale) * (scale/b) = a/b,
     *  which we can scale as an Exp by calling getExp(a.mantissa, b.mantissa)
     */
    function divExp(Exp memory a, Exp memory b) pure internal returns (MathError, Exp memory) {
        return getExp(a.mantissa, b.mantissa);
    }
}


// File contracts/EIP20Interface.sol

pragma solidity ^0.5.16;

/**
 * @title ERC 20 Token Standard Interface
 *  https://eips.ethereum.org/EIPS/eip-20
 */
interface EIP20Interface {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);

    /**
      * @notice Get the total number of tokens in circulation
      * @return The supply of tokens
      */
    function totalSupply() external view returns (uint256);

    /**
     * @notice Gets the balance of the specified address
     * @param owner The address from which the balance will be retrieved
     * @return The balance
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
      * @notice Transfer `amount` tokens from `msg.sender` to `dst`
      * @param dst The address of the destination account
      * @param amount The number of tokens to transfer
      * @return Whether or not the transfer succeeded
      */
    function transfer(address dst, uint256 amount) external returns (bool success);

    /**
      * @notice Transfer `amount` tokens from `src` to `dst`
      * @param src The address of the source account
      * @param dst The address of the destination account
      * @param amount The number of tokens to transfer
      * @return Whether or not the transfer succeeded
      */
    function transferFrom(address src, address dst, uint256 amount) external returns (bool success);

    /**
      * @notice Approve `spender` to transfer up to `amount` from `src`
      * @dev This will overwrite the approval amount for `spender`
      *  and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)
      * @param spender The address of the account which may transfer tokens
      * @param amount The number of tokens that are approved (-1 means infinite)
      * @return Whether or not the approval succeeded
      */
    function approve(address spender, uint256 amount) external returns (bool success);

    /**
      * @notice Get the current allowance from `owner` for `spender`
      * @param owner The address of the account which owns the tokens to be spent
      * @param spender The address of the account which may transfer tokens
      * @return The number of tokens allowed to be spent (-1 means infinite)
      */
    function allowance(address owner, address spender) external view returns (uint256 remaining);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}


// File contracts/CToken.sol

pragma solidity ^0.5.16;






/**
 * @title Compound's CToken Contract
 * @notice Abstract base for CTokens
 * @author Compound
 */
contract CToken is CTokenInterface, Exponential, TokenErrorReporter {
    /**
     * @notice Initialize the money market
     * @param comptroller_ The address of the Comptroller
     * @param interestRateModel_ The address of the interest rate model
     * @param initialExchangeRateMantissa_ The initial exchange rate, scaled by 1e18
     * @param name_ EIP-20 name of this token
     * @param symbol_ EIP-20 symbol of this token
     * @param decimals_ EIP-20 decimal precision of this token
     */
    function initialize(ComptrollerInterface comptroller_,
                        InterestRateModel interestRateModel_,
                        uint initialExchangeRateMantissa_,
                        string memory name_,
                        string memory symbol_,
                        uint8 decimals_,
                        bool isCToken_) public {
        require(msg.sender == admin, "only admin may initialize the market");
        require(accrualBlockNumber == 0 && borrowIndex == 0, "market may only be initialized once");

        isCToken = isCToken_;

        // Set initial exchange rate
        initialExchangeRateMantissa = initialExchangeRateMantissa_;
        require(initialExchangeRateMantissa > 0, "initial exchange rate must be greater than zero.");

        // Set the comptroller
        uint err = _setComptroller(comptroller_);
        require(err == uint(Error.NO_ERROR), "setting comptroller failed");

        // Initialize block number and borrow index (block number mocks depend on comptroller being set)
        accrualBlockNumber = getBlockNumber();
        borrowIndex = mantissaOne;

        // Set the interest rate model (depends on block number / borrow index)
        err = _setInterestRateModelFresh(interestRateModel_);
        require(err == uint(Error.NO_ERROR), "setting interest rate model failed");

        name = name_;
        symbol = symbol_;
        decimals = decimals_;

        // The counter starts true to prevent changing it from zero to non-zero (i.e. smaller cost/refund)
        _notEntered = true;
    }

    /**
     * @notice Transfer `tokens` tokens from `src` to `dst` by `spender`
     * @dev Called by both `transfer` and `transferFrom` internally
     * @param spender The address of the account performing the transfer
     * @param src The address of the source account
     * @param dst The address of the destination account
     * @param tokens The number of tokens to transfer
     * @return Whether or not the transfer succeeded
     */
    function transferTokens(address spender, address src, address dst, uint tokens) internal returns (uint) {
        /* Fail if transfer not allowed */
        uint allowed = comptroller.transferAllowed(address(this), src, dst, tokens);
        if (allowed != 0) {
            return failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.TRANSFER_COMPTROLLER_REJECTION, allowed);
        }

        /* Do not allow self-transfers */
        if (src == dst) {
            return fail(Error.BAD_INPUT, FailureInfo.TRANSFER_NOT_ALLOWED);
        }

        /* Get the allowance, infinite for the account owner */
        uint startingAllowance = 0;
        if (spender == src) {
            startingAllowance = uint(-1);
        } else {
            startingAllowance = transferAllowances[src][spender];
        }

        /* Do the calculations, checking for {under,over}flow */
        MathError mathErr;
        uint allowanceNew;
        uint srcTokensNew;
        uint dstTokensNew;

        (mathErr, allowanceNew) = subUInt(startingAllowance, tokens);
        if (mathErr != MathError.NO_ERROR) {
            return fail(Error.MATH_ERROR, FailureInfo.TRANSFER_NOT_ALLOWED);
        }

        (mathErr, srcTokensNew) = subUInt(accountTokens[src], tokens);
        if (mathErr != MathError.NO_ERROR) {
            return fail(Error.MATH_ERROR, FailureInfo.TRANSFER_NOT_ENOUGH);
        }

        (mathErr, dstTokensNew) = addUInt(accountTokens[dst], tokens);
        if (mathErr != MathError.NO_ERROR) {
            return fail(Error.MATH_ERROR, FailureInfo.TRANSFER_TOO_MUCH);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        accountTokens[src] = srcTokensNew;
        accountTokens[dst] = dstTokensNew;

        /* Eat some of the allowance (if necessary) */
        if (startingAllowance != uint(-1)) {
            transferAllowances[src][spender] = allowanceNew;
        }

        /* We emit a Transfer event */
        emit Transfer(src, dst, tokens);

        // unused function
        // comptroller.transferVerify(address(this), src, dst, tokens);

        return uint(Error.NO_ERROR);
    }

    /**
     * @notice Transfer `amount` tokens from `msg.sender` to `dst`
     * @param dst The address of the destination account
     * @param amount The number of tokens to transfer
     * @return Whether or not the transfer succeeded
     */
    function transfer(address dst, uint256 amount) external nonReentrant returns (bool) {
        return transferTokens(msg.sender, msg.sender, dst, amount) == uint(Error.NO_ERROR);
    }

    /**
     * @notice Transfer `amount` tokens from `src` to `dst`
     * @param src The address of the source account
     * @param dst The address of the destination account
     * @param amount The number of tokens to transfer
     * @return Whether or not the transfer succeeded
     */
    function transferFrom(address src, address dst, uint256 amount) external nonReentrant returns (bool) {
        return transferTokens(msg.sender, src, dst, amount) == uint(Error.NO_ERROR);
    }

    /**
     * @notice Approve `spender` to transfer up to `amount` from `src`
     * @dev This will overwrite the approval amount for `spender`
     *  and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)
     * @param spender The address of the account which may transfer tokens
     * @param amount The number of tokens that are approved (-1 means infinite)
     * @return Whether or not the approval succeeded
     */
    function approve(address spender, uint256 amount) external returns (bool) {
        address src = msg.sender;
        transferAllowances[src][spender] = amount;
        emit Approval(src, spender, amount);
        return true;
    }

    /**
     * @notice Get the current allowance from `owner` for `spender`
     * @param owner The address of the account which owns the tokens to be spent
     * @param spender The address of the account which may transfer tokens
     * @return The number of tokens allowed to be spent (-1 means infinite)
     */
    function allowance(address owner, address spender) external view returns (uint256) {
        return transferAllowances[owner][spender];
    }

    /**
     * @notice Get the token balance of the `owner`
     * @param owner The address of the account to query
     * @return The number of tokens owned by `owner`
     */
    function balanceOf(address owner) external view returns (uint256) {
        return accountTokens[owner];
    }

    /**
     * @notice Get the underlying balance of the `owner`
     * @dev This also accrues interest in a transaction
     * @param owner The address of the account to query
     * @return The amount of underlying owned by `owner`
     */
    function balanceOfUnderlying(address owner) external returns (uint) {
        Exp memory exchangeRate = Exp({mantissa: exchangeRateCurrent()});
        (MathError mErr, uint balance) = mulScalarTruncate(exchangeRate, accountTokens[owner]);
        require(mErr == MathError.NO_ERROR, "balance could not be calculated");
        return balance;
    }

    /**
     * @notice Get a snapshot of the account's balances, and the cached exchange rate
     * @dev This is used by comptroller to more efficiently perform liquidity checks.
     * @param account Address of the account to snapshot
     * @return (possible error, token balance, borrow balance, exchange rate mantissa)
     */
    function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint) {
        uint cTokenBalance = accountTokens[account];
        uint borrowBalance;
        uint exchangeRateMantissa;

        MathError mErr;

        (mErr, borrowBalance) = borrowBalanceStoredInternal(account);
        if (mErr != MathError.NO_ERROR) {
            return (uint(Error.MATH_ERROR), 0, 0, 0);
        }

        (mErr, exchangeRateMantissa) = exchangeRateStoredInternal();
        if (mErr != MathError.NO_ERROR) {
            return (uint(Error.MATH_ERROR), 0, 0, 0);
        }

        return (uint(Error.NO_ERROR), cTokenBalance, borrowBalance, exchangeRateMantissa);
    }

    /**
     * @dev Function to simply retrieve block number
     *  This exists mainly for inheriting test contracts to stub this result.
     */
    function getBlockNumber() internal view returns (uint) {
        return block.number;
    }

    /**
     * @notice Returns the current per-block borrow interest rate for this cToken
     * @return The borrow interest rate per block, scaled by 1e18
     */
    function borrowRatePerBlock() external view returns (uint) {
        return interestRateModel.getBorrowRate(getCashPrior(), totalBorrows, totalReserves);
    }

    /**
     * @notice Returns the current per-block supply interest rate for this cToken
     * @return The supply interest rate per block, scaled by 1e18
     */
    function supplyRatePerBlock() external view returns (uint) {
        return interestRateModel.getSupplyRate(getCashPrior(), totalBorrows, totalReserves, reserveFactorMantissa);
    }

    /**
     * @notice Returns the current total borrows plus accrued interest
     * @return The total borrows with interest
     */
    function totalBorrowsCurrent() external nonReentrant returns (uint) {
        require(accrueInterest() == uint(Error.NO_ERROR), "accrue interest failed");
        return totalBorrows;
    }

    /**
     * @notice Accrue interest to updated borrowIndex and then calculate account's borrow balance using the updated borrowIndex
     * @param account The address whose balance should be calculated after updating borrowIndex
     * @return The calculated balance
     */
    function borrowBalanceCurrent(address account) external nonReentrant returns (uint) {
        require(accrueInterest() == uint(Error.NO_ERROR), "accrue interest failed");
        return borrowBalanceStored(account);
    }

    /**
     * @notice Return the borrow balance of account based on stored data
     * @param account The address whose balance should be calculated
     * @return The calculated balance
     */
    function borrowBalanceStored(address account) public view returns (uint) {
        (MathError err, uint result) = borrowBalanceStoredInternal(account);
        require(err == MathError.NO_ERROR, "borrowBalanceStored: borrowBalanceStoredInternal failed");
        return result;
    }

    /**
     * @notice Return the borrow balance of account based on stored data
     * @param account The address whose balance should be calculated
     * @return (error code, the calculated balance or 0 if error code is non-zero)
     */
    function borrowBalanceStoredInternal(address account) internal view returns (MathError, uint) {
        /* Note: we do not assert that the market is up to date */
        MathError mathErr;
        uint principalTimesIndex;
        uint result;

        /* Get borrowBalance and borrowIndex */
        BorrowSnapshot storage borrowSnapshot = accountBorrows[account];

        /* If borrowBalance = 0 then borrowIndex is likely also 0.
         * Rather than failing the calculation with a division by 0, we immediately return 0 in this case.
         */
        if (borrowSnapshot.principal == 0) {
            return (MathError.NO_ERROR, 0);
        }

        /* Calculate new borrow balance using the interest index:
         *  recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
         */
        (mathErr, principalTimesIndex) = mulUInt(borrowSnapshot.principal, borrowIndex);
        if (mathErr != MathError.NO_ERROR) {
            return (mathErr, 0);
        }

        (mathErr, result) = divUInt(principalTimesIndex, borrowSnapshot.interestIndex);
        if (mathErr != MathError.NO_ERROR) {
            return (mathErr, 0);
        }

        return (MathError.NO_ERROR, result);
    }

    /**
     * @notice Accrue interest then return the up-to-date exchange rate
     * @return Calculated exchange rate scaled by 1e18
     */
    function exchangeRateCurrent() public nonReentrant returns (uint) {
        require(accrueInterest() == uint(Error.NO_ERROR), "accrue interest failed");
        return exchangeRateStored();
    }

    /**
     * @notice Calculates the exchange rate from the underlying to the CToken
     * @dev This function does not accrue interest before calculating the exchange rate
     * @return Calculated exchange rate scaled by 1e18
     */
    function exchangeRateStored() public view returns (uint) {
        (MathError err, uint result) = exchangeRateStoredInternal();
        require(err == MathError.NO_ERROR, "exchangeRateStored: exchangeRateStoredInternal failed");
        return result;
    }

    /**
     * @notice Calculates the exchange rate from the underlying to the CToken
     * @dev This function does not accrue interest before calculating the exchange rate
     * @return (error code, calculated exchange rate scaled by 1e18)
     */
    function exchangeRateStoredInternal() internal view returns (MathError, uint) {

        if (isCToken != true) {
            return (MathError.NO_ERROR, initialExchangeRateMantissa);
        }

        uint _totalSupply = totalSupply;
        if (_totalSupply == 0) {
            /*
             * If there are no tokens minted:
             *  exchangeRate = initialExchangeRate
             */
            return (MathError.NO_ERROR, initialExchangeRateMantissa);
        } else {
            /*
             * Otherwise:
             *  exchangeRate = (totalCash + totalBorrows - totalReserves) / totalSupply
             */
            uint totalCash = getCashPrior();
            uint cashPlusBorrowsMinusReserves;
            Exp memory exchangeRate;
            MathError mathErr;

            (mathErr, cashPlusBorrowsMinusReserves) = addThenSubUInt(totalCash, totalBorrows, totalReserves);
            if (mathErr != MathError.NO_ERROR) {
                return (mathErr, 0);
            }

            (mathErr, exchangeRate) = getExp(cashPlusBorrowsMinusReserves, _totalSupply);
            if (mathErr != MathError.NO_ERROR) {
                return (mathErr, 0);
            }

            return (MathError.NO_ERROR, exchangeRate.mantissa);
        }
    }

    /**
     * @notice Get cash balance of this cToken in the underlying asset
     * @return The quantity of underlying asset owned by this contract
     */
    function getCash() external view returns (uint) {
        return getCashPrior();
    }

    /**
     * @notice Applies accrued interest to total borrows and reserves
     * @dev This calculates interest accrued from the last checkpointed block
     *   up to the current block and writes new checkpoint to storage.
     */
    function accrueInterest() public returns (uint) {
        /* Remember the initial block number */
        uint currentBlockNumber = getBlockNumber();
        uint accrualBlockNumberPrior = accrualBlockNumber;

        /* Short-circuit accumulating 0 interest */
        if (accrualBlockNumberPrior == currentBlockNumber) {
            return uint(Error.NO_ERROR);
        }

        /* Read the previous values out of storage */
        uint cashPrior = getCashPrior();
        uint borrowsPrior = totalBorrows;
        uint reservesPrior = totalReserves;
        uint borrowIndexPrior = borrowIndex;

        /* Calculate the current borrow interest rate */
        uint borrowRateMantissa = interestRateModel.getBorrowRate(cashPrior, borrowsPrior, reservesPrior);
        require(borrowRateMantissa <= borrowRateMaxMantissa, "borrow rate is absurdly high");

        /* Calculate the number of blocks elapsed since the last accrual */
        (MathError mathErr, uint blockDelta) = subUInt(currentBlockNumber, accrualBlockNumberPrior);
        require(mathErr == MathError.NO_ERROR, "could not calculate block delta");

        /*
         * Calculate the interest accumulated into borrows and reserves and the new index:
         *  simpleInterestFactor = borrowRate * blockDelta
         *  interestAccumulated = simpleInterestFactor * totalBorrows
         *  totalBorrowsNew = interestAccumulated + totalBorrows
         *  totalReservesNew = interestAccumulated * reserveFactor + totalReserves
         *  borrowIndexNew = simpleInterestFactor * borrowIndex + borrowIndex
         */

        Exp memory simpleInterestFactor;
        uint interestAccumulated;
        uint totalBorrowsNew;
        uint totalReservesNew;
        uint borrowIndexNew;

        (mathErr, simpleInterestFactor) = mulScalar(Exp({mantissa: borrowRateMantissa}), blockDelta);
        if (mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.ACCRUE_INTEREST_SIMPLE_INTEREST_FACTOR_CALCULATION_FAILED, uint(mathErr));
        }

        (mathErr, interestAccumulated) = mulScalarTruncate(simpleInterestFactor, borrowsPrior);
        if (mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.ACCRUE_INTEREST_ACCUMULATED_INTEREST_CALCULATION_FAILED, uint(mathErr));
        }

        (mathErr, totalBorrowsNew) = addUInt(interestAccumulated, borrowsPrior);
        if (mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.ACCRUE_INTEREST_NEW_TOTAL_BORROWS_CALCULATION_FAILED, uint(mathErr));
        }

        (mathErr, totalReservesNew) = mulScalarTruncateAddUInt(Exp({mantissa: reserveFactorMantissa}), interestAccumulated, reservesPrior);
        if (mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.ACCRUE_INTEREST_NEW_TOTAL_RESERVES_CALCULATION_FAILED, uint(mathErr));
        }

        (mathErr, borrowIndexNew) = mulScalarTruncateAddUInt(simpleInterestFactor, borrowIndexPrior, borrowIndexPrior);
        if (mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.ACCRUE_INTEREST_NEW_BORROW_INDEX_CALCULATION_FAILED, uint(mathErr));
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /* We write the previously calculated values into storage */
        accrualBlockNumber = currentBlockNumber;
        borrowIndex = borrowIndexNew;
        totalBorrows = totalBorrowsNew;
        totalReserves = totalReservesNew;

        /* We emit an AccrueInterest event */
        emit AccrueInterest(cashPrior, interestAccumulated, borrowIndexNew, totalBorrowsNew);

        return uint(Error.NO_ERROR);
    }

    /**
     * @notice Sender supplies assets into the market and receives cTokens in exchange
     * @dev Accrues interest whether or not the operation succeeds, unless reverted
     * @param mintAmount The amount of the underlying asset to supply
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual mint amount.
     */
    function mintInternal(uint mintAmount) internal nonReentrant returns (uint, uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted borrow failed
            return (fail(Error(error), FailureInfo.MINT_ACCRUE_INTEREST_FAILED), 0);
        }
        // mintFresh emits the actual Mint event if successful and logs on errors, so we don't need to
        return mintFresh(msg.sender, mintAmount);
    }

    struct MintLocalVars {
        Error err;
        MathError mathErr;
        uint exchangeRateMantissa;
        uint mintTokens;
        uint totalSupplyNew;
        uint accountTokensNew;
        uint actualMintAmount;
    }

    /**
     * @notice User supplies assets into the market and receives cTokens in exchange
     * @dev Assumes interest has already been accrued up to the current block
     * @param minter The address of the account which is supplying the assets
     * @param mintAmount The amount of the underlying asset to supply
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual mint amount.
     */
    function mintFresh(address minter, uint mintAmount) internal returns (uint, uint) {
        /* Fail if mint not allowed */
        uint allowed = comptroller.mintAllowed(address(this), minter, mintAmount);
        if (allowed != 0) {
            return (failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.MINT_COMPTROLLER_REJECTION, allowed), 0);
        }

        /* Verify market's block number equals current block number */
        if (accrualBlockNumber != getBlockNumber()) {
            return (fail(Error.MARKET_NOT_FRESH, FailureInfo.MINT_FRESHNESS_CHECK), 0);
        }

        MintLocalVars memory vars;

        (vars.mathErr, vars.exchangeRateMantissa) = exchangeRateStoredInternal();
        if (vars.mathErr != MathError.NO_ERROR) {
            return (failOpaque(Error.MATH_ERROR, FailureInfo.MINT_EXCHANGE_RATE_READ_FAILED, uint(vars.mathErr)), 0);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /*
         *  We call `doTransferIn` for the minter and the mintAmount.
         *  Note: The cToken must handle variations between ERC-20 and ETH underlying.
         *  `doTransferIn` reverts if anything goes wrong, since we can't be sure if
         *  side-effects occurred. The function returns the amount actually transferred,
         *  in case of a fee. On success, the cToken holds an additional `actualMintAmount`
         *  of cash.
         */
        vars.actualMintAmount = doTransferIn(minter, mintAmount);

        /*
         * We get the current exchange rate and calculate the number of cTokens to be minted:
         *  mintTokens = actualMintAmount / exchangeRate
         */

        (vars.mathErr, vars.mintTokens) = divScalarByExpTruncate(vars.actualMintAmount, Exp({mantissa: vars.exchangeRateMantissa}));
        require(vars.mathErr == MathError.NO_ERROR, "MINT_EXCHANGE_CALCULATION_FAILED");

        /*
         * We calculate the new total supply of cTokens and minter token balance, checking for overflow:
         *  totalSupplyNew = totalSupply + mintTokens
         *  accountTokensNew = accountTokens[minter] + mintTokens
         */
        (vars.mathErr, vars.totalSupplyNew) = addUInt(totalSupply, vars.mintTokens);
        require(vars.mathErr == MathError.NO_ERROR, "MINT_NEW_TOTAL_SUPPLY_CALCULATION_FAILED");

        (vars.mathErr, vars.accountTokensNew) = addUInt(accountTokens[minter], vars.mintTokens);
        require(vars.mathErr == MathError.NO_ERROR, "MINT_NEW_ACCOUNT_BALANCE_CALCULATION_FAILED");

        /* We write previously calculated values into storage */
        totalSupply = vars.totalSupplyNew;
        accountTokens[minter] = vars.accountTokensNew;

        /* We emit a Mint event, and a Transfer event */
        emit Mint(minter, vars.actualMintAmount, vars.mintTokens);
        emit Transfer(address(this), minter, vars.mintTokens);

        /* We call the defense hook */
        // unused function
        // comptroller.mintVerify(address(this), minter, vars.actualMintAmount, vars.mintTokens);

        return (uint(Error.NO_ERROR), vars.actualMintAmount);
    }

    /**
     * @notice Sender redeems cTokens in exchange for the underlying asset
     * @dev Accrues interest whether or not the operation succeeds, unless reverted
     * @param redeemTokens The number of cTokens to redeem into underlying
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function redeemInternal(uint redeemTokens) internal nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted redeem failed
            return fail(Error(error), FailureInfo.REDEEM_ACCRUE_INTEREST_FAILED);
        }
        // redeemFresh emits redeem-specific logs on errors, so we don't need to
        return redeemFresh(msg.sender, redeemTokens, 0);
    }

    /**
     * @notice Sender redeems cTokens in exchange for a specified amount of underlying asset
     * @dev Accrues interest whether or not the operation succeeds, unless reverted
     * @param redeemAmount The amount of underlying to receive from redeeming cTokens
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function redeemUnderlyingInternal(uint redeemAmount) internal nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted redeem failed
            return fail(Error(error), FailureInfo.REDEEM_ACCRUE_INTEREST_FAILED);
        }
        // redeemFresh emits redeem-specific logs on errors, so we don't need to
        return redeemFresh(msg.sender, 0, redeemAmount);
    }

    struct RedeemLocalVars {
        Error err;
        MathError mathErr;
        uint exchangeRateMantissa;
        uint redeemTokens;
        uint redeemAmount;
        uint totalSupplyNew;
        uint accountTokensNew;
    }

    /**
     * @notice User redeems cTokens in exchange for the underlying asset
     * @dev Assumes interest has already been accrued up to the current block
     * @param redeemer The address of the account which is redeeming the tokens
     * @param redeemTokensIn The number of cTokens to redeem into underlying (only one of redeemTokensIn or redeemAmountIn may be non-zero)
     * @param redeemAmountIn The number of underlying tokens to receive from redeeming cTokens (only one of redeemTokensIn or redeemAmountIn may be non-zero)
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function redeemFresh(address payable redeemer, uint redeemTokensIn, uint redeemAmountIn) internal returns (uint) {
        require(redeemTokensIn == 0 || redeemAmountIn == 0, "one of redeemTokensIn or redeemAmountIn must be zero");

        RedeemLocalVars memory vars;

        /* exchangeRate = invoke Exchange Rate Stored() */
        (vars.mathErr, vars.exchangeRateMantissa) = exchangeRateStoredInternal();
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_RATE_READ_FAILED, uint(vars.mathErr));
        }

        /* If redeemTokensIn > 0: */
        if (redeemTokensIn > 0) {
            /*
             * We calculate the exchange rate and the amount of underlying to be redeemed:
             *  redeemTokens = redeemTokensIn
             *  redeemAmount = redeemTokensIn x exchangeRateCurrent
             */
            vars.redeemTokens = redeemTokensIn;

            (vars.mathErr, vars.redeemAmount) = mulScalarTruncate(Exp({mantissa: vars.exchangeRateMantissa}), redeemTokensIn);
            if (vars.mathErr != MathError.NO_ERROR) {
                return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_TOKENS_CALCULATION_FAILED, uint(vars.mathErr));
            }
        } else {
            /*
             * We get the current exchange rate and calculate the amount to be redeemed:
             *  redeemTokens = redeemAmountIn / exchangeRate
             *  redeemAmount = redeemAmountIn
             */

            (vars.mathErr, vars.redeemTokens) = divScalarByExpTruncate(redeemAmountIn, Exp({mantissa: vars.exchangeRateMantissa}));
            if (vars.mathErr != MathError.NO_ERROR) {
                return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_AMOUNT_CALCULATION_FAILED, uint(vars.mathErr));
            }

            vars.redeemAmount = redeemAmountIn;
        }

        /* Fail if redeem not allowed */
        uint allowed = comptroller.redeemAllowed(address(this), redeemer, vars.redeemTokens);
        if (allowed != 0) {
            return failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.REDEEM_COMPTROLLER_REJECTION, allowed);
        }

        /* Verify market's block number equals current block number */
        if (accrualBlockNumber != getBlockNumber()) {
            return fail(Error.MARKET_NOT_FRESH, FailureInfo.REDEEM_FRESHNESS_CHECK);
        }

        /*
         * We calculate the new total supply and redeemer balance, checking for underflow:
         *  totalSupplyNew = totalSupply - redeemTokens
         *  accountTokensNew = accountTokens[redeemer] - redeemTokens
         */
        (vars.mathErr, vars.totalSupplyNew) = subUInt(totalSupply, vars.redeemTokens);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_NEW_TOTAL_SUPPLY_CALCULATION_FAILED, uint(vars.mathErr));
        }

        (vars.mathErr, vars.accountTokensNew) = subUInt(accountTokens[redeemer], vars.redeemTokens);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_NEW_ACCOUNT_BALANCE_CALCULATION_FAILED, uint(vars.mathErr));
        }

        /* Fail gracefully if protocol has insufficient cash */
        if ((isCToken == true) && (getCashPrior() < vars.redeemAmount)) {
            return fail(Error.TOKEN_INSUFFICIENT_CASH, FailureInfo.REDEEM_TRANSFER_OUT_NOT_POSSIBLE);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /*
         * We invoke doTransferOut for the redeemer and the redeemAmount.
         *  Note: The cToken must handle variations between ERC-20 and ETH underlying.
         *  On success, the cToken has redeemAmount less of cash.
         *  doTransferOut reverts if anything goes wrong, since we can't be sure if side effects occurred.
         */
        doTransferOut(redeemer, vars.redeemAmount);

        /* We write previously calculated values into storage */
        totalSupply = vars.totalSupplyNew;
        accountTokens[redeemer] = vars.accountTokensNew;

        /* We emit a Transfer event, and a Redeem event */
        emit Transfer(redeemer, address(this), vars.redeemTokens);
        emit Redeem(redeemer, vars.redeemAmount, vars.redeemTokens);

        /* We call the defense hook */
        comptroller.redeemVerify(address(this), redeemer, vars.redeemAmount, vars.redeemTokens);

        return uint(Error.NO_ERROR);
    }

    /**
      * @notice Sender borrows assets from the protocol to their own address
      * @param borrowAmount The amount of the underlying asset to borrow
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function borrowInternal(uint borrowAmount) internal nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted borrow failed
            return fail(Error(error), FailureInfo.BORROW_ACCRUE_INTEREST_FAILED);
        }
        // borrowFresh emits borrow-specific logs on errors, so we don't need to
        return borrowFresh(msg.sender, borrowAmount);
    }

    struct BorrowLocalVars {
        MathError mathErr;
        uint accountBorrows;
        uint accountBorrowsNew;
        uint totalBorrowsNew;
    }

    /**
      * @notice Users borrow assets from the protocol to their own address
      * @param borrowAmount The amount of the underlying asset to borrow
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function borrowFresh(address payable borrower, uint borrowAmount) internal returns (uint) {
        /* Fail if borrow not allowed */
        uint allowed = comptroller.borrowAllowed(address(this), borrower, borrowAmount);
        if (allowed != 0) {
            return failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.BORROW_COMPTROLLER_REJECTION, allowed);
        }

        /* Verify market's block number equals current block number */
        if (accrualBlockNumber != getBlockNumber()) {
            return fail(Error.MARKET_NOT_FRESH, FailureInfo.BORROW_FRESHNESS_CHECK);
        }

        /* Fail gracefully if protocol has insufficient underlying cash */
        if ((isCToken == true) && (getCashPrior() < borrowAmount)) {
            return fail(Error.TOKEN_INSUFFICIENT_CASH, FailureInfo.BORROW_CASH_NOT_AVAILABLE);
        }

        BorrowLocalVars memory vars;

        /*
         * We calculate the new borrower and total borrow balances, failing on overflow:
         *  accountBorrowsNew = accountBorrows + borrowAmount
         *  totalBorrowsNew = totalBorrows + borrowAmount
         */
        (vars.mathErr, vars.accountBorrows) = borrowBalanceStoredInternal(borrower);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.BORROW_ACCUMULATED_BALANCE_CALCULATION_FAILED, uint(vars.mathErr));
        }

        (vars.mathErr, vars.accountBorrowsNew) = addUInt(vars.accountBorrows, borrowAmount);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.BORROW_NEW_ACCOUNT_BORROW_BALANCE_CALCULATION_FAILED, uint(vars.mathErr));
        }

        (vars.mathErr, vars.totalBorrowsNew) = addUInt(totalBorrows, borrowAmount);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.BORROW_NEW_TOTAL_BALANCE_CALCULATION_FAILED, uint(vars.mathErr));
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /*
         * We invoke doTransferOut for the borrower and the borrowAmount.
         *  Note: The cToken must handle variations between ERC-20 and ETH underlying.
         *  On success, the cToken borrowAmount less of cash.
         *  doTransferOut reverts if anything goes wrong, since we can't be sure if side effects occurred.
         */
        doTransferOut(borrower, borrowAmount);

        /* We write the previously calculated values into storage */
        accountBorrows[borrower].principal = vars.accountBorrowsNew;
        accountBorrows[borrower].interestIndex = borrowIndex;
        totalBorrows = vars.totalBorrowsNew;

        /* We emit a Borrow event */
        emit Borrow(borrower, borrowAmount, vars.accountBorrowsNew, vars.totalBorrowsNew);

        /* We call the defense hook */
        // unused function
        // comptroller.borrowVerify(address(this), borrower, borrowAmount);

        return uint(Error.NO_ERROR);
    }

    /**
     * @notice Sender repays their own borrow
     * @param repayAmount The amount to repay
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function repayBorrowInternal(uint repayAmount) internal nonReentrant returns (uint, uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted borrow failed
            return (fail(Error(error), FailureInfo.REPAY_BORROW_ACCRUE_INTEREST_FAILED), 0);
        }
        // repayBorrowFresh emits repay-borrow-specific logs on errors, so we don't need to
        return repayBorrowFresh(msg.sender, msg.sender, repayAmount);
    }

    /**
     * @notice Sender repays a borrow belonging to borrower
     * @param borrower the account with the debt being payed off
     * @param repayAmount The amount to repay
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function repayBorrowBehalfInternal(address borrower, uint repayAmount) internal nonReentrant returns (uint, uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted borrow failed
            return (fail(Error(error), FailureInfo.REPAY_BEHALF_ACCRUE_INTEREST_FAILED), 0);
        }
        // repayBorrowFresh emits repay-borrow-specific logs on errors, so we don't need to
        return repayBorrowFresh(msg.sender, borrower, repayAmount);
    }

    struct RepayBorrowLocalVars {
        Error err;
        MathError mathErr;
        uint repayAmount;
        uint borrowerIndex;
        uint accountBorrows;
        uint accountBorrowsNew;
        uint totalBorrowsNew;
        uint actualRepayAmount;
    }

    /**
     * @notice Borrows are repaid by another user (possibly the borrower).
     * @param payer the account paying off the borrow
     * @param borrower the account with the debt being payed off
     * @param repayAmount the amount of undelrying tokens being returned
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function repayBorrowFresh(address payer, address borrower, uint repayAmount) internal returns (uint, uint) {
        /* Fail if repayBorrow not allowed */
        uint allowed = comptroller.repayBorrowAllowed(address(this), payer, borrower, repayAmount);
        if (allowed != 0) {
            return (failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.REPAY_BORROW_COMPTROLLER_REJECTION, allowed), 0);
        }

        /* Verify market's block number equals current block number */
        if (accrualBlockNumber != getBlockNumber()) {
            return (fail(Error.MARKET_NOT_FRESH, FailureInfo.REPAY_BORROW_FRESHNESS_CHECK), 0);
        }

        RepayBorrowLocalVars memory vars;

        /* We remember the original borrowerIndex for verification purposes */
        vars.borrowerIndex = accountBorrows[borrower].interestIndex;

        /* We fetch the amount the borrower owes, with accumulated interest */
        (vars.mathErr, vars.accountBorrows) = borrowBalanceStoredInternal(borrower);
        if (vars.mathErr != MathError.NO_ERROR) {
            return (failOpaque(Error.MATH_ERROR, FailureInfo.REPAY_BORROW_ACCUMULATED_BALANCE_CALCULATION_FAILED, uint(vars.mathErr)), 0);
        }

        /* If repayAmount == -1, repayAmount = accountBorrows */
        if (repayAmount == uint(-1)) {
            vars.repayAmount = vars.accountBorrows;
        } else {
            vars.repayAmount = repayAmount;
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /*
         * We call doTransferIn for the payer and the repayAmount
         *  Note: The cToken must handle variations between ERC-20 and ETH underlying.
         *  On success, the cToken holds an additional repayAmount of cash.
         *  doTransferIn reverts if anything goes wrong, since we can't be sure if side effects occurred.
         *   it returns the amount actually transferred, in case of a fee.
         */
        vars.actualRepayAmount = doTransferIn(payer, vars.repayAmount);

        /*
         * We calculate the new borrower and total borrow balances, failing on underflow:
         *  accountBorrowsNew = accountBorrows - actualRepayAmount
         *  totalBorrowsNew = totalBorrows - actualRepayAmount
         */
        (vars.mathErr, vars.accountBorrowsNew) = subUInt(vars.accountBorrows, vars.actualRepayAmount);
        require(vars.mathErr == MathError.NO_ERROR, "REPAY_BORROW_NEW_ACCOUNT_BORROW_BALANCE_CALCULATION_FAILED");

        (vars.mathErr, vars.totalBorrowsNew) = subUInt(totalBorrows, vars.actualRepayAmount);
        require(vars.mathErr == MathError.NO_ERROR, "REPAY_BORROW_NEW_TOTAL_BALANCE_CALCULATION_FAILED");

        /* We write the previously calculated values into storage */
        accountBorrows[borrower].principal = vars.accountBorrowsNew;
        accountBorrows[borrower].interestIndex = borrowIndex;
        totalBorrows = vars.totalBorrowsNew;

        /* We emit a RepayBorrow event */
        emit RepayBorrow(payer, borrower, vars.actualRepayAmount, vars.accountBorrowsNew, vars.totalBorrowsNew);

        /* We call the defense hook */
        // unused function
        // comptroller.repayBorrowVerify(address(this), payer, borrower, vars.actualRepayAmount, vars.borrowerIndex);

        return (uint(Error.NO_ERROR), vars.actualRepayAmount);
    }

    /**
     * @notice The sender liquidates the borrowers collateral.
     *  The collateral seized is transferred to the liquidator.
     * @param borrower The borrower of this cToken to be liquidated
     * @param cTokenCollateral The market in which to seize collateral from the borrower
     * @param repayAmount The amount of the underlying borrowed asset to repay
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function liquidateBorrowInternal(address borrower, uint repayAmount, CTokenInterface cTokenCollateral) internal nonReentrant returns (uint, uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted liquidation failed
            return (fail(Error(error), FailureInfo.LIQUIDATE_ACCRUE_BORROW_INTEREST_FAILED), 0);
        }

        error = cTokenCollateral.accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted liquidation failed
            return (fail(Error(error), FailureInfo.LIQUIDATE_ACCRUE_COLLATERAL_INTEREST_FAILED), 0);
        }

        // liquidateBorrowFresh emits borrow-specific logs on errors, so we don't need to
        return liquidateBorrowFresh(msg.sender, borrower, repayAmount, cTokenCollateral);
    }

    /**
     * @notice The liquidator liquidates the borrowers collateral.
     *  The collateral seized is transferred to the liquidator.
     * @param borrower The borrower of this cToken to be liquidated
     * @param liquidator The address repaying the borrow and seizing collateral
     * @param cTokenCollateral The market in which to seize collateral from the borrower
     * @param repayAmount The amount of the underlying borrowed asset to repay
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function liquidateBorrowFresh(address liquidator, address borrower, uint repayAmount, CTokenInterface cTokenCollateral) internal returns (uint, uint) {
        /* Fail if liquidate not allowed */
        uint allowed = comptroller.liquidateBorrowAllowed(address(this), address(cTokenCollateral), liquidator, borrower, repayAmount);
        if (allowed != 0) {
            return (failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.LIQUIDATE_COMPTROLLER_REJECTION, allowed), 0);
        }

        /* Verify market's block number equals current block number */
        if (accrualBlockNumber != getBlockNumber()) {
            return (fail(Error.MARKET_NOT_FRESH, FailureInfo.LIQUIDATE_FRESHNESS_CHECK), 0);
        }

        /* Verify cTokenCollateral market's block number equals current block number */
        if (cTokenCollateral.accrualBlockNumber() != getBlockNumber()) {
            return (fail(Error.MARKET_NOT_FRESH, FailureInfo.LIQUIDATE_COLLATERAL_FRESHNESS_CHECK), 0);
        }

        /* Fail if borrower = liquidator */
        if (borrower == liquidator) {
            return (fail(Error.INVALID_ACCOUNT_PAIR, FailureInfo.LIQUIDATE_LIQUIDATOR_IS_BORROWER), 0);
        }

        /* Fail if repayAmount = 0 */
        if (repayAmount == 0) {
            return (fail(Error.INVALID_CLOSE_AMOUNT_REQUESTED, FailureInfo.LIQUIDATE_CLOSE_AMOUNT_IS_ZERO), 0);
        }

        /* Fail if repayAmount = -1 */
        if (repayAmount == uint(-1)) {
            return (fail(Error.INVALID_CLOSE_AMOUNT_REQUESTED, FailureInfo.LIQUIDATE_CLOSE_AMOUNT_IS_UINT_MAX), 0);
        }


        /* Fail if repayBorrow fails */
        (uint repayBorrowError, uint actualRepayAmount) = repayBorrowFresh(liquidator, borrower, repayAmount);
        if (repayBorrowError != uint(Error.NO_ERROR)) {
            return (fail(Error(repayBorrowError), FailureInfo.LIQUIDATE_REPAY_BORROW_FRESH_FAILED), 0);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /* We calculate the number of collateral tokens that will be seized */
        (uint amountSeizeError, uint seizeTokens) = comptroller.liquidateCalculateSeizeTokens(address(this), address(cTokenCollateral), actualRepayAmount);
        require(amountSeizeError == uint(Error.NO_ERROR), "LIQUIDATE_COMPTROLLER_CALCULATE_AMOUNT_SEIZE_FAILED");

        /* Revert if borrower collateral token balance < seizeTokens */
        require(cTokenCollateral.balanceOf(borrower) >= seizeTokens, "LIQUIDATE_SEIZE_TOO_MUCH");

        // If this is also the collateral, run seizeInternal to avoid re-entrancy, otherwise make an external call
        uint seizeError;
        if (address(cTokenCollateral) == address(this)) {
            seizeError = seizeInternal(address(this), liquidator, borrower, seizeTokens);
        } else {
            seizeError = cTokenCollateral.seize(liquidator, borrower, seizeTokens);
        }

        /* Revert if seize tokens fails (since we cannot be sure of side effects) */
        require(seizeError == uint(Error.NO_ERROR), "token seizure failed");

        /* We emit a LiquidateBorrow event */
        emit LiquidateBorrow(liquidator, borrower, actualRepayAmount, address(cTokenCollateral), seizeTokens);

        /* We call the defense hook */
        // unused function
        // comptroller.liquidateBorrowVerify(address(this), address(cTokenCollateral), liquidator, borrower, actualRepayAmount, seizeTokens);

        return (uint(Error.NO_ERROR), actualRepayAmount);
    }

    /**
     * @notice Transfers collateral tokens (this market) to the liquidator.
     * @dev Will fail unless called by another cToken during the process of liquidation.
     *  Its absolutely critical to use msg.sender as the borrowed cToken and not a parameter.
     * @param liquidator The account receiving seized collateral
     * @param borrower The account having collateral seized
     * @param seizeTokens The number of cTokens to seize
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function seize(address liquidator, address borrower, uint seizeTokens) external nonReentrant returns (uint) {
        return seizeInternal(msg.sender, liquidator, borrower, seizeTokens);
    }

    struct SeizeInternalLocalVars {
        MathError mathErr;
        uint borrowerTokensNew;
        uint liquidatorTokensNew;
        uint liquidatorSeizeTokens;
        uint protocolSeizeTokens;
        uint protocolSeizeAmount;
        uint exchangeRateMantissa;
        uint totalReservesNew;
        uint totalSupplyNew;
    }

    /**
     * @notice Transfers collateral tokens (this market) to the liquidator.
     * @dev Called only during an in-kind liquidation, or by liquidateBorrow during the liquidation of another CToken.
     *  Its absolutely critical to use msg.sender as the seizer cToken and not a parameter.
     * @param seizerToken The contract seizing the collateral (i.e. borrowed cToken)
     * @param liquidator The account receiving seized collateral
     * @param borrower The account having collateral seized
     * @param seizeTokens The number of cTokens to seize
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function seizeInternal(address seizerToken, address liquidator, address borrower, uint seizeTokens) internal returns (uint) {
        /* Fail if seize not allowed */
        uint allowed = comptroller.seizeAllowed(address(this), seizerToken, liquidator, borrower, seizeTokens);
        if (allowed != 0) {
            return failOpaque(Error.COMPTROLLER_REJECTION, FailureInfo.LIQUIDATE_SEIZE_COMPTROLLER_REJECTION, allowed);
        }

        /* Fail if borrower = liquidator */
        if (borrower == liquidator) {
            return fail(Error.INVALID_ACCOUNT_PAIR, FailureInfo.LIQUIDATE_SEIZE_LIQUIDATOR_IS_BORROWER);
        }

        SeizeInternalLocalVars memory vars;

        /*
         * We calculate the new borrower and liquidator token balances, failing on underflow/overflow:
         *  borrowerTokensNew = accountTokens[borrower] - seizeTokens
         *  liquidatorTokensNew = accountTokens[liquidator] + seizeTokens
         */
        (vars.mathErr, vars.borrowerTokensNew) = subUInt(accountTokens[borrower], seizeTokens);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.LIQUIDATE_SEIZE_BALANCE_DECREMENT_FAILED, uint(vars.mathErr));
        }

        vars.protocolSeizeTokens = mul_(seizeTokens, Exp({mantissa: protocolSeizeShareMantissa}));
        vars.liquidatorSeizeTokens = sub_(seizeTokens, vars.protocolSeizeTokens);

        (vars.mathErr, vars.exchangeRateMantissa) = exchangeRateStoredInternal();
        require(vars.mathErr == MathError.NO_ERROR, "exchange rate math error");

        vars.protocolSeizeAmount = mul_ScalarTruncate(Exp({mantissa: vars.exchangeRateMantissa}), vars.protocolSeizeTokens);

        vars.totalReservesNew = add_(totalReserves, vars.protocolSeizeAmount);
        vars.totalSupplyNew = sub_(totalSupply, vars.protocolSeizeTokens);

        (vars.mathErr, vars.liquidatorTokensNew) = addUInt(accountTokens[liquidator], vars.liquidatorSeizeTokens);
        if (vars.mathErr != MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.LIQUIDATE_SEIZE_BALANCE_INCREMENT_FAILED, uint(vars.mathErr));
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /* We write the previously calculated values into storage */
        totalReserves = vars.totalReservesNew;
        totalSupply = vars.totalSupplyNew;
        accountTokens[borrower] = vars.borrowerTokensNew;
        accountTokens[liquidator] = vars.liquidatorTokensNew;

        /* Emit a Transfer event */
        emit Transfer(borrower, liquidator, vars.liquidatorSeizeTokens);
        emit Transfer(borrower, address(this), vars.protocolSeizeTokens);
        emit ReservesAdded(address(this), vars.protocolSeizeAmount, vars.totalReservesNew);

        /* We call the defense hook */
        // unused function
        // comptroller.seizeVerify(address(this), seizerToken, liquidator, borrower, seizeTokens);

        return uint(Error.NO_ERROR);
    }


    /*** Admin Functions ***/

    /**
      * @notice Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
      * @dev Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
      * @param newPendingAdmin New pending admin.
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _setPendingAdmin(address payable newPendingAdmin) external returns (uint) {
        // Check caller = admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_PENDING_ADMIN_OWNER_CHECK);
        }

        // Save current value, if any, for inclusion in log
        address oldPendingAdmin = pendingAdmin;

        // Store pendingAdmin with value newPendingAdmin
        pendingAdmin = newPendingAdmin;

        // Emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin)
        emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin);

        return uint(Error.NO_ERROR);
    }

    /**
      * @notice Accepts transfer of admin rights. msg.sender must be pendingAdmin
      * @dev Admin function for pending admin to accept role and update admin
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _acceptAdmin() external returns (uint) {
        // Check caller is pendingAdmin and pendingAdmin ≠ address(0)
        if (msg.sender != pendingAdmin || msg.sender == address(0)) {
            return fail(Error.UNAUTHORIZED, FailureInfo.ACCEPT_ADMIN_PENDING_ADMIN_CHECK);
        }

        // Save current values for inclusion in log
        address oldAdmin = admin;
        address oldPendingAdmin = pendingAdmin;

        // Store admin with value pendingAdmin
        admin = pendingAdmin;

        // Clear the pending value
        pendingAdmin = address(0);

        emit NewAdmin(oldAdmin, admin);
        emit NewPendingAdmin(oldPendingAdmin, pendingAdmin);

        return uint(Error.NO_ERROR);
    }

    /**
      * @notice Sets a new comptroller for the market
      * @dev Admin function to set a new comptroller
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _setComptroller(ComptrollerInterface newComptroller) public returns (uint) {
        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_COMPTROLLER_OWNER_CHECK);
        }

        ComptrollerInterface oldComptroller = comptroller;
        // Ensure invoke comptroller.isComptroller() returns true
        require(newComptroller.isComptroller(), "marker method returned false");

        // Set market's comptroller to newComptroller
        comptroller = newComptroller;

        // Emit NewComptroller(oldComptroller, newComptroller)
        emit NewComptroller(oldComptroller, newComptroller);

        return uint(Error.NO_ERROR);
    }

    /**
      * @notice accrues interest and sets a new reserve factor for the protocol using _setReserveFactorFresh
      * @dev Admin function to accrue interest and set a new reserve factor
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _setReserveFactor(uint newReserveFactorMantissa) external nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but on top of that we want to log the fact that an attempted reserve factor change failed.
            return fail(Error(error), FailureInfo.SET_RESERVE_FACTOR_ACCRUE_INTEREST_FAILED);
        }
        // _setReserveFactorFresh emits reserve-factor-specific logs on errors, so we don't need to.
        return _setReserveFactorFresh(newReserveFactorMantissa);
    }

    /**
      * @notice Sets a new reserve factor for the protocol (*requires fresh interest accrual)
      * @dev Admin function to set a new reserve factor
      * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
      */
    function _setReserveFactorFresh(uint newReserveFactorMantissa) internal returns (uint) {
        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_RESERVE_FACTOR_ADMIN_CHECK);
        }

        // Verify market's block number equals current block number
        if (accrualBlockNumber != getBlockNumber()) {
            return fail(Error.MARKET_NOT_FRESH, FailureInfo.SET_RESERVE_FACTOR_FRESH_CHECK);
        }

        // Check newReserveFactor ≤ maxReserveFactor
        if (newReserveFactorMantissa > reserveFactorMaxMantissa) {
            return fail(Error.BAD_INPUT, FailureInfo.SET_RESERVE_FACTOR_BOUNDS_CHECK);
        }

        uint oldReserveFactorMantissa = reserveFactorMantissa;
        reserveFactorMantissa = newReserveFactorMantissa;

        emit NewReserveFactor(oldReserveFactorMantissa, newReserveFactorMantissa);

        return uint(Error.NO_ERROR);
    }

    /**
     * @notice Accrues interest and reduces reserves by transferring from msg.sender
     * @param addAmount Amount of addition to reserves
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function _addReservesInternal(uint addAmount) internal nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but on top of that we want to log the fact that an attempted reduce reserves failed.
            return fail(Error(error), FailureInfo.ADD_RESERVES_ACCRUE_INTEREST_FAILED);
        }

        // _addReservesFresh emits reserve-addition-specific logs on errors, so we don't need to.
        (error, ) = _addReservesFresh(addAmount);
        return error;
    }

    /**
     * @notice Add reserves by transferring from caller
     * @dev Requires fresh interest accrual
     * @param addAmount Amount of addition to reserves
     * @return (uint, uint) An error code (0=success, otherwise a failure (see ErrorReporter.sol for details)) and the actual amount added, net token fees
     */
    function _addReservesFresh(uint addAmount) internal returns (uint, uint) {
        // totalReserves + actualAddAmount
        uint totalReservesNew;
        uint actualAddAmount;

        // We fail gracefully unless market's block number equals current block number
        if (accrualBlockNumber != getBlockNumber()) {
            return (fail(Error.MARKET_NOT_FRESH, FailureInfo.ADD_RESERVES_FRESH_CHECK), actualAddAmount);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        /*
         * We call doTransferIn for the caller and the addAmount
         *  Note: The cToken must handle variations between ERC-20 and ETH underlying.
         *  On success, the cToken holds an additional addAmount of cash.
         *  doTransferIn reverts if anything goes wrong, since we can't be sure if side effects occurred.
         *  it returns the amount actually transferred, in case of a fee.
         */

        actualAddAmount = doTransferIn(msg.sender, addAmount);

        totalReservesNew = totalReserves + actualAddAmount;

        /* Revert on overflow */
        require(totalReservesNew >= totalReserves, "add reserves unexpected overflow");

        // Store reserves[n+1] = reserves[n] + actualAddAmount
        totalReserves = totalReservesNew;

        /* Emit NewReserves(admin, actualAddAmount, reserves[n+1]) */
        emit ReservesAdded(msg.sender, actualAddAmount, totalReservesNew);

        /* Return (NO_ERROR, actualAddAmount) */
        return (uint(Error.NO_ERROR), actualAddAmount);
    }


    /**
     * @notice Accrues interest and reduces reserves by transferring to admin
     * @param reduceAmount Amount of reduction to reserves
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function _reduceReserves(uint reduceAmount) external nonReentrant returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but on top of that we want to log the fact that an attempted reduce reserves failed.
            return fail(Error(error), FailureInfo.REDUCE_RESERVES_ACCRUE_INTEREST_FAILED);
        }
        // _reduceReservesFresh emits reserve-reduction-specific logs on errors, so we don't need to.
        return _reduceReservesFresh(reduceAmount);
    }

    /**
     * @notice Reduces reserves by transferring to admin
     * @dev Requires fresh interest accrual
     * @param reduceAmount Amount of reduction to reserves
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function _reduceReservesFresh(uint reduceAmount) internal returns (uint) {
        // totalReserves - reduceAmount
        uint totalReservesNew;

        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.REDUCE_RESERVES_ADMIN_CHECK);
        }

        // We fail gracefully unless market's block number equals current block number
        if (accrualBlockNumber != getBlockNumber()) {
            return fail(Error.MARKET_NOT_FRESH, FailureInfo.REDUCE_RESERVES_FRESH_CHECK);
        }

        // Fail gracefully if protocol has insufficient underlying cash
        if (getCashPrior() < reduceAmount) {
            return fail(Error.TOKEN_INSUFFICIENT_CASH, FailureInfo.REDUCE_RESERVES_CASH_NOT_AVAILABLE);
        }

        // Check reduceAmount ≤ reserves[n] (totalReserves)
        if (reduceAmount > totalReserves) {
            return fail(Error.BAD_INPUT, FailureInfo.REDUCE_RESERVES_VALIDATION);
        }

        /////////////////////////
        // EFFECTS & INTERACTIONS
        // (No safe failures beyond this point)

        totalReservesNew = totalReserves - reduceAmount;
        // We checked reduceAmount <= totalReserves above, so this should never revert.
        require(totalReservesNew <= totalReserves, "reduce reserves unexpected underflow");

        // Store reserves[n+1] = reserves[n] - reduceAmount
        totalReserves = totalReservesNew;

        // doTransferOut reverts if anything goes wrong, since we can't be sure if side effects occurred.
        doTransferOut(admin, reduceAmount);

        emit ReservesReduced(admin, reduceAmount, totalReservesNew);

        return uint(Error.NO_ERROR);
    }

    /**
     * @notice accrues interest and updates the interest rate model using _setInterestRateModelFresh
     * @dev Admin function to accrue interest and update the interest rate model
     * @param newInterestRateModel the new interest rate model to use
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function _setInterestRateModel(InterestRateModel newInterestRateModel) public returns (uint) {
        uint error = accrueInterest();
        if (error != uint(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but on top of that we want to log the fact that an attempted change of interest rate model failed
            return fail(Error(error), FailureInfo.SET_INTEREST_RATE_MODEL_ACCRUE_INTEREST_FAILED);
        }
        // _setInterestRateModelFresh emits interest-rate-model-update-specific logs on errors, so we don't need to.
        return _setInterestRateModelFresh(newInterestRateModel);
    }

    /**
     * @notice updates the interest rate model (*requires fresh interest accrual)
     * @dev Admin function to update the interest rate model
     * @param newInterestRateModel the new interest rate model to use
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function _setInterestRateModelFresh(InterestRateModel newInterestRateModel) internal returns (uint) {

        // Used to store old model for use in the event that is emitted on success
        InterestRateModel oldInterestRateModel;

        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_INTEREST_RATE_MODEL_OWNER_CHECK);
        }

        // We fail gracefully unless market's block number equals current block number
        if (accrualBlockNumber != getBlockNumber()) {
            return fail(Error.MARKET_NOT_FRESH, FailureInfo.SET_INTEREST_RATE_MODEL_FRESH_CHECK);
        }

        // Track the market's current interest rate model
        oldInterestRateModel = interestRateModel;

        // Ensure invoke newInterestRateModel.isInterestRateModel() returns true
        require(newInterestRateModel.isInterestRateModel(), "marker method returned false");

        // Set the interest rate model to newInterestRateModel
        interestRateModel = newInterestRateModel;

        // Emit NewMarketInterestRateModel(oldInterestRateModel, newInterestRateModel)
        emit NewMarketInterestRateModel(oldInterestRateModel, newInterestRateModel);

        return uint(Error.NO_ERROR);
    }

    /*** Safe Token ***/

    /**
     * @notice Gets balance of this contract in terms of the underlying
     * @dev This excludes the value of the current message, if any
     * @return The quantity of underlying owned by this contract
     */
    function getCashPrior() internal view returns (uint);

    /**
     * @dev Performs a transfer in, reverting upon failure. Returns the amount actually transferred to the protocol, in case of a fee.
     *  This may revert due to insufficient balance or insufficient allowance.
     */
    function doTransferIn(address from, uint amount) internal returns (uint);

    /**
     * @dev Performs a transfer out, ideally returning an explanatory error code upon failure tather than reverting.
     *  If caller has not called checked protocol's balance, may revert due to insufficient cash held in the contract.
     *  If caller has checked protocol's balance, and verified it is >= amount, this should not revert in normal conditions.
     */
    function doTransferOut(address payable to, uint amount) internal;


    /*** Reentrancy Guard ***/

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     */
    modifier nonReentrant() {
        require(_notEntered, "re-entered");
        _notEntered = false;
        _;
        _notEntered = true; // get a gas-refund post-Istanbul
    }
}


// File contracts/UnderwriterStorage.sol

pragma solidity >=0.5.16;



contract UnderwriterProxyStorage {
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
  address public implementation;

  /**
   * @notice Pending brains of Unitroller
   */
  address public pendingImplementation;
}

contract UnderwriterStorage is UnderwriterProxyStorage {
  address public admin;
  address public governanceToken;

  uint256 public suTokenRateMantissa;

  /**
   * @notice eqAssetGroup, cToken -> equal assets info.
   */

  uint8 public equalAssetsGroupNum;

  /**
   * @notice The Pause Guardian can pause certain actions as a safety mechanism.
   *  Actions which allow users to remove their own assets cannot be paused.
   *  Liquidation / seizing / transfer can only be paused globally, not by market.
   */
  address public pauseGuardian;
  bool public _mintGuardianPaused;
  bool public _borrowGuardianPaused;
  bool public transferGuardianPaused;
  bool public seizeGuardianPaused;
  mapping(address => bool) public mintGuardianPaused;
  mapping(address => bool) public borrowGuardianPaused;

  // @notice The borrowCapGuardian can set borrowCaps to any number for any market. Lowering the borrow cap could disable borrowing on the given market.
  address public borrowCapGuardian;

  // @notice Borrow caps enforced by borrowAllowed for each cToken address. Defaults to zero which corresponds to unlimited borrowing.
  mapping(address => uint256) public borrowCaps;
}

contract UnderwriterAdminInterface is UnderwriterStorage {
  /// @notice EqualAssets, contains information of groupName and rateMantissas
  struct EqualAssets {
    uint8 groupId;
    string groupName;
    uint256 inGroupCTokenRateMantissa;
    uint256 inGroupSuTokenRateMantissa;
    uint256 interGroupCTokenRateMantissa;
    uint256 interGroupSuTokenRateMantissa;
  }
  mapping(uint8 => EqualAssets) public eqAssetGroup;

  function getEqAssetGroupNum() external view returns (uint8);

  function getEqAssetGroup(uint8 groupId) external view returns (EqualAssets memory);

  function _getPauseGuardian() external view returns (address);

  function _getMintPaused(address cToken) external returns (bool);

  function _getTransferPaused() external view returns (bool);

  function _getBorrowPaused(address cToken) external view returns (bool);

  function _getSeizePaused() external view returns (bool);

  function getCompAddress() external view returns (address);

  function _getMarketBorrowCap(address cToken) external view returns (uint256);

  function _getBorrowCapGuardian() external view returns (address);

  function _getSuTokenRateMantissa() external view returns (uint256);
}


// File contracts/Comptroller.sol

pragma solidity ^0.5.16;









contract PriceOracle {
  /// @notice Indicator that this is a PriceOracle contract (for inspection)
  bool public constant isPriceOracle = true;

  /**
   * @notice Get the underlying price of a cToken asset
   * @param cToken The cToken to get the underlying price of
   * @return The underlying asset price mantissa (scaled by 1e18).
   *  Zero means the price is unavailable.
   */
  function getUnderlyingPrice(address cToken) external view returns (uint256);
}

/**
 * @title Compound's Comptroller Contract
 * @author Compound
 */
contract Comptroller is ComptrollerV7Storage, ComptrollerInterface, ComptrollerErrorReporter, ExponentialNoError {
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
  uint256 internal constant closeFactorMinMantissa = 0.05e18; // 0.05

  // closeFactorMantissa must not exceed this value
  uint256 internal constant closeFactorMaxMantissa = 0.9e18; // 0.9

  // No collateralFactorMantissa may exceed this value
  uint256 internal constant collateralFactorMaxMantissa = 0.9e18; // 0.9

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

  /*** Moved to Admin
    function setEqAssetGroup(address cToken_, string memory groupName, uint rateMantissa) public returns (uint) {
        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK);
        }
   
        eqAssetGroup[address(cToken_)] = EqualAssets(groupName, rateMantissa);
        return uint(Error.NO_ERROR);
    }

    function removeEqAssetGroup(address cToken_) public returns (uint) {
        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK);
        }

        delete eqAssetGroup[address(cToken_)];
        return uint(Error.NO_ERROR);
    }

    function getEqAssetGroup(address cToken_) public view returns (EqualAssets memory) {
        return eqAssetGroup[address(cToken_)];
    }
***/

  /**
   * @notice Returns the assets an account has entered
   * @param account The address of the account to pull assets for
   * @return A dynamic list with the assets the account has entered
   */
  function getAssetsIn(address account) external view returns (address[] memory) {
    address[] memory assetsIn = accountAssets[account];

    return assetsIn;
  }

  /***
    function getAssetsIn(address account) external view returns (address[] memory) {
        //address[] memory assetsIn = accountAssets[account];
    
        uint count = 0;
        string[] memory groups = allEqualAssetsGroupNames[account];
        for (uint i=0; i<groups.length; i++) {
            EqualAssetsMember[] memory members = allEqualAssetsMembers[account][groups[i]];
            count += members.length;
        }

        address[] memory assets = new address[](count);
        count = 0;
        for (uint i=0; i<groups.length; i++) {
            EqualAssetsMember[] memory members = allEqualAssetsMembers[account][groups[i]];
            for (uint j=0; j<members.length; j++) {
                assets[count] = members[j].token;
                count ++;
            }
        }
        return assets;
    }
***/

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
   * @notice Returns the assets groups an account has entered
   * @param account The address of the account to pull assets for
   * @return A dynamic list with the assets the account has entered
   */
  /****
    function getAssetsGroupNames(address account) external view returns (string[] memory) {
        return allEqualAssetsGroupNames[account];
    }

    function getAssetsGroupMembers(address account, string calldata groupName) external view returns (EqualAssetsMember[] memory) {
        return allEqualAssetsMembers[account][groupName];
    }
    ***/

  /**
   * @notice Add assets to be included in account liquidity calculation
   * @param cTokens The list of addresses of the cToken markets to be enabled
   * @return Success indicator for whether each corresponding market was entered
   */
  function enterMarkets(address[] memory cTokens) public returns (uint256[] memory) {
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

    if (marketToJoin.accountMembership[borrower] == true) {
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
  function exitMarket(address cTokenAddress) external returns (uint256) {
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

    /* Return true if the sender is not already ‘in’ the market */
    if (!marketToExit.accountMembership[msg.sender]) {
      return uint256(Error.NO_ERROR);
    }

    /* Set cToken account membership to false */
    delete marketToExit.accountMembership[msg.sender];

    /* Delete cToken from the account’s list of assets */
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
    storedList.length--;

    // remove the same
    //exitEqualAssetGroupInternal(cTokenAddress, msg.sender);

    emit MarketExited(cToken, msg.sender);

    return uint256(Error.NO_ERROR);
  }

  /***
    function addToEqualAssetGroupInternal(address cToken, address borrower, string memory groupName, uint rateMantissa) internal  {
        allEqualAssetsMembers[borrower][groupName].push(EqualAssetsMember(cToken, rateMantissa));
        // add group name
        allEqualAssetsGroupNames[borrower].push(groupName);

    }

    function exitEqualAssetGroupInternal(address cToken, address borrower) internal  {
        UnderwriterAdminInterface.EqualAssets memory eqAssets = UnderwriterAdminInterface(underWriterAdmin).getEqAssetGroup(cToken); 

        // remove token from member
        EqualAssetsMember[] memory mbs = allEqualAssetsMembers[borrower][eqAssets.groupName];
        uint memberIndex = mbs.length;
        uint memberLen = mbs.length;
        for (uint i=0; i<memberLen; i++) {
            if (address(mbs[i].token) == cToken) {
                memberIndex = i;
                break;
            }    
        }
        // *must* have found one
        assert(memberIndex < memberLen);

        EqualAssetsMember[] storage eqAssetMembers = allEqualAssetsMembers[borrower][eqAssets.groupName];
        eqAssetMembers[memberIndex] = eqAssetMembers[memberLen-1];
        eqAssetMembers.length --;

        // remove the group if it does not have any member
        if (eqAssetMembers.length == 0) {
            // remove group name
            string[] memory gns = allEqualAssetsGroupNames[borrower];
            uint gnIndex = gns.length;
            uint gnLen = gns.length;
            for (uint i=0; i<gnLen; i++) {
                if (keccak256(bytes(eqAssets.groupName)) == keccak256(bytes(gns[i]))) {
                    gnIndex = i;
                    break;
                }
            }
            assert(gnIndex < gnLen);

            string[] storage groupNames = allEqualAssetsGroupNames[borrower];
            groupNames[gnIndex] = groupNames[groupNames.length -1];
            groupNames.length --;
        }
    }       
    ***/
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
  ) external returns (uint256) {
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
  ) external {
    // Shh - currently unused
    cToken;
    minter;
    actualMintAmount;
    mintTokens;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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
  ) external returns (uint256) {
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
  ) external {
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
  ) external returns (uint256) {
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
  ) external {
    // Shh - currently unused
    cToken;
    borrower;
    borrowAmount;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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
  ) external {
    // Shh - currently unused
    cToken;
    payer;
    borrower;
    actualRepayAmount;
    borrowerIndex;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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
  ) external returns (uint256) {
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
  ) external {
    // Shh - currently unused
    cTokenBorrowed;
    cTokenCollateral;
    liquidator;
    borrower;
    actualRepayAmount;
    seizeTokens;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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
  ) external {
    // Shh - currently unused
    cTokenCollateral;
    cTokenBorrowed;
    liquidator;
    borrower;
    seizeTokens;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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
  ) external {
    // Shh - currently unused
    cToken;
    src;
    dst;
    transferTokens;

    // Shh - we don't ever want this hook to be marked pure
    if (false) {
      maxAssets = maxAssets;
    }
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

    if ((cTokenModify != address(0)) && (CTokenInterface(cTokenModify).isCToken() == false)) {
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
      (oErr, vars.cTokenBalance, vars.borrowBalance, vars.exchangeRateMantissa) = CTokenInterface(asset).getAccountSnapshot(account);
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
      require(index < vars.equalAssetsGroupNum);

      if (CTokenInterface(asset).isCToken() == true) {
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
      vars.interGroupCTokenCollateralRate = Exp({
        mantissa: equalAssetsGroup.interGroupCTokenRateMantissa
      });
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
  ) external view returns (uint256, uint256) {
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
    underWriterAdmin = underWriter;
    return underWriter;
  }

  /**
   * @notice Sets the collateralFactor for a market
   * @dev Admin function to set per-market collateralFactor
   * @param cToken The market to set the factor on
   * @param newCollateralFactorMantissa The new collateral factor, scaled by 1e18
   * @return uint 0=success, otherwise a failure. (See ErrorReporter for details)
   */
  /*
    function _setCollateralFactor(address cToken, uint newCollateralFactorMantissa) external returns (uint) {
        // Check caller is admin
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_COLLATERAL_FACTOR_OWNER_CHECK);
        }

        // Verify market is listed
        Market storage market = markets[cToken];
        if (!market.isListed) {
            return fail(Error.MARKET_NOT_LISTED, FailureInfo.SET_COLLATERAL_FACTOR_NO_EXISTS);
        }

        Exp memory newCollateralFactorExp = Exp({mantissa: newCollateralFactorMantissa});

        // Check collateral factor <= 0.9
        Exp memory highLimit = Exp({mantissa: collateralFactorMaxMantissa});
        if (lessThanExp(highLimit, newCollateralFactorExp)) {
            return fail(Error.INVALID_COLLATERAL_FACTOR, FailureInfo.SET_COLLATERAL_FACTOR_VALIDATION);
        }

        // If collateral factor != 0, fail if price == 0
        if (newCollateralFactorMantissa != 0 && PriceOracle(oracle).getUnderlyingPrice(cToken) == 0) {
            return fail(Error.PRICE_ERROR, FailureInfo.SET_COLLATERAL_FACTOR_WITHOUT_PRICE);
        }

        // Set market's collateral factor to new collateral factor, remember old value
        uint oldCollateralFactorMantissa = market.collateralFactorMantissa;
        market.collateralFactorMantissa = newCollateralFactorMantissa;

        // Emit event with asset, old collateral factor, and new collateral factor
        emit NewCollateralFactor(cToken, oldCollateralFactorMantissa, newCollateralFactorMantissa);

        return uint(Error.NO_ERROR);
    }
    **/

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

    CTokenInterface(cToken).isCToken(); // Sanity check to make sure its really a address

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

  /**
   * @notice Set the given borrow caps for the given cToken markets. Borrowing that brings total borrows to or above borrow cap will revert.
   * @dev Admin or borrowCapGuardian function to set the borrow caps. A borrow cap of 0 corresponds to unlimited borrowing.
   * @param cTokens The addresses of the markets (tokens) to change the borrow caps for
   * @param newBorrowCaps The new borrow cap values in underlying to be set. A value of 0 corresponds to unlimited borrowing.
   */
  /**** Moved to Admin
    function _setMarketBorrowCaps(address[] calldata cTokens, uint[] calldata newBorrowCaps) external {
    	require(msg.sender == admin || msg.sender == borrowCapGuardian, "only admin or borrow cap guardian can set borrow caps"); 

        uint numMarkets = cTokens.length;
        uint numBorrowCaps = newBorrowCaps.length;

        require(numMarkets != 0 && numMarkets == numBorrowCaps, "invalid input");

        for(uint i = 0; i < numMarkets; i++) {
            borrowCaps[address(cTokens[i])] = newBorrowCaps[i];
            emit NewBorrowCap(cTokens[i], newBorrowCaps[i]);
        }
    }
    ***/

  /**
   * @notice Admin function to change the Borrow Cap Guardian
   * @param newBorrowCapGuardian The address of the new Borrow Cap Guardian
   */
  /****  move to Admin
    function _setBorrowCapGuardian(address newBorrowCapGuardian) external {
        require(msg.sender == admin, "only admin can set borrow cap guardian");

        // Save current value for inclusion in log
        address oldBorrowCapGuardian = borrowCapGuardian;

        // Store borrowCapGuardian with value newBorrowCapGuardian
        borrowCapGuardian = newBorrowCapGuardian;

        // Emit NewBorrowCapGuardian(OldBorrowCapGuardian, NewBorrowCapGuardian)
        emit NewBorrowCapGuardian(oldBorrowCapGuardian, newBorrowCapGuardian);
    }
    ****/

  /**
   * @notice Admin function to change the Pause Guardian
   * @param newPauseGuardian The address of the new Pause Guardian
   * @return uint 0=success, otherwise a failure. (See enum Error for details)
   */
  /*** move to admin
    function _setPauseGuardian(address newPauseGuardian) public returns (uint) {
        if (msg.sender != admin) {
            return fail(Error.UNAUTHORIZED, FailureInfo.SET_PAUSE_GUARDIAN_OWNER_CHECK);
        }

        // Save current value for inclusion in log
        address oldPauseGuardian = pauseGuardian;

        // Store pauseGuardian with value newPauseGuardian
        pauseGuardian = newPauseGuardian;

        // Emit NewPauseGuardian(OldPauseGuardian, NewPauseGuardian)
        emit NewPauseGuardian(oldPauseGuardian, pauseGuardian);

        return uint(Error.NO_ERROR);
    }
    ***/
  /*** Move to Admin
    function _setMintPaused(address cToken, bool state) public returns (bool) {
        require(markets[cToken].isListed, "cannot pause a market that is not listed");
        require(msg.sender == pauseGuardian || msg.sender == admin, "only pause guardian and admin can pause");
        require(msg.sender == admin || state == true, "only admin can unpause");

        mintGuardianPaused[cToken] = state;
        emit ActionPaused(cToken, "Mint", state);
        return state;
    }

    function _setBorrowPaused(address cToken, bool state) public returns (bool) {
        require(markets[cToken].isListed, "cannot pause a market that is not listed");
        require(msg.sender == pauseGuardian || msg.sender == admin, "only pause guardian and admin can pause");
        require(msg.sender == admin || state == true, "only admin can unpause");

        borrowGuardianPaused[cToken] = state;
        emit ActionPaused(cToken, "Borrow", state);
        return state;
    }

    function _setTransferPaused(bool state) public returns (bool) {
        require(msg.sender == pauseGuardian || msg.sender == admin, "only pause guardian and admin can pause");
        require(msg.sender == admin || state == true, "only admin can unpause");

        transferGuardianPaused = state;
        emit ActionPaused("Transfer", state);
        return state;
    }

    function _setSeizePaused(bool state) public returns (bool) {
        require(msg.sender == pauseGuardian || msg.sender == admin, "only pause guardian and admin can pause");
        require(msg.sender == admin || state == true, "only admin can unpause");

        seizeGuardianPaused = state;
        emit ActionPaused("Seize", state);
        return state;
    }
***/

  function _become(Unitroller unitroller) public {
    require(msg.sender == unitroller.admin(), 'only unitroller admin can change brains');
    require(unitroller._acceptImplementation() == 0, 'change not authorized');
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
      if (borrowers == true) {
        Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
        updateCompBorrowIndex(cToken, borrowIndex);
        for (uint256 j = 0; j < holders.length; j++) {
          distributeBorrowerComp(cToken, holders[j], borrowIndex);
        }
      }
      if (suppliers == true) {
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
      UnderwriterAdminInterface(underWriterAdmin)._getBorrowPaused(cToken) == true &&
      CTokenInterface(cToken).reserveFactorMantissa() == 1e18;
  }

  function getBlockNumber() public view returns (uint256) {
    return block.number;
  }

  // Move to admin
  /**
   * @notice Return the address of the COMP token
   * @return The address of COMP
   */
  //function getCompAddress() public view returns (address) {
  /*
        return 0xc00e94Cb662C3520282E6f5717214004A7f26888;
        */
  //return governanceToken;
  //}

  /**
   * @notice Return the address of the COMP token
   * @param _governanceToken The address of COMP(governance token)
   */
  //function setGovTokenAddress(address _governanceToken) public  {
  //require(adminOrInitializing(), "only admin can set governanceToken");
  //governanceToken =  _governanceToken;
  //}
}
