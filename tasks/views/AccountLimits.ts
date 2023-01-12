import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { CompoundLens, CToken, FeedPriceOracle, Comptroller } from '../../typechain';
import { BigNumber, utils } from 'ethers';
/**
npx hardhat al \
--account "account address" \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
const one = utils.parseUnits('1');
task('al', 'get AccountLimits')
  .addParam('account', 'account address')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ account, json, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    const lens = (await ethers.getContractAt('CompoundLens', config.compoundLens.address, wallet)) as CompoundLens;
    const comptroller = (await ethers.getContractAt('Comptroller', config.comptroller.address, wallet)) as Comptroller;
    const closeFactorMantissa = await comptroller.closeFactorMantissa(override);
    const oracle = (await ethers.getContractAt(
      'FeedPriceOracle',
      config.feedPriceOracle.address,
      wallet
    )) as FeedPriceOracle;
    const accountLimits = await lens.callStatic.getAccountLimits(config.comptroller.address, account, override);
    const markets = accountLimits.markets;
    const liquidity = accountLimits.liquidity.toString();
    const shortfall = accountLimits.shortfall.toString();
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
    };
    type Token = {
      symbol: string;
      decimals: number;
      address: string;
      price: BigNumber;
      borrowBalance: BigNumber;
      exchangeRate: BigNumber;
    };
    let postions: Pos[] = [];
    let prices = await oracle.getUnderlyingPrices(markets);
    let totalSupplyUSD: BigNumber = BigNumber.from(0);
    let totalBorrowUSD: BigNumber = BigNumber.from(0);
    let collaterals: Token[] = [];
    let repayTokens: Token[] = [];
    let plans: Plan[] = [];

    for (let i = 0; i < markets.length; i++) {
      let tokenAddr = markets[i];
      let cToken = (await ethers.getContractAt('CToken', tokenAddr, wallet)) as CToken;
      let snapshot = await cToken.getAccountSnapshot(account);
      let symbol = await cToken.symbol();
      let decimals = await cToken.decimals();
      let exchangeRate = await cToken.exchangeRateStored();
      let price = prices[i];

      let supplyTokens = snapshot[1].mul(exchangeRate).div(one);
      let supplyUSD = supplyTokens.mul(price).div(one);
      totalSupplyUSD = totalSupplyUSD.add(supplyUSD);
      if (snapshot[1].gt(0)) {
        collaterals.push({
          symbol: symbol,
          decimals: decimals,
          address: tokenAddr,
          price: price,
          borrowBalance: BigNumber.from(0),
          exchangeRate: exchangeRate,
        });
      }
      let borrowTokens = snapshot[2].mul(exchangeRate).div(one);
      let borrowUSD = borrowTokens.mul(price).div(one);
      totalBorrowUSD = totalBorrowUSD.add(borrowUSD);
      if (snapshot[2].gt(0)) {
        repayTokens.push({
          symbol: symbol,
          decimals: decimals,
          address: tokenAddr,
          price: price,
          borrowBalance: await cToken.borrowBalanceStored(account),
          exchangeRate: exchangeRate,
        });
      }

      let postion: Pos = {
        cToken: symbol,
        supply: parseFloat(utils.formatUnits(snapshot[1].toString(), decimals)),
        supplyUSD: parseFloat(utils.formatUnits(supplyUSD)),
        borrow: parseFloat(utils.formatUnits(snapshot[2].toString(), decimals)),
        borrowUSD: parseFloat(utils.formatUnits(borrowUSD)),
      };
      postions.push(postion);
    }

    for (let i = 0; i < repayTokens.length; i++) {
      let repayToken = repayTokens[i];
      let maxRepayAmount = mul_ScalarTruncate(closeFactorMantissa, repayToken.borrowBalance);
      let repayUSD = maxRepayAmount.mul(repayToken.price).div(one);
      for (let j = 0; j < collaterals.length; j++) {
        let collateral = collaterals[j];
        let seizeTokens = await lens.liquidateCalculateSeizeTokens(
          repayToken.address,
          collateral.address,
          maxRepayAmount,
          config.comptroller.address
        );
        let sizeUSD = seizeTokens[1].mul(collateral.price).div(one);
        plans.push({
          repayToken: repayToken.symbol,
          maxRepayAmount: parseFloat(utils.formatUnits(maxRepayAmount,repayToken.decimals)),
          repayUSD: parseFloat(utils.formatUnits(repayUSD)),
          collateral: collateral.symbol,
          seizeTokens: parseFloat(utils.formatUnits(seizeTokens[1],collateral.decimals)),
          seizeUSD: parseFloat(utils.formatUnits(sizeUSD)),
        });
      }
    }
    console.table(postions);
    console.table(plans);
    console.log('liquidity:', liquidity);
    console.log('shortfall:', shortfall);
    console.info('totalSupplyUSD:', parseFloat(utils.formatUnits(totalSupplyUSD)));
    console.info('totalBorrowUSD:', parseFloat(utils.formatUnits(totalBorrowUSD)));
  });

const expScale = BigNumber.from(BigNumber.from(10).pow(18));
const mul_ScalarTruncate = (a: BigNumber, scalar: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product);
};

const truncate = (exp: BigNumber): BigNumber => {
  return exp.div(expScale);
};
