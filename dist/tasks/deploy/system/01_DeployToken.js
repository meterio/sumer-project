"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
const utils_1 = require("ethers/lib/utils");
/**
npx hardhat dt \
--name "token name" \
--symbol "SYMBOL" \
--supply [initial supply for admin without decimals, optional, default: 100000000e18] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
(0, config_1.task)("dt", "deploy contract")
    .addParam("name", "token name", "")
    .addParam("symbol", "token symbol", "")
    .addOptionalParam("supply", "initial supply for admin", '100000000', config_2.types.string)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ name, symbol, supply, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run("compile");
    let override = {};
    if (gasprice > 0) {
        override = {
            gasPrice: gasprice
        };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const proxyWallet = new ethers.Wallet(pk, provider);
    const contract = await (await (await ethers.getContractFactory("ERC20MinterBurnerPauser", proxyWallet)).deploy(name, symbol, 18, override)).deployed();
    console.log("ERC20MinterBurnerPauser:", contract.address);
    if (Number(supply) > 0) {
        const receipt = await contract.mint(proxyWallet.address, (0, utils_1.parseUnits)(supply));
        console.log("Mint:", receipt.hash);
    }
});
//# sourceMappingURL=01_DeployToken.js.map