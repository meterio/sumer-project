/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ComptrollerBorked,
  ComptrollerBorkedInterface,
} from "../../../../contracts/test/ComptrollerHarness.sol/ComptrollerBorked";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "contract IUnitroller",
        name: "unitroller",
        type: "address",
      },
      {
        internalType: "contract PriceOracle",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_closeFactorMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxAssets",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_reinitializing",
        type: "bool",
      },
    ],
    name: "_become",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610361806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806332000e0014610030575b600080fd5b61004361003e3660046101cd565b610045565b005b846001600160a01b031663f851a4406040518163ffffffff1660e01b815260040160206040518083038186803b15801561007e57600080fd5b505afa158015610092573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100b691908101906101a7565b6001600160a01b0316336001600160a01b0316146100ef5760405162461bcd60e51b81526004016100e6906102a9565b60405180910390fd5b846001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561012a57600080fd5b505af115801561013e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506101629190810190610242565b505050505050565b8051610175816102ec565b92915050565b803561017581610303565b80356101758161030c565b803561017581610315565b805161017581610315565b6000602082840312156101b957600080fd5b60006101c5848461016a565b949350505050565b600080600080600060a086880312156101e557600080fd5b60006101f18888610186565b955050602061020288828901610186565b945050604061021388828901610191565b935050606061022488828901610191565b92505060806102358882890161017b565b9150509295509295909350565b60006020828403121561025457600080fd5b60006101c5848461019c565b600061026d6027836102b9565b7f6f6e6c7920756e6974726f6c6c65722061646d696e2063616e206368616e676581526620627261696e7360c81b602082015260400192915050565b6020808252810161017581610260565b90815260200190565b6000610175826102dd565b151590565b6000610175826102c2565b6001600160a01b031690565b90565b6102f5816102c2565b811461030057600080fd5b50565b6102f5816102cd565b6102f5816102d2565b6102f5816102e956fea365627a7a72315820d16109e1d2e8720a1fcc8f058909d8d3c43fc28d4ebba34ecac747495d98fdc26c6578706572696d656e74616cf564736f6c63430005100040";

type ComptrollerBorkedConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerBorkedConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerBorked__factory extends ContractFactory {
  constructor(...args: ComptrollerBorkedConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ComptrollerBorked> {
    return super.deploy(overrides || {}) as Promise<ComptrollerBorked>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ComptrollerBorked {
    return super.attach(address) as ComptrollerBorked;
  }
  override connect(signer: Signer): ComptrollerBorked__factory {
    return super.connect(signer) as ComptrollerBorked__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerBorkedInterface {
    return new utils.Interface(_abi) as ComptrollerBorkedInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComptrollerBorked {
    return new Contract(address, _abi, signerOrProvider) as ComptrollerBorked;
  }
}