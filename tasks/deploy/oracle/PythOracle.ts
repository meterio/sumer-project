import { task } from 'hardhat/config';
import { types } from 'hardhat/config';

/**
npx hardhat dpo \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dpo', 'deploy PythOracle contracts')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');
    const pythOracle = await run('d', {
      name: 'PythOracle',
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    });
    return pythOracle;
  });
