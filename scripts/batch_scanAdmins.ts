import * as hre from 'hardhat';
import * as fs from 'fs';

import { JsonRpcProvider, isAddress, isBytesLike, Interface, Wallet, AnkrProvider } from 'ethers';
import { getConfig } from './helper';
import { password, input } from '@inquirer/prompts';
import { green } from 'colors';
import * as path from 'path';

const _interface = new Interface([
  {
    inputs: [],
    name: 'admin',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]);

const main = async () => {
  const config = getConfig(hre.network.name);
  let elems = [['', config]];
  let contracts: any = [];
  for (; elems.length > 0; ) {
    const e = elems.shift();
    const ekey = e[0];
    const evalue = e[1];
    if (evalue && typeof evalue == 'object' && evalue.address) {
      contracts.push({ name: evalue.name || ekey, address: evalue.address });
    }

    for (const key in evalue) {
      const val = evalue[key];
      if (val && typeof val == 'object') {
        elems.push([key, val]);
      }
    }
  }

  // scan for admin() of 2 steps admin transfer with _setPendingAdmin and _acceptAdmin
  const provider = new JsonRpcProvider(hre.network.config.url);
  let needAdminUpdates = [];
  const adminData = _interface.encodeFunctionData('admin');
  for (const c of contracts) {
    try {
      const res = await provider.call({ to: c.address, data: adminData });
      const decoded = _interface.decodeFunctionResult('admin', res);
      console.log(c.name, c.address, `admin: `, decoded);
      needAdminUpdates.push({ ...c, currentAdmin: decoded[0] });
    } catch (e) {
      // console.log(e);
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'admin', `${hre.network.name}-admin-update-list.json`),
    JSON.stringify(needAdminUpdates, null, 2)
  );

  // scan for getRoleMember by AccessControl (grantRole/revokeRole)
  let needAccessUpdates = [];
  const getRoleMemberData = _interface.encodeFunctionData('getRoleMember', [
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    0,
  ]);
  for (const c of contracts) {
    try {
      const res = await provider.call({ to: c.address, data: getRoleMemberData });
      console.log(c.name, c.address, `accessAdmin: `, res);
      const decoded = _interface.decodeFunctionResult('getRoleMember', res);
      console.log(decoded);
      needAccessUpdates.push({ ...c, currentAdmin: decoded[0] });
    } catch (e) {
      // console.log(e);
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'admin', `${hre.network.name}-access-update-list.json`),
    JSON.stringify(needAccessUpdates, null, 2)
  );

  // scan for owner by Ownable (grantRole/revokeRole)
  let needOwnerUpdates = [];
  const ownerData = _interface.encodeFunctionData('owner');
  for (const c of contracts) {
    try {
      const res = await provider.call({ to: c.address, data: ownerData });
      console.log(c.name, c.address, `owner: `, res);
      const decoded = _interface.decodeFunctionResult('owner', res);
      console.log(decoded);
      needOwnerUpdates.push({ ...c, currentOwner: decoded[0] });
    } catch (e) {
      // console.log(e);
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'admin', `${hre.network.name}-owner-update-list.json`),
    JSON.stringify(needOwnerUpdates, null, 2)
  );
};

main();
