// Sources flattened with hardhat v2.9.3 https://hardhat.org

// File contracts/ComptrollerErrorReporter.sol

pragma solidity 0.6.11;

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


// File contracts/ComptrollerStorage.sol

pragma solidity 0.6.11;


// File contracts/ComptrollerStorage.sol

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


// File contracts/Unitroller.sol

pragma solidity 0.6.11;


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
  function _setPendingImplementation(address newPendingImplementation) public returns (uint256) {
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_PENDING_IMPLEMENTATION_OWNER_CHECK);
    }
    require(newPendingImplementation != address(0), 'Address is Zero!');

    address oldPendingImplementation = pendingComptrollerImplementation;

    pendingComptrollerImplementation = newPendingImplementation;

    emit NewPendingImplementation(oldPendingImplementation, pendingComptrollerImplementation);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Accepts new implementation of comptroller. msg.sender must be pendingImplementation
   * @dev Admin function for new implementation to accept it's role as implementation
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _acceptImplementation() public returns (uint256) {
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

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
   * @dev Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.
   * @param newPendingAdmin New pending admin.
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _setPendingAdmin(address newPendingAdmin) public returns (uint256) {
    // Check caller = admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_PENDING_ADMIN_OWNER_CHECK);
    }
    require(newPendingAdmin != address(0), 'Address is Zero!');

    // Save current value, if any, for inclusion in log
    address oldPendingAdmin = pendingAdmin;

    // Store pendingAdmin with value newPendingAdmin
    pendingAdmin = newPendingAdmin;

    // Emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin)
    emit NewPendingAdmin(oldPendingAdmin, newPendingAdmin);

    return uint256(Error.NO_ERROR);
  }

  /**
   * @notice Accepts transfer of admin rights. msg.sender must be pendingAdmin
   * @dev Admin function for pending admin to accept role and update admin
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _acceptAdmin() public returns (uint256) {
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

    return uint256(Error.NO_ERROR);
  }

  /**
   * @dev Delegates execution to an implementation contract.
   * It returns to the external caller whatever the implementation returns
   * or forwards reverts.
   */
  fallback() external payable {
    // delegate all other functions to current implementation
    (bool success, ) = comptrollerImplementation.delegatecall(msg.data);

    assembly {
      let free_mem_ptr := mload(0x40)
      returndatacopy(free_mem_ptr, 0, returndatasize())

      switch success
      case 0 {
        revert(free_mem_ptr, returndatasize())
      }
      default {
        return(free_mem_ptr, returndatasize())
      }
    }
  }
}
