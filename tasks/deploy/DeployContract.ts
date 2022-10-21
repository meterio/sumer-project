import { BigNumber, Overrides } from "ethers";
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
    .addParam("rpc", "rpc connect", "", types.string)
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ name, args, rpc, pk, gasprice }, { ethers, web3 }) => {

            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(pk, provider);

            log.info(`Deploying ${name}`);
            log.info("Account balance: " + ethers.utils.formatUnits(await wallet.getBalance(), 18));

            const gasPrice = gasprice == 0 ? await web3.eth.getGasPrice() : gasprice.toString();
            log.info("Gas price: " + gasPrice);

            let _override: Overrides;
            _override = {
                gasPrice: BigNumber.from(gasPrice)
            }

            const contract =
                await (await (
                    await ethers.getContractFactory(name, wallet)
                ).deploy(...args, _override)
                ).deployed();
            log.info(`deploy ${name} at:`, contract.address);
            return contract;
        }
    );
