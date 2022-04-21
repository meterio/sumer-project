
import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { address, BN, etherMantissa } from '../Utils/Ethereum';

import { constants, ContractTransaction, Wallet, utils } from "ethers";
import { expect } from "../Utils/expect";
import { Fixture } from 'ethereum-waffle';
import {
  SimplePriceOracle,
  Unitroller,
  Comptroller,
  ComptrollerHarness,
  Comp,
  InterestRateModel,
  PriceOracle,
  ERC20Harness,
  CToken
} from "../../typechain-types";

import { makeComptroller, makePriceOracle, makeCToken, makeToken, error, failureInfo, Opts } from '../Utils/Compound';

const [root, ...accounts] = waffle.provider.getWallets();
describe('Comptroller', () => {

  describe('constructor', () => {
    it("on success it sets admin to creator and pendingAdmin is unset", async () => {
      const comptroller = await makeComptroller(root) as Comptroller;
      expect(await comptroller.admin()).to.eq(root.address);
      expect(await comptroller.pendingAdmin()).to.eq(0);
    });

    it("on success it sets closeFactor as specified", async () => {
      const comptroller = await makeComptroller(root) as Comptroller;
      expect(await comptroller.closeFactorMantissa()).to.eq(0.051e18);
    });
  });

  describe('_setLiquidationIncentive', () => {
    const initialIncentive = etherMantissa(1.0);
    const validIncentive = etherMantissa(1.1);
    const tooSmallIncentive = etherMantissa(0.99999);
    const tooLargeIncentive = etherMantissa(1.50000001);

    let comptroller: Comptroller;
    beforeEach(async () => {
      comptroller = await makeComptroller(root) as Comptroller;
    });

    it("fails if called by non-admin", async () => {
      let receipt = await comptroller.connect(accounts[0])._setLiquidationIncentive(initialIncentive)
      expect(receipt).to.emit(comptroller, "Failure").withArgs(error('UNAUTHORIZED'), error('SET_LIQUIDATION_INCENTIVE_OWNER_CHECK'));
      expect(await comptroller.liquidationIncentiveMantissa()).to.eq(initialIncentive);
    });

    it("accepts a valid incentive and emits a NewLiquidationIncentive event", async () => {
      let receipt = await comptroller._setLiquidationIncentive(validIncentive);
      expect(receipt).to.emit(comptroller, "NewLiquidationIncentive").withArgs(
        initialIncentive,
        validIncentive
      );
      expect(await comptroller.liquidationIncentiveMantissa()).to.eq(validIncentive);
    });
  });

  describe('_setPriceOracle', () => {
    let comptroller: Comptroller, oldOracle: SimplePriceOracle, newOracle: SimplePriceOracle;
    beforeEach(async () => {
      comptroller = await makeComptroller(root) as Comptroller;
      oldOracle = await ethers.getContractAt('SimplePriceOracle', await comptroller.oracle()) as SimplePriceOracle;
      newOracle = await makePriceOracle() as SimplePriceOracle;
    });

    it("fails if called by non-admin", async () => {
      expect(
        await comptroller.connect(accounts[0])._setPriceOracle(newOracle.address)
      ).to.emit(comptroller, "Failure").withArgs(error('UNAUTHORIZED'), error('SET_PRICE_ORACLE_OWNER_CHECK'));
      expect(await comptroller.oracle()).to.eq(oldOracle.address);
    });

    it("accepts a valid price oracle and emits a NewPriceOracle event", async () => {
      const result = await comptroller._setPriceOracle(newOracle.address);
      expect(result).to.ok;
      expect(result).to.emit(comptroller, "NewPriceOracle").withArgs(
        oldOracle.address,
        newOracle.address
      );
      expect(await comptroller.oracle()).to.eq(newOracle.address);
    });
  });

  describe('_setCloseFactor', () => {
    it("fails if not called by admin", async () => {
      const cToken = await makeCToken(root);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      await expect(
        comptroller.connect(accounts[0])._setCloseFactor(1)
      ).to.be.revertedWith('revert only admin can set close factor');
    });
  });

  describe('_supportMarket', () => {
    it("fails if not called by admin", async () => {
      const cToken = await makeCToken(root);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      expect(
        await comptroller.connect(accounts[0])._supportMarket(cToken.address, 0)
      ).to.emit(comptroller, "Failure").withArgs(error('UNAUTHORIZED'), failureInfo('SUPPORT_MARKET_OWNER_CHECK'));
    });

    it("fails if asset is not a CToken", async () => {
      const comptroller = await makeComptroller(root) as Comptroller
      const asset = await makeToken();
      await expect(comptroller._supportMarket(asset.address, 0)).to.be.reverted;
    });

    it("succeeds and sets market", async () => {
      const cToken = await makeCToken(root);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      const result = await comptroller._supportMarket(cToken.address, 0);
      expect(result).to.emit(comptroller, "MarketListed").withArgs(cToken.address);;
    });

    it("cannot list a market a second time", async () => {
      const cToken = await makeCToken(root);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      const result1 = await comptroller._supportMarket(cToken.address, 0);
      const result2 = await comptroller._supportMarket(cToken.address, 0);
      expect(result1).to.emit(comptroller, "MarketListed").withArgs(cToken.address);;
      expect(result2).to.emit(comptroller, "Failure").withArgs(('MARKET_ALREADY_LISTED'), failureInfo('SUPPORT_MARKET_EXISTS'));
    });

    it("can list two different markets", async () => {
      const cToken1 = await makeCToken(root);
      const cToken2 = await makeCToken(root, 'erc20', '', await cToken1.comptroller());
      const comptroller1 = await ethers.getContractAt("Comptroller", await cToken1.comptroller()) as Comptroller;
      const comptroller2 = await ethers.getContractAt("Comptroller", await cToken2.comptroller()) as Comptroller;
      const result1 = await comptroller1._supportMarket(cToken1.address, 0);
      const result2 = await comptroller2._supportMarket(cToken2.address, 0);
      expect(result1).to.emit(comptroller1, "MarketListed").withArgs(cToken1.address);;
      expect(result2).to.emit(comptroller2, "MarketListed").withArgs(cToken2.address);;
    });
  });

  describe('redeemVerify', () => {
    it('should allow you to redeem 0 underlying for 0 tokens', async () => {
      const comptroller = await makeComptroller(root);
      const cToken = await makeCToken(root, 'erc20', '', comptroller.address);
      await comptroller.redeemVerify(cToken.address, accounts[0].address, 0, 0);
    });

    it('should allow you to redeem 5 underlyig for 5 tokens', async () => {
      const comptroller = await makeComptroller(root);
      const cToken = await makeCToken(root, 'erc20', '', comptroller.address);
      await comptroller.redeemVerify(cToken.address, accounts[0].address, 5, 5);
    });

    it('should not allow you to redeem 5 underlying for 0 tokens', async () => {
      const comptroller = await makeComptroller(root);
      const cToken = await makeCToken(root, 'erc20', '', comptroller.address);
      await expect(comptroller.redeemVerify(cToken.address, accounts[0].address, 5, 0)).to.be.revertedWith("redeemTokens zero");
    });
  })
});
