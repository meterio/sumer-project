/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerV5Storage,
  ComptrollerV5StorageInterface,
} from "../../../contracts/ComptrollerStorage.sol/ComptrollerV5Storage";

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
  "0x608060405234801561001057600080fd5b506105b6806100206000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063986ab838116100b8578063ca0af0431161007c578063ca0af0431461031d578063cc7ebdc41461034b578063dce1544914610371578063dcfbc0c71461039d578063e8755446146103a5578063f851a440146103ad57610137565b8063986ab83814610293578063aa900754146102b9578063b21be7fd146102c1578063bb82aa5e146102ef578063bea6b8b8146102f757610137565b80636b79c38d116100ff5780636b79c38d146101c55780637dc0d1d0146102135780638c57804e1461021b5780638e8f294b1461024157806394b2294b1461028b57610137565b80631d7b33d71461013c5780632408d5f01461017457806326782247146101985780634ada90af146101a057806352d84d1e146101a8575b600080fd5b6101626004803603602081101561015257600080fd5b50356001600160a01b03166103b5565b60408051918252519081900360200190f35b61017c6103c7565b604080516001600160a01b039092168252519081900360200190f35b61017c6103d6565b6101626103e5565b61017c600480360360208110156101be57600080fd5b50356103eb565b6101eb600480360360208110156101db57600080fd5b50356001600160a01b0316610412565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b61017c61043c565b6101eb6004803603602081101561023157600080fd5b50356001600160a01b031661044b565b6102676004803603602081101561025757600080fd5b50356001600160a01b0316610475565b60408051931515845260ff9092166020840152151582820152519081900360600190f35b61016261049d565b610162600480360360208110156102a957600080fd5b50356001600160a01b03166104a3565b6101626104b5565b610162600480360360408110156102d757600080fd5b506001600160a01b03813581169160200135166104bb565b61017c6104d8565b6101626004803603602081101561030d57600080fd5b50356001600160a01b03166104e7565b6101626004803603604081101561033357600080fd5b506001600160a01b03813581169160200135166104f9565b6101626004803603602081101561036157600080fd5b50356001600160a01b0316610516565b61017c6004803603604081101561038757600080fd5b506001600160a01b038135169060200135610528565b61017c61055d565b61016261056c565b61017c610572565b600d6020526000908152604090205481565b6004546001600160a01b031681565b6001546001600160a01b031681565b60075481565b600b81815481106103f857fe5b6000918252602090912001546001600160a01b0316905081565b600e602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6005546001600160a01b031681565b600f602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b600a602052600090815260409020805460029091015460ff8083169261010090048116911683565b60085481565b60136020526000908152604090205481565b600c5481565b601060209081526000928352604080842090915290825290205481565b6002546001600160a01b031681565b60146020526000908152604090205481565b601160209081526000928352604080842090915290825290205481565b60126020526000908152604090205481565b6009602052816000526040600020818154811061054157fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b60065481565b6000546001600160a01b03168156fea265627a7a723158208ea755fdab8e54b6db511738cc57eb9241674f0b17de066eede6d52e32597a8864736f6c63430005100032";

type ComptrollerV5StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerV5StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerV5Storage__factory extends ContractFactory {
  constructor(...args: ComptrollerV5StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerV5Storage> {
    return super.deploy(overrides || {}) as Promise<ComptrollerV5Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerV5Storage {
    return super.attach(address) as ComptrollerV5Storage;
  }
  override connect(signer: Signer): ComptrollerV5Storage__factory {
    return super.connect(signer) as ComptrollerV5Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerV5StorageInterface {
    return new utils.Interface(_abi) as ComptrollerV5StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerV5Storage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ComptrollerV5Storage;
  }
}
