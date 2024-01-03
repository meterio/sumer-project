import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { AccountLiquidity, CompLogic, Comptroller } from '../../../typechain';
const MANTISSA_DECIMALS = 18;

/**
npx hardhat dc \
--admin <proxy admin address> \
--oracle <Oracle address> \
--ua <UnderWriterAdmin address> \
--comp <Comp address> \
--cfm [Close Factor Mantissa, optional, default:0.5] \
--lim [Liquidation Incentive Mantissa, optional, default:1.1] \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('dc', 'deploy Comptroller contracts')
  .addParam('admin', 'proxy admin address')
  .addParam('oracle', 'Oracle contract address')
  .addParam('ua', 'UnderWriterAdmin contract address')
  .addParam('comp', 'Comp address')
  .addOptionalParam('cfm', 'Close Factor Mantissa', '0.5', types.string)
  .addOptionalParam('lim', 'Liquidation Incentive Mantissa', '1.1', types.string)
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ admin, oracle, ua, comp, cfm, lim, rpc, pk, gasprice }, { ethers, run, network }) => {
    const wallet = new ethers.Wallet(pk);

    const compLogicImpl = (await run('d', {
      name: 'CompLogic',
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    })) as CompLogic;

    const compLogic = await run('p', {
      impl: compLogicImpl.address,
      data: compLogicImpl.interface.encodeFunctionData('initialize', [wallet.address, comp]),
      admin: admin,
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });

    const accountLiquidityImpl = (await run('d', {
      name: 'AccountLiquidity',
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    })) as AccountLiquidity;

    const accountLiquidity = await run('p', {
      impl: accountLiquidityImpl.address,
      data: accountLiquidityImpl.interface.encodeFunctionData('initialize', [wallet.address]),
      admin: admin,
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });

    const comptrollerImpl = (await run('d', {
      name: 'Comptroller',
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    })) as Comptroller;

    const comptroller = await run('p', {
      impl: comptrollerImpl.address,
      data: comptrollerImpl.interface.encodeFunctionData('initialize', [
        wallet.address,
        oracle,
        ua,
        compLogic.address,
        accountLiquidity.address,
        ethers.parseUnits(cfm, MANTISSA_DECIMALS),
        ethers.parseUnits(lim, MANTISSA_DECIMALS),
      ]),
      admin: admin,
      rpc: rpc,
      pk: pk,
      gasprice: gasprice,
    });

    return {
      compLogicImpl,
      compLogic,
      accountLiquidityImpl,
      accountLiquidity,
      comptrollerImpl,
      comptroller,
    };
  });
