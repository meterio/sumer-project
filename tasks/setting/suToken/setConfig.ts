import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { SumerOFT, SumerOFTUpgradeable } from '../../../typechain';

/**
npx hardhat scf \
--from "from chian config json file" \
--dst "dst chain id" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('scf', 'set Oracle config')
  .addParam('from', 'from chian config json file')
  .addParam('dst', 'dst chain id')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ from, dst, rpc, pk, gasprice }, { ethers, run, network }) => {
    let fromConfig = JSON.parse(readFileSync(from).toString());

    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    for (let i = 0; i < fromConfig.suTokens.tokens.length; i++) {
      let fromSuTokenJson = fromConfig.suTokens.tokens[i];
      let fromSuToken = (await ethers.getContractAt(
        'SumerOFTUpgradeable',
        fromSuTokenJson.underly,
        wallet
      )) as SumerOFTUpgradeable;

      console.log('from suToken:', await fromSuToken.symbol());

      let gas = await fromSuToken.estimateGas.setConfig(0, dst, 6, fromConfig.lzEndpointOracle.address);
      let receipt = await fromSuToken.setConfig(0, dst, 6, fromConfig.lzEndpointOracle.address, { gasLimit: gas });
      console.log('setTrustedRemote tx:', receipt.hash);
    }
  });
