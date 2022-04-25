
import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { address, BN, etherMantissa } from '../Utils/Ethereum';

import { constants, ContractTransaction, Wallet, utils, BigNumber, ContractReceipt } from "ethers";
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
  CErc20Harness,
  CToken
} from "../../typechain-types";

import { makeComptroller, makePriceOracle, makeCToken, makeToken, error, quickMint, enterMarkets } from '../Utils/Compound';

const [root, ...accounts] = waffle.provider.getWallets();

describe('Comptroller', () => {

  describe('liquidity', () => {
    it("fails if a price has not been set", async () => {
      const cToken = await makeCToken(root, 'erc20', 'supportMarket');
      let receipt = await enterMarkets([cToken], accounts[1]);
      let comptrollerAddress = await cToken.comptroller();
      const comptroller = await ethers.getContractAt("Comptroller", comptrollerAddress) as Comptroller;
      let result = await comptroller.getAccountLiquidity(accounts[1].address);
      expect(result).to.deep.eq([BN(13), BN(0), BN(0)]);
    });

    it("allows a borrow up to  but not more", async () => {
      const collateralFactor = 0.5, underlyingPrice = 1, user = accounts[1], amount = BigNumber.from(1000000);
      const cToken = await makeCToken(root, 'erc20', 'supportMarket', '', underlyingPrice);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;

      let result: any;

      // not in market yet, hypothetical borrow should have no effect
      // result = await comptroller.getHypotheticalAccountLiquidity(user.address, cToken.address, 0, amount);
      // expect(result).to.deep.eq([BN(0), BN(0), BN(0)]);

      await enterMarkets([cToken], user);
      let cErc20Harness = await ethers.getContractAt("CErc20Harness", cToken.address) as CErc20Harness;
      await quickMint(cErc20Harness, user, amount);

      // total account liquidity after supplying `amount`
      result = await comptroller.getAccountLiquidity(user.address);
      // expect(result).to.deep.eq([BN(0), amount.mul(collateralFactor), BN(0)]);

      // // hypothetically borrow `amount`, should shortfall over collateralFactor
      // result = await comptroller.getHypotheticalAccountLiquidity(user.address, cToken.address, 0, amount);
      // expect(result).to.deep.eq([BN(0), BN(0), amount.mul(1 - collateralFactor)]);

      // // hypothetically redeem `amount`, should be back to even
      // result = await comptroller.getHypotheticalAccountLiquidity(user.address, cToken.address, amount, 0);
      // expect(result).to.deep.eq([BN(0), BN(0), BN(0)]);
    });

    it("allows entering 3 markets, supplying to 2 and borrowing up to collateralFactor in the 3rd", async () => {
      const amount1 = 1e6, amount2 = 1e3, user = accounts[1];
      const cf1 = 0.5, cf2 = 0.666, cf3 = 0, up1 = 3, up2 = 2.718, up3 = 1;
      const c1 = amount1 * cf1 * up1, c2 = amount2 * cf2 * up2, collateral = Math.floor(c1 + c2);
      const cToken1 = await makeCToken(root, 'erc20', 'supportMarket', '', up1);
      const comptroller1 = await ethers.getContractAt("Comptroller", await cToken1.comptroller()) as Comptroller;
      const cToken2 = await makeCToken(root, 'erc20', 'supportMarket', comptroller1.address, up2);
      const cToken3 = await makeCToken(root, 'erc20', 'supportMarket', comptroller1.address, up3);

      await enterMarkets([cToken1, cToken2, cToken3], user);
      let cErc20Harness1 = await ethers.getContractAt("CErc20Harness", cToken1.address) as CErc20Harness;
      let cErc20Harness2 = await ethers.getContractAt("CErc20Harness", cToken2.address) as CErc20Harness;
      await quickMint(cErc20Harness1, user, BigNumber.from(amount1));
      await quickMint(cErc20Harness2, user, BigNumber.from(amount2));
      const comptroller3 = await ethers.getContractAt("Comptroller", await cToken3.comptroller()) as Comptroller;

      let result: any;

      result = await comptroller3.getAccountLiquidity(user.address);
      expect(result).to.deep.eq([0, collateral, 0]);

      result = await comptroller3.getHypotheticalAccountLiquidity(user.address, cToken3.address, Math.floor(c2), 0);
      expect(result).to.deep.eq([0, collateral, 0]);

      result = await comptroller3.getHypotheticalAccountLiquidity(user.address, cToken3.address, 0, Math.floor(c2));
      expect(result).to.deep.eq([0, c1, 0]);

      result = await comptroller3.getHypotheticalAccountLiquidity(user.address, cToken3.address, 0, collateral + c1);
      expect(result).to.deep.eq([0, 0, c1]);

      result = await comptroller1.getHypotheticalAccountLiquidity(user.address, cToken1.address, amount1, 0);
      expect(result).to.deep.eq([0, Math.floor(c2), 0]);
    });
  });

  describe("getAccountLiquidity", () => {
    it("returns 0 if not 'in' any markets", async () => {
      const comptroller = await makeComptroller(root);
      let result = await comptroller.getAccountLiquidity(accounts[0].address);
      expect(result).to.deep.eq([0, 0, 0]);
    });
  });

  describe("getHypotheticalAccountLiquidity", () => {
    it("returns 0 if not 'in' any markets", async () => {
      const cToken = await makeCToken(root);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      let result = await comptroller.getHypotheticalAccountLiquidity(accounts[0].address, cToken.address, 0, 0);
      expect(result).to.deep.eq([0, 0, 0]);
    });

    it("returns collateral factor times dollar amount of tokens minted in a single market", async () => {
      const collateralFactor = 0.5, exchangeRate = 1, underlyingPrice = 1;
      const cToken = await makeCToken(root, 'erc20', 'supportMarket', '', underlyingPrice);
      const from = accounts[0], balance = 1e7, amount = 1e6;
      await enterMarkets([cToken], from);
      let cErc20Harness1 = await ethers.getContractAt("CErc20Harness", cToken.address) as CErc20Harness;
      const underlying = await ethers.getContractAt("CErc20Harness", await cErc20Harness1.underlying()) as CErc20Harness;
      await underlying.connect(from).harnessSetBalance(from.address, balance);
      await underlying.connect(from).approve(cToken.address, balance);
      await underlying.connect(from).mint(amount);
      const comptroller = await ethers.getContractAt("Comptroller", await cToken.comptroller()) as Comptroller;
      let result = await comptroller.getHypotheticalAccountLiquidity(from.address, cToken.address, 0, 0);
      expect(result).to.deep.eq([0, amount * collateralFactor * exchangeRate * underlyingPrice, 0]);
    });
  });
});
