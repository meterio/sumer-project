import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { CompoundLens } from '../../typechain';

/**
npx hardhat ba \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('ba', 'deposit underly to sdrToken')
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
    let cTokens: string[] = [];
    type CTokenBalances = {
      cToken: string;
      balanceOf: string;
      borrowBalanceCurrent: string;
      balanceOfUnderlying: string;
      tokenBalance: string;
    };
    let cTokenBalances: CTokenBalances[] = [];

    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      cTokens.push(config.cTokens.tokens[i].address);
    }

    for (let i = 0; i < config.suTokens.tokens.length; i++) {
      cTokens.push(config.suTokens.tokens[i].address);
    }
    const lens = (await ethers.getContractAt('CompoundLens', config.compoundLens.address, wallet)) as CompoundLens;
    const cTokenBalancesAll = await lens.callStatic.cTokenBalancesAll(cTokens, wallet.address, override);
    for (let i = 0; i < cTokenBalancesAll.length; i++) {
      cTokenBalances.push({
        cToken: cTokenBalancesAll[i][0],
        balanceOf: cTokenBalancesAll[i][1].toString(),
        borrowBalanceCurrent: cTokenBalancesAll[i][2].toString(),
        balanceOfUnderlying: cTokenBalancesAll[i][3].toString(),
        tokenBalance: cTokenBalancesAll[i][4].toString(),
      });
    }
    console.table(cTokenBalances);
  });
