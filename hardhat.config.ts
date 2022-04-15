import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { task } from "hardhat/config";
import { Signer, utils, constants, BigNumber, ContractTransaction } from "ethers";
import { compileSetting, allowVerifyChain } from "./scripts/deployTool";
import { RPCS } from "./scripts/network";

import {
  deployContract,
  BN,
  getContract,
  getContractJson,
  MINTER_ROLE,
} from "./scripts/helper";
import { getSign } from "./scripts/permitSign"
import {
  Unitroller,
  Comptroller,
  FeedPriceOracle,
  CompoundLens,
  Comp,
  UnderwriterAdmin,
  WhitePaperInterestRateModel,
  ERC20MinterBurnerPauser,
  CErc20Delegate,
  CErc20Delegator,
  Maximillion
} from "./typechain-types";
const dotenv = require("dotenv");
dotenv.config();
// import Colors = require("colors.ts");
// Colors.enable();

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    let address = await account.getAddress();
    console.log(
      address,
      (await bre.ethers.provider.getBalance(address)).toString()
    );
  }
});

task("deploy", "deploy contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("compile");
    const [admin] = await ethers.getSigners();
    let receipt: ContractTransaction;
    // Deploy FeedPriceOracle
    let feedPriceOracle = await deployContract(ethers, "FeedPriceOracle", network.name, admin) as FeedPriceOracle;
    // Deploy CompoundLens
    let compoundLens = await deployContract(ethers, "CompoundLens", network.name, admin) as CompoundLens;
    // Deploy Comp
    let comp = await deployContract(ethers, "Comp", network.name, admin, [admin.address]) as Comp;
    // Deploy UnderwriterAdmin
    let underwriterAdmin = await deployContract(ethers, "UnderwriterAdmin", network.name, admin, [comp.address]) as UnderwriterAdmin;
    // Deploy Unitroller
    let unitroller = await deployContract(ethers, "Unitroller", network.name, admin) as Unitroller;
    // Deploy Comptroller
    let comptroller = await deployContract(ethers, "Comptroller", network.name, admin) as Comptroller;
    // SetPendingImpl for Unitroller
    receipt = await unitroller._setPendingImplementation(comptroller.address);
    console.log(await receipt.wait());
    // Become Implementation
    receipt = await comptroller._become(unitroller.address);
    console.log(await receipt.wait());
    // Configure Comptroller
    // Comptroller SetPriceOracle
    let comptrollerImpl = await ethers.getContractAt("Comptroller", unitroller.address, admin) as Comptroller;
    receipt = await comptrollerImpl._setPriceOracle(feedPriceOracle.address);
    console.log(await receipt.wait());
    // Comptroller SetCloseFactor 0.5
    receipt = await comptrollerImpl._setCloseFactor(BigNumber.from('500000000000000000'));
    console.log(await receipt.wait());
    // Comptroller LiquidationIncentive 1.1
    receipt = await comptrollerImpl._setLiquidationIncentive(BigNumber.from('1100000000000000000'));
    console.log(await receipt.wait());
    // Comptroller SetUnderWriterAdmin (UnderwriterAdmin Address)
    receipt = await comptrollerImpl._setUnderWriterAdmin(underwriterAdmin.address);
    console.log(await receipt.wait());
    //////////////////////////////////////////////////////////////////
    // Deploy WhitePaperInterestRateModel 0.05 0.45
    let whitePaperInterestRateModel = await deployContract(ethers, "WhitePaperInterestRateModel", network.name, admin, [BigNumber.from('50000000000000000'), BigNumber.from('450000000000000000')]) as WhitePaperInterestRateModel;

    // Now deploy some ERC-20 faucet tokens
    let USDC = await deployContract(ethers, "ERC20MinterBurnerPauser", network.name, admin, ["USDC", "USD Coin", 6]) as ERC20MinterBurnerPauser;
    // Deploy CToken delegates
    let cUSDCDelegate = await deployContract(ethers, "CErc20Delegate", network.name, admin) as CErc20Delegate;
    // Deploy cTokens delegators
    let cUSDC = await deployContract(ethers, "CErc20Delegator", network.name, admin, [
      USDC.address,
      comptrollerImpl.address,
      whitePaperInterestRateModel.address,
      BigNumber.from('10000000000000000'),
      "cToken USD Coin",
      "cUSDC",
      "6",
      admin.address,
      cUSDCDelegate.address,
      constants.HashZero
    ]) as CErc20Delegator;
    // Deploy Maximillion
    // let maximillion = await deployContract(ethers, "Maximillion", network.name, admin) as Maximillion;
  });
// create2 proxy contracts factory
task("proxy", "contracts factory").setAction(
  async ({ }, { ethers, run, network }) => {
    const signers = await ethers.getSigners();
    const sinerIndex = 1;

    let receipt = await signers[sinerIndex].sendTransaction({
      nonce: BN(0),
      data: "0x601f80600e600039806000f350fe60003681823780368234f58015156014578182fd5b80825250506014600cf3"
    })
    console.log(await receipt.wait());
  }
);
const create2proxy = "0xCAE0947f783081F1d7c0850F69EcD75b574B3D91";

// deploy contracts with create2 proxy contract
task("pd", "contracts factory").setAction(
  async ({ }, { ethers, run, network }) => {
    const [signer] = await ethers.getSigners();

    // Now deploy some ERC-20 faucet tokens
    let bytecode = (await ethers.getContractFactory("ERC20MinterBurnerPauser")).bytecode;
    let args = utils.defaultAbiCoder.encode(["string", "string", "uint8"], ["USDC", "USD Coin", 6]).slice(2);

    let address = await ethers.provider.call({
      to: create2proxy,
      data: bytecode + args
    })
    console.log("address:", address);

    let receipt = await signer.sendTransaction({
      to: create2proxy,
      data: bytecode + args
    })
    console.log(await receipt.wait());

    let USDC = await ethers.getContractAt("ERC20MinterBurnerPauser", address, signer) as ERC20MinterBurnerPauser;

    let name = await USDC.name();
    console.log("name", name);

    let admin = await USDC.getRoleMember(constants.HashZero,0);
    console.log("admin", admin);

  }
);

export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting("0.5.16", 200), compileSetting("0.6.11", 200), compileSetting("0.8.4", 200)],
  },
  paths: {
    sources: "./stake",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 200000,
  },
};