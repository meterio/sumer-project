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
  "0x608060405234801561001057600080fd5b5061069e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c80632408d5f01461009e57806326782247146100bc5780634bdd1eaf146100c457806374b0b7df146100e457806382d38954146100ff5780638d2c913c1461010d578063ba3cca6914610117578063bb82aa5e1461012a578063bd96b51614610132578063dcfbc0c71461014d578063f851a44014610155575b600080fd5b6100a661015d565b6040516100b391906104fb565b60405180910390f35b6100a661016c565b6100d76100d2366004610369565b61017b565b6040516100b39190610509565b6100f26100d23660046103bb565b6040516100b3919061052f565b6100a66100d2366004610343565b61011561017e565b005b610115610125366004610343565b61019f565b6100a6610216565b6101406100d236600461039d565b6040516100b39190610521565b6100a6610225565b6100a6610234565b6004546001600160a01b031681565b6001546001600160a01b031681565b90565b60405162461bcd60e51b815260040161019690610540565b60405180910390fd5b806001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156101da57600080fd5b505af11580156101ee573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061021291908101906103ef565b5050565b6002546001600160a01b031681565b6003546001600160a01b031681565b6000546001600160a01b031681565b803561024e81610632565b92915050565b600082601f83011261026557600080fd5b813561027861027382610576565b610550565b9150818183526020840193506020810190508385602084028201111561029d57600080fd5b60005b838110156102c957816102b3888261032d565b84525060209283019291909101906001016102a0565b5050505092915050565b803561024e81610649565b600082601f8301126102ef57600080fd5b81356102fd61027382610596565b9150808252602083016020830185838301111561031957600080fd5b6103248382846105ec565b50505092915050565b803561024e81610652565b805161024e81610652565b60006020828403121561035557600080fd5b60006103618484610243565b949350505050565b60006020828403121561037b57600080fd5b81356001600160401b0381111561039157600080fd5b61036184828501610254565b6000602082840312156103af57600080fd5b600061036184846102d3565b6000602082840312156103cd57600080fd5b81356001600160401b038111156103e357600080fd5b610361848285016102de565b60006020828403121561040157600080fd5b60006103618484610338565b600061041983836104f2565b505060200190565b61042a816105d0565b82525050565b600061043b826105c3565b61044581856105c7565b9350610450836105bd565b8060005b8381101561047e578151610468888261040d565b9750610473836105bd565b925050600101610454565b509495945050505050565b61042a816105db565b600061049d826105c3565b6104a781856105c7565b93506104b78185602086016105f8565b6104c081610628565b9093019392505050565b60006104d7600c836105c7565b6b676f74636861207375636b6160a01b815260200192915050565b61042a8161017b565b6020810161024e8284610421565b6020808252810161051a8184610430565b9392505050565b6020810161024e8284610489565b6020808252810161051a8184610492565b6020808252810161024e816104ca565b6040518181016001600160401b038111828210171561056e57600080fd5b604052919050565b60006001600160401b0382111561058c57600080fd5b5060209081020190565b60006001600160401b038211156105ac57600080fd5b506020601f91909101601f19160190565b60200190565b5190565b90815260200190565b600061024e826105e0565b151590565b6001600160a01b031690565b82818337506000910152565b60005b838110156106135781810151838201526020016105fb565b83811115610622576000848401525b50505050565b601f01601f191690565b61063b816105d0565b811461064657600080fd5b50565b61063b816105db565b61063b8161017b56fea365627a7a72315820b4376803cc736b9211f2d2371d14616f7f3fc9afc08fdd2fa44bce0b6556d9646c6578706572696d656e74616cf564736f6c63430005100040";

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
