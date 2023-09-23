/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SmartWalletChecker,
  SmartWalletCheckerInterface,
} from "../SmartWalletChecker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "check",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SmartWalletChecker__factory {
  static readonly abi = _abi;
  static createInterface(): SmartWalletCheckerInterface {
    return new utils.Interface(_abi) as SmartWalletCheckerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SmartWalletChecker {
    return new Contract(address, _abi, signerOrProvider) as SmartWalletChecker;
  }
}
