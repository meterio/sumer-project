import { input } from '@inquirer/prompts';
import { ethers } from 'hardhat';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import * as pathLib from 'path';
import { network_json, network_config, setNetwork, deployContractV2 } from './helper';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, networkIndex, override } = network;

  const config_path = `./deployments/${netConfig.name}/`;
  const sample_path = `./scripts/config_sample.json`;
  const filename = 'config.json';
  const fullpath = pathLib.join(__dirname, '..', config_path, filename);
  if (!existsSync(fullpath)) {
    mkdirSync(config_path, { recursive: true });
    writeFileSync(fullpath, JSON.stringify(JSON.parse(readFileSync(sample_path).toString())));
  }

  let json = JSON.parse(readFileSync(fullpath).toString());
};

main();
