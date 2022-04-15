/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerV4Storage,
  ComptrollerV4StorageInterface,
} from "../../../contracts/ComptrollerStorage.sol/ComptrollerV4Storage";

const _abi = [
  {
    constant: true,
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
        internalType: "contract CToken",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
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
  {
    constant: true,
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
        internalType: "contract CToken",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "closeFactorMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "compRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "comptrollerImplementation",
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
  {
    constant: true,
    inputs: [],
    name: "liquidationIncentiveMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maxAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract PriceOracle",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "pendingAdmin",
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
  {
    constant: true,
    inputs: [],
    name: "pendingComptrollerImplementation",
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
  {
    constant: true,
    inputs: [],
    name: "underWriterAdmin",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b50610530806100206000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806394b2294b116100ad578063cc7ebdc411610071578063cc7ebdc4146102e9578063dce154491461030f578063dcfbc0c71461033b578063e875544614610343578063f851a4401461034b57610121565b806394b2294b14610275578063aa9007541461027d578063b21be7fd14610285578063bb82aa5e146102b3578063ca0af043146102bb57610121565b806352d84d1e116100f457806352d84d1e146101925780636b79c38d146101af5780637dc0d1d0146101fd5780638c57804e146102055780638e8f294b1461022b57610121565b80631d7b33d7146101265780632408d5f01461015e57806326782247146101825780634ada90af1461018a575b600080fd5b61014c6004803603602081101561013c57600080fd5b50356001600160a01b0316610353565b60408051918252519081900360200190f35b610166610365565b604080516001600160a01b039092168252519081900360200190f35b610166610374565b61014c610383565b610166600480360360208110156101a857600080fd5b5035610389565b6101d5600480360360208110156101c557600080fd5b50356001600160a01b03166103b0565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b6101666103da565b6101d56004803603602081101561021b57600080fd5b50356001600160a01b03166103e9565b6102516004803603602081101561024157600080fd5b50356001600160a01b0316610413565b60408051931515845260ff9092166020840152151582820152519081900360600190f35b61014c61043b565b61014c610441565b61014c6004803603604081101561029b57600080fd5b506001600160a01b0381358116916020013516610447565b610166610464565b61014c600480360360408110156102d157600080fd5b506001600160a01b0381358116916020013516610473565b61014c600480360360208110156102ff57600080fd5b50356001600160a01b0316610490565b6101666004803603604081101561032557600080fd5b506001600160a01b0381351690602001356104a2565b6101666104d7565b61014c6104e6565b6101666104ec565b600d6020526000908152604090205481565b6004546001600160a01b031681565b6001546001600160a01b031681565b60075481565b600b818154811061039657fe5b6000918252602090912001546001600160a01b0316905081565b600e602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6005546001600160a01b031681565b600f602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b600a602052600090815260409020805460029091015460ff8083169261010090048116911683565b60085481565b600c5481565b601060209081526000928352604080842090915290825290205481565b6002546001600160a01b031681565b601160209081526000928352604080842090915290825290205481565b60126020526000908152604090205481565b600960205281600052604060002081815481106104bb57fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b60065481565b6000546001600160a01b03168156fea265627a7a72315820f9c7860ddd282e85557c53d144725e641b11b18c55bd14f4b2592d99b6e694d964736f6c63430005100032";

type ComptrollerV4StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerV4StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerV4Storage__factory extends ContractFactory {
  constructor(...args: ComptrollerV4StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerV4Storage> {
    return super.deploy(overrides || {}) as Promise<ComptrollerV4Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerV4Storage {
    return super.attach(address) as ComptrollerV4Storage;
  }
  override connect(signer: Signer): ComptrollerV4Storage__factory {
    return super.connect(signer) as ComptrollerV4Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerV4StorageInterface {
    return new utils.Interface(_abi) as ComptrollerV4StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerV4Storage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ComptrollerV4Storage;
  }
}
