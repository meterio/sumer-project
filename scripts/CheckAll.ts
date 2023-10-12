import { ethers } from 'hardhat';
import { getConfig, network_config, setNetwork, getCTokens } from './helper';
import { CompoundLens, ERC20MinterBurnerPauser, Multicall2, ProxyAdmin } from '../typechain';
import { input, select } from '@inquirer/prompts';
import { utils } from 'ethers';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getConfig(netConfig.name);

  const compoundLens = (await ethers.getContractAt(
    'CompoundLens',
    config.CompoundLens.address,
    wallet
  )) as CompoundLens;
  let tokens = getCTokens(network);

  let choice: any[] = [
    {
      name: 'Proxy Admin',
      value: 1
    },
    {
      name: 'Multicall2',
      value: 2
    },
    {
      name: 'Sumer',
      value: 3
    },
    {
      name: 'CTokenMetadata',
      value: 4
    },
    {
      name: 'CTokenBalances',
      value: 5
    },
    {
      name: 'CTokenUnderlyingPrice',
      value: 6
    },
    {
      name: 'AccountLimits',
      value: 7
    },
    {
      name: '退出',
      value: 'exit'
    }
  ];

  let func_select: string | number;

  do {
    func_select = await select({
      message: '选择操作:',
      choices: choice
    });
    if (func_select != 'exit') {
      switch (func_select) {
        case 1:
          console.log(`Proxy Admin合约地址:`);
          console.log(`${config.ProxyAdmin.address}`);
          const proxyAdmin = (await ethers.getContractAt(
            'ProxyAdmin',
            config.ProxyAdmin.address,
            wallet
          )) as ProxyAdmin;
          console.log(`检查Proxy Admin的Owner:${await proxyAdmin.owner()}`);
          break;
        case 2:
          console.log(`Multicall2合约地址:`);
          console.log(`${config.Multicall2.address}`);
          const multicall2 = (await ethers.getContractAt(
            'Multicall2',
            config.Multicall2.address,
            wallet
          )) as Multicall2;
          console.log(`检查Multicall2:`);
          console.log(`getBlockNumber:${await multicall2.getBlockNumber()}`);
          console.log(`getCurrentBlockDifficulty:${await multicall2.getCurrentBlockDifficulty()}`);
          console.log(`getCurrentBlockGasLimit:${await multicall2.getCurrentBlockGasLimit()}`);
          console.log(`getCurrentBlockTimestamp:${await multicall2.getCurrentBlockTimestamp()}`);
          console.log(`getLastBlockHash:${await multicall2.getLastBlockHash()}`);
          console.log(`getEthBalance:${await multicall2.getEthBalance(wallet.address)}`);

          break;
        case 3:
          console.log(`Sumer合约地址:`);
          console.log(`${config.Sumer.address}`);
          const sumer = (await ethers.getContractAt(
            'ERC20MinterBurnerPauser',
            config.Sumer.address,
            wallet
          )) as ERC20MinterBurnerPauser;
          console.log(`检查Sumer:`);
          console.log(`name:${await sumer.name()}`);
          console.log(`symbol:${await sumer.symbol()}`);
          console.log(`decimals:${await sumer.decimals()}`);
          console.log(`totalSupply:${await sumer.totalSupply()}`);
          break;
        case 4:
          console.log(`检查cTokenMetadata:`);
          let cTokenMetadata: CTokenMetadata[] = [];
          type CTokenMetadata = {
            cToken: string;
            exchangeRateCurrent: string;
            supplyRatePerBlock: string;
            borrowRatePerBlock: string;
            reserveFactorMantissa: string;
            totalBorrows: string;
            totalReserves: string;
            totalSupply: string;
            totalCash: string;
            isListed: boolean;
            underlyingAssetAddress: string;
            cTokenDecimals: string;
            underlyingDecimals: string;
            isCToken: boolean;
            isCEther: boolean;
            borrowCap: string;
            depositCap: string;
            heteroLiquidationIncentive: string;
            homoLiquidationIncentive: string;
            sutokenLiquidationIncentive: string;
            groupId: number;
            intraRate: string;
            mintRate: string;
            interRate: string;
            discountRate: string;
          };

          let cTokenMetadataAll = await compoundLens.callStatic.cTokenMetadataAll(tokens);
          for (let i = 0; i < cTokenMetadataAll.length; i++) {
            cTokenMetadata.push({
              cToken: cTokenMetadataAll[i].cToken,
              exchangeRateCurrent: cTokenMetadataAll[i].exchangeRateCurrent.toString(),
              supplyRatePerBlock: cTokenMetadataAll[i].supplyRatePerBlock.toString(),
              borrowRatePerBlock: cTokenMetadataAll[i].borrowRatePerBlock.toString(),
              reserveFactorMantissa: cTokenMetadataAll[i].reserveFactorMantissa.toString(),
              totalBorrows: cTokenMetadataAll[i].totalBorrows.toString(),
              totalReserves: cTokenMetadataAll[i].totalReserves.toString(),
              totalSupply: cTokenMetadataAll[i].totalSupply.toString(),
              totalCash: cTokenMetadataAll[i].totalCash.toString(),
              isListed: cTokenMetadataAll[i].isListed,
              underlyingAssetAddress: cTokenMetadataAll[i].underlyingAssetAddress,
              cTokenDecimals: cTokenMetadataAll[i].cTokenDecimals.toString(),
              underlyingDecimals: cTokenMetadataAll[i].underlyingDecimals.toString(),
              isCToken: cTokenMetadataAll[i].isCToken,
              isCEther: cTokenMetadataAll[i].isCEther,
              borrowCap: cTokenMetadataAll[i].borrowCap.toString(),
              depositCap: cTokenMetadataAll[i].depositCap.toString(),
              heteroLiquidationIncentive: cTokenMetadataAll[i].heteroLiquidationIncentive.toString(),
              homoLiquidationIncentive: cTokenMetadataAll[i].homoLiquidationIncentive.toString(),
              sutokenLiquidationIncentive: cTokenMetadataAll[i].sutokenLiquidationIncentive.toString(),
              groupId: cTokenMetadataAll[i].groupId,
              intraRate: cTokenMetadataAll[i].intraRate.toString(),
              mintRate: cTokenMetadataAll[i].mintRate.toString(),
              interRate: cTokenMetadataAll[i].interRate.toString(),
              discountRate: cTokenMetadataAll[i].discountRate.toString()
            });
          }
          console.table(cTokenMetadata);
          break;
        case 5:
          console.log(`检查CTokenBalances:`);
          const cTokenBalancesAccount = await input({
            message: '输入查询CTokenBalances的账户地址',
            default: wallet.address,
            validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
          });
          type CTokenBalances = {
            cToken: string;
            isCToken: boolean;
            isCEther: boolean;
            balanceOf: string;
            borrowBalanceCurrent: string;
            balanceOfUnderlying: string;
            tokenBalance: string;
            tokenAllowance: string;
          };
          let cTokenBalances: CTokenBalances[] = [];
          let cTokenBalancesAll = await compoundLens.callStatic.cTokenBalancesAll(tokens, cTokenBalancesAccount);
          for (let i = 0; i < cTokenBalancesAll.length; i++) {
            cTokenBalances.push({
              cToken: cTokenBalancesAll[i].cToken,
              isCToken: cTokenBalancesAll[i].isCToken,
              isCEther: cTokenBalancesAll[i].isCEther,
              balanceOf: cTokenBalancesAll[i].balanceOf.toString(),
              borrowBalanceCurrent: cTokenBalancesAll[i].borrowBalanceCurrent.toString(),
              balanceOfUnderlying: cTokenBalancesAll[i].balanceOfUnderlying.toString(),
              tokenBalance: cTokenBalancesAll[i].tokenBalance.toString(),
              tokenAllowance: cTokenBalancesAll[i].tokenAllowance.toString()
            });
          }
          console.table(cTokenBalances);
          break;
        case 6:
          console.log(`检查CTokenUnderlyingPrice:`);
          type CTokenUnderlyingPrice = {
            cToken: string;
            underlyingPrice: string;
          };
          let cCTokenUnderlyingPrice: CTokenUnderlyingPrice[] = [];
          let cTokenUnderlyingPriceAll = await compoundLens.callStatic.cTokenUnderlyingPriceAll(tokens);
          for (let i = 0; i < cTokenUnderlyingPriceAll.length; i++) {
            cCTokenUnderlyingPrice.push({
              cToken: cTokenUnderlyingPriceAll[i].cToken,
              underlyingPrice: cTokenUnderlyingPriceAll[i].underlyingPrice.toString()
            });
          }
          console.table(cCTokenUnderlyingPrice);
          break;
        case 7:
          console.log(`检查AccountLimits:`);
          const accountLimitsAccount = await input({
            message: '输入查询AccountLimits的账户地址',
            default: wallet.address,
            validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
          });
          let accountLimits = await compoundLens.callStatic.getAccountLimits(
            config.Comptroller.address,
            accountLimitsAccount
          );
          console.log(accountLimits);
          break;
      }
    }
  } while (func_select != 'exit');
};

main();
