import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { log } from "../../../log_settings";

/**
npx hardhat do \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('do', 'deploy FeedPriceOracle contracts')
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
        const feedPriceOracle = await run("d", {
            name: "FeedPriceOracle",
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        return feedPriceOracle;
    });