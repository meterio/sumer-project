import { ethers, waffle } from 'hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import { address, BN, etherMantissa } from './Utils/Ethereum';
import { constants, ContractTransaction, Wallet, utils, BigNumber, ContractReceipt } from 'ethers';
import { expect } from './Utils/expect';
import {
  VoltFactory,
  Token,
  VeSumer,
  FraxGaugeController,
  FraxGaugeFXSRewardsDistributor,
  StakingRewardsMultiGauge,
  VoltPair
} from '../typechain';
import { parseUnits } from 'ethers/lib/utils';

const [deployer, user1, user2] = waffle.provider.getWallets();

describe('Gauge', () => {
  let factory: VoltFactory;
  let sumer: Token;
  let veSumer: VeSumer;
  let gaugeController: FraxGaugeController;
  let rewarddDistributor: FraxGaugeFXSRewardsDistributor;
  let gauge: StakingRewardsMultiGauge;
  let suUSD: Token;
  let busd: Token;
  let pair: VoltPair;

  before(async () => {
    factory = (await (await ethers.getContractFactory('VoltFactory', deployer)).deploy()) as VoltFactory;
    sumer = (await (await ethers.getContractFactory('Token', deployer)).deploy('Sumer', 'Sumer')) as Token;
    veSumer = (await (await ethers.getContractFactory('VeSumer', deployer)).deploy(sumer.address)) as VeSumer;
    gaugeController = (await (await ethers.getContractFactory('FraxGaugeController', deployer)).deploy(
      sumer.address,
      veSumer.address
    )) as FraxGaugeController;
    rewarddDistributor = (await (await ethers.getContractFactory('FraxGaugeFXSRewardsDistributor', deployer)).deploy(
      deployer.address,
      deployer.address,
      sumer.address,
      gaugeController.address
    )) as FraxGaugeFXSRewardsDistributor;

    suUSD = (await (await ethers.getContractFactory('Token', deployer)).deploy('suUSD', 'suUSD')) as Token;
    busd = (await (await ethers.getContractFactory('Token', deployer)).deploy('BUSD', 'BUSD')) as Token;

    await suUSD.mint(user1.address, parseUnits('10000000'));
    await busd.mint(user1.address, parseUnits('10000000'));
    await sumer.mint(user1.address, parseUnits('10000000'));

    await factory.createPair(suUSD.address, busd.address, true);
    let pairAddr = await factory.getPair(suUSD.address, busd.address, true);
    pair = (await ethers.getContractAt('VoltPair', pairAddr, deployer)) as VoltPair;

    await suUSD.connect(user1).transfer(pairAddr, parseUnits('10000'));
    await busd.connect(user1).transfer(pairAddr, parseUnits('10000'));
    await pair.mint(user1.address);

    gauge = (await (await ethers.getContractFactory('StakingRewardsMultiGauge', deployer)).deploy(
      pairAddr,
      rewarddDistributor.address,
      ['SUMER'],
      [sumer.address],
      [deployer.address],
      [parseUnits('10')],
      [gaugeController.address]
    )) as StakingRewardsMultiGauge;
  });

  it('setGaugeState', async function() {
    await rewarddDistributor.setGaugeState(gauge.address, false, true);
  });

  it('add_type', async function() {
    await gaugeController.add_type('type 1', 100);
  });

  it('add_gauge', async function() {
    await gaugeController.add_gauge(gauge.address, 1, 100);
  });

  it('create_lock', async function() {
    await sumer.connect(user1).approve(veSumer.address, constants.MaxUint256);
    let lockTime = Math.floor(new Date().getTime() / 1000) + 3600 * 24 * 365;
    await veSumer.connect(user1).create_lock(parseUnits('1000000'), lockTime);
  });

  it('vote_for_gauge_weights', async function() {
    await gaugeController.connect(user1).vote_for_gauge_weights(gauge.address, 10000);
  });

  it('global_emission_rate', async function() {
    let ret = await gaugeController.global_emission_rate();
    console.log(ret);
  });

  it('evm_increaseTime', async function() {
    await ethers.provider.send('evm_increaseTime', [3600 * 24 * 8]);
  });

  it('mint to rewarddDistributor', async function() {
    await sumer.mint(rewarddDistributor.address, parseUnits('1000000'));
  });

  it('distributeReward', async function() {
    let receipt = await rewarddDistributor.distributeReward(gauge.address);
    let ret = await receipt.wait();
    console.log(ret.logs);
  });

  it('getReward', async function() {
    let receipt = await gauge.getReward();
    let ret = await receipt.wait();
    console.log(ret.logs);
  });

  it('veSumerMultiplier', async function() {
    let weight = await gauge.veSumerMultiplier(user1.address);
    console.log('veSumerMultiplier:', weight);
  });

  it('calcCurCombinedWeight', async function() {
    let weight = await gauge.calcCurCombinedWeight(user1.address);
    console.log('weight:', weight);
  });

  it('stakeLocked', async function() {
    let liquidity = await pair.balanceOf(user1.address);
    await pair.connect(user1).approve(gauge.address, constants.MaxUint256);
    await gauge.connect(user1).stakeLocked(liquidity, 3600 * 24 * 365);
  });
});
