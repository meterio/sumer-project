"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
/**
npx hardhat dua \
--sumer <Sumer address> \
--admin <admin address> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
(0, config_1.task)('dua', 'deploy UnderwriterAdmin contracts')
    .addParam("sumer", "sumer address") // test net sumer 0xf67c5f20b95b7604ebb65a53e50ebd38300da8ee
    .addParam("admin", "admin address")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ sumer, admin, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
        override = {
            gasPrice: gasprice
        };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    // Deploy UnderwriterAdmin
    const impl = (await (await (await ethers.getContractFactory("UnderwriterAdmin", wallet)).deploy(override)).deployed());
    console.log("UnderwriterAdmin impl:", impl.address);
    const proxy_factory = await ethers.getContractFactory("contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy", wallet);
    const proxy = await (await proxy_factory.deploy(impl.address, wallet.address, impl.interface.encodeFunctionData("initialize", [
        sumer,
        admin
    ]), override)).deployed();
    console.log("Proxy:", proxy.address);
});
//# sourceMappingURL=04_DeployUnderwriterAdmin.js.map