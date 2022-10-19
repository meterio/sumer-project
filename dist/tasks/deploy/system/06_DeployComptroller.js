"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
const ethers_1 = require("ethers");
const MANTISSA_DECIMALS = 18;
/**
npx hardhat dc \
--admin <admin address> \
--oracle <Oracle address> \
--ua <UnderWriterAdmin address> \
--cfm [Close Factor Mantissa, optional, default:0.5] \
--lim [Liquidation Incentive Mantissa, optional, default:1.1] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
(0, config_1.task)('dc', 'deploy Comptroller contracts')
    .addParam("admin", "admin address")
    .addParam("oracle", "Oracle contract address")
    .addParam("ua", "UnderWriterAdmin contract address")
    .addOptionalParam("cfm", "Close Factor Mantissa", "0.5", config_2.types.string)
    .addOptionalParam("lim", "Liquidation Incentive Mantissa", "1.1", config_2.types.string)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ admin, oracle, ua, cfm, lim, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
        override = {
            gasPrice: gasprice
        };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    // Deploy Comptroller
    const impl = (await (await (await ethers.getContractFactory("Comptroller", wallet)).deploy(override)).deployed());
    console.log("Comptroller impl:", impl.address);
    const proxy_factory = await ethers.getContractFactory("contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy", wallet);
    const proxy = await (await proxy_factory.deploy(impl.address, wallet.address, impl.interface.encodeFunctionData("initialize", [
        admin,
        oracle,
        ua,
        ethers_1.utils.parseUnits(cfm, MANTISSA_DECIMALS),
        ethers_1.utils.parseUnits(lim, MANTISSA_DECIMALS)
    ]), override)).deployed();
    console.log("Proxy:", proxy.address);
});
//# sourceMappingURL=06_DeployComptroller.js.map