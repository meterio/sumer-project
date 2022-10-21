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
  "0x608060405234801561001057600080fd5b506040516106c23803806106c28339818101604052606081101561003357600080fd5b508051602080830151604090930151600083905591929190610060908390859061025b6100d4821b17901c565b60028190555061007f600054826100d460201b61025b1790919060201c565b60018190556000546002546040805192835260208301919091528181019290925290517f865bfff1eb39dc370f97b2eb5990d963c50228429828ad935a4470166c711fc19181900360600190a15050506101c5565b600061011c83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061012360201b60201c565b9392505050565b600081836101af5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561017457818101518382015260200161015c565b50505050905090810190601f1680156101a15780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816101bb57fe5b0495945050505050565b6104ee806101d46000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638726bb891161005b5780638726bb8914610102578063a385fb961461010a578063b816881614610112578063f14039de146101415761007d565b806315f24053146100825780632191f92a146100bd5780636e71e2d8146100d9575b600080fd5b6100ab6004803603606081101561009857600080fd5b5080359060208101359060400135610149565b60408051918252519081900360200190f35b6100c5610197565b604080519115158252519081900360200190f35b6100ab600480360360608110156100ef57600080fd5b508035906020810135906040013561019c565b6100ab6101dc565b6100ab6101e2565b6100ab6004803603608081101561012857600080fd5b50803590602081013590604081013590606001356101e8565b6100ab610255565b60008061015785858561019c565b905061018c600254610186670de0b6b3a7640000610180600154866102a690919063ffffffff16565b9061025b565b906102ff565b9150505b9392505050565b600181565b6000826101ab57506000610190565b6101d46101c2836101bc87876102ff565b90610359565b61018085670de0b6b3a76400006102a6565b949350505050565b60015481565b60005481565b6000806101fd670de0b6b3a764000084610359565b9050600061020c878787610149565b90506000610226670de0b6b3a764000061018084866102a6565b9050610249670de0b6b3a7640000610180836102438c8c8c61019c565b906102a6565b98975050505050505050565b60025481565b600061029d83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061039b565b90505b92915050565b6000826102b5575060006102a0565b828202828482816102c257fe5b041461029d5760405162461bcd60e51b81526004018080602001828103825260218152602001806104986021913960400191505060405180910390fd5b60008282018381101561029d576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600061029d83836040518060400160405280601f81526020017f536166654d6174683a207375627472616374696f6e20756e646572666c6f770081525061043d565b600081836104275760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103ec5781810151838201526020016103d4565b50505050905090810190601f1680156104195780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161043357fe5b0495945050505050565b6000818484111561048f5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156103ec5781810151838201526020016103d4565b50505090039056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220085c8df8cae25d293725460ab39a4d65f5b52f4437ac7cda478cb3dd78b53ae564736f6c63430007060033";

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