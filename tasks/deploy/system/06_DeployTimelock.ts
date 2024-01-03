import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { readFileSync, writeFileSync } from 'fs';

/**
npx hardhat dtl \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dtl', 'deploy Timelock contracts')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());
    let admin: string;
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);

    let cTokens: string[] = [];
    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      cTokens.push(config.cTokens.tokens[i].address);
    }
    for (let i = 0; i < config.suTokens.tokens.length; i++) {
      cTokens.push(config.suTokens.tokens[i].address);
    }

    console.log('cTokens:', cTokens);

    const timelock = await run('d', {
      name: 'Timelock',
      args: [cTokens],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });

    return timelock;
  });
