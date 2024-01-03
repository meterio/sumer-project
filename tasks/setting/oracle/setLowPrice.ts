import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction } from 'ethers';
import { PythOracle } from '../../../typechain';
import { readFileSync } from 'fs';

/**
npx hardhat slof \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
// old address 0xa3ce6156502712ee3333477e8876b0903232223c

task('slof', 'set FeedPriceOracle with fix price')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;
    let config = JSON.parse(readFileSync(json).toString());

    const oracle = (await ethers.getContractAt('PythOracle', config.feedPriceOracle.address, wallet)) as PythOracle;
    console.log('find FeedPriceOracle:', config.feedPriceOracle.address);
    for (let i = 0; i < config.suTokens.tokens.length; i++) {
      let suToken = config.suTokens.tokens[i];
      if (suToken.oracle.feedId == 1) {
        receipt = await oracle.setFixedPrice(suToken.address, '500000000000000000', override);
        console.log('setFixedPrice tx:', receipt.hash);
      }
    }
  });
