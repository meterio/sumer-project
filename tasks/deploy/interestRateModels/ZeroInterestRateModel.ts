import { task } from 'hardhat/config';
import { types } from "hardhat/config";
const MANTISSA_DECIMALS = 18;

/**
npx hardhat zim \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('zim', 'deploy InterestRateModel contracts')
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {

        const wallet = new ethers.Wallet(pk);
        const interestRateModel = await run("d", {
            name: "ZeroInterestRateModel",
            args: [],
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        return interestRateModel;
    });