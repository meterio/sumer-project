/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FeedPriceOracle,
  FeedPriceOracleInterface,
} from "../../../contracts/FeedPriceOracle.sol/FeedPriceOracle";

const _abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    name: "feeds",
    outputs: [
      {
        internalType: "uint8",
        name: "source",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "feedDecimals",
        type: "uint8",
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
    name: "fixedPrices",
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
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "getFeed",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "source",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "tokenDecimals",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "feedDecimals",
            type: "uint8",
          },
        ],
        internalType: "struct FeedPriceOracle.FeedData",
        name: "",
        type: "tuple",
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
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "getFixedPrice",
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
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "getUnderlyingPrice",
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
    name: "isPriceOracle",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
    name: "owner",
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
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "removeFeed",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "removeFixedPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenDecimals_",
        type: "uint8",
      },
    ],
    name: "setFeed",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setFixedPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenDecimals_",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "feedDecimals_",
        type: "uint8",
      },
    ],
    name: "setWitnetFeed",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610c91806100326000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80634b90fd691161008c578063a6f9dae111610066578063a6f9dae1146101b8578063ae10561b146101cb578063e983fe25146101de578063fc57d4df146101f1576100cf565b80634b90fd691461017b57806366331bba1461018e5780638da5cb5b146101a3576100cf565b80630c1502eb146100d457806316b8e731146100fd5780631badc89a1461011d5780631e922ea6146101325780632ef91c87146101455780632fba4aa914610158575b600080fd5b6100e76100e2366004610902565b610204565b6040516100f49190610b97565b60405180910390f35b61011061010b366004610902565b610223565b6040516100f49190610b89565b61013061012b3660046109ce565b61028b565b005b610130610140366004610902565b6102da565b61013061015336600461096d565b61031e565b61016b6101663660046108dc565b6103ec565b6040516100f49493929190610ba5565b610130610189366004610902565b610425565b610196610476565b6040516100f49190610b4b565b6101ab61047b565b6040516100f49190610b3d565b6101306101c63660046108dc565b61048a565b6101306101d9366004610920565b6104fc565b6100e76101ec3660046108dc565b6105c9565b6100e76101ff366004610902565b6105db565b6001600160a01b0381166000908152600260205260409020545b919050565b61022b61086d565b506001600160a01b039081166000908152600160209081526040918290208251608081018452905460ff8082168352610100820490951692820192909252600160a81b8204841692810192909252600160b01b9004909116606082015290565b6000546001600160a01b031633146102be5760405162461bcd60e51b81526004016102b590610b79565b60405180910390fd5b6001600160a01b03909116600090815260026020526040902055565b6000546001600160a01b031633146103045760405162461bcd60e51b81526004016102b590610b79565b6001600160a01b0316600090815260026020526040812055565b6000546001600160a01b031633146103485760405162461bcd60e51b81526004016102b590610b79565b60408051608081018252600281526001600160a01b03948516602080830191825260ff958616838501908152948616606084019081529787166000908152600190915292909220905181549251935196518516600160b01b0260ff60b01b19978616600160a81b0260ff60a81b199590971661010002610100600160a81b03199290961660ff19909416939093171693909317919091169290921792909216179055565b60016020526000908152604090205460ff808216916001600160a01b0361010082041691600160a81b8204811691600160b01b90041684565b6000546001600160a01b0316331461044f5760405162461bcd60e51b81526004016102b590610b79565b6001600160a01b0316600090815260016020526040902080546001600160b81b0319169055565b600181565b6000546001600160a01b031681565b6000546001600160a01b031633146104b45760405162461bcd60e51b81526004016102b590610b79565b6001600160a01b0381166104da5760405162461bcd60e51b81526004016102b590610b69565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146105265760405162461bcd60e51b81526004016102b590610b79565b6040805160808101825260018082526001600160a01b03948516602080840191825260ff95861684860190815260006060860181815299891681529390915293909120915182549151935196518516600160b01b0260ff60b01b19978616600160a81b0260ff60a81b199590971661010002610100600160a81b03199290961660ff19909316929092171693909317919091169290921792909216919091179055565b60026020526000908152604090205481565b60006105e561086d565b506001600160a01b038083166000908152600160209081526040918290208251608081018452905460ff80821683526101008204909516928201839052600160a81b8104851693820193909352600160b01b9092049092166060820152901561085057805160ff166001141561078157600081602001516001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561069457600080fd5b505afa1580156106a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506106cc9190810190610a26565b82604001516024030360ff169050602460ff168111156106fe5760405162461bcd60e51b81526004016102b590610b59565b80600a0a82602001516001600160a01b03166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561073f57600080fd5b505afa158015610753573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506107779190810190610a08565b029250505061021e565b805160ff1660021415610850576000816060015182604001516024030360ff169050602460ff168111156107c75760405162461bcd60e51b81526004016102b590610b59565b600082602001516001600160a01b031663053f14da6040518163ffffffff1660e01b815260040160206040518083038186803b15801561080657600080fd5b505afa15801561081a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061083e9190810190610a08565b905081600a0a8102935050505061021e565b50506001600160a01b031660009081526002602052604090205490565b60408051608081018252600080825260208201819052918101829052606081019190915290565b803561089f81610c1c565b92915050565b803561089f81610c33565b805161089f81610c3c565b803561089f81610c3c565b803561089f81610c45565b805161089f81610c45565b6000602082840312156108ee57600080fd5b60006108fa8484610894565b949350505050565b60006020828403121561091457600080fd5b60006108fa84846108a5565b60008060006060848603121561093557600080fd5b600061094186866108a5565b935050602061095286828701610894565b9250506040610963868287016108c6565b9150509250925092565b6000806000806080858703121561098357600080fd5b600061098f87876108a5565b94505060206109a087828801610894565b93505060406109b1878288016108c6565b92505060606109c2878288016108c6565b91505092959194509250565b600080604083850312156109e157600080fd5b60006109ed85856108a5565b92505060206109fe858286016108bb565b9150509250929050565b600060208284031215610a1a57600080fd5b60006108fa84846108b0565b600060208284031215610a3857600080fd5b60006108fa84846108d1565b610a4d81610bec565b82525050565b610a4d81610bf7565b6000610a69601183610be3565b70444543494d414c20554e444552464c4f5760781b815260200192915050565b6000610a96601083610be3565b6f41646472657373206973205a65726f2160801b815260200192915050565b6000610ac2600a83610be3565b6927a7262c9027aba722a960b11b815260200192915050565b80516080830190610aec8482610b34565b506020820151610aff6020850182610a44565b506040820151610b126040850182610b34565b506060820151610b256060850182610b34565b50505050565b610a4d81610c07565b610a4d81610c16565b6020810161089f8284610a44565b6020810161089f8284610a53565b6020808252810161089f81610a5c565b6020808252810161089f81610a89565b6020808252810161089f81610ab5565b6080810161089f8284610adb565b6020810161089f8284610b2b565b60808101610bb38287610b34565b610bc06020830186610a44565b610bcd6040830185610b34565b610bda6060830184610b34565b95945050505050565b90815260200190565b600061089f82610c0a565b151590565b600061089f82610bec565b90565b6001600160a01b031690565b60ff1690565b610c2581610bec565b8114610c3057600080fd5b50565b610c2581610bfc565b610c2581610c07565b610c2581610c1656fea365627a7a723158208bfb12b0e7d04489647f6e02c2a93759877590cf0614ad226970455db21a20696c6578706572696d656e74616cf564736f6c63430005100040";

type FeedPriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FeedPriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FeedPriceOracle__factory extends ContractFactory {
  constructor(...args: FeedPriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FeedPriceOracle> {
    return super.deploy(overrides || {}) as Promise<FeedPriceOracle>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FeedPriceOracle {
    return super.attach(address) as FeedPriceOracle;
  }
  override connect(signer: Signer): FeedPriceOracle__factory {
    return super.connect(signer) as FeedPriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeedPriceOracleInterface {
    return new utils.Interface(_abi) as FeedPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeedPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as FeedPriceOracle;
  }
}
