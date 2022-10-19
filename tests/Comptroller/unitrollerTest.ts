
import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { address, BN } from '../Utils/Ethereum';
import { constants, ContractTransaction, Wallet, utils } from "ethers";
import { expect } from "../Utils/expect";

import {
  Unitroller, ComptrollerBorked, SimplePriceOracle, EchoTypesComptroller
} from "../../typechain-types";

const [root, ...accounts] = waffle.provider.getWallets();

describe('Unitroller', () => {
  let unitroller: Unitroller;
  let brains: ComptrollerBorked;
  let oracle: SimplePriceOracle;
  let result: ContractTransaction;

  beforeEach(async () => {
    oracle = (await (
      await ethers.getContractFactory("SimplePriceOracle")
    ).deploy()) as SimplePriceOracle;
    brains = (await (
      await ethers.getContractFactory("ComptrollerBorked")
    ).deploy()) as ComptrollerBorked
    unitroller = (await (
      await ethers.getContractFactory("Unitroller")
    ).deploy()) as Unitroller
  });

  const setPending = async (implementation: ComptrollerBorked | Unitroller | EchoTypesComptroller, from: Wallet): Promise<ContractTransaction> => {
    return await unitroller.connect(from)._setPendingImplementation(implementation.address)
  };

  describe("constructor", () => {
    it("sets admin to caller and addresses to 0", async () => {
      expect(await unitroller.admin()).to.eq(root.address);
      expect(await unitroller.pendingAdmin()).to.eq(constants.AddressZero);
      expect(await unitroller.pendingComptrollerImplementation()).to.eq(constants.AddressZero);
      expect(await unitroller.comptrollerImplementation()).to.eq(constants.AddressZero);
    });
  });

  describe("_setPendingImplementation", () => {
    describe("Check caller is admin", () => {
      let result: ContractTransaction;
      beforeEach(async () => {
        result = await setPending(brains, accounts[1]);
      });

      it("emits a failure log", async () => {
        expect(result).to.emit(unitroller, "Failure")
          .withArgs(1, 15, 0);
      });

      it("does not change pending implementation address", async () => {
        expect(await unitroller.pendingComptrollerImplementation()).to.eq(constants.AddressZero);
      });
    });

    describe("succeeding", () => {
      it("stores pendingComptrollerImplementation with value newPendingImplementation", async () => {
        await setPending(brains, root);
        expect(await unitroller.pendingComptrollerImplementation()).to.eq(brains.address);
      });

      it("emits NewPendingImplementation event", async () => {
        expect(await unitroller._setPendingImplementation(brains.address)).to.emit(unitroller, "NewPendingImplementation").withArgs(
          address(0),
          brains.address
        );
      });
    });
  });

  describe("_acceptImplementation", () => {
    describe("Check caller is pendingComptrollerImplementation  and pendingComptrollerImplementation ≠ address(0) ", () => {
      beforeEach(async () => {
        await setPending(unitroller, root);
        result = await unitroller._acceptImplementation();
      });

      it("emits a failure log", async () => {
        expect(result).to.emit(unitroller, "Failure")
      });

      it("does not change current implementation address", async () => {
        expect(await unitroller.comptrollerImplementation()).not.eq(unitroller.address);
      });
    });

    // it.skip("rejects if pending impl is address(0)", async () => {
    //   // XXX TODO?
    // });

    describe("the brains must accept the responsibility of implementation", () => {
      beforeEach(async () => {
        await setPending(brains, root);
        let _maxAssets = utils.parseUnits('0.051', 18);
        result = await brains._become(unitroller.address, oracle.address, _maxAssets, 10, false);
        expect(result).to.be.ok;
      });

      it("Store comptrollerImplementation with value pendingComptrollerImplementation", async () => {
        expect(await unitroller.comptrollerImplementation()).to.eq(brains.address);
      });

      it("Unset pendingComptrollerImplementation", async () => {
        expect(await unitroller.pendingComptrollerImplementation()).to.eq(constants.AddressZero);
      });

      // it.skip("Emit NewImplementation(oldImplementation, newImplementation)", async () => {
      //   // TODO:
      //   // Does our log decoder expect it to come from the same contract?
      //   // assert.toHaveLog(
      //   //   result,
      //   //   "NewImplementation",
      //   //   {
      //   //     newImplementation: brains._address,
      //   //     oldImplementation: "0x0000000000000000000000000000000000000000"
      //   //   });
      // });

      // it.skip("Emit NewPendingImplementation(oldPendingImplementation, 0)", async () => {
      //   // TODO:
      //   // Does our log decoder expect it to come from the same contract?
      //   // Having difficulty decoding these events
      //   // assert.toHaveLog(
      //   //   result,
      //   //   "NewPendingImplementation",
      //   //   {
      //   //     oldPendingImplementation: brains._address,
      //   //     newPendingImplementation: "0x0000000000000000000000000000000000000000"
      //   //   });
      // });
    });

    describe("fallback delegates to brains", () => {
      let troll: EchoTypesComptroller;
      beforeEach(async () => {
        troll = (await (
          await ethers.getContractFactory("EchoTypesComptroller")
        ).deploy()) as EchoTypesComptroller;
        unitroller = (await (
          await ethers.getContractFactory("Unitroller")
        ).deploy()) as Unitroller;

        await setPending(troll, root);
        await troll.becomeBrains(unitroller.address);
        // troll.options.address = unitroller.address;
      });

      it("forwards reverts", async () => {
        await expect(troll.reverty()).to.be.revertedWith("gotcha sucka");
      });

      it("gets addresses", async () => {
        expect(await troll.addresses(troll.address)).to.eq(troll.address);
      });

      it("gets strings", async () => {
        expect(await troll.stringy("yeet")).to.eq("yeet");
      });

      it("gets bools", async () => {
        expect(await troll.booly(true)).to.eq(true);
      });

      it("gets list of ints", async () => {
        expect(await troll.listOInts([1, 2, 3])).to.deep.eq([BN(1), BN(2), BN(3)]);
      });
    });
  });
});
