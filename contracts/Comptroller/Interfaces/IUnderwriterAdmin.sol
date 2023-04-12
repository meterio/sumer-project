// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
pragma abicoder v2;

interface IUnderwriterAdmin {
  /// @notice Emitted when an action is paused on a market
  event ActionPaused(address cToken, string action, bool pauseState);

  /// @notice Emitted when borrow cap for a cToken is changed
  event NewBorrowCap(address indexed cToken, uint256 newBorrowCap);

  /// @notice Emitted when borrow cap guardian is changed
  event NewBorrowCapGuardian(address oldBorrowCapGuardian, address newBorrowCapGuardian);

  /// @notice Emitted when pause guardian is changed
  event NewPauseGuardian(address oldPauseGuardian, address newPauseGuardian);

  event EqAssetGroupAdded(
    uint8 indexed groupId,
    string indexed groupName,
    uint256 inGroupCTokenRateMantissa,
    uint256 inGroupSuTokenRateMantissa,
    uint256 interGroupCTokenRateMantissa,
    uint256 interGroupSuTokenRateMantissa,
    uint8 equalAssetsGroupNum
  );

  event EqAssetGroupRemoved(uint8 indexed groupId, uint8 equalAssetsGroupNum);

  event NewSuTokenRate(uint256 oldSuTokenRateMantissa, uint256 newSuTokenRateMantissa);

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
