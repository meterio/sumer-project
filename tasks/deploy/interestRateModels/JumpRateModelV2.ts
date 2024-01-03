import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
const MANTISSA_DECIMALS = 18;

/**
npx hardhat jv2 \
--blocks <Blocks peryear on chain> \
--base <Base rate peryear> \
--mul <Multiplier peryear> \
--jump <jumpMultiplier peryear> \
--kink <kink> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
/*
npx hardhat jv2 \
--blocks 13140000 \
--base 0 \
--mul 0.04 \
--jump 1.09 \
--kink 0.8 \
--rpc http://rpctest.meter.io \
--pk <admin private key> \
--gasprice 1000000000
*/
task('jv2', 'deploy InterestRateModel contracts')
  .addParam('blocks', 'Blocks peryear on chain') // metertest: 13140000, 3600*24*365 / 2.4s
  .addParam('base', 'Base rate peryear') // 0.8
  .addParam('mul', 'Multiplier peryear') // 0.45
  .addParam('jump', 'jumpMultiplier peryear')
  .addParam('kink', 'kink')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ blocks, base, mul, jump, kink, rpc, pk, gasprice }, { ethers, run, network }) => {
    const wallet = new ethers.Wallet(pk);
    const interestRateModel = await run('d', {
      name: 'JumpRateModelV2',
      args: [
        blocks,
        ethers.parseUnits(base, MANTISSA_DECIMALS),
        ethers.parseUnits(mul, MANTISSA_DECIMALS),
        ethers.parseUnits(jump, MANTISSA_DECIMALS),
        ethers.parseUnits(kink, MANTISSA_DECIMALS),
        wallet.address,
      ],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });
    return interestRateModel;
  });
