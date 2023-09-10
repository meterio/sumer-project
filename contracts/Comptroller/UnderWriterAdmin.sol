// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './ComptrollerErrorReporter.sol';
import './UnderwriterStorage.sol';
import './Interfaces/IPriceOracle.sol';
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract UnderwriterAdmin is IUnderwriterAdmin, UnderwriterStorage, Initializable {
  function initialize(address _gov, address _admin) external initializer {
    admin = _admin;
    governanceToken = _gov;
    suTokenRateMantissa = 10**18;
  }

  function setAssetGroup(
    uint8 groupId,
    string memory groupName,
    uint256 intraCRateMantissa, // ctoken collateral rate for intra group ctoken liability
    uint256 intraMintRateMantissa, // ctoken collateral rate for intra group sutoken liability
    uint256 intraSuRateMantissa, // sutoken collateral rate for intra group ctoken liability
    uint256 interCRateMantissa, // ctoken collateral rate for inter group ctoken/sutoken liability
    uint256 interSuRateMantissa // sutoken collateral rate for inter group ctoken/sutoken liability
  ) external returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return
        ComptrollerErrorReporter.fail(
          ComptrollerErrorReporter.Error.UNAUTHORIZED,
          ComptrollerErrorReporter.FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK
        );
    }

    eqAssetGroup[groupId] = AssetGroup(
      groupId,
      groupName,
      intraCRateMantissa,
      intraMintRateMantissa,
      intraSuRateMantissa,
      interCRateMantissa,
      interSuRateMantissa
    );
    equalAssetsGroupNum++;
    emit NewAssetGroup(
      groupId,
      groupName,
      intraCRateMantissa,
      intraMintRateMantissa,
      intraSuRateMantissa,
      interCRateMantissa,
      interSuRateMantissa,
      equalAssetsGroupNum
    );
    return uint256(ComptrollerErrorReporter.Error.NO_ERROR);
  }

  function removeAssetGroup(uint8 groupId) external returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return
        ComptrollerErrorReporter.fail(
          ComptrollerErrorReporter.Error.UNAUTHORIZED,
          ComptrollerErrorReporter.FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK
        );
    }

    delete eqAssetGroup[groupId];
    equalAssetsGroupNum--;
    emit RemoveAssetGroup(groupId, equalAssetsGroupNum);
    return uint256(ComptrollerErrorReporter.Error.NO_ERROR);
  }

  function getAssetGroup(uint8 groupId) external view override returns (AssetGroup memory) {
    return eqAssetGroup[groupId];
  }

  function getAssetGroupNum() external view override returns (uint8) {
    return equalAssetsGroupNum;
  }

  /**
   * @notice Admin function to change the Pause Guardian
   * @param newPauseGuardian The address of the new Pause Guardian
   * @return uint 0=success, otherwise a failure. (See enum Error for details)
   */
  function _setPauseGuardian(address newPauseGuardian) external returns (uint256) {
    if (msg.sender != admin) {
      return
        ComptrollerErrorReporter.fail(
          ComptrollerErrorReporter.Error.UNAUTHORIZED,
          ComptrollerErrorReporter.FailureInfo.SET_PAUSE_GUARDIAN_OWNER_CHECK
        );
    }
    require(newPauseGuardian != address(0), 'Address is Zero!');

    // Save current value for inclusion in log
    address oldPauseGuardian = pauseGuardian;

    // Store pauseGuardian with value newPauseGuardian
    pauseGuardian = newPauseGuardian;

    // Emit NewPauseGuardian(OldPauseGuardian, NewPauseGuardian)
    emit NewPauseGuardian(oldPauseGuardian, pauseGuardian);

    return uint256(ComptrollerErrorReporter.Error.NO_ERROR);
  }

  function _getPauseGuardian() external view returns (address) {
    return pauseGuardian;
  }

  function _setMintPaused(ICToken cToken, bool state) external returns (bool) {
    //require(markets[address(cToken)].isListed, "cannot pause a market that is not listed");
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state, 'only admin can unpause');

    mintGuardianPaused[address(cToken)] = state;
    emit ActionPaused(address(cToken), 'Mint', state);
    return state;
  }

  function _getMintPaused(address cToken) external view override returns (bool) {
    return mintGuardianPaused[cToken];
  }

  function _setBorrowPaused(ICToken cToken, bool state) external returns (bool) {
    //require(markets[address(cToken)].isListed, "cannot pause a market that is not listed");
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state, 'only admin can unpause');

    borrowGuardianPaused[address(cToken)] = state;
    emit ActionPaused(address(cToken), 'Borrow', state);
    return state;
  }

  function _getBorrowPaused(address cToken) external view override returns (bool) {
    return borrowGuardianPaused[cToken];
  }

  function _setTransferPaused(bool state) external returns (bool) {
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state, 'only admin can unpause');

    transferGuardianPaused = state;
    emit ActionPaused(address(0), 'Transfer', state);
    return state;
  }

  function _getTransferPaused() external view override returns (bool) {
    return transferGuardianPaused;
  }

  function _setSeizePaused(bool state) external returns (bool) {
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state, 'only admin can unpause');

    seizeGuardianPaused = state;
    emit ActionPaused(address(0), 'Seize', state);
    return state;
  }

  function _getSeizePaused() external view override returns (bool) {
    return seizeGuardianPaused;
  }

  /**
   * @notice Return the address of the COMP token
   * @return The address of COMP
   */
  function getCompAddress() external view override returns (address) {
    /*
        return 0xc00e94Cb662C3520282E6f5717214004A7f26888;
        */
    return governanceToken;
  }

  /**
   * @notice Return the address of the COMP token
   * @param _governanceToken The address of COMP(governance token)
   */
  function setGovTokenAddress(address _governanceToken) external {
    //require(adminOrInitializing(), "only admin can set governanceToken");
    require(msg.sender == admin, 'only admin can set');
    require(_governanceToken != address(0), 'Address is Zero!');
    governanceToken = _governanceToken;
  }

  /**
   * @notice Set the given borrow caps for the given cToken markets. Borrowing that brings total borrows to or above borrow cap will revert.
   * @dev Admin or borrowCapGuardian function to set the borrow caps. A borrow cap of 0 corresponds to unlimited borrowing.
   * @param cTokens The addresses of the markets (tokens) to change the borrow caps for
   * @param newBorrowCaps The new borrow cap values in underlying to be set. A value of 0 corresponds to unlimited borrowing.
   */
  function _setMarketBorrowCaps(ICToken[] calldata cTokens, uint256[] calldata newBorrowCaps) external {
    require(
      msg.sender == admin || msg.sender == borrowCapGuardian,
      'only admin or borrow cap guardian can set borrow caps'
    );

    uint256 numMarkets = cTokens.length;
    uint256 numBorrowCaps = newBorrowCaps.length;

    require(numMarkets != 0 && numMarkets == numBorrowCaps, 'invalid input');

    for (uint256 i = 0; i < numMarkets; i++) {
      borrowCaps[address(cTokens[i])] = newBorrowCaps[i];
      emit NewBorrowCap(address(cTokens[i]), newBorrowCaps[i]);
    }
  }

  function _getMarketBorrowCap(address cToken) external view override returns (uint256) {
    return borrowCaps[cToken];
  }

  /**
   * @notice Admin function to change the Borrow Cap Guardian
   * @param newBorrowCapGuardian The address of the new Borrow Cap Guardian
   */
  function _setBorrowCapGuardian(address newBorrowCapGuardian) external {
    require(msg.sender == admin, 'only admin can set borrow cap guardian');
    require(newBorrowCapGuardian != address(0), 'Address is Zero!');

    // Save current value for inclusion in log
    address oldBorrowCapGuardian = borrowCapGuardian;

    // Store borrowCapGuardian with value newBorrowCapGuardian
    borrowCapGuardian = newBorrowCapGuardian;

    // Emit NewBorrowCapGuardian(OldBorrowCapGuardian, NewBorrowCapGuardian)
    emit NewBorrowCapGuardian(oldBorrowCapGuardian, newBorrowCapGuardian);
  }

  function _getBorrowCapGuardian() external view returns (address) {
    return borrowCapGuardian;
  }

}
