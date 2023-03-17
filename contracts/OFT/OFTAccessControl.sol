// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';

contract OFTAccessControl is AccessControlEnumerable {
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');

  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

    _setupRole(MINTER_ROLE, _msgSender());
    _setupRole(PAUSER_ROLE, _msgSender());
  }

  modifier onlyAdmin() {
    _checkRole(DEFAULT_ADMIN_ROLE);
    _;
  }
}
