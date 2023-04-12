// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface IUnitroller {
  function admin() external view returns (address);

  /**
   * @notice Accepts new implementation of comptroller. msg.sender must be pendingImplementation
   * @dev Admin function for new implementation to accept it's role as implementation
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _acceptImplementation() external returns (uint256);
}
