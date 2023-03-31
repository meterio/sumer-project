import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { SumerOFT, SumerOFTUpgradeable } from '../../../typechain';

/**
npx hardhat str \
--from "from chian config json file" \
--to "dst chain config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('str', 'set Reserve Factor')
  .addParam('from', 'from chian config json file')
  .addParam('to', 'dst chain config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ from, to, rpc, pk, gasprice }, { ethers, run, network }) => {
    let fromConfig = JSON.parse(readFileSync(from).toString());
    let toConfig = JSON.parse(readFileSync(to).toString());

    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);
    let toChainId = toConfig.lzEndpoint.chainId;
    let remoteAddr = '';

    for (let i = 0; i < fromConfig.suTokens.tokens.length; i++) {
      let fromSuTokenJson = fromConfig.suTokens.tokens[i];
      for (let j = 0; j < toConfig.suTokens.tokens.length; j++) {
        if (fromSuTokenJson.name == toConfig.suTokens.tokens[j].name) {
          remoteAddr = toConfig.suTokens.tokens[j].underly;
        }
      }
      if (remoteAddr != '') {
        let fromSuToken = (await ethers.getContractAt(
          'SumerOFTUpgradeable',
          fromSuTokenJson.underly,
          wallet
        )) as SumerOFTUpgradeable;

        console.log('from suToken:', await fromSuToken.symbol());
        // let path = ethers.utils.solidityPack(['address', 'address'], [fromSuTokenJson.underly, remoteAddr]);
        // console.log('path:', path);

        let gas = await fromSuToken.estimateGas.setTrustedRemoteAddress(toChainId, remoteAddr);
        let receipt = await fromSuToken.setTrustedRemoteAddress(toChainId, remoteAddr, { gasLimit: gas });
        console.log('setTrustedRemote tx:', receipt.hash);
      }
    }
  });
