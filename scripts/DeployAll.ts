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
  BN,
  MINTER_ROLE,
  Network,
  yellow
} from './helper';
import {
  AccountLiquidity,
  CToken,
  CompLogic,
  Comptroller,
  ERC20MinterBurnerPauser,
  FeedPriceOracle
} from '../typechain';

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

  for (let i = 0; i < config.InterestRateModel.length; i++) {
    config.InterestRateModel[i] = await deployOrInput(ethers, network, override, config.InterestRateModel[i]);
    writeConfig(netConfig.name, config);
  }

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
    let settings = config.Comptroller.settings[i];
    await sendTransaction(network, comptroller, settings.func, settings.args, override);
  }

  if (config.CEther) {
    config.CEther = await deployOrInput(ethers, network, override, config.CEther, true);
    writeConfig(netConfig.name, config);

    config.CEther = await deployProxyOrInput(ethers, network, override, config.CEther, config.ProxyAdmin.address);
    writeConfig(netConfig.name, config);
    await cTokenSetting(comptroller, oracle, network, config.CEther);
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
    await cTokenSetting(comptroller, oracle, network, cTokenConfig);
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
    await cTokenSetting(comptroller, oracle, network, cTokenConfig, true);
  }

  config.Timelock = await deployOrInput(ethers, network, override, config.Timelock);
  writeConfig(netConfig.name, config);

  console.log('设置Comptroller的Timelock合约地址');
  await sendTransaction(
    network,
    comptroller,
    'setTimelock(address)',
    [config.Comptroller.address],
    override,
    DEFAULT_ADMIN_ROLE
  );
};

main();
async function cTokenSetting(
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
  if (!isSuToken) {
    // setReserveFactor
    let cToken = (await ethers.getContractAt('CToken', cTokenConfig.address, network.wallet)) as CToken;
    let reserveFactorMantissa = await cToken.reserveFactorMantissa();
    if (!reserveFactorMantissa.eq(BN(cTokenConfig.settings.reserveFactorMantissa))) {
      console.log('设置Comptroller的reserveFactorMantissa' + yellow(cTokenConfig.settings.reserveFactorMantissa));
      await sendTransaction(
        network,
        cToken,
        '_setReserveFactor(uint256)',
        [cTokenConfig.settings.reserveFactorMantissa],
        network.override
      );
    }
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
    let suErc20 = (await ethers.getContractAt('suErc20', cTokenConfig.address, network.wallet)) as CToken;
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
}
