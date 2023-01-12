import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { BigNumber, ContractTransaction } from 'ethers';
import { Comptroller } from '../../../typechain';
import { readFileSync } from 'fs';
import { BigNumberish } from 'ethers';

/**
npx hardhat scs \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('scs', 'set CompSpeeds in Comptroller')
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
    let receipt: ContractTransaction;

    const comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;
    console.log('find Comptroller:', config.comptroller.address);

    const _cTokens = config.cTokens.tokens;
    const _suTokens = config.suTokens.tokens;
    let cTokens: string[] = [];
    let supplySpeeds: BigNumberish[] = [];
    let borrowSpeeds: BigNumberish[] = [];

    for (let i = 0; i < _cTokens.length; i++) {
      cTokens.push(_cTokens[i].address);
      supplySpeeds.push(BigNumber.from('10000000000000000'));
      borrowSpeeds.push(BigNumber.from('1'));
    }
    for (let i = 0; i < _suTokens.length; i++) {
      cTokens.push(_suTokens[i].address);
      supplySpeeds.push(BigNumber.from(1));
      borrowSpeeds.push(BigNumber.from('10000000000000000'));
    }
    console.log(cTokens, supplySpeeds, borrowSpeeds)
    receipt = await comptroller._setCompSpeeds(cTokens, supplySpeeds, borrowSpeeds);
    console.log('_setPriceOracle tx:', receipt.hash);
  });
// 0.005375000000000000
// 0.033500000000000000
