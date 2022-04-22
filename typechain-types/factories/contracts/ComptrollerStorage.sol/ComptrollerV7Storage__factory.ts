/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerV7Storage,
  ComptrollerV7StorageInterface,
} from "../../../contracts/ComptrollerStorage.sol/ComptrollerV7Storage";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accountAssets",
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
    inputs: [],
    name: "admin",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "allMarkets",
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
    inputs: [],
    name: "closeFactorMantissa",
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
        name: "",
        type: "address",
      },
    ],
    name: "compAccrued",
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
        name: "",
        type: "address",
      },
    ],
    name: "compBorrowSpeeds",
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
        name: "",
        type: "address",
      },
    ],
    name: "compBorrowState",
    outputs: [
      {
        internalType: "uint224",
        name: "index",
        type: "uint224",
      },
      {
        internalType: "uint32",
        name: "block",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "compBorrowerIndex",
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
        name: "",
        type: "address",
      },
    ],
    name: "compContributorSpeeds",
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
    name: "compRate",
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
        name: "",
        type: "address",
      },
    ],
    name: "compSpeeds",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "compSupplierIndex",
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
        name: "",
        type: "address",
      },
    ],
    name: "compSupplySpeeds",
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
        name: "",
        type: "address",
      },
    ],
    name: "compSupplyState",
    outputs: [
      {
        internalType: "uint224",
        name: "index",
        type: "uint224",
      },
      {
        internalType: "uint32",
        name: "block",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "comptrollerImplementation",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastContributorBlock",
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
    name: "liquidationIncentiveMantissa",
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
        name: "",
        type: "address",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "bool",
        name: "isListed",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "equalAssetGrouId",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isComped",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxAssets",
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
        name: "",
        type: "address",
      },
    ],
    name: "maxSupply",
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
    name: "oracle",
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
    inputs: [],
    name: "pendingAdmin",
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
    inputs: [],
    name: "pendingComptrollerImplementation",
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
    inputs: [],
    name: "underWriterAdmin",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506105ad806100206000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c80639cc7becf116100c3578063cc7ebdc41161007c578063cc7ebdc4146103e3578063dce1544914610403578063dcfbc0c714610416578063e875544614610429578063f4a433c014610432578063f851a4401461045257600080fd5b80639cc7becf14610331578063aa90075414610351578063b21be7fd1461035a578063bb82aa5e14610385578063bea6b8b814610398578063ca0af043146103b857600080fd5b80636b79c38d116101155780636b79c38d1461020a5780637dc0d1d0146102665780638c57804e146102795780638e8f294b146102b157806394b2294b14610308578063986ab8381461031157600080fd5b80631d7b33d71461015d5780632408d5f01461019057806326782247146101bb5780634ada90af146101ce57806352d84d1e146101d75780636aa875b5146101ea575b600080fd5b61017d61016b3660046104e3565b600d6020526000908152604090205481565b6040519081526020015b60405180910390f35b6004546101a3906001600160a01b031681565b6040516001600160a01b039091168152602001610187565b6001546101a3906001600160a01b031681565b61017d60075481565b6101a36101e536600461055f565b610465565b61017d6101f83660046104e3565b60166020526000908152604090205481565b6102426102183660046104e3565b600e602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b604080516001600160e01b03909316835263ffffffff909116602083015201610187565b6005546101a3906001600160a01b031681565b6102426102873660046104e3565b600f602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6102e76102bf3660046104e3565b600a602052600090815260409020805460029091015460ff8083169261010090048116911683565b60408051931515845260ff9092166020840152151590820152606001610187565b61017d60085481565b61017d61031f3660046104e3565b60136020526000908152604090205481565b61017d61033f3660046104e3565b60176020526000908152604090205481565b61017d600c5481565b61017d610368366004610504565b601060209081526000928352604080842090915290825290205481565b6002546101a3906001600160a01b031681565b61017d6103a63660046104e3565b60146020526000908152604090205481565b61017d6103c6366004610504565b601160209081526000928352604080842090915290825290205481565b61017d6103f13660046104e3565b60126020526000908152604090205481565b6101a3610411366004610536565b61048f565b6003546101a3906001600160a01b031681565b61017d60065481565b61017d6104403660046104e3565b60156020526000908152604090205481565b6000546101a3906001600160a01b031681565b600b818154811061047557600080fd5b6000918252602090912001546001600160a01b0316905081565b600960205281600052604060002081815481106104ab57600080fd5b6000918252602090912001546001600160a01b03169150829050565b80356001600160a01b03811681146104de57600080fd5b919050565b6000602082840312156104f4578081fd5b6104fd826104c7565b9392505050565b60008060408385031215610516578081fd5b61051f836104c7565b915061052d602084016104c7565b90509250929050565b60008060408385031215610548578182fd5b610551836104c7565b946020939093013593505050565b600060208284031215610570578081fd5b503591905056fea264697066735822122061f6b0b9826208824fa6fb08e212a157cd337cc5811c507c38c2f6310f52a05964736f6c63430008040033";

type ComptrollerV7StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerV7StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerV7Storage__factory extends ContractFactory {
  constructor(...args: ComptrollerV7StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerV7Storage> {
    return super.deploy(overrides || {}) as Promise<ComptrollerV7Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerV7Storage {
    return super.attach(address) as ComptrollerV7Storage;
  }
  override connect(signer: Signer): ComptrollerV7Storage__factory {
    return super.connect(signer) as ComptrollerV7Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerV7StorageInterface {
    return new utils.Interface(_abi) as ComptrollerV7StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerV7Storage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ComptrollerV7Storage;
  }
}
