/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  CDelegateInterface,
  CDelegateInterfaceInterface,
} from "../../../../stake/contracts/CTokenInterfaces.sol/CDelegateInterface";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "_becomeImplementation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "_resignImplementation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export class CDelegateInterface__factory {
  static readonly abi = _abi;
  static createInterface(): CDelegateInterfaceInterface {
    return new utils.Interface(_abi) as CDelegateInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CDelegateInterface {
    return new Contract(address, _abi, signerOrProvider) as CDelegateInterface;
  }
}
