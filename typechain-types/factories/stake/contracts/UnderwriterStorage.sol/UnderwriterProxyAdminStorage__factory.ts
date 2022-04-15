/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UnderwriterProxyAdminStorage,
  UnderwriterProxyAdminStorageInterface,
} from "../../../../stake/contracts/UnderwriterStorage.sol/UnderwriterProxyAdminStorage";

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
  "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632408d5f01461005c578063267822471461007a578063bb82aa5e14610082578063dcfbc0c71461008a578063f851a44014610092575b600080fd5b61006461009a565b60405161007191906100f4565b60405180910390f35b6100646100a9565b6100646100b8565b6100646100c7565b6100646100d6565b6004546001600160a01b031681565b6001546001600160a01b031681565b6002546001600160a01b031681565b6003546001600160a01b031681565b6000546001600160a01b031681565b6100ee81610108565b82525050565b6020810161010282846100e5565b92915050565b60006001600160a01b03821661010256fea365627a7a72315820e85af1fccc1de37a3684483d34d7aae419adc20e0af290e8501722e78e4de2006c6578706572696d656e74616cf564736f6c63430005100040";

type UnderwriterProxyAdminStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnderwriterProxyAdminStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnderwriterProxyAdminStorage__factory extends ContractFactory {
  constructor(...args: UnderwriterProxyAdminStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnderwriterProxyAdminStorage> {
    return super.deploy(
      overrides || {}
    ) as Promise<UnderwriterProxyAdminStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UnderwriterProxyAdminStorage {
    return super.attach(address) as UnderwriterProxyAdminStorage;
  }
  override connect(signer: Signer): UnderwriterProxyAdminStorage__factory {
    return super.connect(signer) as UnderwriterProxyAdminStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnderwriterProxyAdminStorageInterface {
    return new utils.Interface(_abi) as UnderwriterProxyAdminStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnderwriterProxyAdminStorage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UnderwriterProxyAdminStorage;
  }
}
