import { config as dotEnvConfig } from "dotenv";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "hardhat-etherscan-abi";
import "solidity-coverage";

import "./tasks";
import { compileSetting } from './scripts/deployTool';

const dotenv = require('dotenv');
dotenv.config();


// task('upgradeCToken', async ({ }, { ethers, run, network }) => {
//   const [admin] = await ethers.getSigners();
//   const unitrollerAddr = getContract(network.name, 'Unitroller');
//   const unitroller = await ethers.getContractAt('Comptroller', unitrollerAddr, admin);

//   // Upgrade csu Tokens
//   for (const sutoken of suTokens) {
//     const csuTokenSymbol = `c${sutoken.symbol}`;
//     // Deploy suToken delegates
//     const delegate = (await deployContractWithOverride(
//       ethers,
//       'suErc20Delegate',
//       network.name,
//       admin,
//       [],
//       {},
//       `${csuTokenSymbol}Delegate`
//     )) as SuErc20Delegate;

//     // Update csu token delegators with new delegate address
//     const delegatorAddr = getContract(network.name, csuTokenSymbol);
//     const delegator = (await ethers.getContractAt('suErc20Delegator', delegatorAddr)) as SuErc20Delegator;
//     const receipt = await delegator._setImplementation(delegate.address, true, constants.HashZero);
//     console.log(await receipt.wait());
//   }

//   const whitePaperRateAddr = getContract(network.name, 'WhitePaperInterestRateModel');

//   const underlys = underlyingTokens[network.name];
//   if (underlys && underlys.length > 0) {
//     for (const underly of underlys) {
//       const ctokenSymbol = `c${underly.symbol}`;
//       const ctokenDecimals = 18;

//       if (underly.native) {
//         // deploy CEther for native token
//         // FIXME: how to upgrade CEther?
//         const cether = (await deployContractWithOverride(
//           ethers,
//           'CEther',
//           network.name,
//           admin,
//           [
//             unitroller.address,
//             whitePaperRateAddr,
//             utils.parseUnits('1', underly.decimals - ctokenDecimals + MANTISSA_DECIMALS), // exchange rate
//             underly.cTokenName,
//             ctokenSymbol,
//             ctokenDecimals,
//             admin.address,
//           ],
//           {},
//           `${ctokenSymbol}`
//         )) as CEther;
//       } else {
//         // deploy new CToken delegate
//         const delegate = (await deployContractWithOverride(
//           ethers,
//           'CErc20Delegate',
//           network.name,
//           admin,
//           [],
//           {},
//           `${ctokenSymbol}Delegate`
//         )) as CErc20Delegate;

//         // update cTokens delegators with new delegate address
//         const delegatorAddr = getContract(network.name, ctokenSymbol);
//         const delegator = (await ethers.getContractAt('CErc20Delegator', delegatorAddr)) as CErc20Delegator;
//         const receipt = await delegator._setImplementation(delegate.address, true, constants.HashZero);
//         console.log(await receipt.wait());
//       }
//     }
//   }
// });


// task('configOracle', 'config price oracle').setAction(async ({ }, { ethers, run, network, upgrades }) => {
//   console.log('CONFIG ORACLE');
//   await run('compile');
//   const [admin] = await ethers.getSigners();
//   const oracleAddr = getContract(network.name, 'FeedPriceOracle');
//   if (oracleAddr === constants.AddressZero) {
//     console.log(`could not get token address for FeedPriceOracle`);
//     return;
//   }
//   const oracle = (await ethers.getContractAt('FeedPriceOracle', oracleAddr, admin)) as FeedPriceOracle;
//   const feeds = priceFeeds[network.name];
//   if (feeds) {
//     for (const feed of feeds) {
//       const tokenAddr = getContract(network.name, feed.ctoken);
//       if (tokenAddr === constants.AddressZero) {
//         console.log(`could not get token address for ${feed.ctoken}`);
//         continue;
//       }
//       let re: ContractTransaction;
//       switch (feed.type) {
//         case FeedType.Fixed:
//           const fdata = (await oracle.getFixedPrice(tokenAddr)) as BigNumber;
//           if (fdata.eq(BigNumber.from(feed.fixed))) {
//             console.log(`skip setting fixed price ${feed.fixed} for ${feed.ctoken}`);
//             continue;
//           }
//           re = await oracle.setFixedPrice(tokenAddr, feed.fixed);
//           await re.wait();
//           console.log(`set fixed price ${feed.fixed} for ${feed.ctoken} in ${re.hash}`);
//           break;
//         case FeedType.Chainlink:
//           const cdata = (await oracle.getFeed(tokenAddr)) as FeedPriceOracle.FeedDataStruct;
//           if (cdata.addr === feed.feedAddr) {
//             console.log(`skip setting chainlink feed ${feed.feedAddr} for ${feed.ctoken}`);
//             continue;
//           }
//           re = await oracle.setFeed(tokenAddr, feed.feedAddr, 18);
//           await re.wait();
//           console.log(`set chainlink feed ${feed.feedAddr} for ${feed.ctoken} in ${re.hash}`);
//           break;
//         case FeedType.Witnet:
//           const wdata = (await oracle.getFeed(tokenAddr)) as FeedPriceOracle.FeedDataStruct;
//           if (wdata.addr === feed.feedAddr) {
//             console.log(`skip setting witnet feed ${feed.feedAddr} ${feed.decimals} for ${feed.ctoken}`);
//             continue;
//           }
//           re = await oracle.setWitnetFeed(tokenAddr, feed.feedAddr, 18, feed.decimals);
//           await re.wait();
//           console.log(`set witnet feed ${feed.feedAddr} ${feed.decimals} for ${feed.ctoken} in ${re.hash}`);
//       }
//     }
//   }
// });


