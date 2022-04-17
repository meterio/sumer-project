pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
import './CToken.sol';
import './PriceOracle.sol';

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

contract UnderwriterAdminInterface {
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

  function getEqAssetGroupNum() public view returns (uint8);

  function getEqAssetGroup(uint8 groupId) public view returns (EqualAssets memory);

  function _getPauseGuardian() public view returns (address);

  function _getMintPaused(CToken cToken) public returns (bool);

  function _getTransferPaused() public view returns (bool);

  function _getBorrowPaused(CToken cToken) public view returns (bool);

  function _getSeizePaused() public view returns (bool);

  function getCompAddress() public view returns (address);

  function _getMarketBorrowCap(CToken cToken) external view returns (uint256);

  function _getBorrowCapGuardian() external view returns (address);

  function _getSuTokenRateMantissa() external view returns (uint256);
}
