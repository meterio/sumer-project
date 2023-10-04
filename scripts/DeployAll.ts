import { ethers } from 'hardhat';
import {
  getConfig,
  writeConfig,
  network_config,
  setNetwork,
  deployOrInput,
  deployProxyOrInput,
  sendTransaction,
  DEFAULT_ADMIN_ROLE,
  cTokenSetting,
  interestRateModel_select,
  InterestRateModel_template
} from './helper';
import { AccountLiquidity, CompLogic, Comptroller, FeedPriceOracle } from '../typechain';
import { confirm } from '@inquirer/prompts';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getConfig(netConfig.name);

  config.ProxyAdmin = await deployOrInput(ethers, network, override, config.ProxyAdmin);
  writeConfig(netConfig.name, config);

  config.Multicall2 = await deployOrInput(ethers, network, override, config.Multicall2);
  writeConfig(netConfig.name, config);

  config.Sumer = await deployOrInput(ethers, network, override, config.Sumer);
  writeConfig(netConfig.name, config);

  config.FeedPriceOracle = await deployOrInput(ethers, network, override, config.FeedPriceOracle);
  writeConfig(netConfig.name, config);

  config.CompoundLens = await deployOrInput(ethers, network, override, config.CompoundLens);
  writeConfig(netConfig.name, config);

  let interestRateModel_selected;
  let InterestRateModel = config.InterestRateModel;

  for (let i = 0; i < InterestRateModel.length; i++) {
    config.InterestRateModel[i] = await deployOrInput(ethers, network, override, InterestRateModel[i]);
    writeConfig(netConfig.name, config);
  }

  do {
    interestRateModel_selected = await interestRateModel_select();
    if (interestRateModel_selected != 'exit') {
      InterestRateModel.push(
        await deployOrInput(ethers, network, override, InterestRateModel_template[interestRateModel_selected])
      );
    }
  } while (interestRateModel_selected != 'exit');

  config.InterestRateModel = InterestRateModel;
  writeConfig(netConfig.name, config);

  config.AccountLiquidity = await deployOrInput(ethers, network, override, config.AccountLiquidity, true);
  writeConfig(netConfig.name, config);

  config.AccountLiquidity = await deployProxyOrInput(
    ethers,
    network,
    override,
    config.AccountLiquidity,
    config.ProxyAdmin.address
  );
  writeConfig(netConfig.name, config);

  config.CompLogic = await deployOrInput(ethers, network, override, config.CompLogic, true);
  writeConfig(netConfig.name, config);

  config.CompLogic = await deployProxyOrInput(ethers, network, override, config.CompLogic, config.ProxyAdmin.address);
  writeConfig(netConfig.name, config);

  config.Comptroller = await deployOrInput(ethers, network, override, config.Comptroller, true);
  writeConfig(netConfig.name, config);

  config.Comptroller = await deployProxyOrInput(
    ethers,
    network,
    override,
    config.Comptroller,
    config.ProxyAdmin.address
  );
  writeConfig(netConfig.name, config);

  const compLogic = (await ethers.getContractAt('CompLogic', config.CompLogic.address, wallet)) as CompLogic;
  const compLogic_comptroller_address = await compLogic.comptroller(override);
  if (compLogic_comptroller_address.toLocaleLowerCase() != config.Comptroller.address.toLocaleLowerCase()) {
    console.log('设置CompLogic的Comptroller合约地址');
    await sendTransaction(
      network,
      compLogic,
      'setComptroller(address)',
      [config.Comptroller.address],
      override,
      DEFAULT_ADMIN_ROLE
    );
  }

  const accountLiquidity = (await ethers.getContractAt(
    'AccountLiquidity',
    config.AccountLiquidity.address,
    wallet
  )) as AccountLiquidity;
  const accountLiquidity_comptroller_address = await accountLiquidity.comptroller(override);
  if (accountLiquidity_comptroller_address.toLocaleLowerCase() != config.Comptroller.address.toLocaleLowerCase()) {
    console.log('设置AccountLiquidity的Comptroller合约地址');
    await sendTransaction(
      network,
      accountLiquidity,
      'setComptroller(address)',
      [config.Comptroller.address],
      override,
      DEFAULT_ADMIN_ROLE
    );
  }
  const comptroller = (await ethers.getContractAt(
    'Comptroller',
    config.Comptroller.address,
    network.wallet
  )) as Comptroller;

  const oracle = (await ethers.getContractAt(
    'FeedPriceOracle',
    config.FeedPriceOracle.address,
    network.wallet
  )) as FeedPriceOracle;

  for (let i = 0; i < config.Comptroller.settings.length; i++) {
    let setting = config.Comptroller.settings[i];
    console.log('设置Comptroller合约');
    console.log(setting.func);
    console.log(JSON.stringify(setting.args));
    let confirm_setting = await confirm({
      message: '是否配置?'
    });
    if (confirm_setting) {
      await sendTransaction(network, comptroller, setting.func, setting.args, override);
    }
  }

  if (config.CEther) {
    config.CEther = await deployOrInput(ethers, network, override, config.CEther, true);
    writeConfig(netConfig.name, config);

    config.CEther = await deployProxyOrInput(ethers, network, override, config.CEther, config.ProxyAdmin.address);
    writeConfig(netConfig.name, config);
    await cTokenSetting(ethers, comptroller, oracle, network, config.CEther);
  }
  config.CErc20 = await deployOrInput(ethers, network, override, config.CErc20, true);
  writeConfig(netConfig.name, config);

  for (let i = 0; i < config.CErc20.proxys.length; i++) {
    config.CErc20.proxys[i] = await deployProxyOrInput(
      ethers,
      network,
      override,
      config.CErc20.proxys[i],
      config.ProxyAdmin.address,
      config.CErc20.implementation
    );
    writeConfig(netConfig.name, config);
    let cTokenConfig = config.CErc20.proxys[i];
    await cTokenSetting(ethers, comptroller, oracle, network, cTokenConfig);
  }

  config.suErc20 = await deployOrInput(ethers, network, override, config.suErc20, true);
  writeConfig(netConfig.name, config);

  for (let i = 0; i < config.suErc20.proxys.length; i++) {
    config.suErc20.proxys[i] = await deployProxyOrInput(
      ethers,
      network,
      override,
      config.suErc20.proxys[i],
      config.ProxyAdmin.address,
      config.suErc20.implementation
    );
    writeConfig(netConfig.name, config);
    let cTokenConfig = config.suErc20.proxys[i];
    await cTokenSetting(ethers, comptroller, oracle, network, cTokenConfig, true);
  }

  config.Timelock = await deployOrInput(ethers, network, override, config.Timelock);
  writeConfig(netConfig.name, config);

  console.log('设置Comptroller的Timelock合约地址');
  await sendTransaction(
    network,
    comptroller,
    'setTimelock(address)',
    [config.Timelock.address],
    override,
    DEFAULT_ADMIN_ROLE
  );
};

main();