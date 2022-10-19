import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import {
  Contract,
  Signer,
  BigNumber,
  ContractTransaction,
  BytesLike,
  BigNumberish,
  utils,
  constants,
  Overrides,
} from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import * as pathLib from 'path';
import * as fs from 'fs';

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

export function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
export const overrides: any = {
  gasLimit: 8000000,
};

export const MINTER_ROLE: BytesLike = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

export const gasLeft = BN(28975827); //1ba22d3

export function getContract(network: string, name: string): string {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, '..', path, latest);
  if (existsSync(fullpath)) {
    let json = JSON.parse(readFileSync(fullpath).toString());
    return json.address;
  } else {
    return constants.AddressZero;
  }
}

export function listContracts(network: string) {
  const deployDir = `./deployments`;
  const networks = fs.readdirSync(deployDir);
  let result: { [key: string]: string } = {};
  if (networks.includes(network)) {
    const base = pathLib.join(__dirname, '..', 'deployments', network);
    const files = fs.readdirSync(base);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const name = f.replace('.json', '');
        const address = JSON.parse(fs.readFileSync(pathLib.join(base, f)).toString()).address;
        if (name && address) {
          result[name] = address;
        }
      }
    }
  }
  return result;
}

export function getContractJson(network: string, name: string) {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, '..', path, latest);
  if (existsSync(fullpath)) {
    return JSON.parse(readFileSync(fullpath).toString());
  } else {
    return '';
  }
}

export async function saveFile(
  network: string,
  name: string,
  contract: Contract,
  args: Array<any> = [],
  libraries: Object = {}
) {
  const nameArr = name.split(':');
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const file = `${contractName}.json`;

  mkdirSync(path, { recursive: true });

  if (contractName != name) {
    writeFileSync(
      path + file,
      JSON.stringify(
        {
          address: contract.address,
          constructorArguments: args,
          libraries: libraries,
          contract: name,
        },
        null,
        2
      )
    );
  } else {
    writeFileSync(
      path + file,
      JSON.stringify({
        address: contract.address,
        constructorArguments: args,
        libraries: libraries,
      })
    );
  }
}
