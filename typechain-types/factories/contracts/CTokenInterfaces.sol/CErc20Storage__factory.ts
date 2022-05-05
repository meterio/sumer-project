/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CErc20Storage,
  CErc20StorageInterface,
} from "../../../contracts/CTokenInterfaces.sol/CErc20Storage";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "underlying",
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
  "0x6080604052348015600f57600080fd5b5060938061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80636f307dc314602d575b600080fd5b6033604f565b604080516001600160a01b039092168252519081900360200190f35b6000546001600160a01b03168156fea265627a7a72315820ce8bda6b529fb73b0fea9237503c631ba784b69c3067518c655dca955e199dba64736f6c63430005100032";

type CErc20StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CErc20StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CErc20Storage__factory extends ContractFactory {
  constructor(...args: CErc20StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CErc20Storage> {
    return super.deploy(overrides || {}) as Promise<CErc20Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CErc20Storage {
    return super.attach(address) as CErc20Storage;
  }
  override connect(signer: Signer): CErc20Storage__factory {
    return super.connect(signer) as CErc20Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CErc20StorageInterface {
    return new utils.Interface(_abi) as CErc20StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CErc20Storage {
    return new Contract(address, _abi, signerOrProvider) as CErc20Storage;
  }
}
