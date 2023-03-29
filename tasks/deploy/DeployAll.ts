import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { readFileSync, writeFileSync } from 'fs';
import { log } from '../../log_settings';
import { Comptroller, FeedPriceOracle, UnderwriterAdmin } from '../../typechain';
import { BigNumber } from 'ethers';
const MANTISSA_DECIMALS = 18;
const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

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
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);

    if (config.proxyAdmin.address == '') {
      const proxyAdmin = await run('d', {
        name: 'ProxyAdmin',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.proxyAdmin.address = proxyAdmin.address;
      writeFileSync(json, JSON.stringify(config));
    }
    admin = config.proxyAdmin.address;

    if (config.sumer.address == '') {
      const sumer = await run('dt', {
        name: config.sumer.name,
        symbol: config.sumer.symbol,
        supply: config.sumer.supply,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.sumer.address = sumer.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.feedPriceOracle.address == '') {
      const feedPriceOracle = await run('do', {
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.feedPriceOracle.address = feedPriceOracle.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.compoundLens.address == '') {
      const compoundLens = await run('dcl', {
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
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
        gasprice: gasprice
      });
      config.underwriterAdmin.implementation = impl.address;
      config.underwriterAdmin.address = proxy.address;
      writeFileSync(json, JSON.stringify(config));
      let uwAdmin = (await ethers.getContractAt('UnderwriterAdmin', proxy.address, wallet)) as UnderwriterAdmin;
      for (const group of config.eqAssetGroups) {
        let gas = await uwAdmin.estimateGas.setEqAssetGroup(
          group.id,
          group.name,
          group.inGroupCTokenRateMantissa,
          group.inGroupSuTokenRateMantissa,
          group.interGroupCTokenRateMantissa,
          group.interGroupSuTokenRateMantissa
        );
        let receipt = await uwAdmin.setEqAssetGroup(
          group.id,
          group.name,
          group.inGroupCTokenRateMantissa,
          group.inGroupSuTokenRateMantissa,
          group.interGroupCTokenRateMantissa,
          group.interGroupSuTokenRateMantissa,
          { gasLimit: gas }
        );
        log.info(`set eq asset group for ${group.id} ${group.name} in ${receipt.hash}`);
      }
    }

    if (config.suInterestRateModel.address == '') {
      const suInterestRateModel = await run('di', {
        blocks: config.suInterestRateModel.blocks,
        base: config.suInterestRateModel.base,
        mul: config.suInterestRateModel.mul,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.suInterestRateModel.address = suInterestRateModel.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.cInterestRateModel.address == '') {
      const cInterestRateModel = await run('di', {
        blocks: config.cInterestRateModel.blocks,
        base: config.cInterestRateModel.base,
        mul: config.cInterestRateModel.mul,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.cInterestRateModel.address = cInterestRateModel.address;
      writeFileSync(json, JSON.stringify(config));
    }

    if (config.comptroller.address == '') {
      const { impl, proxy } = await run('dc', {
        admin: admin,
        oracle: config.feedPriceOracle.address,
        ua: config.underwriterAdmin.address,
        cfm: config.comptroller.closeFactorMantissa,
        lim: config.comptroller.liquidationIncentiveMantissa,
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.comptroller.implementation = impl.address;
      config.comptroller.address = proxy.address;
      writeFileSync(json, JSON.stringify(config));
    }
    if (config.cTokens.implementation == '') {
      const cErc20Impl = await run('d', {
        name: 'CErc20',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.cTokens.implementation = cErc20Impl.address;
      writeFileSync(json, JSON.stringify(config));
    }
    const cErc20 = await ethers.getContractFactory('CErc20');
    const suErc20 = await ethers.getContractFactory('suErc20');
    const sumerOFT = await ethers.getContractFactory('SumerOFTUpgradeable');
    const comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;
    const oracle = (await ethers.getContractAt(
      'FeedPriceOracle',
      config.feedPriceOracle.address,
      wallet
    )) as FeedPriceOracle;
    if (config.cTokens.tokens.length > 0) {
      for (let i = 0; i < config.cTokens.tokens.length; i++) {
        let cToken = config.cTokens.tokens[i];
        if (cToken.address == '') {
          let data: string;
          let impl: string;
          if (cToken.native) {
            // const cEtherImpl = await run("d", {
            //     name: "CEther",
            //     rpc: rpc,
            //     pk: pk,
            //     gasprice: gasprice
            // });
            // config.cTokens.tokens[i].implementation = cEtherImpl.address;
            // writeFileSync(json, JSON.stringify(config))

            const cEther = await ethers.getContractFactory('CEther');
            data = cEther.interface.encodeFunctionData('initialize', [
              config.comptroller.address,
              config.cInterestRateModel.address,
              ethers.utils.parseUnits('1', MANTISSA_DECIMALS),
              cToken.cTokenName,
              cToken.cTokenSymbol,
              cToken.decimals,
              wallet.address
            ]);
            impl = config.cTokens.tokens[i].implementation;
          } else {
            data = cErc20.interface.encodeFunctionData('initialize', [
              cToken.underly,
              config.comptroller.address,
              config.cInterestRateModel.address,
              ethers.utils.parseUnits('1', MANTISSA_DECIMALS),
              cToken.cTokenName,
              cToken.cTokenSymbol,
              cToken.decimals,
              wallet.address
            ]);
            impl = config.cTokens.implementation;
          }
          const proxy = await run('p', {
            impl: impl,
            admin: admin,
            data: data,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
          });
          config.cTokens.tokens[i].address = proxy.address;
          writeFileSync(json, JSON.stringify(config));
        }
        const market = await comptroller.markets(cToken.address);
        if (!market.isListed || market.equalAssetGrouId != cToken.groupId) {
          let gas = await comptroller.estimateGas._supportMarket(cToken.address, cToken.groupId);
          let receipt = await comptroller._supportMarket(cToken.address, cToken.groupId, { gasLimit: gas });
          log.info('_supportMarket:', cToken.cTokenSymbol, receipt.hash);
        }
        let price =
          (await wallet.getChainId()) != 1337 ? await oracle.getUnderlyingPrice(cToken.address) : BigNumber.from(0);
        if (price.eq(BigNumber.from(0))) {
          if (cToken.oracle.type == 0) {
            let gas = await oracle.estimateGas.setChainlinkFeed(cToken.address, cToken.oracle.feed, cToken.decimals);
            let receipt = await oracle.setChainlinkFeed(cToken.address, cToken.oracle.feed, cToken.decimals, {
              gasLimit: gas
            });
            log.info('setChainlinkFeed:', cToken.cTokenSymbol, receipt.hash);
          } else if (cToken.oracle.type == 1) {
            let gas = await oracle.estimateGas.setFixedPrice(cToken.address, cToken.oracle.price);
            let receipt = await oracle.setFixedPrice(cToken.address, cToken.oracle.price, { gasLimit: gas });
            log.info('setFixedPrice:', cToken.cTokenSymbol, receipt.hash);
          } else if (cToken.oracle.type == 2) {
            let gas = await oracle.estimateGas.setBandFeed(
              cToken.address,
              cToken.oracle.feed,
              cToken.decimals,
              18,
              cToken.oracle.name
            );
            let receipt = await oracle.setBandFeed(
              cToken.address,
              cToken.oracle.feed,
              cToken.decimals,
              18,
              cToken.oracle.name,
              { gasLimit: gas }
            );
            log.info('setBandFeed:', cToken.cTokenSymbol, receipt.hash);
          } else if (cToken.oracle.type == 3) {
            let gas = await oracle.estimateGas.setWitnetFeed(cToken.address, cToken.oracle.feed, cToken.decimals, 6);
            let receipt = await oracle.setWitnetFeed(cToken.address, cToken.oracle.feed, cToken.decimals, 6, {
              gasLimit: gas
            });
            log.info('setWitnetFeed:', cToken.cTokenSymbol, receipt.hash);
          }
        }
      }
    }
    if (config.suTokens.implementation == '') {
      const suErc20Impl = await run('d', {
        name: 'suErc20',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
      });
      config.suTokens.implementation = suErc20Impl.address;
      writeFileSync(json, JSON.stringify(config));
    }
    if (config.suTokens.underly_implementation == '') {
      const suUnderLyImpl = await run('d', {
        name: 'SumerOFTUpgradeable',
        rpc: rpc,
        pk: pk,
        gasprice: gasprice
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
            config.lzEndpoint.address
          ]);
          const proxy = await run('p', {
            impl: config.suTokens.underly_implementation,
            data: data,
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
          });

          config.suTokens.tokens[i].underly = proxy.address;
          writeFileSync(json, JSON.stringify(config));
        }
        if (suToken.address == '') {
          const suTokenSymbol = `sdr${suToken.symbol}`;
          let data = suErc20.interface.encodeFunctionData('initialize', [
            config.suTokens.tokens[i].underly,
            config.comptroller.address,
            config.cInterestRateModel.address,
            ethers.utils.parseUnits('1', MANTISSA_DECIMALS), // exchange rate
            suTokenSymbol,
            suTokenSymbol,
            MANTISSA_DECIMALS,
            wallet.address
          ]);
          const proxy = await run('p', {
            impl: config.suTokens.implementation,
            data: data,
            admin: admin,
            rpc: rpc,
            pk: pk,
            gasprice: gasprice
          });
          config.suTokens.tokens[i].address = proxy.address;
          writeFileSync(json, JSON.stringify(config));
          const underly = await ethers.getContractAt(
            'SumerOFTUpgradeable',
            config.suTokens.tokens[i].underly,
            wallet
          );
          let gas = await underly.estimateGas.grantRole(MINTER_ROLE, proxy.address);
          const receipt = await underly.grantRole(MINTER_ROLE, proxy.address, { gasLimit: gas });
          log.info(`${suTokenSymbol} add minter tx:`, receipt.hash);
        }
        const market = await comptroller.markets(suToken.address);
        if (!market.isListed || market.equalAssetGrouId != suToken.groupId) {
          let gas = await comptroller.estimateGas._supportMarket(suToken.address, suToken.groupId);
          let receipt = await comptroller._supportMarket(suToken.address, suToken.groupId, { gasLimit: gas });
          log.info('_supportMarket:', suToken.symbol, receipt.hash);
        }

        const suTokenInst = await ethers.getContractAt('suErc20', config.suTokens.tokens[i].address, wallet);
        const isCToken = await suTokenInst.isCToken();
        if (isCToken) {
          let gas = await suTokenInst.estimateGas.changeCtoken();
          let receipt = await suTokenInst.changeCtoken({ gasLimit: gas });
          log.info('changeCtoken:', isCToken, receipt.hash);
        }
        
        let price =
          (await wallet.getChainId()) != 1337 ? await oracle.getUnderlyingPrice(suToken.address) : BigNumber.from(0);
        if (price.eq(BigNumber.from(0))) {
          if (suToken.oracle.type == 0) {
            let gas = await oracle.estimateGas.setChainlinkFeed(suToken.address, suToken.oracle.feed, suToken.decimals);
            let receipt = await oracle.setChainlinkFeed(suToken.address, suToken.oracle.feed, suToken.decimals, {
              gasLimit: gas
            });
            log.info('setChainlinkFeed:', suToken.symbol, receipt.hash);
          } else if (suToken.oracle.type == 1) {
            let gas = await oracle.estimateGas.setFixedPrice(suToken.address, suToken.oracle.price);
            let receipt = await oracle.setFixedPrice(suToken.address, suToken.oracle.price, { gasLimit: gas });
            log.info('setFixedPrice:', suToken.symbol, receipt.hash);
          } else if (suToken.oracle.type == 2) {
            let gas = await oracle.estimateGas.setBandFeed(
              suToken.address,
              suToken.oracle.feed,
              suToken.decimals,
              18,
              suToken.oracle.name
            );
            let receipt = await oracle.setBandFeed(
              suToken.address,
              suToken.oracle.feed,
              suToken.decimals,
              18,
              suToken.oracle.name,
              { gasLimit: gas }
            );
            log.info('setBandFeed:', suToken.symbol, receipt.hash);
          }
        }
      }
    }
  });
