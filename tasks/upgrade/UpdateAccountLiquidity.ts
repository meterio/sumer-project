import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ProxyAdmin } from '../../typechain';
import { log } from '../../log_settings';
import { readFileSync, writeFileSync } from 'fs';
import { constants, Overrides } from 'ethers';

/**
npx hardhat ual \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('ual', 'deploy cToken contract')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let config = JSON.parse(readFileSync(json).toString());

    let override: Overrides = {};
    if (gasprice > 0) {
      override.gasPrice = gasprice;
    }
    const accountLiquidityImpl = await run('d', {
      name: 'AccountLiquidity',
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });

    const proxyContract = (await ethers.getContractAt('ProxyAdmin', config.proxyAdmin.address, wallet)) as ProxyAdmin;

    let gas = await proxyContract.estimateGas.upgrade(config.accountLiquidity.address, accountLiquidityImpl.address);
    override.gasLimit = gas;
    let receipt = await proxyContract.upgrade(config.accountLiquidity.address, accountLiquidityImpl.address, override);
    log.info('AccountLiquidity.upgradeTo tx:', receipt.hash);
    config.accountLiquidity.implementation = accountLiquidityImpl.address;

    writeFileSync(json, JSON.stringify(config));
  });
