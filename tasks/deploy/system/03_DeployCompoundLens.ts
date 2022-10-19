import { task } from 'hardhat/config';
import { types } from "hardhat/config";

/**
npx hardhat dcl \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dcl', 'deploy CompoundLens contracts')
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
        const compoundLens = await run("d", {
            name: "CompoundLens",
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        return compoundLens;
    });