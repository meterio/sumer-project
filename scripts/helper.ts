import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { Contract, BigNumber, BytesLike, constants, PayableOverrides, Wallet, providers, utils } from 'ethers';
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import * as pathLib from 'path';
import { input, select, password } from '@inquirer/prompts';
import colors from 'colors';
import { CToken, Comptroller, ERC20MinterBurnerPauser, FeedPriceOracle, SuErc20 } from '../typechain';
import { Fragment, FunctionFragment } from 'ethers/lib/utils';
colors.enable();

export const yellow = colors.yellow;
export const green = colors.green;
export const red = colors.red;
export const blue = colors.blue;
export const bgWhite = colors.bgWhite;
export const bgYellow = colors.bgYellow;
export const defaultPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // mnemonic:test test test test test test test test test test test junk

export const network_json = './scripts/network.testnet.json';
export const network_config = JSON.parse(readFileSync(network_json).toString());

export const meter_json = './scripts/meter.json';
export const meter_config = JSON.parse(readFileSync(meter_json).toString());

export const interestRateModel_json = './scripts/InterestRateModel.json';
export const InterestRateModel_template = JSON.parse(readFileSync(interestRateModel_json).toString());

export const operation_json = './scripts/Operations.config.json';
export const Operations_config = JSON.parse(readFileSync(operation_json).toString());

export const contracts_json = './scripts/Contracts.json';
export const contracts_config = JSON.parse(readFileSync(contracts_json).toString());

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

export function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
export const overrides: any = {
  gasLimit: 8000000,
};

export const MINTER_ROLE: BytesLike = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
export const DEFAULT_ADMIN_ROLE: BytesLike = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const gasLeft = BN(28975827); //1ba22d3

export function getContract(network: string, name: string): string {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, '..', path, latest);
  if (existsSync(fullpath)) {
    let json = JSON.parse(readFileSync(fullpath).toString());
    return json.address;
  } else {
    return constants.AddressZero;
  }
}

export function getContractJson(network: string, name: string) {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, '..', path, latest);
  if (existsSync(fullpath)) {
    return JSON.parse(readFileSync(fullpath).toString());
  } else {
    return '';
  }
}

export async function saveFile(
  network: string,
  name: string,
  contract: Contract,
  args: Array<any> = [],
  libraries: Object = {}
) {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const file = `${contractName}.json`;

  mkdirSync(path, { recursive: true });

  if (contractName != name) {
    writeFileSync(
      path + file,
      JSON.stringify(
        {
          address: contract.address,
          constructorArguments: args,
          libraries: libraries,
          contract: name,
        },
        null,
        2
      )
    );
  } else {
    writeFileSync(
      path + file,
      JSON.stringify({
        address: contract.address,
        constructorArguments: args,
        libraries: libraries,
      })
    );
  }
}

export function getChoices(config: any[]) {
  let result = [];
  for (let i = 0; i < config.length; i++) {
    result.push({
      name: config[i].name,
      value: i,
    });
  }
  return result;
}

export type Network = {
  name: string;
  provider: providers.JsonRpcProvider;
  wallet: Wallet;
  override: PayableOverrides;
  netConfig: any;
  networkIndex: number;
};

export async function setNetwork(config: any[], name: string = ''): Promise<Network> {
  let override: PayableOverrides = {};
  const networkIndex = await select({
    message: `选择网络${green(name)}:`,
    choices: getChoices(config),
  });
  const privateKey = await password({
    message: `输入网络${green(name)}的Private Key:`,
    validate: (value = '') => utils.isBytesLike(value) || 'Pass a valid Private Key value',
    mask: '*',
  });

  const provider = new providers.JsonRpcProvider(config[networkIndex].rpc);
  const wallet = new Wallet(privateKey, provider);
  console.log('Signer:', yellow(wallet.address));

  const defaultGasPrice = await wallet.provider.getGasPrice();
  override.gasPrice = await input({
    message: '输入Gas price:',
    default: defaultGasPrice.toString(),
    validate: (value = '') => value.length > 0 || 'Pass a valid value',
  });

  const netConfig = config[networkIndex];
  return { name, provider, wallet, override, netConfig, networkIndex };
}

