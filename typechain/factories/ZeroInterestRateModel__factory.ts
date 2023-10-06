/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ZeroInterestRateModel,
  ZeroInterestRateModelInterface,
} from "../ZeroInterestRateModel";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
    ],
    name: "getBorrowRate",
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
    inputs: [
      {
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveFactorMantissa",
        type: "uint256",
      },
    ],
    name: "getSupplyRate",
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
    name: "isInterestRateModel",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
    ],
    name: "utilizationRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60808060405234610016576101f3908161001c8239f35b600080fdfe608080604052600436101561001357600080fd5b600090813560e01c90816315f240531461010a575080632191f92a146100ee5780636e71e2d8146100cc5763b81688161461004d57600080fd5b346100c95760803660031901126100c957606435670de0b6b3a764000080828103116100b55714600117156100a157600161008f604435602435600435610147565b1517156100a157602090604051908152f35b634e487b7160e01b81526011600452602490fd5b634e487b7160e01b83526011600452602483fd5b80fd5b50346100c95760206100e66100e036610128565b91610147565b604051908152f35b50346100c957806003193601126100c957602060405160018152f35b9050346101245760209161011d36610128565b5050508152f35b5080fd5b606090600319011261014257600435906024359060443590565b600080fd5b9181156101b557670de0b6b3a7640000820291670de0b6b3a763ffff198184040161019f57830180931161019f578083039280841161019f5714610189570490565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b50505060009056fea2646970667358221220cd23c96a9467300b7b3a3912abc96fe3ad1ed2501f7c7bcd50f5d56e6cfeb5cb64736f6c63430008130033";

export class ZeroInterestRateModel__factory extends ContractFactory {
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
  ): Promise<ZeroInterestRateModel> {
    return super.deploy(overrides || {}) as Promise<ZeroInterestRateModel>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ZeroInterestRateModel {
    return super.attach(address) as ZeroInterestRateModel;
  }
  connect(signer: Signer): ZeroInterestRateModel__factory {
    return super.connect(signer) as ZeroInterestRateModel__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZeroInterestRateModelInterface {
    return new utils.Interface(_abi) as ZeroInterestRateModelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZeroInterestRateModel {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ZeroInterestRateModel;
  }
}
