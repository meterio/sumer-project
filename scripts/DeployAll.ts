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
} from './helper';
import { AccountLiquidity, CErc20, CompLogic, Comptroller, FeedPriceOracle } from '../typechain';
import { confirm } from '@inquirer/prompts';
import { BigNumberish } from 'ethers';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getConfig(netConfig.name);
  // ProxyAdmin
  config.ProxyAdmin = await deployOrInput(ethers, network, override, config.ProxyAdmin);
  writeConfig(netConfig.name, config);

  // Multicall2
  config.Multicall2 = await deployOrInput(ethers, network, override, config.Multicall2);
  writeConfig(netConfig.name, config);

  // Sumer
  config.Sumer = await deployOrInput(ethers, network, override, config.Sumer);
  writeConfig(netConfig.name, config);

  // FeedPriceOracle
  let old_feedPriceOracle = config.FeedPriceOracle.address;
  config.FeedPriceOracle = await deployOrInput(ethers, network, override, config.FeedPriceOracle);
  writeConfig(netConfig.name, config);
  const oracle = (await ethers.getContractAt(
    'FeedPriceOracle',
    config.FeedPriceOracle.address,
    network.wallet
  )) as FeedPriceOracle;

  // set oracle on comptroller
  if (config.Comptroller.address != '' && old_feedPriceOracle != config.FeedPriceOracle.address) {
    let comptroller = (await ethers.getContractAt('Comptroller', config.Comptroller.address, wallet)) as Comptroller;
    const oracleOnChain = await comptroller.oracle();

    if (oracleOnChain.toLowerCase() != config.FeedPriceOracle.address.toLowerCase()) {
      console.log(`更新Comptroller.oracle: ${oracleOnChain} -> ${config.FeedPriceOracle.address}`);
      await sendTransaction(
        network,
        comptroller,
        '_setPriceOracle(address)',
        [config.FeedPriceOracle.address],
        override
      );
    }
  }

  // CompoundLens
  config.CompoundLens = await deployOrInput(ethers, network, override, config.CompoundLens);
  writeConfig(netConfig.name, config);

  // InterestRateModel
  let interestRateModel_selected;

  let InterestRateModel = config.InterestRateModel;
  for (let i = 0; i < InterestRateModel.length; i++) {
    config.InterestRateModel[i] = await deployOrInput(ethers, network, override, InterestRateModel[i]);
    writeConfig(netConfig.name, config);
  }

  do {
    config = getConfig(netConfig.name);
    interestRateModel_selected = await interestRateModel_select();
    if (interestRateModel_selected != 'exit') {
      config.InterestRateModel.push(
        await deployOrInput(ethers, network, override, InterestRateModel_template[interestRateModel_selected])
      );
      writeConfig(netConfig.name, config);
    }
  } while (interestRateModel_selected != 'exit');

  // AccountLiquidity
  let old_accountLiquidity = config.AccountLiquidity.address;
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

  // set accountLiquidity on Comptroller
  if (config.Comptroller.address != '' && old_accountLiquidity != config.AccountLiquidity.address) {
    let comptroller = (await ethers.getContractAt('Comptroller', config.Comptroller.address, wallet)) as Comptroller;
    const alOnChain = await comptroller.accountLiquidity();
    if (alOnChain.toLowerCase() != config.AccountLiquidity.address.toLowerCase()) {
      console.log(`更新Comptroller.accountLiquidity: ${alOnChain} -> ${config.AccountLiquidity.address}`);
      await sendTransaction(
        network,
        comptroller,
        'setAccountLiquidity(address)',
        [config.AccountLiquidity.address],
        override
      );
    }
  }

  // CompLogic
  let old_compLogic = config.CompLogic.address;
  config.CompLogic = await deployOrInput(ethers, network, override, config.CompLogic, true);
  writeConfig(netConfig.name, config);

  config.CompLogic = await deployProxyOrInput(ethers, network, override, config.CompLogic, config.ProxyAdmin.address);
  writeConfig(netConfig.name, config);

  // set compLogic on Comptroller
  if (config.Comptroller.address != '' && old_compLogic != config.CompLogic.address) {
    let comptroller = (await ethers.getContractAt('Comptroller', config.Comptroller.address, wallet)) as Comptroller;
    const clOnChain = await comptroller.compLogic();
    if (clOnChain.toLowerCase() != config.Comptroller.address.toLowerCase()) {
      console.log(`更新Comptroller.compLogic：${clOnChain} -> ${config.Comptroller.address}`);
      await sendTransaction(network, comptroller, 'setCompLogic(address)', [config.CompLogic.address], override);
    }
  }

  // Comptroller
  let old_comptroller = config.Comptroller.address;
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

  // set comptroller on cTokens
  if (old_comptroller != config.Comptroller.address) {
    let isupdate = await confirm({
      message: '是否更新cToken的Comptroller？',
    });
    if (isupdate) {
      console.log('更新cToken的Comptroller：');
      let tokens = getCTokens(network);
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] != '') {
          let cToken = (await ethers.getContractAt('CErc20', tokens[i], wallet)) as CErc20;
          const comptrollerOnChain = await cToken.comptroller();
          if (comptrollerOnChain.toLowerCase() != config.Comptroller.address.toLowerCase()) {
            const symbol = await cToken.symbol();
            console.log(`更新：${symbol}.comptroller: ${comptrollerOnChain} -> ${config.Comptroller.address}`);
            await sendTransaction(network, cToken, '_setComptroller(address)', [config.Comptroller.address], override);
          }
        }
      }
    }
  }

  // set comptroller on CompLogic
  const compLogic = (await ethers.getContractAt('CompLogic', config.CompLogic.address, wallet)) as CompLogic;
  const compLogic_comptroller_address = await compLogic.comptroller();
  if (compLogic_comptroller_address.toLowerCase() != config.Comptroller.address.toLowerCase()) {
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

  // set comptroller on AccountLiquidity
  const accountLiquidity = (await ethers.getContractAt(
    'AccountLiquidity',
    config.AccountLiquidity.address,
    wallet
  )) as AccountLiquidity;
  const accountLiquidity_comptroller_address = await accountLiquidity.comptroller();
  if (accountLiquidity_comptroller_address.toLowerCase() != config.Comptroller.address.toLowerCase()) {
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

  // comptroller settings
  const comptroller = (await ethers.getContractAt(
    'Comptroller',
    config.Comptroller.address,
    network.wallet
  )) as Comptroller;

  for (let i = 0; i < config.Comptroller.settings.length; i++) {
    let setting = config.Comptroller.settings[i];
    console.log('设置Comptroller合约');
    console.log(setting.func);
    console.log(JSON.stringify(setting.args));
    let confirm_setting = await confirm({
      message: '是否配置?',
      default: false,
    });
    if (confirm_setting) {
      await sendTransaction(network, comptroller, setting.func, setting.args, override);
    }
  }

  // deploy / config CEther
  if (config.CEther) {
    config.CEther = await deployOrInput(ethers, network, override, config.CEther, true);
    writeConfig(netConfig.name, config);

    config.CEther = await deployProxyOrInput(ethers, network, override, config.CEther, config.ProxyAdmin.address);
    writeConfig(netConfig.name, config);
    await cTokenSetting(ethers, comptroller, oracle, network, config.CEther);
  }

  // deploy CErc20 Impl
  config.CErc20 = await deployOrInput(ethers, network, override, config.CErc20, true);
  writeConfig(netConfig.name, config);

  // deploy / config CErc20 proxy
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
    config.CErc20.proxys[i] = await cTokenSetting(ethers, comptroller, oracle, network, config.CErc20.proxys[i]);
    writeConfig(netConfig.name, config);
  }

  // deploy suErc20 Impl
  config.suErc20 = await deployOrInput(ethers, network, override, config.suErc20, true);
  writeConfig(netConfig.name, config);

  // deploy / config suErc20 proxy
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
    config.suErc20.proxys[i] = await cTokenSetting(
      ethers,
      comptroller,
      oracle,
      network,
      config.suErc20.proxys[i],
      true
    );
    writeConfig(netConfig.name, config);
  }

  config.Timelock = await deployOrInput(ethers, network, override, config.Timelock);
  writeConfig(netConfig.name, config);

  const tlOnChain = await comptroller.timelock();
  if (tlOnChain.toLowerCase() != config.Timelock.toLowerCase()) {
    console.log(`设置Comptroller.timelock：${tlOnChain} -> ${config.Timelock}`);
    await sendTransaction(
      network,
      comptroller,
      'setTimelock(address)',
      [config.Timelock.address],
      override,
      DEFAULT_ADMIN_ROLE
    );
  }

  let cTokens: string[] = [];
  let borrowCaps: BigNumberish[] = [];
  let maxSupplys: BigNumberish[] = [];
  for (let i = 0; i < config.CErc20.proxys.length; i++) {
    let proxy = config.CErc20.proxys[i];
    cTokens.push(proxy.address);
    borrowCaps.push(proxy.settings.borrowCap);
    maxSupplys.push(proxy.settings.maxSupply);
    for (let j = 0; j < config.InterestRateModel.length; j++) {
      if (proxy.args[2] == config.InterestRateModel[j].address) {
        config.InterestRateModel[j].tokens.push(proxy.address);
      }
    }
  }
  for (let i = 0; i < config.suErc20.proxys.length; i++) {
    let proxy = config.suErc20.proxys[i];
    cTokens.push(proxy.address);
    borrowCaps.push(proxy.settings.borrowCap);
    maxSupplys.push(proxy.settings.maxSupply);
    for (let j = 0; j < config.InterestRateModel.length; j++) {
      if (proxy.args[2] == config.InterestRateModel[j].address) {
        config.InterestRateModel[j].tokens.push(proxy.address);
      }
    }
  }
  if (config.CEther) {
    cTokens.push(config.CEther.address);
    borrowCaps.push(config.CEther.settings.borrowCap);
    maxSupplys.push(config.CEther.settings.maxSupply);
    for (let j = 0; j < config.InterestRateModel.length; j++) {
      if (config.CEther.args[1] == config.InterestRateModel[j].address) {
        config.InterestRateModel[j].tokens.push(config.CEther.address);
      }
    }
  }

  // console.log('设置CToken的BorrowCap');
  // await sendTransaction(
  //   network,
  //   comptroller,
  //   '_setMarketBorrowCaps(address[],uint256[])',
  //   [cTokens, borrowCaps],
  //   override,
  //   DEFAULT_ADMIN_ROLE
  // );
  // console.log('设置CToken的MaxSupply');

  // await sendTransaction(
  //   network,
  //   comptroller,
  //   '_setMaxSupply(address[],uint256[])',
  //   [cTokens, maxSupplys],
  //   override,
  //   DEFAULT_ADMIN_ROLE
  // );
  process.exit(1);
};

main();
