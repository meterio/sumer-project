// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import './IPriceOracle.sol';

interface IRedemptionManager {
  function hasNoProvider(address _asset) external view returns (bool);

  function getFirstProvider(address _asset) external view returns (address);

  function getNextProvider(address _asset, address _id) external view returns (address);

  function calcActualRepayAndSeize(
    uint256 redeemAmount,
    address provider,
    address cToken,
    address suToken,
    IPriceOracle oracle
  ) external returns (uint256, uint256);

  function updateSortedBorrows(address csuToken, address borrower) external;

  function getRedemptionRate() external view returns (uint);

  function updateBaseRateFromRedemption(uint redeemAmount, uint _totalSupply) external returns (uint);
}
