import * as hre from 'hardhat';
import * as fs from 'fs';

import { JsonRpcProvider, isAddress, isBytesLike, Interface, Wallet } from 'ethers';
import { getConfig } from './helper';
import { password, input, confirm } from '@inquirer/prompts';
import { green } from 'colors';
import * as path from 'path';
import { exit } from 'process';

const _interface = new Interface([
  {
    inputs: [{ internalType: 'address payable', name: 'newPendingAdmin', type: 'address' }],
    name: '_setPendingAdmin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]);

const main = async () => {
  const config = getConfig(hre.network.name);
  const adminUpdateListFile = path.join(__dirname, 'admin', `${hre.network.name}-admin-update-list.json`);
  const accessUpdateListFile = path.join(__dirname, 'admin', `${hre.network.name}-access-update-list.json`);
  const ownerUpdateListFile = path.join(__dirname, 'admin', `${hre.network.name}-owner-update-list.json`);
  if (
    !fs.existsSync(adminUpdateListFile) ||
    !fs.existsSync(accessUpdateListFile) ||
    !fs.existsSync(ownerUpdateListFile)
  ) {
    console.log('无法读取配置文件');
    exit(1);
  }

  const adminUpdateList = JSON.parse(fs.readFileSync(adminUpdateListFile).toString());
  const accessUpdateList = JSON.parse(fs.readFileSync(accessUpdateListFile).toString());
  const ownerUpdateList = JSON.parse(fs.readFileSync(ownerUpdateListFile).toString());

  const privateKey = await password({
    message: `输入网络${green(hre.network.name)}的Private Key:`,
    validate: (value = '') => isBytesLike(value) || 'Pass a valid Private Key value',
    mask: '*',
  });
  const newAdmin = await input({
    message: '输入新Admin地址:',
    validate: (value = '') => isAddress(value) || 'Pass a valid address value',
  });

  const provider = new JsonRpcProvider(hre.network.config.url);
  const wallet = new Wallet(privateKey, provider);

  console.log('-- 设置 Admin Update List');
  for (const c of adminUpdateList) {
    const confirmed = await confirm({
      message: `设置 ${c.name} ${c.address} 的admin为 ${newAdmin} (_setPendingAdmin)`,
    });
    if (!confirmed) {
      continue;
    }
    const nonce = await input({
      message: '输入nonce:',
      default: (await provider.getTransactionCount(wallet.address)).toString(),
      validate: (value) => !isNaN(Number(value)) || 'Pass a valid value',
    });
    try {
      const tx = await wallet.sendTransaction({
        to: c.address,
        value: 0,
        data: _interface.encodeFunctionData('_setPendingAdmin', [newAdmin]),
        nonce: Number(nonce),
      });
      console.log(`tx sent: ${tx.hash}`);
    } catch (e) {
      console.log(`发生错误: ${e}`);
    }
  }
  console.log('-- 完成设置 Access Update List');

  console.log('-- 设置 Admin Update List');
  for (const c of accessUpdateList) {
    const confirmed = await confirm({ message: `设置${c.name} ${c.address} 的admin为 ${newAdmin} (grantRole)` });
    if (!confirmed) {
      continue;
    }

    const nonce = await input({
      message: '输入nonce:',
      default: (await provider.getTransactionCount(wallet.address)).toString(),
      validate: (value) => !isNaN(Number(value)) || 'Pass a valid value',
    });
    try {
      const tx = await wallet.sendTransaction({
        to: c.address,
        value: 0,
        data: _interface.encodeFunctionData('grantRole', [
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          newAdmin,
        ]),
        nonce: Number(nonce),
      });
      console.log(`tx sent: ${tx.hash}`);
    } catch (e) {
      console.log(`发生错误: ${e}`);
    }
  }
  console.log('-- 完成设置 Access Update List');

  console.log('-- 设置 Owner Update List');
  for (const c of ownerUpdateList) {
    const confirmed = confirm({ message: `设置 ${c.address} 的owner为 ${newAdmin} (transferOwnership)` });
    if (!confirmed) {
      continue;
    }
    const nonce = await input({
      message: '输入nonce:',
      default: (await provider.getTransactionCount(wallet.address)).toString(),
      validate: (value) => !isNaN(Number(value)) || 'Pass a valid value',
    });
    try {
      const tx = await wallet.sendTransaction({
        to: c.address,
        value: 0,
        data: _interface.encodeFunctionData('transferOwnership', [newAdmin]),
        nonce: Number(nonce),
      });
      console.log(`tx sent: ${tx.hash}`);
    } catch (e) {
      console.log(`发生错误: ${e}`);
    }
  }
  console.log('-- 完成设置 Owner Update List');
  exit(0);
};

main();
