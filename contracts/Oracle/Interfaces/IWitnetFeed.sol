// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface IWitnetFeed {
  function lastPrice() external view returns (int256);
}
