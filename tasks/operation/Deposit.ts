import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction } from 'ethers';
import { parseUnits } from 'ethers';
import { CErc20 } from '../../typechain';

/**
npx hardhat de \
--sdr <sdrToken address> \
--amount <deposit amount> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('de', 'deposit underly to sdrToken')
  .addParam('sdr', 'sdrToken address')
  .addParam('amount', 'deposit amount')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ sdr, amount, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');

    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;

    const cErc20 = (await ethers.getContractAt('CErc20', sdr, wallet)) as CErc20;
    const sdrSymbol = await cErc20.symbol();
    console.log(`find ${sdrSymbol}:`, cErc20.address);
    const underly = await cErc20.underlying();
    console.log(`find ${sdrSymbol} underly:`, underly);
    let decimals = await cErc20.decimals();
    let mintAmount = parseUnits(amount, decimals);

    let gas = await cErc20.estimateGas.mint(mintAmount);
    receipt = await cErc20.mint(mintAmount, {
      gasLimit: gas,
    });
    console.log('cErc20.mint tx:', receipt.hash);
  });
