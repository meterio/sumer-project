import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { log } from "../../log_settings";

/**
npx hardhat p \
--impl "implementation address" \
--data "initialize data" \
--admin "admin address" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("p", "deploy cToken contract")
    .addParam("impl", "implementation address")
    .addParam("data", "initialize args")
    .addParam("admin", "admin address")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ impl, data, admin, rpc, pk, gasprice }, { ethers, run, network }) => {
            let override = {}
            if (gasprice > 0) {
                override = {
                    gasPrice: gasprice
                }
            }

            let provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(pk, provider);

            const proxy_factory = await ethers.getContractFactory("contracts/proxy/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy", wallet);
            const proxy = await (await proxy_factory.deploy(
                impl,
                admin,
                data,
                override
            )).deployed();
            log.info("Proxy:", proxy.address);
            return proxy
        }
    );
