import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ProxyAdmin } from '../../typechain';
import { log } from '../../log_settings';
import { readFileSync, writeFileSync } from 'fs';
import { constants } from 'ethers';

/**
npx hardhat ust \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('ust', 'deploy cToken contract')
  .addOptionalParam('impl', 'special implementation', constants.AddressZero, types.string)
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ impl, json, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    console.log('account:', wallet.address);
    let config = JSON.parse(readFileSync(json).toString());

    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    if (impl == constants.AddressZero) {
      const suErc20Impl = await run('d', {
        name: 'suErc20',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.suTokens.implementation = suErc20Impl.address;
    } else {
      config.suTokens.implementation = impl;
    }
    writeFileSync(json, JSON.stringify(config));

    for (let i = 0; i < config.suTokens.tokens.length; i++) {
      const proxyContract = (await ethers.getContractAt('ProxyAdmin', config.proxyAdmin.address, wallet)) as ProxyAdmin;
      let gas = await proxyContract.estimateGas.upgrade(
        config.suTokens.tokens[i].address,
        config.suTokens.implementation
      );
      let receipt = await proxyContract.upgrade(config.suTokens.tokens[i].address, config.suTokens.implementation, {
        gasLimit: gas,
      });
      log.info('proxyContract.upgradeTo tx:', receipt.hash);
    }
  });
