// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IVoltPair {
  function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1);

  function token0() external view returns (address);

  function token1() external view returns (address);
}
