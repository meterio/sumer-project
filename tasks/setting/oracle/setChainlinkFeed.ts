import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { FeedPriceOracle } from '../../../typechain';
import { readFileSync } from 'fs';

/**
npx hardhat soc \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('soc', 'set FeedPriceOracle with chainlink feed')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let config = JSON.parse(readFileSync(json).toString());

    const feedPriceOracle = (await ethers.getContractAt(
      'FeedPriceOracle',
      config.feedPriceOracle.address,
      wallet
    )) as FeedPriceOracle;
    console.log('find FeedPriceOracle:', config.feedPriceOracle.address);

    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      let ctoken = config.cTokens.tokens[i];
      let oracle = ctoken.oracle;
      let gas = await feedPriceOracle.estimateGas.setChainlinkFeed(ctoken.address, oracle.addr, oracle.tokenDecimals);
      let receipt = await feedPriceOracle.setChainlinkFeed(ctoken.address, oracle.addr, oracle.tokenDecimals, {
        gasLimit: gas
      });
      console.log('setChainlinkFeed tx:', receipt.hash);
    }
    for (let i = 1; i < config.suTokens.tokens.length; i++) {
      let ctoken = config.suTokens.tokens[i];
      let oracle = ctoken.oracle;
      let gas = await feedPriceOracle.estimateGas.setChainlinkFeed(ctoken.address, oracle.addr, oracle.tokenDecimals);
      let receipt = await feedPriceOracle.setChainlinkFeed(ctoken.address, oracle.addr, oracle.tokenDecimals, {
        gasLimit: gas
      });
      console.log('setChainlinkFeed tx:', receipt.hash);
    }
  });