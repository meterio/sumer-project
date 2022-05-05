/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  InterestRateModelHarness,
  InterestRateModelHarnessInterface,
} from "../../../contracts/test/InterestRateModelHarness";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "borrowRate_",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "borrowRate",
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
    name: "failBorrowRate",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserves",
        type: "uint256",
      },
    ],
    name: "getBorrowRate",
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
        internalType: "uint256",
        name: "_cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserves",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveFactor",
        type: "uint256",
      },
    ],
    name: "getSupplyRate",
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
    name: "isInterestRateModel",
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
    name: "opaqueBorrowFailureCode",
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
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "borrowRate_",
        type: "uint256",
      },
    ],
    name: "setBorrowRate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bool",
        name: "failBorrowRate_",
        type: "bool",
      },
    ],
    name: "setFailBorrowRate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516102893803806102898339818101604052602081101561003357600080fd5b5051600155610242806100476000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063b81688161161005b578063b81688161461010d578063c4fd6b2d1461013c578063c914b43714610144578063dd3eaf041461014c57610088565b806315f240531461008d5780631f64eb4e146100c85780632191f92a146100e95780637ddeded114610105575b600080fd5b6100b6600480360360608110156100a357600080fd5b5080359060208101359060400135610169565b60408051918252519081900360200190f35b6100e7600480360360208110156100de57600080fd5b503515156101cd565b005b6100f16101e0565b604080519115158252519081900360200190f35b6100b66101e5565b6100b66004803603608081101561012357600080fd5b50803590602081013590604081013590606001356101ea565b6100f16101f9565b6100b6610202565b6100e76004803603602081101561016257600080fd5b5035610208565b6000805460ff16156101c2576040805162461bcd60e51b815260206004820152601960248201527f494e5445524553545f524154455f4d4f44454c5f4552524f5200000000000000604482015290519081900360640190fd5b506001549392505050565b6000805460ff1916911515919091179055565b600181565b601481565b60018054919003029392505050565b60005460ff1681565b60015481565b60015556fea265627a7a72315820e2404d9bf27b437b2f1d80f62383bbcb9dc641d9ebb18404925b5f0ae44d2d4f64736f6c63430005100032";

type InterestRateModelHarnessConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InterestRateModelHarnessConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InterestRateModelHarness__factory extends ContractFactory {
  constructor(...args: InterestRateModelHarnessConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    borrowRate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<InterestRateModelHarness> {
    return super.deploy(
      borrowRate_,
      overrides || {}
    ) as Promise<InterestRateModelHarness>;
  }
  override getDeployTransaction(
    borrowRate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(borrowRate_, overrides || {});
  }
  override attach(address: string): InterestRateModelHarness {
    return super.attach(address) as InterestRateModelHarness;
  }
  override connect(signer: Signer): InterestRateModelHarness__factory {
    return super.connect(signer) as InterestRateModelHarness__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InterestRateModelHarnessInterface {
    return new utils.Interface(_abi) as InterestRateModelHarnessInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InterestRateModelHarness {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as InterestRateModelHarness;
  }
}
