import { task } from 'hardhat/config';
import { types } from 'hardhat/config';

/**
npx hardhat dve \
--sumer <sumer address>
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dve', 'deploy veSumer contracts')
  .addParam('sumer', 'sumer address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ sumer, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    const ve = await run('d', {
      name: 'VeSumer',
      args: [sumer],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    });

    const controller = await run('d', {
      name: 'FraxGaugeController',
      args: [sumer, ve.address],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    });
    const distributor = await run('d', {
      name: 'FraxGaugeFXSRewardsDistributor',
      args: [wallet.address, wallet.address, sumer, controller.address],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    });
  });
