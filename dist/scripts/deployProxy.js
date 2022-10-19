"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployProxy = void 0;
const hardhat_1 = require("hardhat");
const helper_1 = require("./helper");
const deployProxy = async (name, symbol, initialSupply, owner) => {
    const _token = await hardhat_1.ethers.getContractFactory('ERC20MintablePauseableUpgradeable');
    const token = await hardhat_1.upgrades.deployProxy(_token, [name, symbol, initialSupply, owner], {
        initializer: 'initialize',
    });
    await token.deployed();
    console.log('Deploying:', `ERC20MintablePauseableUpgradeable for ${name}`);
    console.log('  to', token.address);
    console.log('  in', token.deployTransaction.hash);
    await (0, helper_1.saveFile)(hardhat_1.network.name, 'ERC20MintablePauseableUpgradeable', token, [name, symbol, initialSupply, owner], {});
};
exports.deployProxy = deployProxy;
//# sourceMappingURL=deployProxy.js.map