// task('configGroup', 'config group').setAction(async ({ }, { ethers, run, network, upgrades }) => {
//   await run('compile');
//   const [admin] = await ethers.getSigners();
//   const unitrollerAddr = getContract(network.name, 'Unitroller');
//   const unitroller = (await ethers.getContractAt('Comptroller', unitrollerAddr, admin)) as Comptroller;
//   const uwAdminAddr = getContract(network.name, 'UnderwriterAdmin');
//   const uwAdmin = (await ethers.getContractAt('UnderwriterAdmin', uwAdminAddr, admin)) as UnderwriterAdmin;

//   for (const tokenSym in groupNums) {
//     const groupNum = groupNums[tokenSym];
//     const tokenAddr = getContract(network.name, tokenSym);
//     if (tokenAddr === constants.AddressZero) {
//       console.log(`could not get token address for ${tokenSym}`);
//       continue;
//     }
//     const market = await unitroller.markets(tokenAddr);
//     if (!market.isListed || market.equalAssetGrouId != groupNum) {
//       const re = await unitroller._supportMarket(tokenAddr, groupNum);
//       await re.wait();
//       console.log(`support market ${tokenSym} with groupId ${groupNum} in ${re.hash} `);
//     } else {
//       console.log(`market ${tokenSym} is already listed`);
//     }
//   }

//   for (const group of eqAssetGroups) {
//     const re = await uwAdmin.setEqAssetGroup(
//       group.id,
//       group.name,
//       group.inGroupCTokenRateMantissa,
//       group.inGroupSuTokenRateMantissa,
//       group.interGroupCTokenRateMantissa,
//       group.interGroupSuTokenRateMantissa
//     );
//     await re.wait();
//     console.log(`set eq asset group for ${group.id} ${group.name} in ${re.hash}`);
//   }
// });

// task('configSuMintRate', 'config mint rate for su token')
//   .addParam('rate', 'sutoken mint rate')
//   .setAction(async (args, { ethers, run, network, upgrades }) => {
//     await run('compile');
//     const [admin] = await ethers.getSigners();
//     const uwAdminAddr = getContract(network.name, 'UnderwriterAdmin');
//     const uwAdmin = (await ethers.getContractAt('UnderwriterAdmin', uwAdminAddr, admin)) as UnderwriterAdmin;

//     let num = Number(args.rate);
//     if (Number.isNaN(num) || num <= 0 || num > 1) {
//       console.log(`invalid rate, must be 0<rate<1`);
//       return;
//     }
//     const rate = utils.parseUnits(args.rate, 18);
//     const actualRate = await uwAdmin._getSuTokenRateMantissa();
//     if (actualRate.eq(rate)) {
//       console.log(`sutoken mint rate is already ${rate}`);
//     } else {
//       const receipt = await uwAdmin._setSuTokenRateMantissa(rate);
//       await receipt.wait();
//       console.log(`set sutoken mint rate to ${rate}`);
//     }
//   });

// task('configCsuToken', 'config csuToken with minter roles').setAction(
//   async (args, { ethers, run, network, upgrades }) => {
//     await run('compile');
//     const [admin, tokenDeployer] = await ethers.getSigners();

//     for (const sutoken of suTokens) {
//       const suAddr = getContract(network.name, sutoken.symbol);
//       const csuAddr = getContract(network.name, 'c' + sutoken.symbol);
//       if (suAddr && csuAddr) {
//         const suContract = (await ethers.getContractAt(
//           'ERC20MintablePauseableUpgradeable',
//           suAddr,
//           tokenDeployer
//         )) as ERC20MintablePauseableUpgradeable;
//         const re = await suContract.addMinter(csuAddr);
//         console.log(re);
//       }
//     }
//   }
// );

