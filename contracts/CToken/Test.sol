// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './TokenErrorReporter.sol';

contract ErrorTest {
  using TokenErrorReporter for Error;

  function test(uint256 err, uint256 info, uint256 num) external pure {
    Error(err).failOpaque(FailureInfo(info), num);
  }

  function test(uint256 err, uint256 info) external pure {
    Error(err).fail(FailureInfo(info));
  }
}
