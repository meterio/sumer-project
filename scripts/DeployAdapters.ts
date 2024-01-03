import { ethers } from 'hardhat';
import { getAdapterConfig, writeAdapterConfig, network_config, setNetwork, deployOrInput } from './helper';
const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getAdapterConfig(netConfig.name);

  // adaptor
  for (const key in config) {
    config[key] = await deployOrInput(ethers, network, override, config[key], false);
  }
  writeAdapterConfig(netConfig.name, config);
};

main();
