"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
const log_settings_1 = require("../../../log_settings");
(0, config_1.task)("d", "deploy contract")
    .addParam("name", "contract name")
    .addParam("args", "argments", [], config_2.types.json)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "deployer private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ name, args, rpc, pk, gasprice }, { getNamedAccounts, ethers, run, deployments, web3 }) => {
    await run("compile");
    const { deploy } = deployments;
    const gasPrice = gasprice > 0 ? gasprice.toString : await web3.eth.getGasPrice();
    log_settings_1.log.info("Gas price: " + gasPrice);
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    const { deployer } = await getNamedAccounts();
    console.log(deployer);
    let _override = {
        from: wallet.address,
        args: args,
        skipIfAlreadyDeployed: false,
        gasPrice: gasPrice
    };
    // const result = await deploy(name, _override);
    // log.info('Deploy tx:', result.transactionHash);
    // log.info('Receipt', result.address)
});
//# sourceMappingURL=Deploy.js.map