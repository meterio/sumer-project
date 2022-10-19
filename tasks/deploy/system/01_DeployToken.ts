import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { parseUnits } from "ethers/lib/utils";
import { log } from "../../../log_settings";

/**
npx hardhat dt \
--name "token name" \
--symbol "SYMBOL" \
--supply [initial supply for admin without decimals, optional, default: 100000000e18] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("dt", "deploy contract")
    .addParam("name", "token name", "")
    .addParam("symbol", "token symbol", "")
    .addOptionalParam("supply", "initial supply for admin", '0', types.string)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ name, symbol, supply, rpc, pk, gasprice }, { ethers, run, network }) => {

            const wallet = new ethers.Wallet(pk);
            const contract = await run("d", {
                name: "ERC20MinterBurnerPauser",
                args: [name, symbol, 18],
                rpc: rpc,
                pk: pk,
                gasprice: gasprice
            })

            if (Number(supply) > 0) {
                const receipt = await contract.mint(wallet.address, parseUnits(supply))
                log.info("Mint:", receipt.hash);
            }
            return contract;
        }
    );
