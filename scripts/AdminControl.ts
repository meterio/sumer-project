import { ethers } from 'hardhat';
import {
  network_config,
  setNetwork,
  selectContract,
  sendTransaction,
  green,
  DEFAULT_ADMIN_ROLE,
  MINTER_ROLE,
} from './helper';
import { input, select } from '@inquirer/prompts';
import { AbiCoder, isAddress } from 'ethers';

async function main() {
  const coder = new AbiCoder();
  console.log('DEFAULT_ADMIN_ROLE', green(DEFAULT_ADMIN_ROLE.toString()));
  console.log('MINTER_ROLE', green(MINTER_ROLE.toString()));
  console.log('PAUSER_ROLE', green('0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a'));
  console.log('CAPPER_ROLE', green('0x585dbb3f830c4325b9ffb1ad42c16ada76c518747b0fb7ee297b261fc6a0f29f'));
  console.log('EMERGENCY_ADMIN', green('0x5c91514091af31f62f596a314af7d5be40146b2f2355969392f055e12e0982fb'));
  console.log('COMP_LOGIC', green('0x750fc7a006f78e0009a09aa4bf97546d802b8f6c9d27e623dd7cc78951321eaf'));

  const network = await setNetwork(network_config);
  let { wallet, override } = network;

  const contract_config = await selectContract();
  const contract_name = contract_config.contract;

  const address = await input({
    message: '输入合约地址:',
    validate: (value = '') => isAddress(value) || 'Pass a valid address value',
  });

  const contract = await ethers.getContractAt(contract_name, address, wallet);

  let func_choices = [];
  for (let i = 0; i < contract_config.adminControl.length; i++) {
    func_choices.push({
      name: contract_config.adminControl[i].func,
      value: i,
    });
  }
  const funcIndex = await select({
    message: '选择操作函数:',
    choices: func_choices,
  });

  const func = contract_config.adminControl[funcIndex];

  let args = [];
  console.log('输入参数:');
  for (let i = 0; i < func.argNames.length; i++) {
    args.push(
      await input({
        message: func.argNames[i],
      })
    );
  }
  await sendTransaction(network, contract, func.sig, args);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
