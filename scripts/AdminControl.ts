import { ethers } from 'hardhat';
import { network_config, setNetwork, selectContract, sendTransaction } from './helper';
import { input, select } from '@inquirer/prompts';
import { utils } from 'ethers';

async function main() {
  const network = await setNetwork(network_config);
  let { wallet, override } = network;

  const contract_config = await selectContract();
  const contract_name = contract_config.contract;

  const address = await input({
    message: '输入合约地址:',
    validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
  });

  const contract = await ethers.getContractAt(contract_name, address, wallet);

  let func_choices = [];
  for (let i = 0; i < contract_config.adminControl.length; i++) {
    func_choices.push({
      name: contract_config.adminControl[i].func,
      value: i
    });
  }
  const funcIndex = await select({
    message: '选择操作函数:',
    choices: func_choices
  });

  const func = contract_config.adminControl[funcIndex];

  let args = [];
  console.log('输入参数:');
  for (let i = 0; i < func.argNames.length; i++) {
    args.push(
      await input({
        message: func.argNames[i]
      })
    );
  }
  await sendTransaction(network, contract, func.sig, args);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
