import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { CToken } from '../../../typechain';

/**
npx hardhat sir \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('sir', 'set Reserve Factor')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
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

    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      let cTokenJson = config.cTokens.tokens[i];
      let cToken = (await ethers.getContractAt('CToken', cTokenJson.address, wallet)) as CToken;
      let interestRateModelAddress = cTokenJson.interestRateModel.address;
      let gas = await cToken.estimateGas._setInterestRateModel(interestRateModelAddress);
      let receipt = await cToken._setInterestRateModel(interestRateModelAddress, { gasLimit: gas });
      console.log('cToken:', await cToken.symbol());
      console.log('interestRateModelAddress:', interestRateModelAddress);
      console.log('_setInterestRateModel tx:', receipt.hash);
    }
  });
