/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UnitrollerAdminStorage,
  UnitrollerAdminStorageInterface,
} from "../../../contracts/ComptrollerStorage.sol/UnitrollerAdminStorage";

const _abi = [
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
  "0x608060405234801561001057600080fd5b50610101806100206000396000f3fe6080604052348015600f57600080fd5b506004361060505760003560e01c80632408d5f014605557806326782247146083578063bb82aa5e146095578063dcfbc0c71460a7578063f851a4401460b9575b600080fd5b6004546067906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6001546067906001600160a01b031681565b6002546067906001600160a01b031681565b6003546067906001600160a01b031681565b6000546067906001600160a01b03168156fea26469706673582212204292dbd17489d74ec45b1c27b003b3cc9083bb36489f022c1975e46081110c4c64736f6c63430008040033";

type UnitrollerAdminStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnitrollerAdminStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnitrollerAdminStorage__factory extends ContractFactory {
  constructor(...args: UnitrollerAdminStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnitrollerAdminStorage> {
    return super.deploy(overrides || {}) as Promise<UnitrollerAdminStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UnitrollerAdminStorage {
    return super.attach(address) as UnitrollerAdminStorage;
  }
  override connect(signer: Signer): UnitrollerAdminStorage__factory {
    return super.connect(signer) as UnitrollerAdminStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnitrollerAdminStorageInterface {
    return new utils.Interface(_abi) as UnitrollerAdminStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnitrollerAdminStorage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UnitrollerAdminStorage;
  }
}
