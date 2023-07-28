import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { SuErc20, ERC20MinterBurnerPauser, SumerOFTUpgradeable, SumerOFTUpgradeable__factory } from "../../../typechain";
import { log } from "../../../log_settings";
const MANTISSA_DECIMALS = 18;
const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

/**
npx hardhat doft \
--name "underly token name" \
--symbol "underly token symbol" \
--admin "admin address" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("doft", "deploy suToken contract")
    .addParam("name", "underly token name")
    .addParam("symbol", "underly token symbol")
    .addParam("admin", "admin address")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ name, symbol, admin, rpc, pk, gasprice }, { ethers, run, network }) => {

            // const impl = await run("d", {
            //     name: "SumerOFTUpgradeable",
            //     rpc: rpc,
            //     pk: pk,
            //     gasprice: gasprice
            // });
            // const contract = impl as SumerOFTUpgradeable;
            const contract = SumerOFTUpgradeable__factory.createInterface();
            const data = contract.encodeFunctionData("initialize", [
                name,
                symbol,
                "0",
                "0x093D2CF57f764f09C3c2Ac58a42A2601B8C79281"
            ]);
            console.log(data)
            // const proxy = await run("p", {
            //     impl: impl.address,
            //     data: data,
            //     admin: admin,
            //     rpc: rpc,
            //     pk: pk,
            //     gasprice: gasprice
            // });
        }
    );

    // deploy SumerOFTUpgradeable at: 0x43dd7C74b4799F502B6fae3D18f44068FF8298e8
    // Proxy: 0x0d893C092f7aE9D97c13307f2D66CFB59430b4Cb

    // meter: 0x2187AA0990A8b954477bF2706bE6205c2a851aA1