import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { SuErc20, ERC20MinterBurnerPauser } from "../../../typechain";
import { log } from "../../../log_settings";
const MANTISSA_DECIMALS = 18;
const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

/**
npx hardhat dst \
--name "underly token name" \
--symbol "underly token symbol" \
--decimals [underly token decimals, optional, default: 18] \
--comptroller "comptroller address" \
--irm "InterestRateModel address" \
--admin "admin address" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("dst", "deploy suToken contract")
    .addParam("name", "underly token name")
    .addParam("symbol", "underly token symbol")
    .addOptionalParam("decimals", "underly token decimals", 18, types.int)
    .addParam("comptroller", "comptroller address")
    .addParam("irm", "InterestRateModel address")
    .addParam("admin", "admin address")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ name, symbol, decimals, comptroller, irm, admin, rpc, pk, gasprice }, { ethers, run, network }) => {
            const underly = await run("dt", {
                name: name,
                symbol: symbol,
                rpc: rpc,
                pk: pk,
                gasprice: gasprice
            })
            const impl = await run("d", {
                name: "suErc20",
                rpc: rpc,
                pk: pk,
                gasprice: gasprice
            });
            const contract = impl as SuErc20;
            const suTokenSymbol = `sdr${symbol}`;

            const proxy = await run("p", {
                impl: impl.address,
                data: contract.interface.encodeFunctionData("initialize", [
                    underly.address,
                    comptroller,
                    irm,
                    ethers.utils.parseUnits('1', decimals - MANTISSA_DECIMALS + MANTISSA_DECIMALS), // exchange rate
                    suTokenSymbol,
                    suTokenSymbol,
                    MANTISSA_DECIMALS,
                    admin
                ]),
                admin: admin,
                rpc: rpc,
                pk: pk,
                gasprice: gasprice
            });
            log.info(`${suTokenSymbol} implementation address:`, impl.address);
            log.info(`${suTokenSymbol} proxy address:`, proxy.address);
            log.info(`${suTokenSymbol} underly address:`, underly.address);
            const receipt = await underly.grantRole(MINTER_ROLE, proxy.address);
            log.info(`${suTokenSymbol} add minter tx:`, receipt.hash);
            return { underly, impl, proxy }
        }
    );
