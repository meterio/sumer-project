import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';
import { task, types } from 'hardhat/config';
import { Signer, utils, constants, BigNumber, ContractTransaction } from 'ethers';
import { compileSetting, allowVerifyChain } from './scripts/deployTool';
import { RPCS } from './scripts/network';

import {
  deployContract,
  BN,
  getContract,
  getContractJson,
  MINTER_ROLE,
  deployERC20WithProxy,
  listContracts,
} from './scripts/helper';
import { underlyingTokens, suTokens, priceFeeds, FeedType, groupNums, eqAssetGroups } from './scripts/tokens';
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
  Maximillion,
  UnderwriterProxy,
  ERC20MintablePauseableUpgradeable,
  SuErc20Delegator,
  SuErc20Delegate,
  InterestRateModel,
  FeedPriceOracle__factory,
} from './typechain-types';
import { token } from './typechain-types/@openzeppelin/contracts-upgradeable';
const dotenv = require('dotenv');
dotenv.config();
// import Colors = require("colors.ts");
// Colors.enable();

const MANTISSA_DECIMALS = 18;

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    let address = await account.getAddress();
    console.log(address, (await bre.ethers.provider.getBalance(address)).toString());
  }
});

task('deployComptroller', 'deploy comptroller/unitroller contracts').setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run('compile');
    const [admin] = await ethers.getSigners();
    let receipt: ContractTransaction;

    // Deploy FeedPriceOracle
    const feedPriceOracle = (await deployContract(ethers, 'FeedPriceOracle', network.name, admin)) as FeedPriceOracle;

    // Deploy CompoundLens
    const compoundLens = (await deployContract(ethers, 'CompoundLens', network.name, admin)) as CompoundLens;

    // Deploy Comp
    const sumerAddr = getContract(network.name, 'Sumer');

    // Deploy UnderwriterAdmin
    const uwProxy = (await deployContract(ethers, 'UnderwriterProxy', network.name, admin)) as UnderwriterProxy;
    const uwAdmin = (await deployContract(ethers, 'UnderwriterAdmin', network.name, admin, [
      sumerAddr,
    ])) as UnderwriterAdmin;

    const actualUWImpl = await uwProxy.implementation();
    if (actualUWImpl != uwAdmin.address) {
      receipt = await uwProxy._setPendingImplementation(uwAdmin.address);
      console.log(await receipt.wait());
      // Become Implementation
      receipt = await uwAdmin._become(uwProxy.address);
      console.log(await receipt.wait());
    }

    // Deploy Unitroller
    const unitroller = (await deployContract(ethers, 'Unitroller', network.name, admin)) as Unitroller;
    // Deploy Comptroller
    const comptroller = (await deployContract(ethers, 'Comptroller', network.name, admin)) as Comptroller;

    // SetPendingImpl for Unitroller
    const actualComptroller = await unitroller.comptrollerImplementation();
    if (actualComptroller != comptroller.address) {
      receipt = await unitroller._setPendingImplementation(comptroller.address);
      console.log(await receipt.wait());
      // Become Implementation
      receipt = await comptroller._become(unitroller.address);
      console.log(await receipt.wait());
    }

    // Configure Comptroller
    // Comptroller SetPriceOracle
    let comptrollerProxy = (await ethers.getContractAt('Comptroller', unitroller.address, admin)) as Comptroller;
    const expectedPriceOracle = feedPriceOracle.address;
    const actualPriceOracle = await comptrollerProxy.oracle();
    if (expectedPriceOracle != actualPriceOracle) {
      receipt = await comptrollerProxy._setPriceOracle(expectedPriceOracle);
      console.log(await receipt.wait());
    }

    // Comptroller SetCloseFactor 0.5
    const expectedCloseFactor = utils.parseUnits('0.5', MANTISSA_DECIMALS);
    const actualCloseFactor = await comptrollerProxy.closeFactorMantissa();
    if (!actualCloseFactor.eq(expectedCloseFactor)) {
      receipt = await comptrollerProxy._setCloseFactor(expectedCloseFactor);
      console.log(await receipt.wait());
    }
    // Comptroller LiquidationIncentive 1.1
    const expectedIncentive = utils.parseUnits('1.1', MANTISSA_DECIMALS);
    const actualIncentive = await comptrollerProxy.liquidationIncentiveMantissa();
    if (!actualIncentive.eq(expectedIncentive)) {
      receipt = await comptrollerProxy._setLiquidationIncentive(expectedIncentive);
      console.log(await receipt.wait());
    }

    // Comptroller SetUnderWriterAdmin (UnderwriterAdmin Address)
    const expectedUWAdmin = uwAdmin.address;
    const actualUWAdmin = await comptrollerProxy.underWriterAdmin();
    if (expectedUWAdmin != actualUWAdmin) {
      receipt = await comptrollerProxy._setUnderWriterAdmin(uwAdmin.address);
      console.log(await receipt.wait());
    }
  }
);

