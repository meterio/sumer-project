// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './ITimelock.sol';

interface ICToken {
  function underlying() external view returns (address);

  function isCEther() external view returns (bool);
}

contract Timelock is ITimelock, AccessControlEnumerable, ReentrancyGuard {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.UintSet;

  bytes32 public constant EMERGENCY_ADMIN = keccak256('EMERGENCY_ADMIN');
  mapping(address => EnumerableSet.UintSet) private _userAgreements;
  mapping(uint256 => Agreement) private agreements;
  mapping(address => uint256) public underlyBalances;
  mapping(address => address) public cTokenToUnderly;
  uint256 public agreementCount;
  bool public frozen;
  uint256 public lockDuration = 2 hours;

  constructor(address[] memory cTokens) {
    for (uint i; i < cTokens.length; ++i) {
      address cToken = cTokens[i];
      require(cToken != address(0), 'cToken is zero');
      if (ICToken(cToken).isCEther()) {
        cTokenToUnderly[cToken] = address(1);
      } else {
        cTokenToUnderly[cToken] = ICToken(cToken).underlying();
      }
    }
  }

  receive() external payable {}

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'CALLER_NOT_ADMIN');
    _;
  }

  modifier onlyEmergencyAdmin() {
    require(hasRole(EMERGENCY_ADMIN, msg.sender), 'CALLER_NOT_EMERGENCY_ADMIN');
    _;
  }

  modifier onlyCToken(address underly) {
    require(cTokenToUnderly[msg.sender] == underly && underly != address(0), 'CALLER_NOT_CTOKEN');
    _;
  }

  function setUnderly(address cToken, address underly) external onlyAdmin {
    cTokenToUnderly[cToken] = underly;
  }

  function setLockDuration(uint256 _lockDuration) external onlyAdmin {
    lockDuration = _lockDuration;
  }

  function rescueERC20(address token, address to, uint256 amount) external onlyEmergencyAdmin {
    IERC20(token).safeTransfer(to, amount);
    emit RescueERC20(token, to, amount);
  }

  function createAgreement(
    TimeLockActionType actionType,
    address underly,
    uint256 amount,
    address beneficiary
  ) external onlyCToken(underly) returns (uint256) {
    require(beneficiary != address(0), 'Beneficiary cant be zero address');
    uint256 underlyBalance;
    if (underly == address(1)) {
      underlyBalance = address(this).balance;
    } else {
      underlyBalance = IERC20(underly).balanceOf(address(this));
    }
    require(underlyBalance >= underlyBalances[underly] + amount, 'balance error');
    underlyBalances[underly] = underlyBalance;

    uint256 agreementId = agreementCount++;
    uint256 releaseTime = block.timestamp + lockDuration;
    agreements[agreementId] = Agreement({
      actionType: actionType,
      underly: underly,
      amount: amount,
      beneficiary: beneficiary,
      releaseTime: releaseTime,
      isFrozen: false
    });
    _userAgreements[beneficiary].add(agreementId);

    emit AgreementCreated(agreementId, actionType, underly, amount, beneficiary, releaseTime);
    return agreementId;
  }

  function _validateAndDeleteAgreement(uint256 agreementId) internal returns (Agreement memory) {
    Agreement memory agreement = agreements[agreementId];
    require(msg.sender == agreement.beneficiary, 'Not beneficiary');
    require(block.timestamp >= agreement.releaseTime, 'Release time not reached');
    require(!agreement.isFrozen, 'Agreement frozen');
    delete agreements[agreementId];
    _userAgreements[agreement.beneficiary].remove(agreementId);

    emit AgreementClaimed(
      agreementId,
      agreement.actionType,
      agreement.underly,
      agreement.amount,
      agreement.beneficiary
    );

    return agreement;
  }

  function claim(uint256[] calldata agreementIds) external nonReentrant {
    require(!frozen, 'TimeLock is frozen');

    for (uint256 index = 0; index < agreementIds.length; index++) {
      Agreement memory agreement = _validateAndDeleteAgreement(agreementIds[index]);
      if (agreement.underly == address(1)) {
        payable(agreement.beneficiary).transfer(agreement.amount);
      } else {
        IERC20(agreement.underly).safeTransfer(agreement.beneficiary, agreement.amount);
      }
      underlyBalances[agreement.underly] -= agreement.amount;
    }
  }

  function userAgreements(address user) external view returns (Agreement[] memory) {
    uint256 agreementLength = _userAgreements[user].length();
    Agreement[] memory userAgreements = new Agreement[](agreementLength);
    for (uint256 i; i < agreementLength; ++i) {
      userAgreements[i] = agreements[_userAgreements[user].at(i)];
    }
    return userAgreements;
  }

  function freezeAgreement(uint256 agreementId) external onlyEmergencyAdmin {
    agreements[agreementId].isFrozen = true;
    emit AgreementFrozen(agreementId, true);
  }

  function freezeAllAgreements() external onlyEmergencyAdmin {
    frozen = true;
    emit TimeLockFrozen(true);
  }

  function unfreezeAllAgreements() external onlyAdmin {
    frozen = false;
    emit TimeLockFrozen(false);
  }
}
