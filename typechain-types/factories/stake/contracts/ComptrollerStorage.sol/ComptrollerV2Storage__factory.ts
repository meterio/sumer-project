/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerV2Storage,
  ComptrollerV2StorageInterface,
} from "../../../../stake/contracts/ComptrollerStorage.sol/ComptrollerV2Storage";

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
  "0x608060405234801561001057600080fd5b50610298806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806394b2294b1161007157806394b2294b14610146578063bb82aa5e1461014e578063dce1544914610156578063dcfbc0c714610182578063e87554461461018a578063f851a44014610192576100a9565b80632408d5f0146100ae57806326782247146100d25780634ada90af146100da5780637dc0d1d0146100f45780638e8f294b146100fc575b600080fd5b6100b661019a565b604080516001600160a01b039092168252519081900360200190f35b6100b66101a9565b6100e26101b8565b60408051918252519081900360200190f35b6100b66101be565b6101226004803603602081101561011257600080fd5b50356001600160a01b03166101cd565b60408051931515845260ff9092166020840152151582820152519081900360600190f35b6100e26101f5565b6100b66101fb565b6100b66004803603604081101561016c57600080fd5b506001600160a01b03813516906020013561020a565b6100b661023f565b6100e261024e565b6100b6610254565b6004546001600160a01b031681565b6001546001600160a01b031681565b60075481565b6005546001600160a01b031681565b600a602052600090815260409020805460029091015460ff8083169261010090048116911683565b60085481565b6002546001600160a01b031681565b6009602052816000526040600020818154811061022357fe5b6000918252602090912001546001600160a01b03169150829050565b6003546001600160a01b031681565b60065481565b6000546001600160a01b03168156fea265627a7a72315820ebfce9ddde0fbcd5080ef306e3280cf170e506fa04cb9486123a75b7cc3e492e64736f6c63430005100032";

type ComptrollerV2StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerV2StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerV2Storage__factory extends ContractFactory {
  constructor(...args: ComptrollerV2StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerV2Storage> {
    return super.deploy(overrides || {}) as Promise<ComptrollerV2Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerV2Storage {
    return super.attach(address) as ComptrollerV2Storage;
  }
  override connect(signer: Signer): ComptrollerV2Storage__factory {
    return super.connect(signer) as ComptrollerV2Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerV2StorageInterface {
    return new utils.Interface(_abi) as ComptrollerV2StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerV2Storage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ComptrollerV2Storage;
  }
}