task('deployERC20', 'deploy token (mintable/pausable/upgradable)')
  .addParam('name', 'token name', 'Test Token')
  .addParam('symbol', 'token symbol', 'TEST')
  .addParam('admin', 'admin address', '')
  .setAction(async (args, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin] = await ethers.getSigners();
    const adminAddr = await admin.getAddress();
    const token = (await deployERC20WithProxy(
      ethers,
      upgrades,
      network.name,
      args.name,
      args.symbol,
      args.admin || adminAddr,
      admin
    )) as ERC20MintablePauseableUpgradeable;
  });

task('deploySuToken', 'deploy token (mintable/pausable/upgradable)').setAction(
  async ({}, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin, tokenDeployer] = await ethers.getSigners();
    const adminAddr = await admin.getAddress();

    console.log('deployer:', tokenDeployer.address);
    const sumer = (await deployERC20WithProxy(
      ethers,
      upgrades,
      network.name,
      'Sumer',
      'SUMER',
      adminAddr,
      tokenDeployer
    )) as ERC20MintablePauseableUpgradeable;
    for (const sutoken of suTokens) {
      const token = (await deployERC20WithProxy(
        ethers,
        upgrades,
        network.name,
        sutoken.name,
        sutoken.symbol,
        adminAddr,
        tokenDeployer
      )) as ERC20MintablePauseableUpgradeable;
    }
  }
);

