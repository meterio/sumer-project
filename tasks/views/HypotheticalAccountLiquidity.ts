import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { CErc20, Comptroller, FeedPriceOracle, UnderwriterAdmin } from '../../typechain';
import { type } from 'os';
import { BigNumber, constants } from 'ethers';

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
  intraCRate: BigNumber;
  interCRate: BigNumber;
  intraSuRate: BigNumber;
  interSuRate: BigNumber;
  suTokenCollateralRate: BigNumber;
  borrowCollateralRate: BigNumber;
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
const expScale = BigNumber.from(BigNumber.from(10).pow(18));
/**
npx hardhat hal \
--json "config json file" \
--account "account address" \
--ctoken "cTokenModify" \
--redeem "redeemTokens" \
--borrow "borrowAmount" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> 
 */

task('hal', 'get Hypothetical Account Liquidity')
  .addParam('json', 'config json file')
  .addParam('account', 'account address')
  .addOptionalParam('ctoken', 'cTokenModify', constants.AddressZero, types.string)
  .addOptionalParam('redeem', 'redeemTokens', 0, types.int)
  .addOptionalParam('borrow', 'borrowAmount', 0, types.int)
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .setAction(async ({ account, json, ctoken, redeem, borrow, rpc, pk }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());

    log.info('RPC: ', rpc);
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);
    log.info('address: ', config.comptroller.address);
    const comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;
    log.info('created comptroller');
    const accountLiquidity = await comptroller.getHypotheticalAccountLiquidity(
      account,
      ctoken,
      redeem,
      borrow
    );
    log.info('accountLiquidity.liquidity:', accountLiquidity[1].toString());
    log.info('accountLiquidity.shortfall:', accountLiquidity[2].toString());

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
      intraCRate: BigNumber.from(0),
      interCRate: BigNumber.from(0),
      intraSuRate: BigNumber.from(0),
      interSuRate: BigNumber.from(0),
      suTokenCollateralRate: BigNumber.from(0),
      borrowCollateralRate: BigNumber.from(0),
      isSuToken: false,
      tokenDepositVal: BigNumber.from(0),
      tokenBorrowVal: BigNumber.from(0),
    };
    let groupVars: AccountGroupLocalVars[] = [];
    const ua = (await ethers.getContractAt(
      'UnderwriterAdmin',
      config.underwriterAdmin.address,
      wallet
    )) as UnderwriterAdmin;
    vars.equalAssetsGroupNum = await ua.getEqAssetGroupNum();
    for (let i = 0; i < vars.equalAssetsGroupNum; i++) {
      groupVars.push({
        groupId: 0,
        cTokenBalanceSum: BigNumber.from(0),
        cTokenBorrowSum: BigNumber.from(0),
        suTokenBalanceSum: BigNumber.from(0),
        suTokenBorrowSum: BigNumber.from(0),
      });
    }
    if (ctoken != constants.AddressZero) {
      const cToken = (await ethers.getContractAt('CErc20', ctoken, wallet)) as CErc20;
      vars.isSuToken = !(await cToken.isCToken());
    }
    const assets = await comptroller.getAssetsIn(account);
    const oracle = (await ethers.getContractAt(
      'FeedPriceOracle',
      config.feedPriceOracle.address,
      wallet
    )) as FeedPriceOracle;

    for (let i = 0; i < assets.length; i++) {
      let asset = assets[i];
      vars.tokenDepositVal = BigNumber.from(0);
      vars.tokenBorrowVal = BigNumber.from(0);
      let assetToken = (await ethers.getContractAt('CErc20', asset, wallet)) as CErc20;
      let [err, cTokenBalance, borrowBalance, exchangeRateMantissa] = await assetToken.getAccountSnapshot(
        account
      );

      vars.cTokenBalance = cTokenBalance;
      vars.borrowBalance = borrowBalance;
      vars.exchangeRateMantissa = exchangeRateMantissa;
      vars.exchangeRate = exchangeRateMantissa;
      vars.oraclePriceMantissa = await oracle.getUnderlyingPrice(asset);
      vars.oraclePrice = vars.oraclePriceMantissa;
      vars.tokensToDenom = vars.exchangeRate.mul(vars.oraclePriceMantissa).div(expScale);
      let index: number;
      for (index = 0; index < vars.equalAssetsGroupNum; index++) {
        let marketGroupId = await comptroller.marketGroupId(asset);
        if (groupVars[index].groupId == 0) {
          groupVars[index].groupId = marketGroupId;
          break;
        } else {
          if (groupVars[index].groupId == marketGroupId) {
            break;
          }
        }
      }
      vars.tokenDepositVal = mul_ScalarTruncateAddUInt(vars.tokensToDenom, vars.cTokenBalance, vars.tokenDepositVal);
      vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, vars.borrowBalance, vars.tokenBorrowVal);

      if (asset == ctoken) {
        let redeemVal = truncate(vars.tokensToDenom.mul(redeem));
        if (redeemVal.lte(vars.tokenDepositVal)) {
          vars.tokenDepositVal = vars.tokenDepositVal.sub(redeemVal);
          redeemVal = BigNumber.from(0);
        } else {
          redeemVal = redeemVal.sub(vars.tokenDepositVal);
          vars.tokenBorrowVal = vars.tokenBorrowVal.add(redeemVal);
          vars.tokenDepositVal = BigNumber.from(0);
        }
        vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, borrow, vars.tokenBorrowVal);
      }
      const symbol = await assetToken.symbol();
      //   console.log(`asset ${symbol}
      //   depositVal: ${vars.tokenDepositVal}
      //   borrowVal : ${vars.tokenBorrowVal}`);
      if (await assetToken.isCToken()) {
        groupVars[index].cTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].cTokenBalanceSum);
        groupVars[index].cTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].cTokenBorrowSum);
      } else {
        groupVars[index].suTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].suTokenBalanceSum);
        groupVars[index].suTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].suTokenBorrowSum);
      }
    }
    let targetGroup: AccountGroupLocalVars = {
      groupId: 0,
      cTokenBalanceSum: BigNumber.from(0),
      cTokenBorrowSum: BigNumber.from(0),
      suTokenBalanceSum: BigNumber.from(0),
      suTokenBorrowSum: BigNumber.from(0),
    };
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
      intraCRate: BigNumber.from(0),
      interCRate: BigNumber.from(0),
      intraSuRate: BigNumber.from(0),
      interSuRate: BigNumber.from(0),
      suTokenCollateralRate: BigNumber.from(0),
      borrowCollateralRate: BigNumber.from(0),
      isSuToken: false,
      tokenDepositVal: BigNumber.from(0),
      tokenBorrowVal: BigNumber.from(0),
    };
    for (let i = 0; i < vars.equalAssetsGroupNum; i++) {
      if (groupVars[i].groupId == 0) {
        continue;
      }
      let equalAssetsGroup = await ua.getEqAssetGroup(BigNumber.from(groupVars[i].groupId));
      vars.intraCRate = equalAssetsGroup.inGroupCTokenRateMantissa;
      vars.intraSuRate = equalAssetsGroup.inGroupSuTokenRateMantissa;
      vars.interCRate = equalAssetsGroup.interGroupCTokenRateMantissa;
      vars.interSuRate = equalAssetsGroup.interGroupSuTokenRateMantissa;
      vars.borrowCollateralRate = expScale;
      vars.suTokenCollateralRate = await ua._getSuTokenRateMantissa();
      //   console.log(`group ${i} ${equalAssetsGroup.groupName}
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);
      if (groupVars[i].suTokenBorrowSum.gt(0)) {
        let collateralizedLoan = mul_ScalarTruncate(vars.suTokenCollateralRate, groupVars[i].cTokenBalanceSum);
        if (groupVars[i].suTokenBorrowSum.lte(collateralizedLoan)) {
          // collateral could cover the loan
          let usedCollateral = groupVars[i].suTokenBorrowSum.mul(expScale).div(vars.suTokenCollateralRate);
          groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub(usedCollateral);
          groupVars[i].suTokenBorrowSum = BigNumber.from(0);
        } else {
          // collateral could not cover the loan
          groupVars[i].cTokenBalanceSum = BigNumber.from(0);
          groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub(collateralizedLoan);
        }
      }
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb sutoken loan with ctoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);
      // absorb ctoken loan with ctoken collateral
      if (groupVars[i].cTokenBorrowSum.gt(0)) {
        let collateralizedLoan = mul_ScalarTruncate(vars.intraCRate, groupVars[i].cTokenBalanceSum);
        if (groupVars[i].cTokenBorrowSum.lte(collateralizedLoan)) {
          // collateral could cover the loan
          let usedCollateral = groupVars[i].cTokenBorrowSum.mul(expScale).div(vars.intraCRate);
          groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub(usedCollateral);
          groupVars[i].cTokenBorrowSum = BigNumber.from(0);
        } else {
          // collateral could not cover the loan
          groupVars[i].cTokenBalanceSum = BigNumber.from(0);
          groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub(collateralizedLoan);
        }
      }
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb ctoken loan with ctoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);

      // absorb sutoken loan with sutoken collateral
      if (groupVars[i].suTokenBorrowSum.gt(0)) {
        let collateralizedLoan = mul_ScalarTruncate(vars.intraSuRate, groupVars[i].suTokenBalanceSum);
        if (groupVars[i].suTokenBorrowSum.lte(collateralizedLoan)) {
          // collateral could cover the loan
          let usedCollateral = groupVars[i].suTokenBorrowSum.mul(expScale).div(vars.intraSuRate);
          groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub(usedCollateral);
          groupVars[i].suTokenBorrowSum = BigNumber.from(0);
        } else {
          // collateral could not cover the loan
          groupVars[i].suTokenBalanceSum = BigNumber.from(0);
          groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub(collateralizedLoan);
        }
      }
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb sutoken loan with sutoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);

      // absorb ctoken loan with sutoken collateral
      if (groupVars[i].cTokenBorrowSum.gt(0)) {
        let collateralizedLoan = mul_ScalarTruncate(vars.intraSuRate, groupVars[i].suTokenBalanceSum);
        if (groupVars[i].cTokenBorrowSum.lte(collateralizedLoan)) {
          let usedCollateral = groupVars[i].cTokenBorrowSum.mul(expScale).div(vars.intraSuRate);
          groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub(usedCollateral);
          groupVars[i].cTokenBorrowSum = BigNumber.from(0);
        } else {
          groupVars[i].suTokenBalanceSum = BigNumber.from(0);
          groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub(collateralizedLoan);
        }
      }
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb ctoken loan with sutoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);

      const targetGroupId = await comptroller.marketGroupId(ctoken);
      //   console.log(`target groupId: ${targetGroupId}`);
      //   console.log(`groupId: ${groupVars[i].groupId}`);
      if (groupVars[i].groupId == (await comptroller.marketGroupId(ctoken))) {
        targetGroup = groupVars[i];
        targetVars = vars;
        // console.log(`set target group: ${i} ${targetGroup.cTokenBalanceSum}, ${targetGroup.suTokenBalanceSum}`);
      } else {
        // log.info("=======================");
        // log.info('interCRate:', vars.interCRate.toString());
        // log.info('cTokenBalanceSum:', groupVars[i].cTokenBalanceSum.toString());
        // log.info('sumCollateral:', vars.sumCollateral.toString());
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
        vars.sumCollateral = mul_ScalarTruncateAddUInt(
          vars.interSuRate,
          groupVars[i].suTokenBalanceSum,
          vars.sumCollateral
        );
        // log.info('sumCollateral:', vars.sumCollateral.toString());
        // log.info('=======================');
      }
      vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.add(
        groupVars[i].cTokenBorrowSum.add(groupVars[i].suTokenBorrowSum)
      );
      //   log.info('sumBorrowPlusEffect: ', vars.sumBorrowPlusEffects.toString());
    }

    // These are safe, as the underflow condition is checked first
    if (vars.sumCollateral.gt(vars.sumBorrowPlusEffects)) {
      vars.sumCollateral = vars.sumCollateral.sub(vars.sumBorrowPlusEffects);
      vars.sumBorrowPlusEffects = BigNumber.from(0);
    } else {
      vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(vars.sumCollateral);
      vars.sumCollateral = BigNumber.from(0);
    }
    console.log(`initially
    sumCollateral : ${vars.sumCollateral.toString()}
    sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);

    console.log(`targetGroup.cTokenBalanceSum ${targetGroup.cTokenBalanceSum}, rate: ${targetVars.interCRate}`);
    console.log(`targetGroup.suTokenBalanceSum ${targetGroup.suTokenBalanceSum}, rate: ${targetVars.interSuRate}`);

    if (vars.sumBorrowPlusEffects.gt(0)) {
      let collateralizedLoan = mul_ScalarTruncate(targetVars.interCRate, targetGroup.cTokenBalanceSum);
      if (collateralizedLoan.gt(vars.sumBorrowPlusEffects)) {
        targetGroup.cTokenBalanceSum = targetGroup.cTokenBalanceSum.sub(
          vars.sumBorrowPlusEffects.mul(expScale).div(targetVars.interCRate)
        );
        vars.sumBorrowPlusEffects = BigNumber.from(0);
      } else {
        vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(collateralizedLoan);
        targetGroup.cTokenBalanceSum = BigNumber.from(0);
      }
    }
    console.log(`after absort target ctoken
    sumCollateral : ${vars.sumCollateral.toString()}
    sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);

    if (vars.sumBorrowPlusEffects.gt(0)) {
      let collateralizedLoan = mul_ScalarTruncate(targetVars.interSuRate, targetGroup.suTokenBalanceSum);
      if (collateralizedLoan.gt(vars.sumBorrowPlusEffects)) {
        targetGroup.suTokenBalanceSum = targetGroup.suTokenBalanceSum.sub(
          vars.sumBorrowPlusEffects.mul(expScale).div(targetVars.interSuRate)
        );
        vars.sumBorrowPlusEffects = BigNumber.from(0);
      } else {
        vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub(collateralizedLoan);
        targetGroup.suTokenBalanceSum = BigNumber.from(0);
      }
    }
    console.log(`after absort target sutoken
    sumCollateral : ${vars.sumCollateral.toString()}
    sumBorrowPlusEffects : ${vars.sumBorrowPlusEffects.toString()}`);

    if (vars.isSuToken) {
      vars.sumCollateral = mul_ScalarTruncateAddUInt(
        vars.suTokenCollateralRate,
        targetGroup.cTokenBalanceSum,
        vars.sumCollateral
      );
    } else {
      vars.sumCollateral = mul_ScalarTruncateAddUInt(vars.intraCRate, targetGroup.cTokenBalanceSum, vars.sumCollateral);
    }
    vars.sumCollateral = mul_ScalarTruncateAddUInt(vars.intraSuRate, targetGroup.suTokenBalanceSum, vars.sumCollateral);
    log.info('vars.sumCollateral:', vars.sumCollateral.toString());
    log.info('vars.sumBorrowPlusEffects:', vars.sumBorrowPlusEffects.toString());
    if (vars.sumCollateral.gt(vars.sumBorrowPlusEffects)) {
      log.info(0, vars.sumCollateral.sub(vars.sumBorrowPlusEffects).toString(), 0);
    } else {
      log.info(0, 0, vars.sumBorrowPlusEffects.sub(vars.sumCollateral).toString());
    }
  });

const mul_ScalarTruncate = (a: BigNumber, scalar: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product);
};

const mul_ScalarTruncateAddUInt = (a: BigNumber, scalar: BigNumber, addend: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product).add(addend);
};

const truncate = (exp: BigNumber): BigNumber => {
  return exp.div(expScale);
};
