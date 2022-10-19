import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { Comptroller } from '../../../typechain';
const MANTISSA_DECIMALS = 18;

/**
npx hardhat dc \
--admin <proxy admin address> \
--oracle <Oracle address> \
--ua <UnderWriterAdmin address> \
--cfm [Close Factor Mantissa, optional, default:0.5] \
--lim [Liquidation Incentive Mantissa, optional, default:1.1] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dc', 'deploy Comptroller contracts')
    .addParam("admin", "proxy admin address")
    .addParam("oracle", "Oracle contract address")
    .addParam("ua", "UnderWriterAdmin contract address")
    .addOptionalParam("cfm", "Close Factor Mantissa", "0.5", types.string)
    .addOptionalParam("lim", "Liquidation Incentive Mantissa", "1.1", types.string)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({
        admin, oracle, ua, cfm, lim, rpc, pk, gasprice
    }, { ethers, run, network }) => {
        const impl = await run("d", {
            name: "Comptroller",
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        const contract = impl as Comptroller;

        const wallet = new ethers.Wallet(pk);
        const proxy = await run("p", {
            impl: impl.address,
            data: contract.interface.encodeFunctionData("initialize", [
                wallet.address,
                oracle,
                ua,
                ethers.utils.parseUnits(cfm, MANTISSA_DECIMALS),
                ethers.utils.parseUnits(lim, MANTISSA_DECIMALS)
            ]),
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
        });
        return { impl, proxy }
    });