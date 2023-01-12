import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { FeedPriceOracle, CToken } from '../../typechain';

/**
npx hardhat os \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('os', 'Oracle stats')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);
    const oracle = (await ethers.getContractAt('FeedPriceOracle', config.feedPriceOracle.address, wallet)) as FeedPriceOracle;

    const cTokens = config.cTokens.tokens;
    for (let i = 0; i < cTokens.length; i++) {
      let cTokenAddress = cTokens[i].address;
      let cToken = (await ethers.getContractAt('CToken', cTokenAddress, wallet)) as CToken;
      let feed = await oracle.getFeed(cTokens[i].address);
      let fixPrice = await oracle.fixedPrices(cTokens[i].address);
      log.info('cToken:', await cToken.symbol());
      log.info('feed:', feed);
      log.info('feefixPriced:', fixPrice.toString());
    }
  });
