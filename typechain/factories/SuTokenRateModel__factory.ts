/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SuTokenRateModel,
  SuTokenRateModelInterface,
} from "../SuTokenRateModel";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initBorrowRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initSupplyRate",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "borrowRate",
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
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "setBorrowRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "setSupplyRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRate",
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
];

const _bytecode =
  "0x60803461006b57601f61032a38819003918201601f19168301916001600160401b0383118484101761007057808492604094855283398101031261006b5760208151910151906001556002553360018060a01b031960005416176000556040516102a390816100878239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604090808252600436101561001557600080fd5b600091823560e01c91826315f2405314610217575081632191f92a146101fb5781633f95e273146101cc5781638da5cb5b146101a4578163a6f9dae11461011a578163ad2961a3146100fb578163b8168816146100db578163c914b437146100b8575063dd3eaf041461008757600080fd5b346100b55760203660031901126100b5576100ac60018060a01b038254163314610234565b60043560015580f35b80fd5b9050346100d757816003193601126100d7576020906001549051908152f35b5080fd5b9050346100d75760803660031901126100d7576020906002549051908152f35b9050346100d757816003193601126100d7576020906002549051908152f35b9050346100d75760203660031901126100d7576001600160a01b0360043581811692908390036101a05761015384549283163314610234565b821561016a57506001600160a01b03191617815580f35b5162461bcd60e51b815260206004820152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b8380fd5b9050346100d757816003193601126100d757905490516001600160a01b039091168152602090f35b82346100b55760203660031901126100b5576101f260018060a01b038254163314610234565b60043560025580f35b9050346100d757816003193601126100d7576020905160018152f35b8390346100d75760603660031901126100d7576020906001548152f35b1561023b57565b60405162461bcd60e51b815260206004820152600a60248201526927a7262c9027aba722a960b11b6044820152606490fdfea2646970667358221220ea766fc4020201d03cfe2928d5766c3595b4a60ba66dbdc0bf2e8cc9c0ece8e264736f6c63430008130033";

export class SuTokenRateModel__factory extends ContractFactory {
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
    initBorrowRate: BigNumberish,
    initSupplyRate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SuTokenRateModel> {
    return super.deploy(
      initBorrowRate,
      initSupplyRate,
      overrides || {}
    ) as Promise<SuTokenRateModel>;
  }
  getDeployTransaction(
    initBorrowRate: BigNumberish,
    initSupplyRate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initBorrowRate,
      initSupplyRate,
      overrides || {}
    );
  }
  attach(address: string): SuTokenRateModel {
    return super.attach(address) as SuTokenRateModel;
  }
  connect(signer: Signer): SuTokenRateModel__factory {
    return super.connect(signer) as SuTokenRateModel__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SuTokenRateModelInterface {
    return new utils.Interface(_abi) as SuTokenRateModelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SuTokenRateModel {
    return new Contract(address, _abi, signerOrProvider) as SuTokenRateModel;
  }
}
