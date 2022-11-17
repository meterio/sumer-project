import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { ProxyAdmin } from "../../typechain";
import { log } from "../../log_settings";
import { readFileSync, writeFileSync } from "fs";
import { constants } from "ethers";

/**
npx hardhat uct \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
// 0xf1474805c39E5E76D0C036eed65b5d6f9F207041
task("uct", "deploy cToken contract")
    .addOptionalParam("impl", "special implementation", constants.AddressZero, types.string)
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ impl, json, rpc, pk, gasprice }, { ethers, run, network }) => {
            await run("compile");
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(pk, provider);
            let config = JSON.parse(readFileSync(json).toString());

            let override = {}
            if (gasprice > 0) {
                override = {
                    gasPrice: gasprice
                }
            }
            if (impl == constants.AddressZero) {
                const cErc20Impl = await run("d", {
                    name: "CErc20",
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.cTokens.implementation = cErc20Impl.address;
            } else {
                config.cTokens.implementation = impl;
            }
            writeFileSync(json, JSON.stringify(config))

            for (let i = 0; i < config.cTokens.tokens.length; i++) {
                const proxyContract = await ethers.getContractAt("ProxyAdmin", config.proxyAdmin.address, wallet) as ProxyAdmin;
                let receipt = await proxyContract.upgrade(config.cTokens.tokens[i].address, config.cTokens.implementation, override);
                log.info("proxyContract.upgradeTo tx:", receipt.hash);
            }
        }
    );
