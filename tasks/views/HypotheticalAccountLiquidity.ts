import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { formatUnits, parseUnits } from 'ethers';
import { CErc20, Comptroller, FeedPriceOracle, PythOracle } from '../../typechain';
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
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);
    log.info('address: ', config.Comptroller.address);
    const comptroller = (await ethers.getContractAt('Comptroller', config.Comptroller.address, wallet)) as Comptroller;
    log.info('created comptroller');
    // const accountLiquidity = await comptroller.getHypotheticalAccountLiquidity(account, ctoken, redeem, borrow);
    // log.info('accountLiquidity.liquidity:', accountLiquidity[1].toString());
    // log.info('accountLiquidity.shortfall:', accountLiquidity[2].toString());

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
      tokenBorrowVal: BigNumber.from(0),
    };
    let groupVars: AccountGroupLocalVars[] = [];

    vars.equalAssetsGroupNum = await comptroller.getAssetGroupNum(); // Line 85
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
      vars.isSuToken = !(await cToken.isCToken()); // Line 89
      vars.discountRate = await cToken.getDiscountRate(); // Line 111
      console.log('vars.discourntRate');
    }
    const assets = await comptroller.getAssetsIn(account); // Line 95
    const oracle = (await ethers.getContractAt('PythOracle', config.FeedPriceOracle.address, wallet)) as PythOracle; // Line 114

    for (let i = 0; i < assets.length; i++) {
      // Line 101
      let asset = assets[i]; // Line 102
      vars.tokenDepositVal = BigNumber.from(0); // Line 98
      vars.tokenBorrowVal = BigNumber.from(0); // Line 99
      const [isListed, assetGroupId, isComped] = await comptroller.markets(asset); // Line 101
      let assetToken = (await ethers.getContractAt('CErc20', asset, wallet)) as CErc20;
      let [err, cTokenBalance, borrowBalance, exchangeRateMantissa] = await assetToken.getAccountSnapshot(account); // Line 106

      vars.cTokenBalance = cTokenBalance;
      vars.borrowBalance = borrowBalance;
      vars.exchangeRateMantissa = exchangeRateMantissa;
      vars.exchangeRate = exchangeRateMantissa; // Line 110
      vars.oraclePriceMantissa = await oracle.getUnderlyingPrice(asset); // Line 115
      vars.oraclePrice = vars.oraclePriceMantissa; // Line 117
      const decimals = await assetToken.decimals();
      let fixDecimals = BigNumber.from(1);
      if (decimals < 18) {
        console.log('decimals: ', decimals);
        fixDecimals = BigNumber.from(BigNumber.from(10).pow(18 - Number(decimals.toString())));
        vars.oraclePrice = vars.oraclePrice.mul(fixDecimals);
      }

      vars.tokensToDenom = vars.exchangeRate // Line 121
        .mul(vars.oraclePrice)
        .div(expScale)
        .mul(vars.discountRate)
        .div(expScale); // Line 122

      const symbol = await assetToken.symbol();
      console.log(`asset ${symbol}
      balance: ${vars.cTokenBalance}
      tokensToDenom: ${vars.tokensToDenom}
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
      vars.tokenDepositVal = mul_ScalarTruncateAddUInt(vars.tokensToDenom, vars.cTokenBalance, vars.tokenDepositVal); // Line 136
      vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, vars.borrowBalance, vars.tokenBorrowVal); // Line 137

      // const symbol = await assetToken.symbol();
      // console.log(`asset ${symbol}
      // tokensToDenom: ${vars.tokensToDenom}
      // cTokenBalance : ${vars.cTokenBalance}
      // tokenDepositVal : ${vars.tokenDepositVal}`);

      if (asset == ctoken) {
        // Line 138
        let redeemVal = truncate(vars.tokensToDenom.mul(redeem)); // Line 139
        if (redeemVal.lte(vars.tokenDepositVal)) {
          // Line 140
          vars.tokenDepositVal = vars.tokenDepositVal.sub(redeemVal); // Line 144
          redeemVal = BigNumber.from(0); // Line 145
        } else {
          redeemVal = redeemVal.sub(vars.tokenDepositVal); // Line 149
          vars.tokenBorrowVal = vars.tokenBorrowVal.add(redeemVal); // Line 150
          vars.tokenDepositVal = BigNumber.from(0); // Line 151
        }
        vars.tokenBorrowVal = mul_ScalarTruncateAddUInt(vars.oraclePrice, borrow, vars.tokenBorrowVal); // Line 154
      }
      // const symbol = await assetToken.symbol();
      console.log(`asset ${symbol}
        depositVal: ${vars.tokenDepositVal}
        borrowVal : ${vars.tokenBorrowVal}`);
      if (await assetToken.isCToken()) {
        // Line 157
        groupVars[index].cTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].cTokenBalanceSum); // Line 158
        groupVars[index].cTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].cTokenBorrowSum); // Line 159
      } else {
        groupVars[index].suTokenBalanceSum = vars.tokenDepositVal.add(groupVars[index].suTokenBalanceSum); // Line 161
        groupVars[index].suTokenBorrowSum = vars.tokenBorrowVal.add(groupVars[index].suTokenBorrowSum); // Line 162
      }
    }
    console.log('group vars', groupVars);
    // Line 166
    let targetGroup: AccountGroupLocalVars = {
      groupId: 0,
      cTokenBalanceSum: BigNumber.from(0),
      cTokenBorrowSum: BigNumber.from(0),
      suTokenBalanceSum: BigNumber.from(0),
      suTokenBorrowSum: BigNumber.from(0),
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
      tokenBorrowVal: BigNumber.from(0),
    };
    // Line 168
    for (let i = 0; i < vars.equalAssetsGroupNum; i++) {
      console.log(`groupVars[${i}].groupId = ${groupVars[i].groupId}`);
      const [isListed, assetGroupId, isComped] = await comptroller.markets(ctoken); // Line 169
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
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb sutoken loan with ctoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);
      // absorb ctoken loan with ctoken collateral
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
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb ctoken loan with ctoken collateral
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

      // absorb ctoken loan with sutoken collateral
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
      //   console.log(`group ${i} ${equalAssetsGroup.groupName} after absorb ctoken loan with sutoken collateral
      //     cTokenBalanceSum: ${groupVars[i].cTokenBalanceSum}
      //     suTokenBalanceSum: ${groupVars[i].suTokenBalanceSum}
      //     cTokenBorrowSum: ${groupVars[i].cTokenBorrowSum}
      //     suTokenBorrowSum: ${groupVars[i].suTokenBorrowSum}
      //   `);

      // const targetGroupId = await comptroller.marketGroupId(ctoken);
      //   console.log(`target groupId: ${targetGroupId}`);
      //   console.log(`groupId: ${groupVars[i].groupId}`);
      console.log('target asset group id', assetGroupId);
      // Line 241
      if (groupVars[i].groupId == assetGroupId) {
        targetGroup = groupVars[i]; // Line 242
        targetVars = {} as AccountLiquidityLocalVars; // Line 243
        targetVars.interCRate = vars.interCRate;
        targetVars.interSuRate = vars.interSuRate;
        targetVars.intraCRate = vars.intraCRate;
        targetVars.intraSuRate = vars.intraSuRate;
        targetVars.intraMintRate = vars.intraMintRate;
        console.log(`target vars: ${JSON.stringify(targetVars)}`);
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
      console.log('sum collateral: ', vars.sumCollateral);
      console.log('sum borrow plus effects: ', vars.sumBorrowPlusEffects);
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
    // console.log(`after absort target ctoken
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
      console.log(`${JSON.stringify(targetVars)}`);
      console.log(
        `intraCRate ${targetVars.intraCRate} target.cTokenBalanceSum ${targetGroup.cTokenBalanceSum}, sumCollateral: ${vars.sumCollateral} `
      );
      vars.sumCollateral = mul_ScalarTruncateAddUInt(
        targetVars.intraCRate,
        targetGroup.cTokenBalanceSum,
        vars.sumCollateral
      ); // Line 300
      console.log(`after sumCollateral: ${vars.sumCollateral} `);
    }
    vars.sumCollateral = mul_ScalarTruncateAddUInt(vars.intraSuRate, targetGroup.suTokenBalanceSum, vars.sumCollateral); // Line 302
    log.info('final vars.sumCollateral:', vars.sumCollateral.toString());
    log.info('final vars.sumBorrowPlusEffects:', vars.sumBorrowPlusEffects.toString());
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
