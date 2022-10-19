"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const config_2 = require("hardhat/config");
const ethers_1 = require("ethers");
const MANTISSA_DECIMALS = 18;
/**
npx hardhat di \
--blocks <Blocks peryear on chain> \
--base <Base rate peryear> \
--mul <Multiplier peryear> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
(0, config_1.task)('di', 'deploy InterestRateModel contracts')
    .addParam("blocks", "Blocks peryear on chain") // metertest: 13140000, 3600*24*365 / 2.4s
    .addParam("base", "Base rate peryear") // 0.8
    .addParam("mul", "Multiplier peryear") // 0.45
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, config_2.types.int)
    .setAction(async ({ blocks, base, mul, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
        override = {
            gasPrice: gasprice
        };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    // Deploy InterestRateModel
    const interestRateModel = await (await (await ethers.getContractFactory("WhitePaperInterestRateModel", wallet)).deploy(blocks, ethers_1.utils.parseUnits(base, MANTISSA_DECIMALS), ethers_1.utils.parseUnits(mul, MANTISSA_DECIMALS), override)).deployed();
    console.log("WhitePaperInterestRateModel:", interestRateModel.address);
});
//# sourceMappingURL=05_DeployInterestRateModel.js.map