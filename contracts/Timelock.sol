// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import './ITimelock.sol';
import './Interface/IPriceOracle.sol';
import './Exponential/CarefulMath.sol';

interface ICToken {
  function underlying() external view returns (address);

  function isCEther() external view returns (bool);
}

contract Timelock is ITimelock, AccessControlEnumerable, ReentrancyGuard {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.UintSet;
  using CarefulMath for uint256;

  bytes32 public constant EMERGENCY_ADMIN = keccak256('EMERGENCY_ADMIN');
  /// @notice address => agreement
  mapping(address => Agreement[]) public userAgreements;

  /// @notice cToken => underlying
  mapping(address => address) public cTokenToUnderlying;
  /// @notice underlying => underlyDetial
  mapping(address => Underlying) public underlyingDetail;
  bool public frozen;

  constructor(address[] memory cTokens) {
    for (uint i; i < cTokens.length; ++i) {
      address cToken = cTokens[i];
      require(cToken != address(0), 'invalid cToken');
      address underlying;
      if (ICToken(cToken).isCEther()) {
        underlying = address(1);
      } else {
        underlying = ICToken(cToken).underlying();
      }
      require(underlying != address(0), 'invalid underlying');
      cTokenToUnderlying[cToken] = underlying;
      underlyingDetail[underlying].cToken = cToken;
      underlyingDetail[underlying].isSupport = true;
      underlyingDetail[underlying].threshold = 100;
    }
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(EMERGENCY_ADMIN, msg.sender);
  }

  receive() external payable {}

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'only admin');
    _;
  }

  modifier onlyEmergencyAdmin() {
    require(hasRole(EMERGENCY_ADMIN, msg.sender), 'only emergency admin');
    _;
  }

  modifier onlyCToken(address underlying) {
    require(cTokenToUnderlying[msg.sender] == underlying && underlying != address(0), 'invalid underlying');
    require(underlyingDetail[underlying].isSupport, 'only ctoken');
    _;
  }

  function setUnderly(address cToken, address underlying, bool isSupport_) external onlyAdmin {
    cTokenToUnderlying[cToken] = underlying;
    underlyingDetail[underlying].cToken = cToken;
    underlyingDetail[underlying].isSupport = isSupport_;
  }

  function setThreshold(address underlying, uint256 threshold) external onlyAdmin {
    underlyingDetail[underlying].threshold = threshold;
  }

  function setLockDuration(address underlying, uint48 lockDuration) external onlyAdmin {
    underlyingDetail[underlying].lockDuration = lockDuration;
  }

  function rescueERC20(address token, address to, uint256 amount) external onlyEmergencyAdmin {
    IERC20(token).safeTransfer(to, amount);
    emit RescueERC20(token, to, amount);
  }

  function sort_array(uint256[] memory arr) private pure returns (uint256[] memory) {
    uint256 l = arr.length;
    for (uint i = 0; i < l; i++) {
      for (uint j = i + 1; j < l; j++) {
        if (arr[i] < arr[j]) {
          uint256 temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

  function createAgreement(
    TimeLockActionType actionType,
    address underlying,
    uint256 amount,
    address beneficiary
  ) external onlyCToken(underlying) returns (uint256) {
    require(beneficiary != address(0), 'invalid beneficiary');
    uint256 underlyBalance;
    if (underlying == address(1)) {
      underlyBalance = address(this).balance;
    } else {
      underlyBalance = IERC20(underlying).balanceOf(address(this));
    }
    require(underlyBalance >= underlyingDetail[underlying].totalBalance + amount, 'not enough underly balance');
    underlyingDetail[underlying].totalBalance = underlyBalance;

    uint48 releaseTime = uint48(block.timestamp) + underlyingDetail[underlying].lockDuration;
    uint256 index = userAgreements[beneficiary].length;
    userAgreements[beneficiary].push(
      Agreement({
        actionType: actionType,
        isFrozen: false,
        underlying: underlying,
        releaseTime: releaseTime,
        amount: amount
      })
    );

    emit AgreementCreated(beneficiary, index, underlying, actionType, amount, releaseTime);
    return index;
  }

  function _validateAndDeleteAgreement(
    address beneficiary,
    uint256 agreementIndex
  ) internal returns (Agreement memory) {
    uint256 length = uint256(userAgreements[beneficiary].length);
    require(agreementIndex < length, 'agreement index out of bound');
    Agreement memory agreement = userAgreements[beneficiary][agreementIndex];
    require(block.timestamp >= agreement.releaseTime, 'release time not reached');
    require(!agreement.isFrozen, 'agreement frozen');

    // Move the last element to the deleted spot.
    // Remove the last element.
    delete userAgreements[beneficiary][agreementIndex];
    userAgreements[beneficiary][agreementIndex] = userAgreements[beneficiary][userAgreements[beneficiary].length - 1];
    userAgreements[beneficiary].pop();

    emit AgreementClaimed(beneficiary, agreementIndex, agreement.underlying, agreement.actionType, agreement.amount);

    return agreement;
  }

  function claim(uint256[] calldata agreementIndexes) external nonReentrant {
    uint256[] memory sorted = sort_array(agreementIndexes);
    require(!frozen, 'timeLock frozen');

    for (uint256 i = 0; i < agreementIndexes.length; i++) {
      Agreement memory agreement = _validateAndDeleteAgreement(msg.sender, sorted[i]);
      if (agreement.underlying == address(1)) {
        // payable(agreement.beneficiary).transfer(agreement.amount);
        Address.sendValue(payable(msg.sender), agreement.amount);
      } else {
        IERC20(agreement.underlying).safeTransfer(msg.sender, agreement.amount);
      }
      underlyingDetail[agreement.underlying].totalBalance -= agreement.amount;
    }
  }

  function underlyingDetails(address[] calldata underlyings) external view returns (Underlying[] memory) {
    uint256 underlyingLength = underlyings.length;
    Underlying[] memory details = new Underlying[](underlyingLength);
    for (uint256 i; i < underlyingLength; ++i) {
      details[i] = underlyingDetail[underlyings[i]];
    }
    return details;
  }

  function isSupport(address underlying) external view returns (bool) {
    return underlyingDetail[underlying].isSupport;
  }

  function overThreshold(
    address underlying,
    address oracle,
    uint256 amount,
    uint8 decimals
  ) external view returns (bool) {
    // Get price of asset
    address ctoken = underlyingDetail[underlying].cToken;
    uint256 oraclePriceMantissa = IPriceOracle(oracle).getUnderlyingPrice(ctoken);
    require(oraclePriceMantissa > 0, 'price error');

    // normalize price for asset with unit of 1e(36-token decimal)
    if (decimals < 18) {
      (, oraclePriceMantissa) = oraclePriceMantissa.mulUInt(10 ** (18 - decimals));
    }
    (, uint256 usdValue) = oraclePriceMantissa.mulUInt(amount);
    (, usdValue) = usdValue.divUInt(10 ** 36);

    return usdValue > underlyingDetail[underlying].threshold;
  }

  function getAllAgreementsFor(address beneficiary) external view returns (Agreement[] memory) {
    Agreement[] memory agreements = userAgreements[beneficiary];
    return agreements;
  }

  function freezeAgreement(address beneficiary, uint256 agreementIndex) external onlyEmergencyAdmin {
    require(agreementIndex < userAgreements[beneficiary].length, 'agreement index out of bound');
    userAgreements[beneficiary][agreementIndex].isFrozen = true;
    emit AgreementFrozen(beneficiary, agreementIndex, true);
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
