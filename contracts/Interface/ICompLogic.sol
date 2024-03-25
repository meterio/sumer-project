pragma solidity 0.8.19;

import '../Exponential/ExponentialNoError.sol';

interface ICompLogic {
  function setCompSpeed(address cToken, uint256 supplySpeed, uint256 borrowSpeed) external;

  function updateCompSupplyIndex(address cToken) external;

  function updateCompBorrowIndex(address cToken, Exp memory marketBorrowIndex) external;

  function distributeSupplierComp(address cToken, address supplier) external;

  function distributeBorrowerComp(address cToken, address borrower, Exp memory marketBorrowIndex) external;

  function initializeMarket(address cToken, uint32 blockNumber) external;

  function updateBaseRateFromRedemption(uint redeemAmount, uint _totalSupply) external returns (uint);

  function getRedemptionRate() external view returns (uint);
}
