/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IWstMTRG,
  IWstMTRGInterface,
} from "../../../../contracts/Oracle/wstMTRGOracle.sol/IWstMTRG";

const _abi = [
  {
    inputs: [],
    name: "stMTRGPerToken",
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

export class IWstMTRG__factory {
  static readonly abi = _abi;
  static createInterface(): IWstMTRGInterface {
    return new Interface(_abi) as IWstMTRGInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IWstMTRG {
    return new Contract(address, _abi, runner) as unknown as IWstMTRG;
  }
}
