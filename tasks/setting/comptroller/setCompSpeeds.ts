import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { CToken, Comptroller } from '../../../typechain';

/**
npx hardhat scs \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('scs', 'set Reserve Factor')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ f, json, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);
    let comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;

    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      let cToken = config.cTokens.tokens[i];
      let receipt = await comptroller.setCompSpeed(cToken.address, cToken.supplySpeed, cToken.borrowSpeed);
      console.log('cToken:', await cToken.cTokenSymbol);
      console.log('cToken setCompSpeed tx:', receipt.hash);
    }
    for (let i = 0; i < config.suTokens.tokens.length; i++) {
      let suTokens = config.suTokens.tokens[i];
      let receipt = await comptroller.setCompSpeed(suTokens.address, suTokens.supplySpeed, suTokens.borrowSpeed);
      console.log('suTokens:', await suTokens.symbol);
      console.log('suTokens setCompSpeed tx:', receipt.hash);
    }
  });
