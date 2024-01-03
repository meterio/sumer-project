import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
const MANTISSA_DECIMALS = 18;

/**
npx hardhat di \
--blocks <Blocks peryear on chain> \
--base <Base rate peryear> \
--mul <Multiplier peryear> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('di', 'deploy InterestRateModel contracts')
  .addParam('blocks', 'Blocks peryear on chain') // metertest: 13140000, 3600*24*365 / 2.4s
  .addParam('base', 'Base rate peryear') // 0.8
  .addParam('mul', 'Multiplier peryear') // 0.45
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ blocks, base, mul, rpc, pk, gasprice }, { ethers, run, network }) => {
    const interestRateModel = await run('d', {
      name: 'WhitePaperInterestRateModel',
      args: [blocks, ethers.parseUnits(base, MANTISSA_DECIMALS), ethers.parseUnits(mul, MANTISSA_DECIMALS)],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });
    return interestRateModel;
  });
