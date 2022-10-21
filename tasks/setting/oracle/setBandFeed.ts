import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { ContractTransaction } from 'ethers';
import { FeedPriceOracle } from '../../../typechain';

/**
npx hardhat sob \
--address <FeedPriceOracle address> \
--ctoken <cToken address> \
--feed <Feed address> \
--name <token name string> \
--decimal [optional, 18 for default] \
--feeddecimal [optional, 18 for default] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('sob', 'set FeedPriceOracle with witnetFeed')
    .addParam("address", "FeedPriceOracle contract address")
    .addParam("ctoken", "cToken contract address")
    .addParam("feed", "feed contract address") // 0xe1bCC505f2Bdd02C9480C924856f5080834A3897 metertest
    .addParam("name", "token name string")
    .addOptionalParam("decimal", "Token decimals", 18, types.int)
    .addOptionalParam("feeddecimal", "Feed decimals", 18, types.int)
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ address, ctoken, feed, name, decimal, feeddecimal, rpc, pk, gasprice }, { ethers, run, network }) => {
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

        const feedPriceOracle = await ethers.getContractAt("FeedPriceOracle", address, wallet) as FeedPriceOracle;
        console.log("find FeedPriceOracle:", address);
        receipt = await feedPriceOracle.setBandFeed(ctoken, feed, decimal, feeddecimal, name, override)
        console.log("setBandFeed tx:", receipt.hash);

    });