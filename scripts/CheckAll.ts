import { ethers } from 'hardhat';
import { getConfig, network_config, setNetwork, getCTokens } from './helper';
import {
  CErc20,
  CToken__factory,
  CompoundLens,
  Comptroller,
  ERC20MinterBurnerPauser,
  FeedPriceOracle,
  Multicall2,
  ProxyAdmin
} from '../typechain';
import { input, select } from '@inquirer/prompts';
import { BigNumber, BytesLike, utils, constants } from 'ethers';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getConfig(netConfig.name);

  const compoundLens = (await ethers.getContractAt(
    'CompoundLens',
    config.CompoundLens.address,
    wallet
  )) as CompoundLens;
  const oracle = (await ethers.getContractAt(
    'FeedPriceOracle',
    config.FeedPriceOracle.address,
    wallet
  )) as FeedPriceOracle;
  const comptroller = (await ethers.getContractAt('Comptroller', config.Comptroller.address, wallet)) as Comptroller;
  const multicall2 = (await ethers.getContractAt('Multicall2', config.Multicall2.address, wallet)) as Multicall2;
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
      name: 'Hypothetical Account Liquidity',
      value: 8
    },
    {
      name: 'AssetGroup',
      value: 9
    },
    {
      name: 'Oracle',
      value: 10
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
          // let accountLimits = await compoundLens.callStatic.getAccountLimits(
          //   config.Comptroller.address,
          //   accountLimitsAccount
          // );
          // console.log(accountLimits);

          type Pos = {
            cToken: string;
            supply: number;
            supplyUSD: number;
            borrow: number;
            borrowUSD: number;
          };
          type Plan = {
            repayToken: string;
            maxRepayAmount: number;
            repayUSD: number;
            collateral: string;
            seizeTokens: number;
            seizeUSD: number;
            porfit: number;
          };
          type Token = {
            symbol: string;
            decimals: number;
            address: string;
            price: BigNumber;
            borrowBalance: BigNumber;
            exchangeRate: BigNumber;
          };
          type Call = {
            target: string;
            callData: BytesLike;
          };

          // const closeFactorMantissa = await comptroller.closeFactorMantissa();
          const closeFactorMantissa = BigNumber.from('500000000000000000');
          // const liquidationIncentiveMantissa = await comptroller.liquidationIncentiveMantissa();
          const liquidationIncentiveMantissa = BigNumber.from('1100000000000000000');
          const accountLimits = await compoundLens.callStatic.getAccountLimits(
            config.Comptroller.address,
            accountLimitsAccount
          );
          const prices = await oracle.getUnderlyingPrices(accountLimits.markets);

          const markets = accountLimits.markets;
          const liquidity = accountLimits.liquidity.toString();
          const shortfall = accountLimits.shortfall.toString();
          let postions: Pos[] = [];
          let totalSupplyUSD: BigNumber = BigNumber.from(0);
          let totalBorrowUSD: BigNumber = BigNumber.from(0);
          let collaterals: Token[] = [];
          let repayTokens: Token[] = [];
          let plans: Plan[] = [];
          let calls: Call[] = [];
          const ctokenInterface = CToken__factory.createInterface();

          for (let i = 0; i < markets.length; i++) {
            let tokenAddr = markets[i];
            let snapshotCall = ctokenInterface.encodeFunctionData('getAccountSnapshot', [accountLimitsAccount]);
            let symbolCall = ctokenInterface.encodeFunctionData('symbol');
            let decimalsCall = ctokenInterface.encodeFunctionData('decimals');
            let exchangeRateCall = ctokenInterface.encodeFunctionData('exchangeRateStored');
            let borrowBalanceCall = ctokenInterface.encodeFunctionData('borrowBalanceStored', [accountLimitsAccount]);

            calls.push({
              target: tokenAddr,
              callData: snapshotCall
            });
            calls.push({
              target: tokenAddr,
              callData: symbolCall
            });
            calls.push({
              target: tokenAddr,
              callData: decimalsCall
            });
            calls.push({
              target: tokenAddr,
              callData: exchangeRateCall
            });
            calls.push({
              target: tokenAddr,
              callData: borrowBalanceCall
            });
          }
          const result = await multicall2.callStatic.aggregate(calls);
          const returnData = result.returnData;

          for (let i = 0; i < markets.length; i++) {
            let tokenAddr = markets[i];

            let snapshot = ctokenInterface.decodeFunctionResult('getAccountSnapshot', returnData[i * 5 + 0]);
            let symbol = ctokenInterface.decodeFunctionResult('symbol', returnData[i * 5 + 1])[0];
            let decimals = ctokenInterface.decodeFunctionResult('decimals', returnData[i * 5 + 2])[0];
            let exchangeRate = ctokenInterface.decodeFunctionResult('exchangeRateStored', returnData[i * 5 + 3])[0];
            let borrowBalance = ctokenInterface.decodeFunctionResult('borrowBalanceStored', returnData[i * 5 + 4])[0];

            let price = prices[i];

            let supplyTokens = snapshot[1].mul(exchangeRate).div(expScale);
            let supplyUSD = supplyTokens.mul(price).div(expScale);
            totalSupplyUSD = totalSupplyUSD.add(supplyUSD);
            if (snapshot[1].gt(0)) {
              collaterals.push({
                symbol: symbol,
                decimals: decimals,
                address: tokenAddr,
                price: price,
                borrowBalance: BigNumber.from(0),
                exchangeRate: exchangeRate
              });
            }
            let borrowTokens = snapshot[2].mul(exchangeRate).div(expScale);
            console.log(price);
            let borrowUSD = borrowTokens.mul(price).div(expScale);
            totalBorrowUSD = totalBorrowUSD.add(borrowUSD);
            if (snapshot[2].gt(0)) {
              repayTokens.push({
                symbol: symbol,
                decimals: decimals,
                address: tokenAddr,
                price: price,
                borrowBalance: borrowBalance,
                exchangeRate: exchangeRate
              });
            }

            let postion: Pos = {
              cToken: symbol,
              supply: parseFloat(utils.formatUnits(snapshot[1].toString(), decimals)),
              supplyUSD: parseFloat(utils.formatUnits(supplyUSD, decimals)),
              borrow: parseFloat(utils.formatUnits(snapshot[2].toString(), decimals)),
              borrowUSD: parseFloat(utils.formatUnits(borrowUSD, decimals))
            };
            postions.push(postion);
          }
          console.table(postions);

          for (let i = 0; i < repayTokens.length; i++) {
            let repayToken = repayTokens[i];
            let maxRepayAmount = mul_ScalarTruncate(closeFactorMantissa, repayToken.borrowBalance);
            let repayUSD = maxRepayAmount.mul(repayToken.price).div(expScale);
            for (let j = 0; j < collaterals.length; j++) {
              let collateral = collaterals[j];
              let seizeTokens = liquidateCalculateSeizeTokens(
                liquidationIncentiveMantissa,
                repayToken.price,
                collateral.price,
                collateral.exchangeRate,
                maxRepayAmount
              );
              let sizeUSD = seizeTokens.mul(collateral.price).div(expScale);
              if (sizeUSD.sub(repayUSD).gte(utils.parseUnits('10'))) {
                plans.push({
                  repayToken: repayToken.symbol,
                  maxRepayAmount: parseFloat(utils.formatUnits(maxRepayAmount, repayToken.decimals)),
                  repayUSD: parseFloat(utils.formatUnits(repayUSD)),
                  collateral: collateral.symbol,
                  seizeTokens: parseFloat(utils.formatUnits(seizeTokens, collateral.decimals)),
                  seizeUSD: parseFloat(utils.formatUnits(sizeUSD)),
                  porfit: parseFloat(utils.formatUnits(sizeUSD.sub(repayUSD)))
                });
              }
            }
          }
          console.table(plans);
          console.log('liquidity:', liquidity);
          console.log('shortfall:', shortfall);
          console.info('totalSupplyUSD:', parseFloat(utils.formatUnits(totalSupplyUSD)));
          console.info('totalBorrowUSD:', parseFloat(utils.formatUnits(totalBorrowUSD)));
          break;
        case 8:
          console.log(`检查Hypothetical Account Liquidity:`);
          const account = await input({
            message: '输入查询账户地址',
            default: wallet.address,
            validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
          });
          const cToken = await input({
            message: '输入查询CToken地址',
            validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
          });
          const accountLiquidity = await comptroller.getHypotheticalAccountLiquidity(account, cToken, 0, 0);
          console.info('accountLiquidity.liquidity:', accountLiquidity[1].toString());
          console.info('accountLiquidity.shortfall:', accountLiquidity[2].toString());

          type AccountLiquidityLocalVars = {
            equalAssetsGroupNum: number;
            assetGroupId: number;
            sumCollateral: BigNumber;
            sumBorrowPlusEffects: BigNumber;
            cTokenBalance: BigNumber;
            borrowBalance: BigNumber;
            exchangeRateMantissa: BigNumber;
            oraclePriceMantissa: BigNumber;
            collateralFactor: BigNumber;
            exchangeRate: BigNumber;
            oraclePrice: BigNumber;
            tokensToDenom: BigNumber;
            discountRate: BigNumber;
            intraCRate: BigNumber;
            intraMintRate: BigNumber;
            interCRate: BigNumber;
            intraSuRate: BigNumber;
            interSuRate: BigNumber;
            // suTokenCollateralRate: BigNumber;
            // borrowCollateralRate: BigNumber;
            isSuToken: boolean;
            tokenDepositVal: BigNumber;
            tokenBorrowVal: BigNumber;
          };
          type AccountGroupLocalVars = {
            groupId: Number;
            cTokenBalanceSum: BigNumber;
            cTokenBorrowSum: BigNumber;
            suTokenBalanceSum: BigNumber;
            suTokenBorrowSum: BigNumber;
          };
          let vars: AccountLiquidityLocalVars = {
            equalAssetsGroupNum: 0,
            assetGroupId: 0,
            sumCollateral: BigNumber.from(0),
            sumBorrowPlusEffects: BigNumber.from(0),
            cTokenBalance: BigNumber.from(0),
            borrowBalance: BigNumber.from(0),
            exchangeRateMantissa: BigNumber.from(0),
            oraclePriceMantissa: BigNumber.from(0),
            collateralFactor: BigNumber.from(0),
            exchangeRate: BigNumber.from(0),
            oraclePrice: BigNumber.from(0),
            tokensToDenom: BigNumber.from(0),
            discountRate: BigNumber.from(0),
            intraCRate: BigNumber.from(0),
            intraMintRate: BigNumber.from(0),
            interCRate: BigNumber.from(0),
            intraSuRate: BigNumber.from(0),
            interSuRate: BigNumber.from(0),
            // suTokenCollateralRate: BigNumber.from(0),
            // borrowCollateralRate: BigNumber.from(0),
            isSuToken: false,
            tokenDepositVal: BigNumber.from(0),
            tokenBorrowVal: BigNumber.from(0)
          };
          let groupVars: AccountGroupLocalVars[] = [];
          vars.equalAssetsGroupNum = await comptroller.getAssetGroupNum(); // Line 85
          for (let i = 0; i < vars.equalAssetsGroupNum; i++) {
            groupVars.push({
              groupId: 0,
              cTokenBalanceSum: BigNumber.from(0),
              cTokenBorrowSum: BigNumber.from(0),
              suTokenBalanceSum: BigNumber.from(0),
              suTokenBorrowSum: BigNumber.from(0)
            });
          }
          if (cToken != constants.AddressZero) {
            const CToken = (await ethers.getContractAt('CErc20', cToken, wallet)) as CErc20;
            vars.isSuToken = !(await CToken.isCToken()); // Line 89
            vars.discountRate = await CToken.getDiscountRate(); // Line 111
          }
          const assets = await comptroller.getAssetsIn(account); // Line 95

          for (let i = 0; i < assets.length; i++) {
            // Line 101
            let asset = assets[i]; // Line 102
            vars.tokenDepositVal = BigNumber.from(0); // Line 98
            vars.tokenBorrowVal = BigNumber.from(0); // Line 99
            const [isListed, assetGroupId, isComped] = await comptroller.markets(asset); // Line 101
            let assetToken = (await ethers.getContractAt('CErc20', asset, wallet)) as CErc20;
            let [err, cTokenBalance, borrowBalance, exchangeRateMantissa] = await assetToken.getAccountSnapshot(
              account
            ); // Line 106

            vars.cTokenBalance = cTokenBalance;
            vars.borrowBalance = borrowBalance;
            vars.exchangeRateMantissa = exchangeRateMantissa;
            vars.exchangeRate = exchangeRateMantissa; // Line 110
            vars.oraclePriceMantissa = await oracle.getUnderlyingPrice(asset); // Line 115
            vars.oraclePrice = vars.oraclePriceMantissa; // Line 117
            vars.tokensToDenom = vars.exchangeRate // Line 121
              .mul(vars.oraclePrice)
              .div(expScale)
              .mul(vars.discountRate)
              .div(expScale); // Line 122

            const symbol = await assetToken.symbol();
            console.log(`asset ${symbol}
      exchangeRate: ${vars.exchangeRate}
      oraclePrice : ${vars.oraclePrice}
      discountRate : ${vars.discountRate}
      expScale : ${expScale}`);

            let index: number; // Line 124
            for (index = 0; index < vars.equalAssetsGroupNum; index++) {
              // Line 125
              // let marketGroupId = await comptroller.marketGroupId(asset);
              if (groupVars[index].groupId == 0) {
                groupVars[index].groupId = assetGroupId; // Line 131
                break;
              } else {
                if (groupVars[index].groupId == assetGroupId) {
                  break; // Line 128
                }
              }
            }
            vars.tokenDepositVal = mul_ScalarTruncateAddUInt(
              vars.tokensToDenom,
              vars.cTokenBalance,
              vars.tokenDepositVal
            ); // Line 136
            vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, vars.borrowBalance, vars.tokenBorrowVal); // Line 137

            // const symbol = await assetToken.symbol();
            // console.log(`asset ${symbol}
            // tokensToDenom: ${vars.tokensToDenom}
            // cTokenBalance : ${vars.cTokenBalance}
            // tokenDepositVal : ${vars.tokenDepositVal}`);

            if (asset == cToken) {
              // Line 138
              let redeemVal = truncate(vars.tokensToDenom.mul(0)); // Line 139
              if (redeemVal.lte(vars.tokenDepositVal)) {
                // Line 140
                vars.tokenDepositVal = vars.tokenDepositVal.sub(redeemVal); // Line 144
                redeemVal = BigNumber.from(0); // Line 145
              } else {
                redeemVal = redeemVal.sub(vars.tokenDepositVal); // Line 149
                vars.tokenBorrowVal = vars.tokenBorrowVal.add(redeemVal); // Line 150
                vars.tokenDepositVal = BigNumber.from(0); // Line 151
              }
              vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, BigNumber.from(0), vars.tokenBorrowVal); // Line 154
            }
            // const symbol = await assetToken.symbol();
            //   console.log(`asset ${symbol}
            //   depositVal: ${vars.tokenDepositVal}
            //   borrowVal : ${vars.tokenBorrowVal}`);
            if (await assetToken.isCToken()) {
              // Line 157
              groupVars[index].cTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].cTokenBalanceSum); // Line 158
              groupVars[index].cTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].cTokenBorrowSum); // Line 159
            } else {
              groupVars[index].suTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].suTokenBalanceSum); // Line 161
              groupVars[index].suTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].suTokenBorrowSum); // Line 162
            }
          }
          // Line 166
          let targetGroup: AccountGroupLocalVars = {
            groupId: 0,
            cTokenBalanceSum: BigNumber.from(0),
            cTokenBorrowSum: BigNumber.from(0),
            suTokenBalanceSum: BigNumber.from(0),
            suTokenBorrowSum: BigNumber.from(0)
          };
          // Line 167
          let targetVars: AccountLiquidityLocalVars = {
            equalAssetsGroupNum: 0,
            assetGroupId: 0,
            sumCollateral: BigNumber.from(0),
            sumBorrowPlusEffects: BigNumber.from(0),
            cTokenBalance: BigNumber.from(0),
            borrowBalance: BigNumber.from(0),
            exchangeRateMantissa: BigNumber.from(0),
            oraclePriceMantissa: BigNumber.from(0),
            collateralFactor: BigNumber.from(0),
            exchangeRate: BigNumber.from(0),
            oraclePrice: BigNumber.from(0),
            tokensToDenom: BigNumber.from(0),
            discountRate: BigNumber.from(0),
            intraCRate: BigNumber.from(0),
            intraMintRate: BigNumber.from(0),
            interCRate: BigNumber.from(0),
            intraSuRate: BigNumber.from(0),
            interSuRate: BigNumber.from(0),
            // suTokenCollateralRate: BigNumber.from(0),
            // borrowCollateralRate: BigNumber.from(0),
            isSuToken: false,
            tokenDepositVal: BigNumber.from(0),
            tokenBorrowVal: BigNumber.from(0)
          };
          // Line 168
          for (let i = 0; i < vars.equalAssetsGroupNum; i++) {
            const [isListed, assetGroupId, isComped] = await comptroller.markets(cToken); // Line 169
            if (groupVars[i].groupId == 0) {
              continue;
            }
            let equalAssetsGroup = await comptroller.getAssetGroup(BigNumber.from(groupVars[i].groupId)); // Line 173
            vars.intraCRate = equalAssetsGroup.intraCRateMantissa; // Line 177
            vars.intraMintRate = equalAssetsGroup.intraMintRateMantissa; // Line 178
            vars.intraSuRate = equalAssetsGroup.intraSuRateMantissa; // Line 179
            vars.interCRate = equalAssetsGroup.interCRateMantissa; // Line 180
            vars.interSuRate = equalAssetsGroup.interSuRateMantissa; // Line 181
            // vars.borrowCollateralRate = expScale;
            //   console.log(`group ${i} ${equalAssetsGroup.groupName}
            //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
            //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
            //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
            //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
            //   `);
            // Line 184
            if (groupVars[i].suTokenBorrowSum.gt(0)) {
              let collateralizedLoan = mul_ScalarTruncate(vars.intraMintRate, groupVars[i].cTokenBalanceSum); // Line 185
              // Line 186
              if (groupVars[i].suTokenBorrowSum.lte(collateralizedLoan)) {
                // collateral could cover the loan
                let usedCollateral = groupVars[i].suTokenBorrowSum.mul(expScale).div(vars.intraMintRate); // Line 188
                groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub(usedCollateral); // Line 189
                groupVars[i].suTokenBorrowSum = BigNumber.from(0); // Line 190
              } else {
                // collateral could not cover the loan
                groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub(collateralizedLoan); // Line 193
                groupVars[i].cTokenBalanceSum = BigNumber.from(0); // Line 194
              }
            }
            //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb sutoken loan with cToken collateral
            //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
            //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
            //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
            //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
            //   `);
            // absorb cToken loan with cToken collateral
            // Line 199
            if (groupVars[i].cTokenBorrowSum.gt(0)) {
              let collateralizedLoan = mul_ScalarTruncate(vars.intraCRate, groupVars[i].cTokenBalanceSum); // Line 200
              // Line 201
              if (groupVars[i].cTokenBorrowSum.lte(collateralizedLoan)) {
                // collateral could cover the loan
                let usedCollateral = groupVars[i].cTokenBorrowSum.mul(expScale).div(vars.intraCRate); // Line 203
                groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub(usedCollateral); // Line 204
                groupVars[i].cTokenBorrowSum = BigNumber.from(0); // Line 205
              } else {
                // collateral could not cover the loan
                groupVars[i].cTokenBalanceSum = BigNumber.from(0); // Line 208
                groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub(collateralizedLoan); // Line 209
              }
            }
            //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb cToken loan with cToken collateral
            //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
            //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
            //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
            //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
            //   `);

            // absorb sutoken loan with sutoken collateral
            // Line 214
            if (groupVars[i].suTokenBorrowSum.gt(0)) {
              let collateralizedLoan = mul_ScalarTruncate(vars.intraSuRate, groupVars[i].suTokenBalanceSum); // Line 215
              // Line 216
              if (groupVars[i].suTokenBorrowSum.lte(collateralizedLoan)) {
                // collateral could cover the loan
                let usedCollateral = groupVars[i].suTokenBorrowSum.mul(expScale).div(vars.intraSuRate); // Line 218
                groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub(usedCollateral); // Line 219
                groupVars[i].suTokenBorrowSum = BigNumber.from(0); // Line 220
              } else {
                // collateral could not cover the loan
                groupVars[i].suTokenBalanceSum = BigNumber.from(0); // Line 223
                groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub(collateralizedLoan); // Line 224
              }
            }
            //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb sutoken loan with sutoken collateral
            //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
            //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
            //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
            //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
            //   `);

            // absorb cToken loan with sutoken collateral
            // Line 229
            if (groupVars[i].cTokenBorrowSum.gt(0)) {
              let collateralizedLoan = mul_ScalarTruncate(vars.intraSuRate, groupVars[i].suTokenBalanceSum); // Line 230
              // Line 231
              if (groupVars[i].cTokenBorrowSum.lte(collateralizedLoan)) {
                let usedCollateral = groupVars[i].cTokenBorrowSum.mul(expScale).div(vars.intraSuRate); // Line 232
                groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub(usedCollateral); // Line 233
                groupVars[i].cTokenBorrowSum = BigNumber.from(0); // Line 234
              } else {
                groupVars[i].suTokenBalanceSum = BigNumber.from(0); // Line 236
                groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub(collateralizedLoan); // Line 237
              }
            }
            //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb cToken loan with sutoken collateral
            //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
            //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
            //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
            //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
            //   `);

            // const targetGroupId = await comptroller.marketGroupId(cToken);
            //   console.log(`target groupId: ${targetGroupId}`);
            //   console.log(`groupId: ${groupVars[i].groupId}`);
            // Line 241
            if (groupVars[i].groupId == assetGroupId) {
              targetGroup = groupVars[i]; // Line 242
              targetVars = vars; // Line 243
              // console.log(`set target group: ${i} ${targetGroup.cTokenBalanceSum}, ${targetGroup.suTokenBalanceSum}`);
            } else {
              // log.info("=======================");
              // log.info('interCRate:', vars.interCRate.toString());
              // log.info('cTokenBalanceSum:', groupVars[i].cTokenBalanceSum.toString());
              // log.info('sumCollateral:', vars.sumCollateral.toString());
              // Line 245
              vars.sumCollateral = mul_ScalarTruncateAddUInt(
                vars.interCRate,
                groupVars[i].cTokenBalanceSum,
                vars.sumCollateral
              );
              // log.info('sumCollateral:', vars.sumCollateral.toString());
              // log.info('=======================');
              // log.info('sumCollateral:', vars.sumCollateral.toString());
              // log.info('interCRate:', vars.interCRate.toString());
              // log.info('suTokenBalanceSum:', groupVars[i].suTokenBalanceSum.toString());
              // Line 249
              vars.sumCollateral = mul_ScalarTruncateAddUInt(
                vars.interSuRate,
                groupVars[i].suTokenBalanceSum,
                vars.sumCollateral
              );
              // log.info('sumCollateral:', vars.sumCollateral.toString());
              // log.info('=======================');
            }
            // Line 255
            vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.add(
              groupVars[i].cTokenBorrowSum.add(groupVars[i].suTokenBorrowSum)
            );
            //   log.info('sumBorrowPlusEffect: ', vars.sumBorrowPlusEffects.toString());
          }

          // These are safe, as the underflow condition is checked first
          // Line 261
          if (vars.sumCollateral.gt(vars.sumBorrowPlusEffects)) {
            vars.sumCollateral = vars.sumCollateral.sub(vars.sumBorrowPlusEffects); // Line 262
            vars.sumBorrowPlusEffects = BigNumber.from(0); // Line 263
          } else {
            vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(vars.sumCollateral); // Line 265
            vars.sumCollateral = BigNumber.from(0); // Line 266
          }
          // console.log(`initially
          // sumCollateral : ${vars.sumCollateral.toString()}
          // sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);

          // console.log(`targetGroup.cTokenBalanceSum ${targetGroup.cTokenBalanceSum}, rate: ${targetVars.interCRate}`);
          // console.log(`targetGroup.suTokenBalanceSum ${targetGroup.suTokenBalanceSum}, rate: ${targetVars.interSuRate}`);
          // Line 269
          if (vars.sumBorrowPlusEffects.gt(0)) {
            let collateralizedLoan = mul_ScalarTruncate(targetVars.interCRate, targetGroup.cTokenBalanceSum); // Line 270
            // Line 271
            if (collateralizedLoan.gt(vars.sumBorrowPlusEffects)) {
              // Line 272
              targetGroup.cTokenBalanceSum = targetGroup.cTokenBalanceSum.sub(
                vars.sumBorrowPlusEffects.mul(expScale).div(targetVars.interCRate)
              );
              vars.sumBorrowPlusEffects = BigNumber.from(0); // Line 275
            } else {
              vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(collateralizedLoan); // Line 277
              targetGroup.cTokenBalanceSum = BigNumber.from(0); // Line 278
            }
          }
          // console.log(`after absort target cToken
          // sumCollateral : ${vars.sumCollateral.toString()}
          // sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);
          // Line 282
          if (vars.sumBorrowPlusEffects.gt(0)) {
            let collateralizedLoan = mul_ScalarTruncate(targetVars.interSuRate, targetGroup.suTokenBalanceSum); // Line 283
            // Line 284
            if (collateralizedLoan.gt(vars.sumBorrowPlusEffects)) {
              // Line 285
              targetGroup.suTokenBalanceSum = targetGroup.suTokenBalanceSum.sub(
                vars.sumBorrowPlusEffects.mul(expScale).div(targetVars.interSuRate)
              );
              // Line 288
              vars.sumBorrowPlusEffects = BigNumber.from(0);
            } else {
              vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(collateralizedLoan); // Line 290
              targetGroup.suTokenBalanceSum = BigNumber.from(0); // Line 291
            }
          }
          // console.log(`after absort target sutoken
          // sumCollateral : ${vars.sumCollateral.toString()}
          // sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);
          // Line 294
          if (vars.isSuToken) {
            // Line 295
            vars.sumCollateral = mul_ScalarTruncateAddUInt(
              vars.intraMintRate,
              targetGroup.cTokenBalanceSum,
              vars.sumCollateral
            );
          } else {
            vars.sumCollateral = mul_ScalarTruncateAddUInt(
              vars.intraCRate,
              targetGroup.cTokenBalanceSum,
              vars.sumCollateral
            ); // Line 300
          }
          vars.sumCollateral = mul_ScalarTruncateAddUInt(
            vars.intraSuRate,
            targetGroup.suTokenBalanceSum,
            vars.sumCollateral
          ); // Line 302
          // log.info('vars.sumCollateral:', vars.sumCollateral.toString());
          // log.info('vars.sumBorrowPlusEffects:', vars.sumBorrowPlusEffects.toString());
          if (vars.sumCollateral.gt(vars.sumBorrowPlusEffects)) {
            console.info(0, vars.sumCollateral.sub(vars.sumBorrowPlusEffects).toString(), 0);
          } else {
            console.info(0, 0, vars.sumBorrowPlusEffects.sub(vars.sumCollateral).toString());
          }
          break;
        case 9:
          let assetGroupNum = await comptroller.getAssetGroupNum();
          type AssetGroup = {
            groupId: number;
            groupName: string;
            intraCRateMantissa: string;
            intraMintRateMantissa: string;
            intraSuRateMantissa: string;
            interCRateMantissa: string;
            interSuRateMantissa: string;
          };

          let assetGroups: AssetGroup[] = [];
          for (let i = 0; i < assetGroupNum; i++) {
            let assetGroup = await comptroller.getAssetGroup(i + 1);
            assetGroups.push({
              groupId: assetGroup.groupId,
              groupName: assetGroup.groupName,
              intraCRateMantissa: assetGroup.intraCRateMantissa.toString(),
              intraMintRateMantissa: assetGroup.intraMintRateMantissa.toString(),
              intraSuRateMantissa: assetGroup.intraSuRateMantissa.toString(),
              interCRateMantissa: assetGroup.interCRateMantissa.toString(),
              interSuRateMantissa: assetGroup.interSuRateMantissa.toString()
            });
          }
          console.table(assetGroups);
          type CtokenDetail = {
            token: string;
            groupId: number;
          };
          let ctokenDetail: CtokenDetail[] = [];

          for (let i = 0; i < tokens.length; i++) {
            let market = await comptroller.markets(tokens[i]);
            ctokenDetail.push({
              token: tokens[i],
              groupId: market.assetGroupId
            });
          }
          console.table(ctokenDetail);
          break;
        case 10:
          console.log(`检查Oracle underlying price:`);
          for (let i = 0; i < tokens.length; i++) {
            let price = await oracle.getUnderlyingPrice(tokens[i]);
            console.log(tokens[i], ': ', price);
          }
          break;
      }
    }
  } while (func_select != 'exit');
};

main();

const expScale = BigNumber.from(BigNumber.from(10).pow(18));
const mul_ScalarTruncate = (a: BigNumber, scalar: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product);
};
const truncate = (exp: BigNumber): BigNumber => {
  return exp.div(expScale);
};
const mul_ScalarTruncateAddUInt = (a: BigNumber, scalar: BigNumber, addend: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product).add(addend);
};
const liquidateCalculateSeizeTokens = (
  liquidationIncentiveMantissa: BigNumber,
  repayTokenPrice: BigNumber,
  collateralPrice: BigNumber,
  exchangeRate: BigNumber,
  maxRepayAmount: BigNumber
): BigNumber => {
  const numerator = liquidationIncentiveMantissa.mul(repayTokenPrice).div(expScale);
  const denominator = collateralPrice.mul(exchangeRate).div(expScale);
  const ratio = numerator.mul(expScale).div(denominator);

  return mul_ScalarTruncate(ratio, maxRepayAmount);
};
