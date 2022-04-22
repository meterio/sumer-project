import { ethers, waffle } from "hardhat";
import {
  BigNumber,
  BytesLike,
  ContractTransaction,
  utils,
  constants,
  ContractReceipt,
  Contract,
  ContractFunction
} from "ethers";

export function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
export function UInt256Max(): BigNumber {
  return constants.MaxUint256;
}

export function address(n: number): string {
  return `0x${n.toString(16).padStart(40, '0')}`;
}

export function encodeParameters(types: string[], values: string[]) {
  const abi = new utils.AbiCoder();
  return abi.encode(types, values);
}

export async function etherBalance(addr: string): Promise<BigNumber> {
  return await ethers.provider.getBalance(addr);
}

export async function etherGasCost(receipt: ContractReceipt): Promise<BigNumber> {
  const tx = await ethers.provider.getTransaction(receipt.transactionHash);
  const gasUsed = receipt.gasUsed;
  const gasPrice = tx.gasPrice;
  return BigNumber.from(gasUsed).mul(BigNumber.from(gasPrice));
}

export function etherExp(num: number) { return etherMantissa(num, 1e18) }
export function etherDouble(num: number) { return etherMantissa(num, 1e36) }


export function dfn(val: BigNumber, def: number) {
  return isFinite(val.toNumber()) ? val : def;
}
export function etherMantissa(num: number | BigNumber, scale = 18) {
  return utils.parseUnits(num.toString(), scale);
}

export function etherUnsigned(num: number) {
  return BigNumber.from(num);
}

export function getContractDefaults() {
  return { gas: 20000000, gasPrice: 20000 };
}

export function keccak256(values: string) {
  return ethers.utils.keccak256(values);
}

export async function advanceBlocks(blocks: number) {
  let { result: num } = await waffle.provider.send("eth_blockNumber", []);
  await waffle.provider.send("evm_mineBlockNumber", [blocks + parseInt(num)]);
}

export async function blockNumber() {
  let { result: num } = await waffle.provider.send("eth_blockNumber", []);
  return parseInt(num);
}

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}
