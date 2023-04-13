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

  event NewAssetGroup(
    uint8 indexed groupId,
    string indexed groupName,
    uint256 intraCRateMantissa,
    uint256 intraMintRateMantissa,
    uint256 intraSuRateMantissa,
    uint256 interCRateMantissa,
    uint256 interSuRateMantissa,
    uint8 assetsGroupNum
  );

  event RemoveAssetGroup(uint8 indexed groupId, uint8 equalAssetsGroupNum);

  /// @notice AssetGroup, contains information of groupName and rateMantissas
  struct AssetGroup {
    uint8 groupId;
    string groupName;
    uint256 intraCRateMantissa;
    uint256 intraMintRateMantissa;
    uint256 intraSuRateMantissa;
    uint256 interCRateMantissa;
    uint256 interSuRateMantissa;
  }

  function getAssetGroupNum() external view returns (uint8);

  function getAssetGroup(uint8 groupId) external view returns (AssetGroup memory);

  function _getMintPaused(address cToken) external returns (bool);

  function _getTransferPaused() external view returns (bool);

  function _getBorrowPaused(address cToken) external view returns (bool);

  function _getSeizePaused() external view returns (bool);

  function getCompAddress() external view returns (address);

  function _getMarketBorrowCap(address cToken) external view returns (uint256);

}
