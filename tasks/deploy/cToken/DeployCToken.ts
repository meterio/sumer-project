import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { CErc20 } from '../../../typechain';
import { log } from '../../../log_settings';
const MANTISSA_DECIMALS = 18;
import '@nomicfoundation/hardhat-ethers';

/**
npx hardhat dct \
--name "cToken name" \
--symbol "cToken symbol" \
--decimals [underly token decimals, optional, default: 18] \
--underly "underly token address" \
--comptroller "comptroller address" \
--irm "InterestRateModel address" \
--admin "proxy admin address" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('dct', 'deploy cToken contract')
  .addParam('name', 'cToken name')
  .addParam('symbol', 'cToken symbol')
  .addOptionalParam('decimals', 'underly token decimals', 18, types.int)
  .addParam('underly', 'underly token address')
  .addParam('comptroller', 'comptroller address')
  .addParam('irm', 'InterestRateModel address')
  .addParam('admin', 'proxy admin address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(
    async (
      { name, symbol, decimals, underly, comptroller, irm, admin, rpc, pk, gasprice },
      { ethers, run, network }
    ) => {
      //   const impl = await run('d', {
      //     name: 'CErc20',
      //     rpc: rpc,
      //     pk: pk,
      //     gasprice: gasprice
      //   });
      //   const contract = impl as CErc20;
      let impl = await ethers.getContractAt('CErc20', '0x71Ea933878974B2c02461e3BBC1C08e125ee94f3');
      let owner = '0x1479F0954dF7c667b1817E4Eb3C0f4723eB054F5';

      const proxy = await run('p', {
        impl: impl.address,
        data: impl.interface.encodeFunctionData('initialize', [
          underly,
          comptroller,
          irm,
          ethers.parseUnits('1', MANTISSA_DECIMALS), // exchange rate
          name,
          symbol,
          MANTISSA_DECIMALS,
          owner,
          '1000000000000000000',
        ]),
        admin: admin,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      log.info(`${symbol} address:`, impl.address);
      return { impl, proxy };
    }
  );
