pragma solidity 0.5.16;

import './InterestRateModel.sol';
import './SafeMath.sol';

/**
 * @title Compound's JumpRateModel Contract
 * @author Compound
 */
contract SuTokenRateModel is InterestRateModel {
  using SafeMath for uint256;

  address public owner;
  /**
   * @notice The multiplier of utilization rate that gives the slope of the interest rate
   */
  uint256 public borrowRate;

  /**
   * @notice The base interest rate which is the y-intercept when utilization rate is 0
   */
  uint256 public supplyRate;

  modifier onlyOwner() {
    require(msg.sender == owner, 'ONLY OWNER');
    _;
  }

  constructor(uint256 initBorrowRate, uint256 initSupplyRate) public {
    borrowRate = initBorrowRate;
    supplyRate = initSupplyRate;
    owner = msg.sender;
  }

  function changeOwner(address owner_) public onlyOwner {
    require(owner_ != address(0), 'Address is Zero!');
    owner = owner_;
  }

  function setBorrowRate(uint256 rate) public onlyOwner {
    borrowRate = rate;
  }

  function setSupplyRate(uint256 rate) public onlyOwner {
    supplyRate = rate;
  }

  /**
   * @notice Calculates the current borrow rate per block, with the error code expected by the market
   * @param cash The amount of cash in the market
   * @param borrows The amount of borrows in the market
   * @param reserves The amount of reserves in the market
   * @return The borrow rate percentage per block as a mantissa (scaled by 1e18)
   */
  function getBorrowRate(
    uint256 cash,
    uint256 borrows,
    uint256 reserves
  ) public view returns (uint256) {
    cash;
    borrows;
    reserves;
    return borrowRate;
  }

  /**
   * @notice Calculates the current supply rate per block
   * @param cash The amount of cash in the market
   * @param borrows The amount of borrows in the market
   * @param reserves The amount of reserves in the market
   * @param reserveFactorMantissa The current reserve factor for the market
   * @return The supply rate percentage per block as a mantissa (scaled by 1e18)
   */
  function getSupplyRate(
    uint256 cash,
    uint256 borrows,
    uint256 reserves,
    uint256 reserveFactorMantissa
  ) public view returns (uint256) {
    cash;
    borrows;
    reserves;
    reserveFactorMantissa;
    return supplyRate;
  }
}
