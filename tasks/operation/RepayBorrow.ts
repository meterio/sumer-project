import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction,constants } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { CErc20 } from '../../typechain';

/**
npx hardhat rp \
--sdr <sdrToken address> \
--amount <deposit amount> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('rp', 'Repay borrow')
  .addParam('sdr', 'sdrToken address')
  .addParam('amount', 'deposit amount')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ sdr, amount, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;

    const cErc20 = (await ethers.getContractAt('CErc20', sdr, wallet)) as CErc20;
    const sdrSymbol = await cErc20.symbol(override);
    console.log(`find ${sdrSymbol}:`, cErc20.address);
    const underly = (await ethers.getContractAt('CErc20', await cErc20.underlying(override), wallet)) as CErc20;
    console.log(`find ${sdrSymbol} underly:`, underly.address);

    receipt = await underly.approve(sdr,constants.MaxUint256);
    console.log('cErc20.approve tx:', receipt.hash);

    receipt = await cErc20.repayBorrow(parseUnits(amount, await cErc20.decimals(override)), override);
    console.log('cErc20.borrow tx:', receipt.hash);
  });