task('deployCToken', async ({}, { ethers, run, network, upgrades }) => {
  await run('compile');
  const [admin, tokenDeployer] = await ethers.getSigners();
  const unitrollerAddr = getContract(network.name, 'Unitroller');
  const unitroller = await ethers.getContractAt('Comptroller', unitrollerAddr, admin);
  const zeroInterestRateModel = (await deployContract(
    ethers,
    'WhitePaperInterestRateModel',
    network.name,
    admin,
    [BigNumber.from(0), BigNumber.from(0)],
    {},
    'ZeroInterestRateModel'
  )) as InterestRateModel;

  const oracleAddr = getContract(network.name, 'FeedPriceOracle');
  if (oracleAddr === constants.AddressZero) {
    console.log(`could not get token address for FeedPriceOracle`);
    return;
  }

  const oracle = (await ethers.getContractAt('FeedPriceOracle', oracleAddr, admin)) as FeedPriceOracle;

  // Deply csu Tokens
  for (const sutoken of suTokens) {
    const sutokenAddr = getContract(network.name, sutoken.symbol);
    const csuTokenSymbol = `c${sutoken.symbol}`;
    // Deploy suToken delegates
    const delegate = (await deployContract(
      ethers,
      'suErc20Delegate',
      network.name,
      admin,
      [],
      {},
      `${csuTokenSymbol}Delegate`
    )) as SuErc20Delegate;

    // Deploy csu token delegators (proxy)
    const csuDecimals = 18;
    const delegator = (await deployContract(
      ethers,
      'suErc20Delegator',
      network.name,
      admin,
      [
        sutokenAddr,
        unitroller.address,
        zeroInterestRateModel.address,
        utils.parseUnits('1', sutoken.decimals - csuDecimals + MANTISSA_DECIMALS),
        csuTokenSymbol,
        csuTokenSymbol,
        csuDecimals,
        admin.address,
        delegate.address,
        constants.HashZero,
      ],
      {},
      csuTokenSymbol
    )) as SuErc20Delegator;
  }

  const whitePaperInterestRateModel = (await deployContract(
    ethers,
    'WhitePaperInterestRateModel',
    network.name,
    admin,
    [utils.parseUnits('0.05', MANTISSA_DECIMALS), utils.parseUnits('0.45', MANTISSA_DECIMALS)]
  )) as WhitePaperInterestRateModel;
  // deploy FixedInterestRate

  const underlys = underlyingTokens[network.name];
  console.log('network:', network.name);
  if (underlys && underlys.length > 0) {
    for (const underly of underlys) {
      // Deploy CToken delegates
      const ctokenSymbol = `c${underly.symbol}`;
      const delegate = (await deployContract(
        ethers,
        'CErc20Delegate',
        network.name,
        admin,
        [],
        {},
        `${ctokenSymbol}Delegate`
      )) as CErc20Delegate;

      const ctokenDecimals = 18;
      // Deploy cTokens delegators
      const delegator = (await deployContract(
        ethers,
        'CErc20Delegator',
        network.name,
        admin,
        [
          underly.address,
          unitroller.address,
          whitePaperInterestRateModel.address,
          utils.parseUnits('1', underly.decimals - ctokenDecimals + MANTISSA_DECIMALS), // exchange rate
          underly.cTokenName,
          ctokenSymbol,
          ctokenDecimals,
          admin.address,
          delegate.address,
          constants.HashZero,
        ],
        {},
        ctokenSymbol
      )) as CErc20Delegator;
    }
  }
});

task('configOracle', 'config price oracle').setAction(async ({}, { ethers, run, network, upgrades }) => {
  await run('compile');
  const [admin] = await ethers.getSigners();
  const oracleAddr = getContract(network.name, 'FeedPriceOracle');
  if (oracleAddr === constants.AddressZero) {
    console.log(`could not get token address for FeedPriceOracle`);
    return;
  }
  const oracle = (await ethers.getContractAt('FeedPriceOracle', oracleAddr, admin)) as FeedPriceOracle;
  const feeds = priceFeeds[network.name];
  if (feeds) {
    for (const feed of feeds) {
      const tokenAddr = getContract(network.name, feed.ctoken);
      if (tokenAddr === constants.AddressZero) {
        console.log(`could not get token address for ${feed.ctoken}`);
        continue;
      }
      let re: ContractTransaction;
      switch (feed.type) {
        case FeedType.Fixed:
          console.log(`set fixed price ${feed.fixed} for ${feed.ctoken}`);
          re = await oracle.setFixedPrice(tokenAddr, feed.fixed);
          console.log(re);
          break;
        case FeedType.Chainlink:
          console.log(`set chainlink feed ${feed.feedAddr} for ${feed.ctoken}`);
          re = await oracle.setFeed(tokenAddr, feed.feedAddr, 18);
          break;
        case FeedType.Witnet:
          console.log(`set witnet feed ${feed.feedAddr} ${feed.decimals} for ${feed.ctoken}`);
          re = await oracle.setWitnetFeed(tokenAddr, feed.feedAddr, 18, feed.decimals);
          break;
      }
      if (re) {
        await re.wait();
      }
    }
  }
});

