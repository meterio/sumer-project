import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { log } from "../../log_settings";

/**
npx hardhat d \
--name "underly token name" \
--args "constructor args" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("d", "deploy contract")
    .addParam("name", "contract name")
    .addOptionalParam("args", "constructor args", [], types.json)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ name, args, rpc, pk, gasprice }, { ethers, run, network }) => {
            let override = {}
            if (gasprice > 0) {
                override = {
                    gasPrice: gasprice
                }
            }
            let provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(pk, provider);

            const contract =
                await (await (
                    await ethers.getContractFactory(name, wallet)
                ).deploy(...args, override)
                ).deployed();
            log.info(`deploy ${name} at:`, contract.address);
            return contract;
        }
    );
