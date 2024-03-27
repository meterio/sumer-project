pragma solidity 0.8.19;

import '../Interface/IRedemptionManager.sol';
import '../Interface/IComptroller.sol';
import './SortedBorrows.sol';
import '../Interface/IPriceOracle.sol';
import './LiquityMath.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../Exponential/ExponentialNoError.sol';

contract RedemptionManager is AccessControlEnumerableUpgradeable, IRedemptionManager {
  using SafeMath for uint;
  using ExponentialNoError for Exp;

  ISortedBorrows public sortedBorrows;
  IComptroller public comptroller;

  /*
   * Half-life of 12h. 12h = 720 min
   * (1/2) = d^720 => d = (1/2)^(1/720)
   */
  uint public constant DECIMAL_PRECISION = 1e18;
  uint public constant SECONDS_IN_ONE_MINUTE = 60;
  uint public constant MINUTE_DECAY_FACTOR = 999037758833783000;
  uint public constant REDEMPTION_FEE_FLOOR = (DECIMAL_PRECISION / 1000) * 5; // 0.5%
  uint public constant MAX_BORROWING_FEE = (DECIMAL_PRECISION / 100) * 5; // 5%

  /*
   * BETA: 18 digit decimal. Parameter by which to divide the redeemed fraction, in order to calc the new base rate from a redemption.
   * Corresponds to (1 / ALPHA) in the white paper.
   */
  uint public constant BETA = 2;

  uint public baseRate;

  // The timestamp of the latest fee operation (redemption or new LUSD issuance)
  uint public lastFeeOperationTime;

  event BaseRateUpdated(uint _baseRate);
  event LastFeeOpTimeUpdated(uint256 timestamp);

  function initialize(address _admin, ISortedBorrows _sortedBorrows) external initializer {
    _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    sortedBorrows = _sortedBorrows;
  }

  function setComptroller(IComptroller _comptroller) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(_comptroller.isComptroller(), 'invalid comptroller');
    comptroller = _comptroller;
  }

  function setSortedBorrows(ISortedBorrows _sortedBorrows) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(sortedBorrows.isSortedBorrows(), 'invalid sorted borrows');
    sortedBorrows = _sortedBorrows;
  }

  modifier onlyComptroller() {
    require(msg.sender == address(comptroller), 'only comptroller');
    _;
  }

  /*
   * This function has two impacts on the baseRate state variable:
   * 1) decays the baseRate based on time passed since last redemption or LUSD borrowing operation.
   * then,
   * 2) increases the baseRate based on the amount redeemed, as a proportion of total supply
   */
  function updateBaseRateFromRedemption(uint redeemAmount, uint _totalSupply) external onlyComptroller returns (uint) {
    // require(msg.sender == address(comptroller), 'only comptroller');
    uint decayedBaseRate = _calcDecayedBaseRate();

    /* Convert the drawn ETH back to LUSD at face value rate (1 LUSD:1 USD), in order to get
     * the fraction of total supply that was redeemed at face value. */
    uint redeemedLUSDFraction = redeemAmount.mul(DECIMAL_PRECISION).div(_totalSupply);

    uint newBaseRate = decayedBaseRate.add(redeemedLUSDFraction.div(BETA));
    newBaseRate = LiquityMath._min(newBaseRate, DECIMAL_PRECISION); // cap baseRate at a maximum of 100%
    //assert(newBaseRate <= DECIMAL_PRECISION); // This is already enforced in the line above
    assert(newBaseRate > 0); // Base rate is always non-zero after redemption

    // Update the baseRate state variable
    baseRate = newBaseRate;
    emit BaseRateUpdated(newBaseRate);

    _updateLastFeeOpTime();

    return newBaseRate;
  }

  function _minutesPassedSinceLastFeeOp() internal view returns (uint) {
    return (block.timestamp.sub(lastFeeOperationTime)).div(SECONDS_IN_ONE_MINUTE);
  }

  function getRedemptionRateWithDecay() external view returns (uint) {
    return _calcRedemptionRate(_calcDecayedBaseRate());
  }

  function _calcDecayedBaseRate() internal view returns (uint) {
    uint minutesPassed = _minutesPassedSinceLastFeeOp();
    uint decayFactor = LiquityMath._decPow(MINUTE_DECAY_FACTOR, minutesPassed);

    return baseRate.mul(decayFactor).div(DECIMAL_PRECISION);
  }

  // function _getRedemptionFee(uint _ETHDrawn) internal view returns (uint) {
  //   return _calcRedemptionFee(getRedemptionRate(), _ETHDrawn);
  // }

  function getRedemptionRate() public view returns (uint) {
    return _calcRedemptionRate(baseRate);
  }

  function _calcRedemptionRate(uint _baseRate) internal pure returns (uint) {
    return
      LiquityMath._min(
        REDEMPTION_FEE_FLOOR.add(_baseRate),
        DECIMAL_PRECISION // cap at a maximum of 100%
      );
  }

  // function _calcRedemptionFee(uint _redemptionRate, uint _ETHDrawn) internal pure returns (uint) {
  //   uint redemptionFee = _redemptionRate.mul(_ETHDrawn).div(DECIMAL_PRECISION);
  //   require(redemptionFee < _ETHDrawn, 'TroveManager: Fee would eat up all returned collateral');
  //   return redemptionFee;
  // }

  function updateSortedBorrows(address csuToken, address borrower) external onlyComptroller {
    if (!ICToken(csuToken).isCToken()) {
      uint256 borrowed = ICToken(csuToken).borrowBalanceStored(borrower);
      if (borrowed <= 0) return;
      if (sortedBorrows.contains(csuToken, borrower)) {
        address prevId = sortedBorrows.getPrev(csuToken, borrower);
        address nextId = sortedBorrows.getNext(csuToken, borrower);
        sortedBorrows.reInsert(csuToken, borrower, borrowed, prevId, nextId);
      } else {
        sortedBorrows.insert(csuToken, borrower, borrowed, address(0), address(0));
      }
    }
  }

  function calcActualRepayAndSeize(
    uint256 redeemAmount,
    address provider,
    address cToken,
    address suToken,
    IPriceOracle oracle
  ) external returns (uint256, uint256, uint256, uint256) {
    (uint256 oErr, uint256 depositBalance, , uint256 exchangeRateMantissa) = ICToken(cToken).getAccountSnapshot(
      provider
    );
    require(oErr == 0, 'snapshot error');

    if (depositBalance <= 0) {
      return (uint256(0), uint256(0), uint256(0), uint256(0));
    }

    // get price for suToken
    uint256 suPriceMantissa = oracle.getUnderlyingPrice(suToken);
    require(suPriceMantissa > 0, 'price error');
    uint8 suDecimals = ICToken(suToken).decimals();
    Exp memory suPrice = Exp({mantissa: suPriceMantissa});
    if (suDecimals < 18) {
      suPrice = suPrice.mul_(10 ** (18 - suDecimals));
    }

    // get price for cToken
    uint256 cPriceMantissa = oracle.getUnderlyingPrice(cToken);
    require(cPriceMantissa > 0, 'price error');
    Exp memory cPrice = Exp({mantissa: cPriceMantissa});
    uint cDecimals = ICToken(cToken).decimals();
    if (cDecimals < 18) {
      cPrice = cPrice.mul_(10 ** (18 - cDecimals));
    }

    uint256 exRateMantissa = ICToken(cToken).exchangeRateCurrent();
    Exp memory cExRate = Exp({mantissa: exRateMantissa});
    uint256 maxRepayable = cPrice.mul_(depositBalance).mul_(cExRate).div_(suPrice).truncate();
    uint256 actualRepay = LiquityMath._min(maxRepayable, redeemAmount);
    uint256 actualSeize = suPrice.mul_(actualRepay).div_(cPrice).div_(cExRate).truncate();

    return (actualRepay, actualSeize, suPriceMantissa, cPriceMantissa);
  }

  function hasNoProvider(address _asset) external view returns (bool) {
    return sortedBorrows.isEmpty(_asset);
  }

  function getFirstProvider(address _asset) external view returns (address) {
    return sortedBorrows.getFirst(_asset);
  }

  function getNextProvider(address _asset, address _id) external view returns (address) {
    return sortedBorrows.getNext(_asset, _id);
  }

  // Updates the baseRate state variable based on time elapsed since the last redemption or LUSD borrowing operation.
  function decayBaseRateFromBorrowing() external onlyRole(DEFAULT_ADMIN_ROLE) {
    uint decayedBaseRate = _calcDecayedBaseRate();
    assert(decayedBaseRate <= DECIMAL_PRECISION); // The baseRate can decay to 0

    baseRate = decayedBaseRate;
    emit BaseRateUpdated(decayedBaseRate);

    _updateLastFeeOpTime();
  }

  // Update the last fee operation time only if time passed >= decay interval. This prevents base rate griefing.
  function _updateLastFeeOpTime() internal {
    uint timePassed = block.timestamp.sub(lastFeeOperationTime);

    if (timePassed >= SECONDS_IN_ONE_MINUTE) {
      lastFeeOperationTime = block.timestamp;
      emit LastFeeOpTimeUpdated(block.timestamp);
    }
  }
}
