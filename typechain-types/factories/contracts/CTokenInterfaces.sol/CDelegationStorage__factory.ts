/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CDelegationStorage,
  CDelegationStorageInterface,
} from "../../../contracts/CTokenInterfaces.sol/CDelegationStorage";

const _abi = [
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
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060938061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c60da1b14602d575b600080fd5b6033604f565b604080516001600160a01b039092168252519081900360200190f35b6000546001600160a01b03168156fea265627a7a72315820414d0a176183a391dfcc7f41a78a6b9773a53c3ec6b8923f5af3159fd716842e64736f6c63430005100032";

type CDelegationStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CDelegationStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CDelegationStorage__factory extends ContractFactory {
  constructor(...args: CDelegationStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CDelegationStorage> {
    return super.deploy(overrides || {}) as Promise<CDelegationStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CDelegationStorage {
    return super.attach(address) as CDelegationStorage;
  }
  override connect(signer: Signer): CDelegationStorage__factory {
    return super.connect(signer) as CDelegationStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CDelegationStorageInterface {
    return new utils.Interface(_abi) as CDelegationStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CDelegationStorage {
    return new Contract(address, _abi, signerOrProvider) as CDelegationStorage;
  }
}
