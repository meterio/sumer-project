import { ethers } from 'hardhat';
import { getConfig, network_config, setNetwork, Operations_config, sendTransaction } from './helper';
import { CErc20 } from '../typechain';
import { select, input } from '@inquirer/prompts';
import { constants } from 'ethers';

const main = async () => {
  const network = await setNetwork(network_config);
  let { netConfig, wallet, override } = network;

  let config = getConfig(netConfig.name);

  let choice: any[] = [];

  for (let i = 0; i < Operations_config.length; i++) {
    choice.push({
      name: Operations_config[i].operation,
      value: i
    });
  }

  const operationIndex: number = await select({
    message: `选择操作:`,
    choices: choice
  });

  const operation = Operations_config[operationIndex];

  const contract_address: string = await select({
    message: `选择操作合约:`,
    choices: token_choice(config, operation.contracts[0] == 'underlyings')
  });

  let args: any[] = [];
  for (let i = 0; i < operation.args.length; i++) {
    if (operation.args[i] == 'CTokens') {
      let arg_select = await select({
        message: `选择参数中的合约:`,
        choices: token_choice(config, false)
      });
      args.push(arg_select);
    }
    if (operation.args[i] == 'MaxUint256') {
      args.push(constants.MaxUint256);
    }
    if (operation.args[i] == 'uint256') {
      let arg_input = await input({
        message: '输入数量',
        validate: (value = '') => value.length > 0 || 'Pass a valid value'
      });
      args.push(arg_input);
    }
  }
  const contract = (await ethers.getContractAt('CErc20', contract_address, wallet)) as CErc20;
  await sendTransaction(network, contract, operation.func, args);
};

main();

function token_choice(config: any, underlying: boolean) {
  let choice: any[] = [];

  for (let i = 0; i < config.CErc20.proxys.length; i++) {
    choice.push({
      name: config.CErc20.proxys[i].name,
      value: underlying ? config.CErc20.proxys[i].args[0] : config.CErc20.proxys[i].address
    });
  }
  for (let i = 0; i < config.suErc20.proxys.length; i++) {
    choice.push({
      name: config.suErc20.proxys[i].name,
      value: underlying ? config.suErc20.proxys[i].args[0] : config.suErc20.proxys[i].address
    });
  }
  return choice;
}
