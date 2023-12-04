import { ethers } from 'hardhat';
import {
  getConfig,
  writeConfig,
  network_config,
  setNetwork,
  getCTokens,
  deployOrInput,
  deployProxyOrInput,
  sendTransaction,
  DEFAULT_ADMIN_ROLE,
  cTokenSetting,
  interestRateModel_select,
  InterestRateModel_template,
  Config,
} from './helper';
import { AccountLiquidity, CErc20, CompLogic, CompoundLens, Comptroller, FeedPriceOracle } from '../typechain';
import { confirm } from '@inquirer/prompts';
import { BigNumber } from 'ethers';
const hre = require('hardhat');
import * as path from 'path';
import * as fs from 'fs';
import { input, select, password } from '@inquirer/prompts';

const traverseContracts = () => {
  const base = path.join(__dirname, '..');
  let paths = [];
  let contracts: { [key: string]: string } = {};
  paths.push({ file: 'contracts' });
  while (paths.length > 0) {
    const p = paths.shift();
    if (!p) {
      break;
    }
    const filepath = path.join(base, p.file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(filepath);
      paths.push(...files.map((f) => ({ file: path.join(p.file, f) })));
    } else if (stat.isFile() && filepath.endsWith('.sol')) {
      const basename = path.basename(p.file);
      const name = basename.replace('.sol', '');
      contracts[name] = `${p.file}:${name}`;
    }
  }
  return contracts;
};

const verifyProxyContract = async (proxyAdmin: string, config: Config) => {
  const address = config.address;
  const name = config.name || config.contract;
  if (!name) {
    throw new Error(`could not get contract name`);
  }
  if (!address) {
    console.log(`跳过开源，请先部署 ${name}`);
    return;
  }
  if (!config.implementation) {
    throw new Error(`could not get impl address for proxy ${name}`);
  }
  const contract = `contracts/proxy/SumerProxy.sol:SumerProxy`;
  const answer = await select({
    message: `在${hre.network.name}上开源 ${name} Proxy合约: ${address}`,
    choices: [
      { name: '否', value: 'no' },
      { name: '是', value: 'yes' },
    ],
  });

  const factory = await ethers.getContractFactory(config.contract);
  const data = factory.interface.encodeFunctionData('initialize', config.args);

  if (answer == 'yes') {
    console.log({ address, contract, constructorArguments: [config.implementation, proxyAdmin, data] });
    await hre.run('verify:verify', {
      address,
      contract,
      constructorArguments: [config.implementation, proxyAdmin, data],
    });
  } else {
  }
};

const verifyImplContract = async (contractMap: { [key: string]: string }, config: Config) => {
  const address = config.implementation || config.address;
  const name = config.contract || config.name;
  if (!name) {
    throw new Error(`could not get contract name`);
  }
  if (!address) {
    console.log(`跳过开源，请先部署 ${name}`);
    return;
  }

  const contract = contractMap[name];
  if (!contract) {
    throw new Error(`could not find contract ${name}`);
  }
  const answer = await select({
    message: `在${hre.network.name}上开源 ${name} Impl合约: ${address}`,
    choices: [
      { name: '否', value: 'no' },
      { name: '是', value: 'yes' },
    ],
  });

  if (answer == 'yes') {
    await hre.run('verify:verify', { address, contract, constructorArguments: config.args || [] });
  } else {
  }
};

const main = async () => {
  const contractMap = traverseContracts();

  let config = getConfig(hre.network.name);

  const proxyAdmin = config.ProxyAdmin.address;

  // ProxyAdmin
  await verifyImplContract(contractMap, config.ProxyAdmin);
  // Multicall2
  await verifyImplContract(contractMap, config.Multicall2);
  // FeedPriceOracle
  await verifyImplContract(contractMap, config.FeedPriceOracle);

  // CompoundLens
  await verifyImplContract(contractMap, config.CompoundLens);

  // InterestRateModel
  for (const template of config.InterestRateModel) {
    await verifyImplContract(contractMap, template);
  }

  // AccountLiquidity
  await verifyImplContract(contractMap, config.AccountLiquidity);
  await verifyProxyContract(proxyAdmin, config.AccountLiquidity);

  // CompLogic Impl
  await verifyImplContract(contractMap, config.CompLogic);
  await verifyProxyContract(proxyAdmin, config.CompLogic);

  // Comptroller
  await verifyImplContract(contractMap, config.Comptroller);
  await verifyProxyContract(proxyAdmin, config.Comptroller);

  // CEther
  if (config.CEther) {
    await verifyImplContract(contractMap, config.CEther);
  }

  // CErc20
  if (config.CErc20) {
    await verifyImplContract(contractMap, config.CErc20);
    for (const proxy of config.CErc20.proxys) {
      await verifyProxyContract(proxyAdmin, proxy);
    }
  }

  // SuErc20
  if (config.suErc20) {
    await verifyImplContract(contractMap, config.suErc20);
    for (const proxy of config.suErc20.proxys) {
      await verifyProxyContract(proxyAdmin, proxy);
    }
  }

  // Timelock
  await verifyImplContract(contractMap, config.Timelock);
};

main();
