import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { UnderwriterAdmin } from "../../../typechain";
/**
npx hardhat dua \
--sumer <Sumer address> \
--admin <proxy admin address> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dua', 'deploy UnderwriterAdmin contracts')
    .addParam("sumer", "sumer address") // test net sumer 0xf67c5f20b95b7604ebb65a53e50ebd38300da8ee
    .addParam("admin", "proxy admin address")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ sumer, admin, rpc, pk, gasprice }, { ethers, run, network }) => {
        const impl = await run("d", {
            name: "UnderwriterAdmin",
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        const contract = impl as UnderwriterAdmin;

        const wallet = new ethers.Wallet(pk);
        const proxy = await run("p", {
            impl: impl.address,
            data: contract.interface.encodeFunctionData("initialize", [
                sumer,
                wallet.address
            ]),
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        return { impl, proxy }
    });