export async function sendTransaction(
  network: Network,
  contract: Contract,
  func: string,
  args: any[],
  override: PayableOverrides = {},
  checkRole: BytesLike = '0x'
) {
  if (checkRole != '0x') {
    let hasRole = await contract.hasRole(checkRole, network.wallet.address);
    if (!hasRole) {
      throw new Error(red('签名人不具有DEFAULT_ADMIN_ROLE权限!'));
    }
  }
  override.nonce = await input({
    message: '输入nonce:',
    default: (await network.provider.getTransactionCount(network.wallet.address)).toString(),
    validate: (value = '') => value.length > 0 || 'Pass a valid value',
  });
  override.gasLimit = await contract.estimateGas[func](...args);
  console.log('gasLimit:', green(override.gasLimit.toString()));
  let receipt = await contract[func](...args, override);
  await receipt.wait();
  console.log(`${blue(func)} tx:`, yellow(receipt.hash));
}

export async function deployContractV2(
  ethers: HardhatEthersHelpers,
  network: Network,
  contract: string,
  args: any[],
  override: PayableOverrides = {}
): Promise<Contract> {
  override.nonce = await input({
    message: '输入nonce:',
    default: (await network.provider.getTransactionCount(network.wallet.address)).toString(),
    validate: (value = '') => value.length > 0 || 'Pass a valid value',
  });

  const factory = await ethers.getContractFactory(contract, network.wallet);

  override.gasLimit = await network.wallet.estimateGas(factory.getDeployTransaction(...args));

  console.log('gasLimit:', green(override.gasLimit.toString()));
  const deploy = await factory.deploy(...args, override);
  const deployed = await deploy.deployed();

  console.log(`${contract} deployed:`, yellow(deployed.address));
  return deployed;
}

export async function getContractV2(ethers: HardhatEthersHelpers, rpc: string, contract: string, address: string) {
  const provider = new providers.JsonRpcProvider(rpc);
  const wallet = new Wallet(defaultPrivateKey, provider);
  return await ethers.getContractAt(contract, address, wallet);
}

export function getConfig(netConfigName: string): any {
  const config_path = `./deployments/${netConfigName}/`;
  const sample_path = `./scripts/config_sample.json`;
  const filename = 'config.json';
  const fullpath = pathLib.join(__dirname, '..', config_path, filename);
  if (!existsSync(fullpath)) {
    mkdirSync(config_path, { recursive: true });
    writeFileSync(fullpath, JSON.stringify(JSON.parse(readFileSync(sample_path).toString())));
  }
  return JSON.parse(readFileSync(fullpath).toString());
}

export function writeConfig(netConfigName: string, config: any) {
  const config_path = `./deployments/${netConfigName}/`;
  const filename = 'config.json';
  const fullpath = pathLib.join(__dirname, '..', config_path, filename);
  writeFileSync(fullpath, JSON.stringify(config, null, 2));
}

export type Config = {
  name: string;
  contract: string;
  address: string;
  implementation: string;
  constructorName: string[];
  args: string[];
};

export async function deployOrInput(
  ethers: HardhatEthersHelpers,
  network: Network,
  override: PayableOverrides,
  config: Config,
  implementation: boolean = false
): Promise<Config> {
  let name = config.name || config.contract;
  name = implementation ? green(name) + '的' + green('Implementation') : green(name);
  let address: string;
  address = implementation ? config.implementation : config.address;
  let choices = [
    { name: '部署合约', value: 'deploy' },
    { name: '输入新的合约地址', value: 'input' },
  ];
  if (address) {
    choices.unshift({ name: `确认现有配置 ${address}`, value: 'confirm' });
  }
  const answer = await select({
    message: `选择${name}合约:`,
    choices,
  });

  if (answer == 'confirm') {
    return config;
  } else if (answer == 'deploy') {
    let constructorName = config.constructorName || [];
    let args = config.args || [];
    if (!implementation) {
      if (constructorName.length > 0) {
        args = await getArgs(network, constructorName, args);
        config.args = args;
      }
    }
    address = (await deployContractV2(ethers, network, config.contract, implementation ? [] : args, override)).address;
  } else {
    address = await input({
      message: `输入${name}合约地址:`,
      default: implementation ? config.implementation : config.address,
      validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value',
    });
  }
  if (implementation) {
    config.implementation = address;
  } else {
    config.address = address;
  }
  return config;
}

