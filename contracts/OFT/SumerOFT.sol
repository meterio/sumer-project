// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './OFT.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

contract SumerOFT is OFT, EIP712, Pausable {
  uint256 private _cap;
  mapping(address => bool) private _blackList;
  // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
  bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
  mapping(address => uint256) public nonces;

  // upgradeable

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _initialSupply,
    address _layerZeroEndpoint
  ) OFT(_name, _symbol, _layerZeroEndpoint) EIP712(_name, 'v1.0') {
    _mint(_msgSender(), _initialSupply);
  }

  /**
   * @dev Returns the cap on the token's total supply.
   */
  function cap() public view virtual returns (uint256) {
    return _cap;
  }

  /**
   * @dev Creates `amount` new tokens for `to`.
   *
   * See {ERC20-_mint}.
   *
   * Requirements:
   *
   * - the caller must have the `MINTER_ROLE`.
   */
  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    if (_cap > 0) {
      require(totalSupply() + amount <= _cap, 'ERC20Capped: cap exceeded');
    }
    _mint(to, amount);
  }

  /**
   * @dev Destroys `amount` tokens from the caller.
   *
   * See {ERC20-_burn}.
   */
  function burn(uint256 amount) public virtual {
    _burn(_msgSender(), amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`, deducting from the caller's
   * allowance.
   *
   * See {ERC20-_burn} and {ERC20-allowance}.
   *
   * Requirements:
   *
   * - the caller must have allowance for ``accounts``'s tokens of at least
   * `amount`.
   */
  function burnFrom(address account, uint256 amount) public virtual {
    _spendAllowance(account, _msgSender(), amount);
    _burn(account, amount);
  }

  /**
   * @dev Pauses all token transfers.
   *
   * See {ERC20Pausable} and {Pausable-_pause}.
   *
   * Requirements:
   *
   * - the caller must have the `PAUSER_ROLE`.
   */
  function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
  }

  /**
   * @dev Unpauses all token transfers.
   *
   * See {ERC20Pausable} and {Pausable-_unpause}.
   *
   * Requirements:
   *
   * - the caller must have the `PAUSER_ROLE`.
   */
  function unpause() public virtual onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  function setCap(uint256 cap_) public onlyAdmin {
    _cap = cap_;
  }

  function setBlackList(address account) public onlyAdmin {
    _blackList[account] = !_blackList[account];
  }

  /**
   * @dev See {ERC20-_beforeTokenTransfer}.
   *
   * Requirements:
   *
   * - the contract must not be paused.
   */

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override {
    super._beforeTokenTransfer(from, to, amount);
    require(!_blackList[from] && !_blackList[to], 'ERC20Pausable: account is in black list');
    require(!paused(), 'ERC20Pausable: token transfer while paused');
  }

  function permit(
    address signer,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes memory signature
  ) external returns (bool) {
    require(deadline >= block.timestamp, 'expired!');
    bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, signer, spender, value, nonces[signer]++, deadline));
    bytes32 hash = _hashTypedDataV4(structHash);
    require(ECDSA.recover(hash, signature) == signer, 'Permit: invalid signature');
    _spendAllowance(signer, spender, value);
    return true;
  }
}
