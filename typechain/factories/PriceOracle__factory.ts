/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { PriceOracle, PriceOracleInterface } from "../PriceOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "getUnderlyingPrice",
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
  {
    inputs: [],
    name: "isPriceOracle",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class PriceOracle__factory {
  static readonly abi = _abi;
  static createInterface(): PriceOracleInterface {
    return new utils.Interface(_abi) as PriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceOracle {
    return new Contract(address, _abi, signerOrProvider) as PriceOracle;
  }
}
