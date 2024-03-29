/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAccountLiquidity,
  IAccountLiquidityInterface,
} from "../../../contracts/Interface/IAccountLiquidity";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "cTokenModify",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "redeemTokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "getHypotheticalAccountLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "cTokenModify",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "intraSafeLimitMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interSafeLimitMantissa",
        type: "uint256",
      },
    ],
    name: "getHypotheticalSafeLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAccountLiquidity__factory {
  static readonly abi = _abi;
  static createInterface(): IAccountLiquidityInterface {
    return new Interface(_abi) as IAccountLiquidityInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAccountLiquidity {
    return new Contract(address, _abi, runner) as unknown as IAccountLiquidity;
  }
}
