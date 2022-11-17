import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { log } from "../../log_settings";
import { readFileSync } from "fs";
import { CompoundLens } from '../../typechain';

/**
npx hardhat al \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('al', 'get AccountLimits')
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
        let config = JSON.parse(readFileSync(json).toString());
        let override = {}
        if (gasprice > 0) {
            override = {
                gasPrice: gasprice
            }
        }
        let provider = new ethers.providers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(pk, provider);
        log.info("wallet:", wallet.address);

        const lens = await ethers.getContractAt("CompoundLens", config.compoundLens.address, wallet) as CompoundLens;
        const accountLimits = await lens.callStatic.getAccountLimits(config.comptroller.address, wallet.address, override);
        const markets = accountLimits.markets;
        const liquidity = accountLimits.liquidity.toString();
        const shortfall = accountLimits.shortfall.toString();
        
        log.info("markets:",markets);
        log.info("liquidity:",liquidity);
        log.info("shortfall:",shortfall);
    });
    // 7999.199999