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
  WhitePaperInterestRateModel,
  WhitePaperInterestRateModelInterface,
} from "../WhitePaperInterestRateModel";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blocksPerYearOnChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseRatePerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplierPerYear",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "blocksPerYear",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseRatePerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "multiplierPerBlock",
        type: "uint256",
      },
    ],
    name: "NewInterestParams",
    type: "event",
  },
  {
    inputs: [],
    name: "baseRatePerBlock",
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
    name: "blocksPerYear",
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
    name: "multiplierPerBlock",
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
  "0x6080346100bf57601f61038d38819003918201601f19168301916001600160401b038311848410176100c4578084926060946040528339810103126100bf5780519060406020820151910151918060005580156100a9577f865bfff1eb39dc370f97b2eb5990d963c50228429828ad935a4470166c711fc192818060609404918260025504908160015560405192835260208301526040820152a16040516102b290816100db8239f35b634e487b7160e01b600052601260045260246000fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe604060808152600436101561001357600080fd5b600090813560e01c806315f240531461017c5780632191f92a146101615780636e71e2d81461013f5780638726bb8914610121578063a385fb9614610105578063b81688161461008d5763f14039de1461006c57600080fd5b346100895781600319360112610089576020906002549051908152f35b5080fd5b5034610089576080366003190112610089576004359160243560443590670de0b6b3a7640000926064358403908482116100f157508282856100e26100dd946100dd6100e9988c9860209d61024c565b610239565b04936101b6565b049051908152f35b634e487b7160e01b81526011600452602490fd5b5034610089578160031936011261008957602091549051908152f35b50346100895781600319360112610089576020906001549051908152f35b50346100895760209061015a61015436610197565b916101b6565b9051908152f35b50346100895781600319360112610089576020905160018152f35b50346100895760209061015a61019136610197565b9161024c565b60609060031901126101b157600435906024359060443590565b600080fd5b811561022457670de0b6b3a7640000820291670de0b6b3a763ffff198184040161020e576101e39161022c565b918083039280841161020e57146101f8570490565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b505050600090565b9190820180921161020e57565b8181029291811591840414171561020e57565b61026661027993670de0b6b3a76400009361026f936101b6565b60015490610239565b046002549061022c565b9056fea2646970667358221220aee47693f00041dda30c7b118997b00ad17d518c1aa171bd328a245c792414d464736f6c63430008130033";

export class WhitePaperInterestRateModel__factory extends ContractFactory {
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
    blocksPerYearOnChain: BigNumberish,
    baseRatePerYear: BigNumberish,
    multiplierPerYear: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WhitePaperInterestRateModel> {
    return super.deploy(
      blocksPerYearOnChain,
      baseRatePerYear,
      multiplierPerYear,
      overrides || {}
    ) as Promise<WhitePaperInterestRateModel>;
  }
  getDeployTransaction(
    blocksPerYearOnChain: BigNumberish,
    baseRatePerYear: BigNumberish,
    multiplierPerYear: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      blocksPerYearOnChain,
      baseRatePerYear,
      multiplierPerYear,
      overrides || {}
    );
  }
  attach(address: string): WhitePaperInterestRateModel {
    return super.attach(address) as WhitePaperInterestRateModel;
  }
  connect(signer: Signer): WhitePaperInterestRateModel__factory {
    return super.connect(signer) as WhitePaperInterestRateModel__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WhitePaperInterestRateModelInterface {
    return new utils.Interface(_abi) as WhitePaperInterestRateModelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WhitePaperInterestRateModel {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WhitePaperInterestRateModel;
  }
}
