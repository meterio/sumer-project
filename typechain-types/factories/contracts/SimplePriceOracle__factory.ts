/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SimplePriceOracle,
  SimplePriceOracleInterface,
} from "../../contracts/SimplePriceOracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousPriceMantissa",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestedPriceMantissa",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPriceMantissa",
        type: "uint256",
      },
    ],
    name: "PricePosted",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "assetPrices",
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
        name: "cToken",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setDirectPrice",
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
        name: "cToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "underlyingPriceMantissa",
        type: "uint256",
      },
    ],
    name: "setUnderlyingPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506105ae806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806309a8acb01461005c578063127ffda01461008a5780635e9a523c146100b657806366331bba146100ee578063fc57d4df1461010a575b600080fd5b6100886004803603604081101561007257600080fd5b506001600160a01b038135169060200135610130565b005b610088600480360360408110156100a057600080fd5b506001600160a01b0381351690602001356101a8565b6100dc600480360360208110156100cc57600080fd5b50356001600160a01b031661028a565b60408051918252519081900360200190f35b6100f66102a9565b604080519115158252519081900360200190f35b6100dc6004803603602081101561012057600080fd5b50356001600160a01b03166102ae565b6001600160a01b038216600081815260208181526040918290205482519384529083015281810183905260608201839052517fdd71a1d19fcba687442a1d5c58578f1e409af71a79d10fd95a4d66efd8fa9ae79181900360800190a16001600160a01b03909116600090815260208190526040902055565b6000826001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b1580156101e357600080fd5b505afa1580156101f7573d6000803e3d6000fd5b505050506040513d602081101561020d57600080fd5b50516001600160a01b038116600081815260208181526040918290205482519384529083015281810185905260608201859052519192507fdd71a1d19fcba687442a1d5c58578f1e409af71a79d10fd95a4d66efd8fa9ae7919081900360800190a16001600160a01b031660009081526020819052604090205550565b6001600160a01b0381166000908152602081905260409020545b919050565b600181565b60006103f5826001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b1580156102ec57600080fd5b505afa158015610300573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052602081101561032957600080fd5b810190808051604051939291908464010000000082111561034957600080fd5b90830190602082018581111561035e57600080fd5b825164010000000081118282018810171561037857600080fd5b82525081516020918201929091019080838360005b838110156103a557818101518382015260200161038d565b50505050905090810190601f1680156103d25780820380516001836020036101000a031916815260200191505b506040818101905260048152630c68aa8960e31b60208201529250610492915050565b156104095750670de0b6b3a76400006102a4565b600080836001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b15801561044557600080fd5b505afa158015610459573d6000803e3d6000fd5b505050506040513d602081101561046f57600080fd5b50516001600160a01b0316815260208101919091526040016000205490506102a4565b6000816040516020018082805190602001908083835b602083106104c75780518252601f1990920191602091820191016104a8565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405160208183030381529060405280519060200120836040516020018082805190602001908083835b602083106105355780518252601f199092019160209182019101610516565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052805190602001201490509291505056fea265627a7a7231582087cf09715b9151c1b9538e81988108b2d26c1036375e21df1141811c1b0d225364736f6c63430005100032";

type SimplePriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimplePriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimplePriceOracle__factory extends ContractFactory {
  constructor(...args: SimplePriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SimplePriceOracle> {
    return super.deploy(overrides || {}) as Promise<SimplePriceOracle>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SimplePriceOracle {
    return super.attach(address) as SimplePriceOracle;
  }
  override connect(signer: Signer): SimplePriceOracle__factory {
    return super.connect(signer) as SimplePriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimplePriceOracleInterface {
    return new utils.Interface(_abi) as SimplePriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimplePriceOracle {
    return new Contract(address, _abi, signerOrProvider) as SimplePriceOracle;
  }
}
