import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { ContractTransaction } from 'ethers';
import { parseUnits } from "ethers/lib/utils";
import { CErc20 } from '../../typechain';

/**
npx hardhat br \
--sdr <sdrToken address> \
--amount <deposit amount> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('br', 'deposit underly to sdrToken')
    .addParam("sdr", "sdrToken address")
    .addParam("amount", "deposit amount")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ sdr, amount, rpc, pk, gasprice }, { ethers, run, network }) => {
        await run('compile');
        let override = {}
        if (gasprice > 0) {
            override = {
                gasPrice: gasprice
            }
        }
        let provider = new ethers.providers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(pk, provider);
        let receipt: ContractTransaction;

        const cErc20 = await ethers.getContractAt("CErc20", sdr, wallet) as CErc20;
        const sdrSymbol = await cErc20.symbol(override);
        console.log(`find ${sdrSymbol}:`, cErc20.address);
        const underly = await cErc20.underlying(override);
        console.log(`find ${sdrSymbol} underly:`, underly);

        receipt = await cErc20.borrow(parseUnits(amount, await cErc20.decimals(override)), override);
        console.log("cErc20.borrow tx:", receipt.hash);

    });