import { Overrides } from 'ethers';
import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
/**
npx hardhat d \
--name "underly token name" \
--args "constructor args" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('d', 'deploy contract')
  .addParam('name', 'contract name')
  .addOptionalParam('args', 'constructor args', [], types.json)
  .addParam('rpc', 'rpc connect', '', types.string)
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ name, args, rpc, pk, gasprice }, { ethers }) => {
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('account:', wallet.address);

    log.info(`Deploying ${name}`);
    log.info('Account balance: ' + (await wallet.provider?.getBalance(wallet.address)), 18);

    const feeData = await wallet.provider?.getFeeData();
    const gasPrice = gasprice == 0 ? feeData?.gasPrice : gasprice.toString();
    log.info('Gas price: ' + gasPrice);

    let _override: Overrides;
    _override = {
      gasPrice: gasPrice,
      gasLimit: 20000000,
    };

    const contract = await (
      await (await ethers.getContractFactory(name, wallet)).deploy(...args, _override)
    ).waitForDeployment();
    log.info(`deploy ${name} at:`, contract.address);
    return contract;
  });
