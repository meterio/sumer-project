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
    await run('d', {
      name: 'VeSumer',
      args: [sumer],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    });
  });
