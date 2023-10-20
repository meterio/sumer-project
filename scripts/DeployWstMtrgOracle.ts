import { ethers } from 'hardhat';
import { meter_config, setNetwork, deployContractV2 } from './helper';

const main = async () => {
  const network = await setNetwork(meter_config);
  let { netConfig } = network;

  await deployContractV2(ethers, network, 'wstMTRGOracle', [
    netConfig.wstMTRG,
    netConfig.mtrgFeed,
    netConfig.MTRGFeedId
  ]);
};

main();
