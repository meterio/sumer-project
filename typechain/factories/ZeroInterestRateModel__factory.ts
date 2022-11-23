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
  "0x608060405234801561001057600080fd5b50610455806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806315f24053146100515780632191f92a1461008c5780636e71e2d8146100a8578063b8168816146100d1575b600080fd5b61007a6004803603606081101561006757600080fd5b5080359060208101359060400135610100565b60408051918252519081900360200190f35b61009461010a565b604080519115158252519081900360200190f35b61007a600480360360608110156100be57600080fd5b508035906020810135906040013561010f565b61007a600480360360808110156100e757600080fd5b5080359060208101359060408101359060600135610155565b60005b9392505050565b600181565b60008261011e57506000610103565b61014d6101358361012f87876101c2565b90610225565b61014785670de0b6b3a7640000610267565b906102c0565b949350505050565b60008061016a670de0b6b3a764000084610225565b90506000610179878787610100565b90506000610193670de0b6b3a76400006101478486610267565b90506101b6670de0b6b3a7640000610147836101b08c8c8c61010f565b90610267565b98975050505050505050565b60008282018381101561021c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b90505b92915050565b600061021c83836040518060400160405280601f81526020017f536166654d6174683a207375627472616374696f6e20756e646572666c6f7700815250610302565b6000826102765750600061021f565b8282028284828161028357fe5b041461021c5760405162461bcd60e51b81526004018080602001828103825260218152602001806103ff6021913960400191505060405180910390fd5b600061021c83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250610399565b600081848411156103915760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561035657818101518382015260200161033e565b50505050905090810190601f1680156103835780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600081836103e85760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561035657818101518382015260200161033e565b5060008385816103f457fe5b049594505050505056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220f266dafc6693933a1606f5daff0bd2d72cabc8c5d9007a54e6f19c6ad1e97b5164736f6c63430007060033";

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