async function getArgs(network: Network, constructorName: string[], args: string[]) {
  for (let i = 0; i < constructorName.length; i++) {
    args[i] = await input({
      message: `输入${green(constructorName[i])}:`,
      default: await getDefaultValue(network, args[i], constructorName[i]),
      validate: (value = '') => value.length > 0 || 'Pass a valid value',
    });
  }
  return args;
}

async function getDefaultValue(network: Network, defaultValue: string, constructorName: string) {
  const config = getConfig(network.netConfig.name);
  if (config[constructorName]) {
    return config[constructorName].address;
  }
  if (constructorName == 'owner' || constructorName == 'admin') {
    return network.wallet.address;
  }
  if (constructorName == 'interestRateModel') {
    let choices = [];
    for (let i = 0; i < config.InterestRateModel.length; i++) {
      choices.push({
        name: `${green(config.InterestRateModel[i].name)} - ${yellow(config.InterestRateModel[i].address)}${
          config.InterestRateModel[i].address == defaultValue ? red('(默认)') : ''
        }`,
        value: i,
      });
    }
    let interestRateModelIndex = await select({
      message: '选择InterestRateModel',
      choices: choices,
    });
    return config.InterestRateModel[interestRateModelIndex].address;
  }
  if (constructorName == 'cTokens') {
    return getCTokens(network);
  }
  if (defaultValue) {
    return defaultValue;
  }
  return '';
}

export function getCTokens(network: Network) {
  let cTokens: string[] = [];

  const config = getConfig(network.netConfig.name);
  for (let i = 0; i < config.CErc20.proxys.length; i++) {
    cTokens.push(config.CErc20.proxys[i].address);
  }
  for (let i = 0; i < config.suErc20.proxys.length; i++) {
    cTokens.push(config.suErc20.proxys[i].address);
  }
  if (config.CEther) {
    cTokens.push(config.CEther.address);
  }
  return cTokens;
}

export async function deployProxyOrInput(
  ethers: HardhatEthersHelpers,
  network: Network,
  override: PayableOverrides,
  config: Config,
  proxyAdmin: string,
  implementation: string = ''
): Promise<Config> {
  const name = config.name || config.contract;
  implementation = utils.isAddress(implementation) ? implementation : config.implementation;

  const choices = [
    { name: '更新合约', value: 'update' },
    { name: '部署合约', value: 'deploy' },
    { name: '输入合约地址', value: 'input' },
  ];
  if (config.address) {
    choices.unshift({ name: `确认现有配置 ${config.address}`, value: 'confirm' });
  }
  const proxy_answer = await select({
    message: `选择${green(name)} 的${green('Proxy')}合约:`,
    choices,
  });

  if (proxy_answer == 'confirm') {
    return config;
  } else if (proxy_answer == 'deploy') {
    let constructorName = config.constructorName || [];
    let args = config.args || [];
    if (constructorName.length > 0) {
      args = await getArgs(network, constructorName, args);
      config.args = args;
    }
    const factory = await ethers.getContractFactory(config.contract);
    const data = factory.interface.encodeFunctionData('initialize', args);
    config.address = (
      await deployContractV2(ethers, network, 'SumerProxy', [implementation, proxyAdmin, data], override)
    ).address;
  } else if (proxy_answer == 'update') {
    const proxyAdminContract = await ethers.getContractAt('SumerProxyAdmin', proxyAdmin, network.wallet);
    await sendTransaction(
      network,
      proxyAdminContract,
      'upgrade(address,address)',
      [config.address, implementation],
      override
    );
  } else {
    config.address = await input({
      message: `输入${green(name)}合约地址:`,
      default: config.address,
      validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value',
    });
  }
  return config;
}

export async function interestRateModel_select(): Promise<string> {
  let interestRateModel_choice: any[] = [
    {
      name: '下一步',
      value: 'exit',
    },
  ];
  for (let i = 0; i < InterestRateModel_template.length; i++) {
    interestRateModel_choice.push({
      name: InterestRateModel_template[i].name,
      value: i,
    });
  }
  return await select({
    message: `部署新的${green('InterestRateModel')}合约?:`,
    choices: interestRateModel_choice,
  });
}

