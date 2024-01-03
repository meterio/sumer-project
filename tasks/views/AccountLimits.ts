import { task } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { CompoundLens, CToken__factory, FeedPriceOracle, Multicall2 } from '../../typechain';
import { BigNumber, utils, BytesLike } from 'ethers';
/**
npx hardhat al \
--account "account address" \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> 
 */
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

const expScale = BigNumber.from(BigNumber.from(10).pow(18));
const mul_ScalarTruncate = (a: BigNumber, scalar: BigNumber): BigNumber => {
  const product = a.mul(scalar);
  return truncate(product);
};

const truncate = (exp: BigNumber): BigNumber => {
  return exp.div(expScale);
};

task('al', 'get AccountLimits')
  .addParam('account', 'account address')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .setAction(async ({ account, json, rpc, pk }, { ethers, run, network }) => {
    const config = JSON.parse(readFileSync(json).toString());
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    const lens = (await ethers.getContractAt('CompoundLens', config.compoundLens.address, wallet)) as CompoundLens;
    const oracle = (await ethers.getContractAt(
      'FeedPriceOracle',
      config.feedPriceOracle.address,
      wallet
    )) as FeedPriceOracle;
    const multicall = (await ethers.getContractAt('Multicall2', config.multicall2.address, wallet)) as Multicall2;

    // const closeFactorMantissa = await comptroller.closeFactorMantissa();
    const closeFactorMantissa = BigNumber.from('500000000000000000');
    // const liquidationIncentiveMantissa = await comptroller.liquidationIncentiveMantissa();
    const liquidationIncentiveMantissa = BigNumber.from('1100000000000000000');
    const accountLimits = await lens.callStatic.getAccountLimits(config.comptroller.address, account);
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
      let snapshotCall = ctokenInterface.encodeFunctionData('getAccountSnapshot', [account]);
      let symbolCall = ctokenInterface.encodeFunctionData('symbol');
      let decimalsCall = ctokenInterface.encodeFunctionData('decimals');
      let exchangeRateCall = ctokenInterface.encodeFunctionData('exchangeRateStored');
      let borrowBalanceCall = ctokenInterface.encodeFunctionData('borrowBalanceStored', [account]);

      calls.push({
        target: tokenAddr,
        callData: snapshotCall,
      });
      calls.push({
        target: tokenAddr,
        callData: symbolCall,
      });
      calls.push({
        target: tokenAddr,
        callData: decimalsCall,
      });
      calls.push({
        target: tokenAddr,
        callData: exchangeRateCall,
      });
      calls.push({
        target: tokenAddr,
        callData: borrowBalanceCall,
      });
    }
    const result = await multicall.callStatic.aggregate(calls);
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
          exchangeRate: exchangeRate,
        });
      }
      let borrowTokens = snapshot[2].mul(exchangeRate).div(expScale);
      let borrowUSD = borrowTokens.mul(price).div(expScale);
      totalBorrowUSD = totalBorrowUSD.add(borrowUSD);
      if (snapshot[2].gt(0)) {
        repayTokens.push({
          symbol: symbol,
          decimals: decimals,
          address: tokenAddr,
          price: price,
          borrowBalance: borrowBalance,
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
            porfit: parseFloat(utils.formatUnits(sizeUSD.sub(repayUSD))),
          });
        }
      }
    }
    console.table(plans);
    console.log('liquidity:', liquidity);
    console.log('shortfall:', shortfall);
    console.info('totalSupplyUSD:', parseFloat(utils.formatUnits(totalSupplyUSD)));
    console.info('totalBorrowUSD:', parseFloat(utils.formatUnits(totalBorrowUSD)));
  });

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
