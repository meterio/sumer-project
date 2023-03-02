import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { ProxyAdmin } from "../../typechain";
import { log } from "../../log_settings";
import { readFileSync, writeFileSync } from "fs";
import { constants } from "ethers";

/**
npx hardhat ucct \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
// 0xf1474805c39E5E76D0C036eed65b5d6f9F207041
task("ucct", "deploy cToken contract")
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({  json, rpc, pk, gasprice }, { ethers, run, network }) => {
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
            const comptrollerImpl = await run("d", {
                name: "Comptroller",
                rpc: rpc,
                pk: pk,
                gasprice: gasprice
            });

            const proxyContract = await ethers.getContractAt("ProxyAdmin", config.proxyAdmin.address, wallet) as ProxyAdmin;
            
            let receipt = await proxyContract.upgrade(config.comptroller.address, comptrollerImpl.address, override);
            log.info("Comptroller.upgradeTo tx:", receipt.hash);
            config.comptroller.implementation = comptrollerImpl.address;

            writeFileSync(json, JSON.stringify(config))
        }
    );