export async function cTokenSetting(
  ethers: HardhatEthersHelpers,
  comptroller: Comptroller,
  oracle: FeedPriceOracle,
  network: Network,
  cTokenConfig: any,
  isSuToken: boolean = false
) {
  // supportMarket
  let market = await comptroller.markets(cTokenConfig.address, network.override);
  if (!market.isListed) {
    console.log('设置Comptroller的supportMarket' + yellow(cTokenConfig.address));
    await sendTransaction(
      network,
      comptroller,
      '_supportMarket(address,uint8)',
      [cTokenConfig.address, cTokenConfig.settings.groupId],
      network.override,
      DEFAULT_ADMIN_ROLE
    );
  }
  let cToken = (await ethers.getContractAt('CToken', cTokenConfig.address, network.wallet)) as CToken;
  // setReserveFactor
  let reserveFactorMantissa = await cToken.reserveFactorMantissa();
  if (!reserveFactorMantissa.eq(BN(cTokenConfig.settings.reserveFactorMantissa))) {
    console.log('设置cToken的reserveFactorMantissa' + yellow(cTokenConfig.settings.reserveFactorMantissa));
    await sendTransaction(
      network,
      cToken,
      '_setReserveFactor(uint256)',
      [cTokenConfig.settings.reserveFactorMantissa],
      network.override
    );
  }
  if (isSuToken) {
    // grantRole
    let underlying = (await ethers.getContractAt(
      'ERC20MinterBurnerPauser',
      cTokenConfig.args[0],
      network.wallet
    )) as ERC20MinterBurnerPauser;
    let hasRole = await underlying.hasRole(MINTER_ROLE, cTokenConfig.address);
    if (!hasRole) {
      console.log('设置Underlying' + yellow(cTokenConfig.args[0]) + '的MINTER_ROLE');
      await sendTransaction(
        network,
        underlying,
        'grantRole(bytes32,address)',
        [MINTER_ROLE, cTokenConfig.address],
        network.override,
        DEFAULT_ADMIN_ROLE
      );
    }
    // changeCtoken
    let suErc20 = (await ethers.getContractAt('suErc20', cTokenConfig.address, network.wallet)) as SuErc20;
    let isCToken = await suErc20.isCToken();
    if (isCToken) {
      console.log('设置suErc20' + yellow(cTokenConfig.address) + 'changeCtoken');
      await sendTransaction(network, suErc20, 'changeCtoken()', [], network.override);
    }
  }
  // oracle
  let feeds = await oracle.feeds(cTokenConfig.address, network.override);
  if (feeds.source == 0) {
    cTokenConfig.settings.oracle.args[0] = cTokenConfig.address;
    console.log('设置cToken' + yellow(cTokenConfig.address) + '的Oracle');
    await sendTransaction(
      network,
      oracle,
      cTokenConfig.settings.oracle.func,
      cTokenConfig.settings.oracle.args,
      network.override
    );
  }
  let decimals = await cToken.decimals();
  cTokenConfig.settings.borrowCap = utils
    .parseUnits(
      await input({
        message: `输入${green(cTokenConfig.name)}的Borrow Cap:`,
        default: utils.formatUnits(cTokenConfig.settings.borrowCap, decimals).toString(),
      }),
      decimals
    )
    .toString();
  cTokenConfig.settings.maxSupply = utils
    .parseUnits(
      await input({
        message: `输入${green(cTokenConfig.name)}的Max Supply:`,
        default: utils.formatUnits(cTokenConfig.settings.maxSupply, decimals).toString(),
      }),
      decimals
    )
    .toString();
  return cTokenConfig;
}

export async function selectContract() {
  let choices = [];
  for (let i = 0; i < contracts_config.length; i++) {
    choices.push({
      name: contracts_config[i].contract,
      value: contracts_config[i],
    });
  }
  const result = await select({
    message: '选择操作合约:',
    choices: choices,
  });

  return result;
}

export async function selectFunc(fragment: ReadonlyArray<Fragment>) {
  let choices = [];
  for (let i = 0; i < fragment.length; i++) {
    if (fragment[i].type == 'function') {
      choices.push({
        name: fragment[i].name,
        value: fragment[i].name,
      });
    }
  }
  const result = await select({
    message: '选择操作函数:',
    choices: choices,
  });

  return result;
}

export async function inputArgs(func: FunctionFragment) {
  let values = [];
  let inputs = func.inputs;
  for (let i = 0; i < inputs.length; i++) {
    let value = await input({
      message: inputs[i].name,
      validate: (value = '') => value.length > 0 || 'Pass a valid value',
    });
    values.push(value);
  }

  return values;
}
