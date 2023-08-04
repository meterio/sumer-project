import { task, types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { VeSumer, ERC20, Multicall2 } from '../../typechain';
import { BigNumber, constants } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

/**
npx hardhat clk \
--json "config json file" \
--amount "lock amount" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> 
 */

task('clk', 'create lock')
  .addParam('json', 'config json file')
  .addParam('amount', 'lock amount')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .setAction(async ({ json, amount, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());

    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    let sumer = (await ethers.getContractAt('ERC20', config.sumer.address, wallet)) as ERC20;

    let allowance = await sumer.allowance(wallet.address, config.veSumer.address);
    if (allowance.eq(BigNumber.from(0))) {
      let receipt = await sumer.approve(config.veSumer.address, constants.MaxUint256);
      log.info(`sumer approve tx:`, receipt.hash);
    }
    let multicall = (await ethers.getContractAt('Multicall2', config.multicall2.address, wallet)) as Multicall2;
    let blocktime = await multicall.getCurrentBlockTimestamp();

    let veSumer = (await ethers.getContractAt('VeSumer', config.veSumer.address, wallet)) as VeSumer;
    let maxtime = await veSumer.MAXTIME();
    let time = blocktime.add(maxtime);

    let gas = await veSumer.estimateGas.create_lock(parseUnits(amount), time);
    let receipt = await veSumer.create_lock(parseUnits(amount), time, { gasLimit: gas });
    log.info(`veSumert create_lock tx:`, receipt.hash);
  });
