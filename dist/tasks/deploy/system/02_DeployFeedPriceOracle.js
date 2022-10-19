"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
/**
npx hardhat do \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
(0, config_1.task)('do', 'deploy FeedPriceOracle contracts')
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
        override = {
            gasPrice: gasprice
        };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    // Deploy FeedPriceOracle
    const feedPriceOracle = (await (await (await ethers.getContractFactory("FeedPriceOracle", wallet)).deploy(override)).deployed());
    console.log("FeedPriceOracle:", feedPriceOracle.address);
});
//# sourceMappingURL=02_DeployFeedPriceOracle.js.map