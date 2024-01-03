import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { Comptroller } from '../../typechain';
import { BigNumber } from 'ethers';

/**
npx hardhat gci \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('gci', 'grantCompInternal')
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
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    const comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;

    const markets = await comptroller.getAssetsIn(wallet.address);
    log.info('getAssetsIn:', markets);
    for (let i = 0; i < markets.length; i++) {
      let market = markets[i];
      let compBorrowSpeeds = await comptroller.compBorrowSpeeds(market);
      let compSupplierIndex = await comptroller.compSupplierIndex(market, wallet.address);
      let compBorrowerIndex = await comptroller.compBorrowerIndex(market, wallet.address);
      log.info('market:', market);
      log.info('compBorrowSpeeds:', compBorrowSpeeds.toString());
      log.info('compSupplierIndex:', compSupplierIndex.toString());
      log.info('compBorrowerIndex:', compBorrowerIndex.toString());
      let noOriginalSpeed = compBorrowSpeeds.eq(BigNumber.from(0));
      log.info('noOriginalSpeed:', noOriginalSpeed);
      let invalidSupply = noOriginalSpeed && compSupplierIndex.gt(BigNumber.from(0));
      log.info('invalidSupply:', invalidSupply);
      let invalidBorrow = noOriginalSpeed && compBorrowerIndex.gt(BigNumber.from(0));
      log.info('invalidBorrow:', invalidBorrow);
    }
  });