// task('list', 'list deployed contracts').setAction(async ({ }, { ethers, run, network, upgrades }) => {
//   const underlys = underlyingTokens[network.name];
//   const result = listContracts(network.name);
//   for (const underly of underlys.sort((a, b) => (a.symbol < b.symbol ? 1 : -1))) {
//     result[underly.symbol] = underly.address;
//   }

//   console.log(`contracts deployed on ${network.name}:`, JSON.stringify(result, null, 2));
// });

// task('mint', 'mint token')
//   .addParam('token', 'token address or symbol')
//   .addParam('to', 'to address')
//   .addParam('amount', 'mint amount', '1', types.string)
//   .setAction(async (args, { ethers, run, network, upgrades }) => {
//     await run('compile');
//     const [admin] = await ethers.getSigners();
//     let tokenAddr = args.token;
//     try {
//       utils.getAddress(tokenAddr);
//     } catch (e) {
//       tokenAddr = getContract(network.name, args.token);
//     }
//     if (tokenAddr === constants.AddressZero) {
//       console.log(`could not get token address for ${args.token}`);
//       return;
//     }
//     const token = (await ethers.getContractAt(
//       'ERC20MintablePauseableUpgradeable',
//       tokenAddr,
//       admin
//     )) as ERC20MintablePauseableUpgradeable;
//     const receipt = await token.mint(args.to, args.amount);
//     await receipt.wait();

//     console.log(`Minted ${args.amount} to ${args.to} in ${receipt.hash}`);
//   });

// task('addMinter', 'add minter')
//   .addParam('token', 'token address or symbol')
//   .addParam('minter', 'minter address')
//   .setAction(async (args, { ethers, run, network, upgrades }) => {
//     await run('compile');
//     const [admin] = await ethers.getSigners();
//     let tokenAddr = args.token;
//     try {
//       utils.getAddress(tokenAddr);
//     } catch (e) {
//       tokenAddr = getContract(network.name, args.token);
//     }
//     if (tokenAddr === constants.AddressZero) {
//       console.log(`could not get token address for ${args.token}`);
//       return;
//     }

//     const token = (await ethers.getContractAt(
//       'ERC20MintablePauseableUpgradeable',
//       tokenAddr,
//       admin
//     )) as ERC20MintablePauseableUpgradeable;
//     const receipt = await token.addMinter(args.minter);
//     await receipt.wait();
//     console.log(`added ${args.minter} as minter on ${args.token} in ${receipt.hash}`);
//   });

// task('price', 'query price from oracle')
//   .addParam('token', 'token symbol')
//   .setAction(async (args, { ethers, run, network, upgrades }) => {
//     await run('compile');
//     const [admin] = await ethers.getSigners();
//     const tokenAddr = getContract(network.name, args.token);
//     if (tokenAddr === constants.AddressZero) {
//       console.log(`could not get token address for ${args.token}`);
//       return;
//     }
//     const oracleAddr = getContract(network.name, 'FeedPriceOracle');
//     if (oracleAddr === constants.AddressZero) {
//       console.log(`could not get token address for FeedPriceOracle`);
//       return;
//     }

//     const oracle = (await ethers.getContractAt('FeedPriceOracle', oracleAddr, admin)) as FeedPriceOracle;
//     const price = await oracle.getUnderlyingPrice(tokenAddr);
//     console.log(`price for ${args.token} is ${price.toString()}`);
//   });

// // create2 proxy contracts factory
// task('proxy', 'contracts factory').setAction(async ({ }, { ethers, run, network }) => {
//   const signers = await ethers.getSigners();
//   const sinerIndex = 1;

//   let receipt = await signers[sinerIndex].sendTransaction({
//     nonce: BN(0),
//     data: '0x601f80600e600039806000f350fe60003681823780368234f58015156014578182fd5b80825250506014600cf3',
//   });
//   console.log(await receipt.wait());
// });

// // create2 proxy contracts factory
// task('load', 'contracts factory').setAction(async ({ }, { ethers, run, network }) => {
//   const a = getContract(network.name, 'CompoundLens');
//   console.log(a);
// });

// const create2proxy = '0xCAE0947f783081F1d7c0850F69EcD75b574B3D91';

// // deploy contracts with create2 proxy contract
// task('pd', 'contracts factory').setAction(async ({ }, { ethers, run, network }) => {
//   const [signer] = await ethers.getSigners();

//   // Now deploy some ERC-20 faucet tokens
//   let bytecode = (await ethers.getContractFactory('ERC20MinterBurnerPauser')).bytecode;
//   let args = utils.defaultAbiCoder.encode(['string', 'string', 'uint8'], ['USDC', 'USD Coin', 6]).slice(2);

