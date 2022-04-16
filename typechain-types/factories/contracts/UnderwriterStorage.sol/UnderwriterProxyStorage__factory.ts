/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UnderwriterProxyStorage,
  UnderwriterProxyStorageInterface,
} from "../../../contracts/UnderwriterStorage.sol/UnderwriterProxyStorage";

const _abi = [
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
    name: "implementation",
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
    name: "pendingImplementation",
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
  "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632408d5f01461005c578063267822471461007a578063396f7b23146100825780635c60da1b1461008a578063f851a44014610092575b600080fd5b61006461009a565b60405161007191906100f4565b60405180910390f35b6100646100a9565b6100646100b8565b6100646100c7565b6100646100d6565b6004546001600160a01b031681565b6001546001600160a01b031681565b6003546001600160a01b031681565b6002546001600160a01b031681565b6000546001600160a01b031681565b6100ee81610108565b82525050565b6020810161010282846100e5565b92915050565b60006001600160a01b03821661010256fea365627a7a72315820aa6b19cd1d066b468603766c8738c604f17933b39f9cf37e47d7110a19992ce36c6578706572696d656e74616cf564736f6c63430005100040";

type UnderwriterProxyStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnderwriterProxyStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnderwriterProxyStorage__factory extends ContractFactory {
  constructor(...args: UnderwriterProxyStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnderwriterProxyStorage> {
    return super.deploy(overrides || {}) as Promise<UnderwriterProxyStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UnderwriterProxyStorage {
    return super.attach(address) as UnderwriterProxyStorage;
  }
  override connect(signer: Signer): UnderwriterProxyStorage__factory {
    return super.connect(signer) as UnderwriterProxyStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnderwriterProxyStorageInterface {
    return new utils.Interface(_abi) as UnderwriterProxyStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnderwriterProxyStorage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UnderwriterProxyStorage;
  }
}