import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { SumerOFTUpgradeable } from '../../../typechain';
import { constants } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

/**
npx hardhat send \
--from "from chian config json file" \
--dst "dst chain id" \
--times "loop times" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('send', 'send oft')
  .addParam('json', 'from chian config json file')
  .addParam('dst', 'dst chain id')
  .addParam('times', 'loop times')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, dst, times, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());

    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    for (let t = 0; t < times; t++) {
      for (let i = 0; i < config.suTokens.tokens.length; i++) {
        let suTokenJson = config.suTokens.tokens[i];

        let suToken = (await ethers.getContractAt(
          'SumerOFTUpgradeable',
          suTokenJson.underly,
          wallet
        )) as SumerOFTUpgradeable;

        console.log('suToken:', await suToken.symbol());
        // let path = ethers.utils.solidityPack(['address', 'address'], [fromSuTokenJson.underly, remoteAddr]);
        // console.log('path:', path);

        let gas = await suToken.estimateGas.sendFrom(
          wallet.address,
          dst,
          wallet.address,
          parseUnits('1'),
          wallet.address,
          constants.AddressZero,
          '0x'
        );
        let receipt = await suToken.sendFrom(
          wallet.address,
          dst,
          wallet.address,
          parseUnits('1'),
          wallet.address,
          constants.AddressZero,
          '0x',
          { gasLimit: gas }
        );
        console.log('sendFrom tx:', receipt.hash);
      }
      delay(5);
    }
  });

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}
