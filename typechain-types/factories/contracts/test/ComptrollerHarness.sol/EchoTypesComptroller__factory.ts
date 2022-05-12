/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  EchoTypesComptroller,
  EchoTypesComptrollerInterface,
} from "../../../../contracts/test/ComptrollerHarness.sol/EchoTypesComptroller";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "a",
        type: "address",
      },
    ],
    name: "addresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "pure",
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
    constant: false,
    inputs: [
      {
        internalType: "address payable",
        name: "unitroller",
        type: "address",
      },
    ],
    name: "becomeBrains",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bool",
        name: "b",
        type: "bool",
      },
    ],
    name: "booly",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "pure",
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
        internalType: "uint256[]",
        name: "u",
        type: "uint256[]",
      },
    ],
    name: "listOInts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "pure",
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
    constant: false,
    inputs: [],
    name: "reverty",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "s",
        type: "string",
      },
    ],
    name: "stringy",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b506106b3806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638d2c913c116100715780638d2c913c1461011d578063ba3cca6914610127578063bb82aa5e1461013a578063bd96b51614610142578063dcfbc0c71461015d578063f851a44014610165576100a9565b80632408d5f0146100ae57806326782247146100cc5780634bdd1eaf146100d457806374b0b7df146100f457806382d389541461010f575b600080fd5b6100b661016d565b6040516100c3919061050d565b60405180910390f35b6100b661017c565b6100e76100e2366004610379565b61018b565b6040516100c3919061051b565b6101026100e23660046103cc565b6040516100c39190610541565b6100b66100e2366004610353565b61012561018e565b005b610125610135366004610353565b6101af565b6100b6610226565b6101506100e23660046103ae565b6040516100c39190610533565b6100b6610235565b6100b6610244565b6004546001600160a01b031681565b6001546001600160a01b031681565b90565b60405162461bcd60e51b81526004016101a690610552565b60405180910390fd5b806001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156101ea57600080fd5b505af11580156101fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506102229190810190610401565b5050565b6002546001600160a01b031681565b6003546001600160a01b031681565b6000546001600160a01b031681565b803561025e81610647565b92915050565b600082601f83011261027557600080fd5b813561028861028382610589565b610562565b915081818352602084019350602081019050838560208402820111156102ad57600080fd5b60005b838110156102d957816102c3888261033d565b84525060209283019291909101906001016102b0565b5050505092915050565b803561025e8161065e565b600082601f8301126102ff57600080fd5b813561030d610283826105aa565b9150808252602083016020830185838301111561032957600080fd5b610334838284610601565b50505092915050565b803561025e81610667565b805161025e81610667565b60006020828403121561036557600080fd5b60006103718484610253565b949350505050565b60006020828403121561038b57600080fd5b813567ffffffffffffffff8111156103a257600080fd5b61037184828501610264565b6000602082840312156103c057600080fd5b600061037184846102e3565b6000602082840312156103de57600080fd5b813567ffffffffffffffff8111156103f557600080fd5b610371848285016102ee565b60006020828403121561041357600080fd5b60006103718484610348565b600061042b8383610504565b505060200190565b61043c816105e5565b82525050565b600061044d826105d8565b61045781856105dc565b9350610462836105d2565b8060005b8381101561049057815161047a888261041f565b9750610485836105d2565b925050600101610466565b509495945050505050565b61043c816105f0565b60006104af826105d8565b6104b981856105dc565b93506104c981856020860161060d565b6104d28161063d565b9093019392505050565b60006104e9600c836105dc565b6b676f74636861207375636b6160a01b815260200192915050565b61043c8161018b565b6020810161025e8284610433565b6020808252810161052c8184610442565b9392505050565b6020810161025e828461049b565b6020808252810161052c81846104a4565b6020808252810161025e816104dc565b60405181810167ffffffffffffffff8111828210171561058157600080fd5b604052919050565b600067ffffffffffffffff8211156105a057600080fd5b5060209081020190565b600067ffffffffffffffff8211156105c157600080fd5b506020601f91909101601f19160190565b60200190565b5190565b90815260200190565b600061025e826105f5565b151590565b6001600160a01b031690565b82818337506000910152565b60005b83811015610628578181015183820152602001610610565b83811115610637576000848401525b50505050565b601f01601f191690565b610650816105e5565b811461065b57600080fd5b50565b610650816105f0565b6106508161018b56fea365627a7a72315820e155c07589aaeadd5d9631e9b8d708d43a208ceb9cfef9b4e56c908fff0236d86c6578706572696d656e74616cf564736f6c63430005100040";

type EchoTypesComptrollerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EchoTypesComptrollerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EchoTypesComptroller__factory extends ContractFactory {
  constructor(...args: EchoTypesComptrollerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EchoTypesComptroller> {
    return super.deploy(overrides || {}) as Promise<EchoTypesComptroller>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EchoTypesComptroller {
    return super.attach(address) as EchoTypesComptroller;
  }
  override connect(signer: Signer): EchoTypesComptroller__factory {
    return super.connect(signer) as EchoTypesComptroller__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EchoTypesComptrollerInterface {
    return new utils.Interface(_abi) as EchoTypesComptrollerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EchoTypesComptroller {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as EchoTypesComptroller;
  }
}
