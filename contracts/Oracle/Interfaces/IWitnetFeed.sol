// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IWitnetFeed {
  function lastPrice() external view returns (int256);
}
