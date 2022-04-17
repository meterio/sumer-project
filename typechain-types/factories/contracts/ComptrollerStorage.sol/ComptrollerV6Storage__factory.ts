/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerV6Storage,
  ComptrollerV6StorageInterface,
} from "../../../contracts/ComptrollerStorage.sol/ComptrollerV6Storage";

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
    name: "compBorrowSpeeds",
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
    name: "compSupplySpeeds",
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
  "0x608060405234801561001057600080fd5b5061063c806100206000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c8063986ab838116100c3578063cc7ebdc41161007c578063cc7ebdc414610387578063dce15449146103ad578063dcfbc0c7146103d9578063e8755446146103e1578063f4a433c0146103e9578063f851a4401461040f5761014d565b8063986ab838146102cf578063aa900754146102f5578063b21be7fd146102fd578063bb82aa5e1461032b578063bea6b8b814610333578063ca0af043146103595761014d565b80636aa875b5116101155780636aa875b5146101db5780636b79c38d146102015780637dc0d1d01461024f5780638c57804e146102575780638e8f294b1461027d57806394b2294b146102c75761014d565b80631d7b33d7146101525780632408d5f01461018a57806326782247146101ae5780634ada90af146101b657806352d84d1e146101be575b600080fd5b6101786004803603602081101561016857600080fd5b50356001600160a01b0316610417565b60408051918252519081900360200190f35b610192610429565b604080516001600160a01b039092168252519081900360200190f35b610192610438565b610178610447565b610192600480360360208110156101d457600080fd5b503561044d565b610178600480360360208110156101f157600080fd5b50356001600160a01b0316610474565b6102276004803603602081101561021757600080fd5b50356001600160a01b0316610486565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b6101926104b0565b6102276004803603602081101561026d57600080fd5b50356001600160a01b03166104bf565b6102a36004803603602081101561029357600080fd5b50356001600160a01b03166104e9565b60408051931515845260ff9092166020840152151582820152519081900360600190f35b610178610511565b610178600480360360208110156102e557600080fd5b50356001600160a01b0316610517565b610178610529565b6101786004803603604081101561031357600080fd5b506001600160a01b038135811691602001351661052f565b61019261054c565b6101786004803603602081101561034957600080fd5b50356001600160a01b031661055b565b6101786004803603604081101561036f57600080fd5b506001600160a01b038135811691602001351661056d565b6101786004803603602081101561039d57600080fd5b50356001600160a01b031661058a565b610192600480360360408110156103c357600080fd5b506001600160a01b03813516906020013561059c565b6101926105d1565b6101786105e0565b610178600480360360208110156103ff57600080fd5b50356001600160a01b03166105e6565b6101926105f8565b600d6020526000908152604090205481565b6004546001600160a01b031681565b6001546001600160a01b031681565b60075481565b600b818154811061045a57fe5b6000918252602090912001546001600160a01b0316905081565b60166020526000908152604090205481565b600e602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6005546001600160a01b031681565b600f602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b600a602052600090815260409020805460029091015460ff8083169261010090048116911683565b60085481565b60136020526000908152604090205481565b600c5481565b601060209081526000928352604080842090915290825290205481565b6002546001600160a01b031681565b60146020526000908152604090205481565b601160209081526000928352604080842090915290825290205481565b60126020526000908152604090205481565b600960205281600052604060002081815481106105b557fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b60065481565b60156020526000908152604090205481565b6000546001600160a01b03168156fea265627a7a72315820c95bd3ea787146add5c47da5ccfeddd2b6ebb545be184489c075dc186e3474a364736f6c63430005100032";

type ComptrollerV6StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerV6StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerV6Storage__factory extends ContractFactory {
  constructor(...args: ComptrollerV6StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerV6Storage> {
    return super.deploy(overrides || {}) as Promise<ComptrollerV6Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerV6Storage {
    return super.attach(address) as ComptrollerV6Storage;
  }
  override connect(signer: Signer): ComptrollerV6Storage__factory {
    return super.connect(signer) as ComptrollerV6Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerV6StorageInterface {
    return new utils.Interface(_abi) as ComptrollerV6StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerV6Storage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ComptrollerV6Storage;
  }
}
