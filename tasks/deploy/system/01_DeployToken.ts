import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { parseUnits } from 'ethers/lib/utils';
import { log } from '../../../log_settings';
import { ERC20MinterBurnerPauser } from '../../../typechain';

/**
npx hardhat dt \
--name "token name" \
--symbol "SYMBOL" \
--decimals [optional default: 18] \
--supply [initial supply for admin without decimals, optional, default: 100000000e18] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('dt', 'deploy contract')
  .addParam('name', 'token name', '')
  .addParam('symbol', 'token symbol', '')
  .addOptionalParam('decimals', 'token decimals', 18, types.int)
  .addOptionalParam('supply', 'initial supply for admin', '0', types.string)
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ name, symbol, supply, decimals, rpc, pk, gasprice }, { ethers, run, network }) => {
    const wallet = new ethers.Wallet(pk);
    const contract = (await run('d', {
      name: 'ERC20MinterBurnerPauser',
      args: [name, symbol, decimals],
      rpc: rpc,
      pk: pk,
      gasprice: gasprice
    })) as ERC20MinterBurnerPauser;

    if (Number(supply) > 0) {
      const gas = await contract.estimateGas.mint(wallet.address, parseUnits(supply, decimals));
      const receipt = await contract.mint(wallet.address, parseUnits(supply, decimals), {
        gasLimit: gas
      });
      log.info('Mint:', receipt.hash);
    }
    return contract;
  });