task('configSuMinter', 'config minter for sutokens').setAction(async ({}, { ethers, run, network, upgrades }) => {
  await run('compile');
  const [admin] = await ethers.getSigners();

  for (const sutoken of suTokens) {
    const suSymbol = sutoken.symbol;
    const minterSymbol = sutoken.minter;
    const suAddr = getContract(network.name, suSymbol);
    if (suAddr === constants.AddressZero) {
      console.log(`could not get token address for ${suSymbol}`);
      continue;
    }
    const minterAddr = getContract(network.name, minterSymbol);
    if (minterAddr === constants.AddressZero) {
      console.log(`could not get token address for ${minterSymbol}`);
      continue;
    }
    const su = (await ethers.getContractAt(
      'ERC20MintablePauseableUpgradeable',
      suAddr,
      admin
    )) as ERC20MintablePauseableUpgradeable;

    const re = await su.addMinter(minterAddr);
    await re.wait();
    console.log(`add ${minterSymbol} as minter on ${suSymbol}`);
  }
});

task('configGroup', 'config group').setAction(async ({}, { ethers, run, network, upgrades }) => {
  await run('compile');
  const [admin] = await ethers.getSigners();
  const unitrollerAddr = getContract(network.name, 'Unitroller');
  const unitroller = (await ethers.getContractAt('Comptroller', unitrollerAddr, admin)) as Comptroller;
  const uwAdminAddr = getContract(network.name, 'UnderwriterAdmin');
  const uwAdmin = (await ethers.getContractAt('UnderwriterAdmin', uwAdminAddr, admin)) as UnderwriterAdmin;

  for (const tokenSym in groupNums) {
    const groupNum = groupNums[tokenSym];
    const tokenAddr = getContract(network.name, tokenSym);
    if (tokenAddr === constants.AddressZero) {
      console.log(`could not get token address for ${tokenSym}`);
      continue;
    }
    const market = await unitroller.markets(tokenAddr);
    if (!market.isListed || market.equalAssetGrouId != groupNum) {
      const re = await unitroller._supportMarket(tokenAddr, groupNum);
      await re.wait();
      console.log(`support market ${tokenSym} with groupId ${groupNum} in ${re.hash} `);
    } else {
      console.log(`market ${tokenSym} is already listed`);
    }
  }

  for (const group of eqAssetGroups) {
    const re = await uwAdmin.setEqAssetGroup(
      group.id,
      group.name,
      group.inGroupCTokenRateMantissa,
      group.inGroupSuTokenRateMantissa,
      group.interGroupCTokenRateMantissa,
      group.interGroupSuTokenRateMantissa
    );
    await re.wait();
    console.log(`set eq asset group for ${group.id} ${group.name} in ${re.hash}`);
  }
});

task('configCsuToken', 'config csuToken with minter roles').setAction(
  async (args, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin, tokenDeployer] = await ethers.getSigners();

    for (const sutoken of suTokens) {
      const suAddr = getContract(network.name, sutoken.symbol);
      const csuAddr = getContract(network.name, 'c' + sutoken.symbol);
      if (suAddr && csuAddr) {
        const suContract = (await ethers.getContractAt(
          'ERC20MintablePauseableUpgradeable',
          suAddr,
          tokenDeployer
        )) as ERC20MintablePauseableUpgradeable;
        const re = await suContract.addMinter(csuAddr);
        console.log(re);
      }
    }
  }
);

task('list', 'list deployed contracts').setAction(async ({}, { ethers, run, network, upgrades }) => {
  const underlys = underlyingTokens[network.name];
  const result = listContracts(network.name);
  for (const underly of underlys.sort((a, b) => (a.symbol < b.symbol ? 1 : -1))) {
    result[underly.symbol] = underly.address;
  }

  console.log(`contracts deployed on ${network.name}:`, JSON.stringify(result, null, 2));
});

task('mint', 'mint token')
  .addParam('token', 'token address or symbol')
  .addParam('to', 'to address')
  .addParam('amount', 'mint amount', '1', types.string)
  .setAction(async (args, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin] = await ethers.getSigners();
    let tokenAddr = args.token;
    try {
      utils.getAddress(tokenAddr);
    } catch (e) {
      tokenAddr = getContract(network.name, args.token);
    }
    if (tokenAddr === constants.AddressZero) {
      console.log(`could not get token address for ${args.token}`);
      return;
    }
    const token = (await ethers.getContractAt(
      'ERC20MintablePauseableUpgradeable',
      tokenAddr,
      admin
    )) as ERC20MintablePauseableUpgradeable;
    const receipt = await token.mint(args.to, args.amount);
    await receipt.wait();

    console.log(`Minted ${args.amount} to ${args.to} in ${receipt.hash}`);
  });

