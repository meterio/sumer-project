import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';
import { CErc20, CompLogic, Multicall2 } from '../../typechain';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

/**
npx hardhat comp \
--holder "holder address"
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

const compInitialIndex = BigNumber.from('1000000000000000000000000000000000000');
const expScale = BigNumber.from('1000000000000000000');
task('comp', 'deposit underly to sdrToken')
  .addParam('holder', 'holder address')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ holder, json, rpc, pk, gasprice }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    let compBorrowState_index: BigNumber[] = [];
    let compBorrowState_Block: Number[] = [];
    let compSupplyState_index: BigNumber[] = [];
    let compSupplyState_Block: Number[] = [];
    const compLogic = (await ethers.getContractAt('CompLogic', config.compLogic.address, wallet)) as CompLogic;
    const multicall = (await ethers.getContractAt('Multicall2', config.multicall2.address, wallet)) as Multicall2;

    let compAccrued = await compLogic.compAccrued(holder);
    console.log('compAccrued:', formatUnits(compAccrued));
    let blockNumber = await multicall.getBlockNumber();
    for (let i = 0; i < config.cTokens.tokens.length; i++) {
      let cToken = (await ethers.getContractAt('CErc20', config.cTokens.tokens[i].address, wallet)) as CErc20;
      let borrowIndex = await cToken.borrowIndex();
      [compBorrowState_index[i], compBorrowState_Block[i]] = await compLogic.compBorrowState(cToken.address);
      console.log(`compBorrowState_index[${i}]:`, compBorrowState_index[i]);
      [compSupplyState_index[i], compSupplyState_Block[i]] = await compLogic.compSupplyState(cToken.address);
      console.log(`compSupplyState_index[${i}]:`, compSupplyState_index[i]);
      //   await _updateCompBorrowIndex(i, cToken, borrowIndex);
      //   await _distributeBorrowerComp(i, cToken, holder, borrowIndex);
      await _updateCompSupplyIndex(i, cToken);
      await _distributeSupplierComp(i, cToken, holder);

      console.log('compAccrued now:', formatUnits(compAccrued));
    }

    for (let i = 0; i < config.suTokens.tokens.length; i++) {}

    async function _updateCompBorrowIndex(i: number, cToken: CErc20, borrowIndex: BigNumber) {
      let borrowSpeed = await compLogic.compBorrowSpeeds(cToken.address);
      let deltaBlocks = blockNumber.sub(BigNumber.from(compBorrowState_Block[i]));

      let borrowAmount = div_(await cToken.totalBorrows(), borrowIndex);
      let _compAccrued = deltaBlocks.mul(borrowSpeed);
      let ratio = borrowAmount.gt(0) ? fraction(_compAccrued, borrowAmount) : 0;
      compBorrowState_index[i] = compBorrowState_index[i].add(ratio);
      compBorrowState_Block[i] = Number(blockNumber);
    }

    async function _distributeBorrowerComp(i: number, cToken: CErc20, holder: string, marketBorrowIndex: BigNumber) {
      let borrowIndex = compBorrowState_index[i];
      let borrowerIndex = await compLogic.compBorrowerIndex(cToken.address, holder);
      if (borrowerIndex.gt(0) && borrowIndex.gt(compInitialIndex)) {
        borrowerIndex = compInitialIndex;
      }

      let deltaIndex = borrowIndex.sub(borrowerIndex);
      let borrowerAmount = div_(await cToken.borrowBalanceStored(holder), marketBorrowIndex);
      let borrowerDelta = mul_(borrowerAmount, deltaIndex);
      let borrowerAccrued = compAccrued.add(borrowerDelta);
      compAccrued = borrowerAccrued;
    }

    async function _updateCompSupplyIndex(i: number, cToken: CErc20) {
      let supplySpeed = await compLogic.compSupplySpeeds(cToken.address);
      console.log('supplySpeed:', supplySpeed);
      let deltaBlocks = blockNumber.sub(BigNumber.from(compSupplyState_Block[i]));
      console.log('deltaBlocks:', deltaBlocks);

      let supplyTokens = await cToken.totalSupply();
      console.log('supplyTokens:', supplyTokens);
      let _compAccrued = deltaBlocks.mul(supplySpeed);
      console.log('_compAccrued:', _compAccrued);
      let ratio = supplyTokens.gt(0) ? fraction(_compAccrued, supplyTokens) : 0;
      console.log('ratio:', ratio);
      compSupplyState_index[i] = compSupplyState_index[i].add(ratio);
      console.log(`compSupplyState_index[${i}]:`, compSupplyState_index[i]);
      compSupplyState_Block[i] = Number(blockNumber);
      console.log(`compSupplyState_Block[${i}]:`, compSupplyState_Block[i]);
    }

    async function _distributeSupplierComp(i: number, cToken: CErc20, holder: string) {
      let supplyIndex = compSupplyState_index[i];
      let supplierIndex = await compLogic.compSupplierIndex(cToken.address, holder);
      console.log('supplierIndex:', supplierIndex);
      if (supplierIndex.gt(0) && supplyIndex.gt(compInitialIndex)) {
        supplierIndex = compInitialIndex;
        console.log('supplierIndex:', compInitialIndex);
      }

      let deltaIndex = supplyIndex.sub(supplierIndex);
      console.log('deltaIndex:', deltaIndex, ' = ', supplyIndex, ' sub ', supplierIndex);
      let supplierTokens = await cToken.balanceOf(holder);
      console.log('supplierTokens:', supplierTokens);
      let supplierDelta = mul_(supplierTokens, deltaIndex);
      console.log('supplierDelta:', supplierDelta, ' = ', supplierTokens, ' mul_ ', deltaIndex);
      let supplierAccrued = compAccrued.add(supplierDelta);
      console.log('supplierAccrued:', supplierAccrued, ' = ', compAccrued, ' add ', supplierDelta);
      compAccrued = supplierAccrued;
      console.log('compAccrued:', compAccrued);
    }
  });

function fraction(a: BigNumber, b: BigNumber): BigNumber {
  return a.mul(compInitialIndex).div(b);
}

function mul_(a: BigNumber, b: BigNumber): BigNumber {
  return a.mul(b).div(compInitialIndex);
}

function div_(a: BigNumber, b: BigNumber): BigNumber {
  return a.mul(expScale).div(b);
}