// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

/**
 * @dev {ERC20} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to aother accounts
 */
contract ERC20MinterBurnerPauser is ERC20PresetMinterPauser {
    uint8 private immutable decimals_;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20PresetMinterPauser(_name, _symbol) {
        decimals_ = _decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return decimals_;
    }
}
