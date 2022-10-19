import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { ContractTransaction } from 'ethers';
import { FeedPriceOracle } from '../../../typechain';

/**
npx hardhat sof \
--address <FeedPriceOracle address> \
--ctoken <cToken address> \
--price 1000000000000000000 \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
// old address 0xa3ce6156502712ee3333477e8876b0903232223c

task('sof', 'set FeedPriceOracle with fix price')
    .addParam("address", "FeedPriceOracle contract address")
    .addParam("ctoken", "cToken contract address")
    .addParam("price", "token price")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ address, ctoken, price, rpc, pk, gasprice }, { ethers, run, network }) => {
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

        const feedPriceOracle = await ethers.getContractAt("FeedPriceOracle", address, wallet) as unknown as FeedPriceOracle;
        console.log("find FeedPriceOracle:", address);
        receipt = await feedPriceOracle.setFixedPrice(ctoken, price, override)
        console.log("setFixedPrice tx:", receipt.hash);

    });