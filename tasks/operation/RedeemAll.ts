import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction } from 'ethers';
import { parseUnits } from 'ethers';
import { CErc20 } from '../../typechain';

/**
npx hardhat rea \
--sdr <sdrToken address> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('rea', 'redeem all underly token')
  .addParam('sdr', 'sdrToken address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ sdr, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;

    const cErc20 = (await ethers.getContractAt('CErc20', sdr, wallet)) as CErc20;
    const sdrSymbol = await cErc20.symbol(override);
    console.log(`find ${sdrSymbol}:`, cErc20.address);
    const underly = await cErc20.underlying(override);
    console.log(`find ${sdrSymbol} underly:`, underly);

    receipt = await cErc20.redeem(await cErc20.balanceOf(wallet.address, override), override);
    console.log('cErc20.redeem tx:', receipt.hash);
  });
