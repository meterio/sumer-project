import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction } from 'ethers';
import { Comptroller } from '../../../typechain';

/**
npx hardhat so \
--address <Comptroller address> \
--oracle <Oracle address> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('so', 'set PriceOracle in Comptroller')
  .addParam('address', 'Comptroller contract address')
  .addParam('oracle', 'Oracle contract address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ address, oracle, rpc, pk, gasprice }, { ethers, run, network }) => {
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

    const comptroller = (await ethers.getContractAt('Comptroller', address, wallet)) as Comptroller;
    console.log('find Comptroller:', address);
    receipt = await comptroller._setPriceOracle(oracle, override);
    console.log('_setPriceOracle tx:', receipt.hash);
  });
