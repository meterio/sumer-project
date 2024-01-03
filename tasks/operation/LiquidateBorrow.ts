import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { BigNumber } from 'ethers';
import { CErc20, Comptroller } from '../../typechain';

/**
npx hardhat lb \
--ctoken "cToken address" \
--borrower "borrower address" \
--repay "repay Amount" \
--coll "cToken Collateral address" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('lb', 'LiquidateBorrow')
  .addParam('ctoken', 'cToken address')
  .addParam('borrower', 'borrower address')
  .addOptionalParam('repay', 'repay Amount', 0, types.int)
  .addParam('coll', 'cToken Collateral address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ ctoken, borrower, repay, coll, rpc, pk, gasprice }, { ethers, run, network }) => {
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice,
      };
    }
    let provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    const cToken = (await ethers.getContractAt('CErc20', ctoken, wallet)) as CErc20;

    const borrowBalance = await cToken.borrowBalanceStored(borrower, override);
    const [error, cTokenBalance, _borrowBalance, exchangeRateMantissa] = await cToken.getAccountSnapshot(
      borrower,
      override
    );
    log.info('borrowBalance:', borrowBalance.toString());
    const comptrollerAddress = await cToken.comptroller(override);
    const comptroller = (await ethers.getContractAt('Comptroller', comptrollerAddress, wallet)) as Comptroller;
    const closeFactorMantissa = await comptroller.closeFactorMantissa(override);
    repay = repay == 0 ? mul_ScalarTruncate(closeFactorMantissa, borrowBalance) : repay;
    console.log('_borrowBalance:', _borrowBalance.toString());
    console.log('borrowBalance:', borrowBalance.toString());
    console.log('Max:', mul_ScalarTruncate(closeFactorMantissa, borrowBalance).toString());
    let gas = await cToken.estimateGas.liquidateBorrow(borrower, repay, coll, override);
    console.log('gas:', gas.toString());
    // const receipt = await cToken.liquidateBorrow(borrower, repay, coll, override);
    // log.info("liquidateBorrow:", receipt.hash);
  });

const expScale = BigNumber.from(BigNumber.from(10).pow(18));
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
