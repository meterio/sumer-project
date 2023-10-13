import { ethers } from 'hardhat';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { network_config, setNetwork, selectContract, selectFunc, inputArgs } from './helper';
import { input } from '@inquirer/prompts';
import { BigNumber, utils } from 'ethers';

async function main() {
  const network = await setNetwork(network_config);
  let { wallet, override } = network;

  const contract_name = await selectContract();

  const address = await input({
    message: '输入合约地址:',
    validate: (value = '') => utils.isAddress(value) || 'Pass a valid address value'
  });

  // const factory = await ethers.getContractAt(contract_name, address);

  // ethers.getContractFactory("CompoundLens")
  const contract = await ethers.getContractFactory(contract_name, address, wallet);

  const fragment = contract.interface.fragments;

  const func_name = await selectFunc(fragment);

  const func = contract.interface.getFunction(func_name);

  let args: any[] = [];

  if (func.inputs.length > 0) {
    console.log('输入参数:');
    args = await inputArgs(func);
  }

  const data = contract.interface.encodeFunctionData(func_name, ...args);

  let transaction: TransactionRequest = {
    to: address,
    data: data
  };

  if (func.stateMutability == 'view' || func.stateMutability == 'pure') {
    let result = await wallet.call(transaction);
    console.log(contract.interface.decodeFunctionResult(func, result));
  }

  if (func.stateMutability == 'payable') {
    transaction.value = await input({
      message: '输入Native发送数量:',
      validate: (value = '') => BigNumber.from(value).gt(0) || 'Pass a valid address value'
    });
  }

  if (func.stateMutability == 'nonpayable' || func.stateMutability == 'payable') {
    transaction.gasPrice = BigNumber.from(override.gasPrice);
    transaction.gasLimit = await wallet.estimateGas(transaction);

    transaction.nonce = await input({
      message: '输入nonce:',
      default: (await network.provider.getTransactionCount(network.wallet.address)).toString(),
      validate: (value = '') => value.length > 0 || 'Pass a valid value'
    });
    let receipt = await wallet.sendTransaction(transaction);
    let result = await receipt.wait();
    console.log(result);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
