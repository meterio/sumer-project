pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

import './CToken.sol';
import './PriceOracle.sol';
import './ErrorReporter.sol';
import './Governance/Comp.sol';
import './UnderwriterStorage.sol';
import './UnderwriterProxy.sol';

contract UnderwriterAdmin is UnderwriterAdminInterface, ComptrollerErrorReporter {
  /// @notice Emitted when an action is paused globally
  event ActionPaused(string action, bool pauseState);

  /// @notice Emitted when an action is paused on a market
  event ActionPaused(CToken cToken, string action, bool pauseState);

  /// @notice Emitted when borrow cap for a cToken is changed
  event NewBorrowCap(CToken indexed cToken, uint256 newBorrowCap);

  /// @notice Emitted when borrow cap guardian is changed
  event NewBorrowCapGuardian(address oldBorrowCapGuardian, address newBorrowCapGuardian);

  /// @notice Emitted when pause guardian is changed
  event NewPauseGuardian(address oldPauseGuardian, address newPauseGuardian);

  constructor(address _gov) public {
    admin = msg.sender;
    governanceToken = _gov;
    suTokenRateMantissa = 10**18;
  }

  function _become(UnderwriterProxy proxy) public {
    require(msg.sender == proxy.admin(), 'only unitroller admin can change brains');
    require(proxy._acceptImplementation() == 0, 'change not authorized');
  }

  function setEqAssetGroup(
    uint8 groupId,
    string memory groupName,
    uint256 inGroupCTokenRateMantissa,
    uint256 inGroupSuTokenRateMantissa,
    uint256 interGroupCTokenRateMantissa,
    uint256 interGroupSuTokenRateMantissa
  ) public returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK);
    }

    eqAssetGroup[groupId] = EqualAssets(
      groupId,
      groupName,
      inGroupCTokenRateMantissa,
      inGroupSuTokenRateMantissa,
      interGroupCTokenRateMantissa,
      interGroupSuTokenRateMantissa
    );
    equalAssetsGroupNum++;
    return uint256(Error.NO_ERROR);
  }

  function removeEqAssetGroup(uint8 groupId) public returns (uint256) {
    // Check caller is admin
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_EQUAL_ASSET_GROUP_OWNER_CHECK);
    }

    delete eqAssetGroup[groupId];
    equalAssetsGroupNum--;
    return uint256(Error.NO_ERROR);
  }

  function getEqAssetGroup(uint8 groupId) public view returns (EqualAssets memory) {
    return eqAssetGroup[groupId];
  }

  function getEqAssetGroupNum() public view returns (uint8) {
    return equalAssetsGroupNum;
  }

  /**
   * @notice Admin function to change the Pause Guardian
   * @param newPauseGuardian The address of the new Pause Guardian
   * @return uint 0=success, otherwise a failure. (See enum Error for details)
   */
  function _setPauseGuardian(address newPauseGuardian) public returns (uint256) {
    if (msg.sender != admin) {
      return fail(Error.UNAUTHORIZED, FailureInfo.SET_PAUSE_GUARDIAN_OWNER_CHECK);
    }

    // Save current value for inclusion in log
    address oldPauseGuardian = pauseGuardian;

    // Store pauseGuardian with value newPauseGuardian
    pauseGuardian = newPauseGuardian;

    // Emit NewPauseGuardian(OldPauseGuardian, NewPauseGuardian)
    emit NewPauseGuardian(oldPauseGuardian, pauseGuardian);

    return uint256(Error.NO_ERROR);
  }

  function _getPauseGuardian() public view returns (address) {
    return pauseGuardian;
  }

  function _setMintPaused(CToken cToken, bool state) public returns (bool) {
    //require(markets[address(cToken)].isListed, "cannot pause a market that is not listed");
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state == true, 'only admin can unpause');

    mintGuardianPaused[address(cToken)] = state;
    emit ActionPaused(cToken, 'Mint', state);
    return state;
  }

  function _getMintPaused(CToken cToken) public returns (bool) {
    return mintGuardianPaused[address(cToken)];
  }

  function _setBorrowPaused(CToken cToken, bool state) public returns (bool) {
    //require(markets[address(cToken)].isListed, "cannot pause a market that is not listed");
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state == true, 'only admin can unpause');

    borrowGuardianPaused[address(cToken)] = state;
    emit ActionPaused(cToken, 'Borrow', state);
    return state;
  }

  function _getBorrowPaused(CToken cToken) public view returns (bool) {
    return borrowGuardianPaused[address(cToken)];
  }

  function _setTransferPaused(bool state) public returns (bool) {
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state == true, 'only admin can unpause');

    transferGuardianPaused = state;
    emit ActionPaused('Transfer', state);
    return state;
  }

  function _getTransferPaused() public view returns (bool) {
    return transferGuardianPaused;
  }

  function _setSeizePaused(bool state) public returns (bool) {
    require(msg.sender == pauseGuardian || msg.sender == admin, 'only pause guardian and admin can pause');
    require(msg.sender == admin || state == true, 'only admin can unpause');

    seizeGuardianPaused = state;
    emit ActionPaused('Seize', state);
    return state;
  }

  function _getSeizePaused() public view returns (bool) {
    return seizeGuardianPaused;
  }

  /**
   * @notice Return the address of the COMP token
   * @return The address of COMP
   */
  function getCompAddress() public view returns (address) {
    /*
        return 0xc00e94Cb662C3520282E6f5717214004A7f26888;
        */
    return governanceToken;
  }

  /**
   * @notice Return the address of the COMP token
   * @param _governanceToken The address of COMP(governance token)
   */
  function setGovTokenAddress(address _governanceToken) public {
    //require(adminOrInitializing(), "only admin can set governanceToken");
    require(msg.sender == admin, 'only admin can set');
    governanceToken = _governanceToken;
  }

  /**
   * @notice Set the given borrow caps for the given cToken markets. Borrowing that brings total borrows to or above borrow cap will revert.
   * @dev Admin or borrowCapGuardian function to set the borrow caps. A borrow cap of 0 corresponds to unlimited borrowing.
   * @param cTokens The addresses of the markets (tokens) to change the borrow caps for
   * @param newBorrowCaps The new borrow cap values in underlying to be set. A value of 0 corresponds to unlimited borrowing.
   */
  function _setMarketBorrowCaps(CToken[] calldata cTokens, uint256[] calldata newBorrowCaps) external {
    require(
      msg.sender == admin || msg.sender == borrowCapGuardian,
      'only admin or borrow cap guardian can set borrow caps'
    );

    uint256 numMarkets = cTokens.length;
    uint256 numBorrowCaps = newBorrowCaps.length;

    require(numMarkets != 0 && numMarkets == numBorrowCaps, 'invalid input');

    for (uint256 i = 0; i < numMarkets; i++) {
      borrowCaps[address(cTokens[i])] = newBorrowCaps[i];
      emit NewBorrowCap(cTokens[i], newBorrowCaps[i]);
    }
  }

  function _getMarketBorrowCap(CToken cToken) external view returns (uint256) {
    return borrowCaps[address(cToken)];
  }

  /**
   * @notice Admin function to change the Borrow Cap Guardian
   * @param newBorrowCapGuardian The address of the new Borrow Cap Guardian
   */
  function _setBorrowCapGuardian(address newBorrowCapGuardian) external {
    require(msg.sender == admin, 'only admin can set borrow cap guardian');

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

  /**
   * @notice Admin function to change the suTokenRateMantissa
   * @param  _suTokenRateMantissa The address of the new suTokenRateMantissa
   */
  function _setSuTokenRateMantissa(uint256 _suTokenRateMantissa) external {
    require(msg.sender == admin, 'only admin can set suTokenRateMantissa');
    suTokenRateMantissa = _suTokenRateMantissa;
  }

  function _getSuTokenRateMantissa() external view returns (uint256) {
    return suTokenRateMantissa;
  }
}