//   let address = await ethers.provider.call({
//     to: create2proxy,
//     data: bytecode + args,
//   });
//   console.log('address:', address);

//   let receipt = await signer.sendTransaction({
//     to: create2proxy,
//     data: bytecode + args,
//   });
//   console.log(await receipt.wait());

//   let USDC = (await ethers.getContractAt('ERC20MinterBurnerPauser', address, signer)) as ERC20MinterBurnerPauser;

//   let name = await USDC.name();
//   console.log('name', name);

//   let admin = await USDC.getRoleMember(constants.HashZero, 0);
//   console.log('admin', admin);
// });


dotEnvConfig();
// tslint:disable-next-line:no-var-requires
const argv = require('yargs/yargs')()
  .env('')
  .options({
    hardhatChainId: {
      type: "number",
      default: 31337
    },
    ganacheRpc: {
      type: "string",
      default: 'http://127.0.0.1:7545'
    },
    maticRpcUrl: {
      type: "string",
      default: ''
    },
    mumbaiRpcUrl: {
      type: "string",
      default: 'https://matic-mumbai.chainstacklabs.com'
    },
    ethRpcUrl: {
      type: "string",
      default: ''
    },
    ftmRpcUrl: {
      type: "string",
      default: ''
    },
    meterTestRpcUrl: {
      type: "string",
      default: 'https://rpctest.meter.io'
    },
    meterMainRpcUrl: {
      type: "string",
      default: 'https://rpc.meter.io'
    },
    networkScanKey: {
      type: "string",
      default: ''
    },
    privateKey: {
      type: "string",
      default: "b55c9fcc2c60993e5c539f37ffd27d2058e7f77014823b461323db5eba817518" // random account
    },
    maticForkBlock: {
      type: "number",
    },
    mumbaiForkBlock: {
      type: "number",
    },
    ftmForkBlock: {
      type: "number",
    },
  }).argv;


export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: !!argv.hardhatChainId ? argv.hardhatChainId : undefined,
      timeout: 99999 * 2,
      gas: argv.hardhatChainId === 137 ? 19_000_000 :
        argv.hardhatChainId === 80001 ? 19_000_000 :
          undefined,
      forking: !!argv.hardhatChainId && argv.hardhatChainId !== 31337 ? {
        url:
          argv.hardhatChainId === 137 ? argv.maticRpcUrl :
            argv.hardhatChainId === 250 ? argv.ftmRpcUrl :
              argv.hardhatChainId === 80001 ? argv.mumbaiRpcUrl :
                undefined,
        blockNumber:
          argv.hardhatChainId === 137 ? argv.maticForkBlock !== 0 ? argv.maticForkBlock : undefined :
            argv.hardhatChainId === 250 ? argv.ftmForkBlock !== 0 ? argv.ftmForkBlock : undefined :
              argv.hardhatChainId === 80001 ? argv.mumbaiForkBlock !== 0 ? argv.mumbaiForkBlock : undefined :
                undefined
      } : undefined,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        accountsBalance: "100000000000000000000000000000"
      },
    },
    matic: {
      url: argv.maticRpcUrl,
      timeout: 99999,
      chainId: 137,
      // gas: 19_000_000,
      // gasPrice: 100_000_000_000,
      gasMultiplier: 1.3,
      accounts: [argv.privateKey],
    },
    mumbai: {
      url: argv.mumbaiRpcUrl,
      chainId: 80001,
      timeout: 99999,
      // gasPrice: 100_000_000_000,
      accounts: [argv.privateKey],
    },
    ftm: {
      url: argv.ftmRpcUrl,
      chainId: 250,
      timeout: 99999,
      accounts: [argv.privateKey],
    },
    metertest: {
      url: argv.meterTestRpcUrl,
      chainId: 83,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3],
    },
    metermain: {
      url: argv.meterMainRpcUrl,
      chainId: 82,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1],
    },
    ganache: {
      url: argv.ganacheRpc,
      chainId: 1337,
      accounts: [process.env.PRIVATE_KEY_0, "0x34cd0e9ec7a0ec36a37db424f720de58223f9cd52e0175c7a972a6a864eb86a5"],
    },
  },
  etherscan: {
    apiKey: argv.networkScanKey
  },
  solidity: {
    compilers: [compileSetting('0.6.11', 200), compileSetting('0.7.6', 200), compileSetting('0.8.11', 200)]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 9999999999
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  gasReporter: {
    enabled: false,
    currency: 'USD',
    gasPrice: 21
  },
  typechain: {
    outDir: "typechain",
  },
};
