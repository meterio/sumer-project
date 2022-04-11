pragma solidity ^0.5.16;

import "./InterestRateModel.sol";
import "./SafeMath.sol";

/**
  * @title Compound's JumpRateModel Contract
  * @author Compound
  */
contract SuTokenRateModel is InterestRateModel {
    using SafeMath for uint;

    address public owner;
    /**
     * @notice The multiplier of utilization rate that gives the slope of the interest rate
     */
    uint public borrowRate;

    /**
     * @notice The base interest rate which is the y-intercept when utilization rate is 0
     */
    uint public supplyRate;

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY OWNER");
        _;
    }

    constructor(uint initBorrowRate, uint initSupplyRate) public {
        borrowRate = initBorrowRate;
        supplyRate = initSupplyRate;
        owner = msg.sender;  
    }

    function changeOwner(address owner_) public onlyOwner {
        owner = owner_;
    }

    function setBorrowRate(uint rate) public onlyOwner {
        borrowRate = rate;
    }

    function setSupplyRate(uint rate) public onlyOwner {
        supplyRate = rate;
    }  
     
    /**
     * @notice Calculates the current borrow rate per block, with the error code expected by the market
     * @param cash The amount of cash in the market
     * @param borrows The amount of borrows in the market
     * @param reserves The amount of reserves in the market
     * @return The borrow rate percentage per block as a mantissa (scaled by 1e18)
     */
    function getBorrowRate(uint cash, uint borrows, uint reserves) public view returns (uint) {
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
    function getSupplyRate(uint cash, uint borrows, uint reserves, uint reserveFactorMantissa) public view returns (uint) {
        cash;
        borrows;
        reserves;
        reserveFactorMantissa;
        return supplyRate;
    }
}
