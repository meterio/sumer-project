// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

abstract contract Initializable {
  /**
   * @dev Indicates that the contract has been initialized.
   */
  bool private _initialized;

  /**
   * @dev Modifier to protect an initializer function from being invoked twice.
   */
  modifier initializer() {
    require(!_initialized, 'Initializable: contract is already initialized');
    _initialized = true;
    _;
  }
}
