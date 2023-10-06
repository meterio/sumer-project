// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ILpOracle {
  function getPrice(address lpToken) external view returns (uint256);
}
