import { ethers } from 'hardhat';
import {
  getAdapterConfig,
  writeAdapterConfig,
  network_config,
  setNetwork,
  deployOrInput,
  deployProxyOrInput,
} from './helper';
const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getAdapterConfig(netConfig.name);

  // adaptor
  if (config.ChainlinkFeedAdaptor_ETHToUSD) {
    config.ChainlinkFeedAdaptor_ETHToUSD = await deployOrInput(
      ethers,
      network,
      override,
      config.ChainlinkFeedAdaptor_ETHToUSD,
      true
    );
    writeAdapterConfig(netConfig.name, config);

    for (let i = 0; i < config.ChainlinkFeedAdaptor_ETHToUSD.proxys.length; i++) {
      config.ChainlinkFeedAdaptor_ETHToUSD.proxys[i] = await deployProxyOrInput(
        ethers,
        network,
        override,
        config.ChainlinkFeedAdaptor_ETHToUSD.proxys[i],
        config.ProxyAdmin.address,
        config.ChainlinkFeedAdaptor_ETHToUSD.implementation
      );
      writeAdapterConfig(netConfig.name, config);
    }
  }
};

main();
