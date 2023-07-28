import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { readFileSync } from 'fs';
import { log } from '../../log_settings';
import { IERC20, SumerOFTUpgradeable } from '../../typechain';
import { ContractTransaction, constants } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

/**
npx hardhat sf \
--address "oft address" \
--amount "send amount" \
--dst "dst chainId"
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('sf', 'approve all sdrToken contract')
  .addParam('address', 'oft address')
  .addParam('amount', 'send amount')
  .addParam('dst', 'dst chainId')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ address, amount, dst, rpc, pk, gasprice }, { ethers, run, network }) => {
    // await run('compile');

    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;

    const oft = (await ethers.getContractAt('SumerOFTUpgradeable', address, wallet)) as SumerOFTUpgradeable;
    console.log('getTrustedRemoteAddress:', await oft.getTrustedRemoteAddress(dst));
    const balance = await oft.balanceOf(wallet.address);
    console.log('balance:', balance);
    if (balance.lt(parseUnits(amount))) {
      receipt = await oft.mint(wallet.address, parseUnits(amount));
      console.log('mint:', receipt.hash);
      await receipt.wait();
    }
    const estimateSendFee = await oft.estimateSendFee(dst, wallet.address, parseUnits(amount), false, '0x');
    console.log('estimateSendFee:', estimateSendFee);
    const gas = await oft.estimateGas.sendFrom(
      wallet.address,
      dst,
      wallet.address,
      parseUnits(amount),
      wallet.address,
      constants.AddressZero,
      '0x',
      { value: estimateSendFee.nativeFee }
    );
    console.log('gas:', gas);
    receipt = await oft.sendFrom(
      wallet.address,
      dst,
      wallet.address,
      parseUnits(amount),
      wallet.address,
      constants.AddressZero,
      '0x',
      { value: estimateSendFee.nativeFee, gasLimit: gas }
    );
    console.log('receipt:', receipt.hash);
  });
// meter   from 10156 to: 10121 10102 10106 10109 10112 10143 10132       10160
// zk-sync from 10165 to: 10121 10102 10106 10109 10112 10143 10132 10151 10160 10157 10158