task('addMinter', 'add minter')
  .addParam('token', 'token address or symbol')
  .addParam('minter', 'minter address')
  .setAction(async (args, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin] = await ethers.getSigners();
    let tokenAddr = args.token;
    try {
      utils.getAddress(tokenAddr);
    } catch (e) {
      tokenAddr = getContract(network.name, args.token);
    }
    if (tokenAddr === constants.AddressZero) {
      console.log(`could not get token address for ${args.token}`);
      return;
    }

    const token = (await ethers.getContractAt(
      'ERC20MintablePauseableUpgradeable',
      tokenAddr,
      admin
    )) as ERC20MintablePauseableUpgradeable;
    const receipt = await token.addMinter(args.minter);
    await receipt.wait();
    console.log(`added ${args.minter} as minter on ${args.token} in ${receipt.hash}`);
  });

task('price', 'query price from oracle')
  .addParam('token', 'token symbol')
  .setAction(async (args, { ethers, run, network, upgrades }) => {
    await run('compile');
    const [admin] = await ethers.getSigners();
    const tokenAddr = getContract(network.name, args.token);
    if (tokenAddr === constants.AddressZero) {
      console.log(`could not get token address for ${args.token}`);
      return;
    }
    const oracleAddr = getContract(network.name, 'FeedPriceOracle');
    if (oracleAddr === constants.AddressZero) {
      console.log(`could not get token address for FeedPriceOracle`);
      return;
    }

    const oracle = (await ethers.getContractAt('FeedPriceOracle', oracleAddr, admin)) as FeedPriceOracle;
    const price = await oracle.getUnderlyingPrice(tokenAddr);
    console.log(`price for ${args.token} is ${price.toString()}`);
  });

// create2 proxy contracts factory
task('proxy', 'contracts factory').setAction(async ({}, { ethers, run, network }) => {
  const signers = await ethers.getSigners();
  const sinerIndex = 1;

  let receipt = await signers[sinerIndex].sendTransaction({
    nonce: BN(0),
    data: '0x601f80600e600039806000f350fe60003681823780368234f58015156014578182fd5b80825250506014600cf3',
  });
  console.log(await receipt.wait());
});

// create2 proxy contracts factory
task('load', 'contracts factory').setAction(async ({}, { ethers, run, network }) => {
  const a = getContract(network.name, 'CompoundLens');
  console.log(a);
});

const create2proxy = '0xCAE0947f783081F1d7c0850F69EcD75b574B3D91';

// deploy contracts with create2 proxy contract
task('pd', 'contracts factory').setAction(async ({}, { ethers, run, network }) => {
  const [signer] = await ethers.getSigners();

  // Now deploy some ERC-20 faucet tokens
  let bytecode = (await ethers.getContractFactory('ERC20MinterBurnerPauser')).bytecode;
  let args = utils.defaultAbiCoder.encode(['string', 'string', 'uint8'], ['USDC', 'USD Coin', 6]).slice(2);

  let address = await ethers.provider.call({
    to: create2proxy,
    data: bytecode + args,
  });
  console.log('address:', address);

  let receipt = await signer.sendTransaction({
    to: create2proxy,
    data: bytecode + args,
  });
  console.log(await receipt.wait());

  let USDC = (await ethers.getContractAt('ERC20MinterBurnerPauser', address, signer)) as ERC20MinterBurnerPauser;

  let name = await USDC.name();
  console.log('name', name);

  let admin = await USDC.getRoleMember(constants.HashZero, 0);
  console.log('admin', admin);
});

export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting('0.5.16', 200), compileSetting('0.6.11', 200), compileSetting('0.8.4', 200)],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 200000,
  },
};
