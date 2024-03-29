import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { readFileSync, writeFileSync } from 'fs';
import { log } from '../../log_settings';
import { AccountLiquidity, CErc20, CompLogic, Comptroller, PythOracle } from '../../typechain';
import { parseUnits } from 'ethers';
const MANTISSA_DECIMALS = 18;
const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
// 0x0000000000000000000000000000000000000000
/**
npx hardhat all \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task('all', 'deploy contract')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
    await run('compile');

    let config = JSON.parse(readFileSync(json).toString());
    let admin: string;
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);

    if (config.proxyAdmin.address == '') {
      const proxyAdmin = await run('d', {
        name: 'ProxyAdmin',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.proxyAdmin.address = proxyAdmin.address;
      writeFileSync(json, JSON.stringify(config));
    }
    admin = config.proxyAdmin.address;

    if (config.multicall2.address == '') {
      const multicall2 = await run('d', {
        name: 'Multicall2',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.multicall2.address = multicall2.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.sumer.address == '') {
      const sumer = await run('dt', {
        name: config.sumer.name,
        symbol: config.sumer.symbol,
        supply: config.sumer.supply,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.sumer.address = sumer.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.feedPriceOracle.address == '') {
      const feedPriceOracle = await run('dpo', {
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.feedPriceOracle.address = feedPriceOracle.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.compoundLens.address == '') {
      const compoundLens = await run('dcl', {
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.compoundLens.address = compoundLens.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.underwriterAdmin.address == '') {
      const { impl, proxy } = await run('dua', {
        sumer: config.sumer.address,
        admin: admin,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.underwriterAdmin.implementation = impl.address;
      config.underwriterAdmin.address = proxy.address;
      writeFileSync(json, JSON.stringify(config));
      // let uwAdmin = (await ethers.getContractAt('UnderwriterAdmin', proxy.address, wallet)) as UnderwriterAdmin;
      const comptroller = await ethers.getContractAt('Comptroller', config.comptroller.address, wallet);
      for (const group of config.eqAssetGroups) {
        let gas = await comptroller.setAssetGroup.estimateGas(
          group.id,
          group.name,
          group.intraCRateMantissa,
          group.intraMintRateMantissa,
          group.intraSuRateMantissa,
          group.interCRateMantissa,
          group.interSuRateMantissa
        );
        let receipt = await comptroller.setAssetGroup(
          group.id,
          group.name,
          group.intraCRateMantissa,
          group.intraMintRateMantissa,
          group.intraSuRateMantissa,
          group.interCRateMantissa,
          group.interSuRateMantissa,
          { gasLimit: gas }
        );
        log.info(`set eq asset group for ${group.id} ${group.name} in ${receipt.hash}`);
      }
    }

    let insterestRateModel = config.InterestRateModel;
    for (let i = 0; i < insterestRateModel.length; i++) {
      let iModel = insterestRateModel[i];
      if (iModel.address == '') {
        let iModel_contract = await run('d', {
          name: iModel.contract,
          args: iModel.args,
          rpc: rpc,
          pk: pk,
          gasprice: gasprice,
        });
        config.InterestRateModel[i].address = iModel_contract.address;
        writeFileSync(json, JSON.stringify(config));
      }
    }

    if (config.comptroller.address == '') {
      const { compLogicImpl, compLogic, accountLiquidityImpl, accountLiquidity, comptrollerImpl, comptroller } =
        await run('dc', {
          admin: admin,
          oracle: config.feedPriceOracle.address,
          ua: config.underwriterAdmin.address,
          comp: config.sumer.address,
          cfm: config.comptroller.closeFactorMantissa,
          lim: config.comptroller.liquidationIncentiveMantissa,
          rpc: rpc,
          pk: pk,
          gasprice: gasprice,
        });
      config.compLogic.implementation = compLogicImpl.address;
      config.compLogic.address = compLogic.address;
      config.accountLiquidity.implementation = accountLiquidityImpl.address;
      config.accountLiquidity.address = accountLiquidity.address;
      config.comptroller.implementation = comptrollerImpl.address;
      config.comptroller.address = comptroller.address;
      writeFileSync(json, JSON.stringify(config));
      const compLogicContract = await ethers.getContractAt('CompLogic', compLogic.address, wallet);
      let gas = await compLogicContract.setComptroller.estimateGas(comptroller.address);
      let tx = await compLogicContract.setComptroller(comptroller.address, { gasLimit: gas });
      await tx.wait();
      const accountLiquidityContract = await ethers.getContractAt('AccountLiquidity', accountLiquidity.address, wallet);
      gas = await accountLiquidityContract.setComptroller.estimateGas(comptroller.address);
      tx = await accountLiquidityContract.setComptroller(comptroller.address, { gasLimit: gas });
      await tx.wait();
    }
    if (config.cTokens.implementation == '') {
      const cErc20Impl = await run('d', {
        name: 'CErc20',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.cTokens.implementation = cErc20Impl.address;
      writeFileSync(json, JSON.stringify(config));
    }
    const cErc20 = await ethers.getContractFactory('CErc20');
    const suErc20 = await ethers.getContractFactory('suErc20');
    const sumerOFT = await ethers.getContractFactory('SumerOFTUpgradeable');
    const comptroller = await ethers.getContractAt('Comptroller', config.comptroller.address, wallet);
    const oracle = await ethers.getContractAt('PythOracle', config.feedPriceOracle.address, wallet);
    if (config.cTokens.tokens.length > 0) {
      for (let i = 0; i < config.cTokens.tokens.length; i++) {
        let cToken = config.cTokens.tokens[i];
        if (cToken.address == '') {
          let data: string;
          let impl: string;
          let InterestRateModel = config.InterestRateModel[cToken.interestRateModelIndex];
          if (cToken.native) {
            const cEtherImpl = await run('d', {
              name: 'CEther',
              rpc: rpc,
              pk: pk,
              gasprice: gasprice,
            });
            config.cTokens.tokens[i].implementation = cEtherImpl.address;
            writeFileSync(json, JSON.stringify(config));

            const cEther = await ethers.getContractFactory('CEther');
            data = cEther.interface.encodeFunctionData('initialize', [
              config.comptroller.address,
              InterestRateModel.address,
              ethers.parseUnits('1', MANTISSA_DECIMALS),
              cToken.cTokenName,
              cToken.cTokenSymbol,
              cToken.decimals,
              wallet.address,
              cToken.discountRate,
            ]);
            impl = config.cTokens.tokens[i].implementation;
          } else {
            data = cErc20.interface.encodeFunctionData('initialize', [
              cToken.underly,
              config.comptroller.address,
              InterestRateModel.address,
              ethers.parseUnits('1', MANTISSA_DECIMALS),
              cToken.cTokenName,
              cToken.cTokenSymbol,
              cToken.decimals,
              wallet.address,
              cToken.discountRate,
            ]);
            impl = config.cTokens.implementation;
          }
          const proxy = await run('p', {
            impl: impl,
            admin: admin,
            data: data,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice,
          });
          config.cTokens.tokens[i].address = proxy.address;
          writeFileSync(json, JSON.stringify(config));
        }
        let gas = await comptroller.markets.estimateGas(cToken.address);
        const market = await comptroller.markets(cToken.address, { gasLimit: gas });
        if (!market.isListed || market.assetGroupId != cToken.groupId) {
          let gas = await comptroller._supportMarket.estimateGas(cToken.address, cToken.groupId);
          let receipt = await comptroller._supportMarket(cToken.address, cToken.groupId, { gasLimit: gas });
          log.info('_supportMarket:', cToken.cTokenSymbol, receipt.hash);
        }
        const cTokenContract = await ethers.getContractAt('CErc20', config.cTokens.tokens[i].address, wallet);
        if (!(await cTokenContract.reserveFactorMantissa()).eq(parseUnits('0.1'))) {
          let gas = await cTokenContract._setReserveFactor.estimateGas(parseUnits('0.1'));
          let receipt = await cTokenContract._setReserveFactor(parseUnits('0.1'), { gasLimit: gas });
          log.info('_setReserveFactor:', cToken.cTokenSymbol, receipt.hash);
        }
      }
    }
    if (config.suTokens.implementation == '') {
      const suErc20Impl = await run('d', {
        name: 'suErc20',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.suTokens.implementation = suErc20Impl.address;
      writeFileSync(json, JSON.stringify(config));
    }
    if (config.suTokens.underly_implementation == '') {
      const suUnderLyImpl = await run('d', {
        name: 'SumerOFTUpgradeable',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.suTokens.underly_implementation = suUnderLyImpl.address;
      writeFileSync(json, JSON.stringify(config));
    }
    if (config.suTokens.tokens.length > 0) {
      for (let i = 0; i < config.suTokens.tokens.length; i++) {
        let suToken = config.suTokens.tokens[i];
        if (suToken.underly == '') {
          let data = sumerOFT.interface.encodeFunctionData('initialize', [
            suToken.name,
            suToken.symbol,
            0,
            config.lzEndpoint.address,
          ]);
          const proxy = await run('p', {
            impl: config.suTokens.underly_implementation,
            data: data,
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice,
          });

          config.suTokens.tokens[i].underly = proxy.address;
          writeFileSync(json, JSON.stringify(config));
        }
        const suTokenSymbol = `sdr${suToken.symbol}`;
        if (suToken.address == '') {
          let InterestRateModel = config.InterestRateModel[suToken.interestRateModelIndex];
          let data = suErc20.interface.encodeFunctionData('initialize', [
            suToken.underly,
            config.comptroller.address,
            InterestRateModel.address,
            ethers.parseUnits('1', MANTISSA_DECIMALS), // exchange rate
            suTokenSymbol,
            suTokenSymbol,
            MANTISSA_DECIMALS,
            wallet.address,
            suToken.discountRate,
          ]);
          const proxy = await run('p', {
            impl: config.suTokens.implementation,
            data: data,
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice,
          });
          config.suTokens.tokens[i].address = proxy.address;
          writeFileSync(json, JSON.stringify(config));
        }

        const underly = await ethers.getContractAt('SumerOFTUpgradeable', config.suTokens.tokens[i].underly, wallet);
        suToken.address = config.suTokens.tokens[i].address;
        const hasRole = await underly.hasRole(MINTER_ROLE, suToken.address);
        if (!hasRole) {
          let gas = await underly.grantRole.estimateGas(MINTER_ROLE, suToken.address);
          const receipt = await underly.grantRole(MINTER_ROLE, suToken.address, { gasLimit: gas });
          log.info(`${suTokenSymbol} add minter tx:`, receipt.hash);
        }

        const market = await comptroller.markets(suToken.address);
        if (!market.isListed || market.assetGroupId != suToken.groupId) {
          let gas = await comptroller._supportMarket.estimateGas(suToken.address, suToken.groupId);
          let receipt = await comptroller._supportMarket(suToken.address, suToken.groupId, { gasLimit: gas });
          log.info('_supportMarket:', suToken.symbol, receipt.hash);
        }

        const suTokenInst = await ethers.getContractAt('suErc20', config.suTokens.tokens[i].address, wallet);
        const isCToken = await suTokenInst.isCToken();
        if (isCToken) {
          let gas = await suTokenInst.changeCtoken.estimateGas();
          let receipt = await suTokenInst.changeCtoken({ gasLimit: gas });
          log.info('changeCtoken:', isCToken, receipt.hash);
        }
      }
    }

    if (config.timelock.address == '') {
      const timelock = await run('dtl', {
        json: json,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice,
      });
      config.timelock.address = timelock.address;
      writeFileSync(json, JSON.stringify(config));
    }
  });
