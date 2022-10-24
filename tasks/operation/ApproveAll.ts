import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { readFileSync } from "fs";
import { log } from "../../log_settings";
import { IERC20 } from "../../typechain";
import { constants } from "ethers";


/**
npx hardhat aa \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("aa", "approve all sdrToken contract")
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
            await run("compile");

            let config = JSON.parse(readFileSync(json).toString());
            let provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(pk, provider);
            let override = {}
            if (gasprice > 0) {
                override = {
                    gasPrice: gasprice
                }
            }
            if (config.cTokens.tokens.length > 0) {
                for (let i = 0; i < config.cTokens.tokens.length; i++) {
                    let cToken = config.cTokens.tokens[i];
                    let underly = await ethers.getContractAt("IERC20", cToken.underly, wallet) as IERC20;
                    let receipt = await underly.approve(cToken.address, constants.MaxUint256, override);
                    log.info(`${cToken.cTokenSymbol} approve tx:`, receipt.hash);
                }
            }
            if (config.suTokens.tokens.length > 0) {
                for (let i = 0; i < config.suTokens.tokens.length; i++) {
                    let suToken = config.suTokens.tokens[i];
                    let underly = await ethers.getContractAt("IERC20", suToken.underly, wallet) as IERC20;
                    let receipt = await underly.approve(suToken.address, constants.MaxUint256, override);
                    log.info(`${suToken.symbol} approve tx:`, receipt.hash);
                }
            }
        }
    );
