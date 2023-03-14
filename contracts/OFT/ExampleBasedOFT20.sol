// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './BasedOFT.sol';

/// @title A LayerZero OmnichainFungibleToken example of BasedOFT
/// @notice Use this contract only on the BASE CHAIN. It locks tokens on source, on outgoing send(), and unlocks tokens when receiving from other chains.
contract SumerOFT is BasedOFT {
  constructor(
    string memory _name,
    string memory _symbol,
    address _layerZeroEndpoint
  ) BasedOFT('BasedOFT', 'OFT', _layerZeroEndpoint) {
    _mint(_msgSender(), _initialSupply);
  }
}
