/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TokenErrorReporter,
  TokenErrorReporterInterface,
} from "../TokenErrorReporter";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "error",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "info",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "detail",
        type: "uint256",
      },
    ],
    name: "Failure",
    type: "event",
  },
];

const _bytecode =
  "0x60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220309c9c63e8f1ca60faa8a8cb7b896f8af42b6f6f2cad5fccb202a6af0d414e1064736f6c63430007060033";

export class TokenErrorReporter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenErrorReporter> {
    return super.deploy(overrides || {}) as Promise<TokenErrorReporter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenErrorReporter {
    return super.attach(address) as TokenErrorReporter;
  }
  connect(signer: Signer): TokenErrorReporter__factory {
    return super.connect(signer) as TokenErrorReporter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenErrorReporterInterface {
    return new utils.Interface(_abi) as TokenErrorReporterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenErrorReporter {
    return new Contract(address, _abi, signerOrProvider) as TokenErrorReporter;
  }
}
