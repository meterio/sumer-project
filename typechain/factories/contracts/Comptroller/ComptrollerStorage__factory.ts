/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ComptrollerStorage,
  ComptrollerStorageInterface,
} from "../../../contracts/Comptroller/ComptrollerStorage";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MarketEntered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MarketExited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "MarketListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldCloseFactorMantissa",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCloseFactorMantissa",
        type: "uint256",
      },
    ],
    name: "NewCloseFactor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldHeteroIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newHeteroIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldHomoIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newHomoIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldSutokenIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newSutokenIncentive",
        type: "uint256",
      },
    ],
    name: "NewLiquidationIncentive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldPriceOracle",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPriceOracle",
        type: "address",
      },
    ],
    name: "NewPriceOracle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SetMaxSupply",
    type: "event",
  },
  {
    inputs: [],
    name: "_borrowGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_mintGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accountAssets",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allMarkets",
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
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "assetGroupIdToIndex",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowCapGuardian",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "borrowCaps",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "borrowGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeFactorMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governanceToken",
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
    name: "heteroLiquidationIncentiveMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "homoLiquidationIncentiveMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isComptroller",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "bool",
        name: "isListed",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "assetGroupId",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isComped",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mintGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseGuardian",
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
    name: "seizeGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "suTokenRateMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sutokenLiquidationIncentiveMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "transferGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001657610540908161001c8239f35b600080fdfe60806040818152600436101561001457600080fd5b600091823560e01c9081627e3dd2146104d45750806321af4569146104ac57806324a3d622146104845780633c94786f1461045e57806347bd11ad146104405780634a584432146104095780634ede8e6a146103eb57806352d84d1e146103935780636d154ea514610356578063731f0c2b1461031957806387f76303146102f35780638e8f294b1461029b5780639cc7becf14610264578063ac0b0bb71461023e578063ce8b680514610220578063d1eb167e146101e5578063dce1544914610193578063e6653f3d1461016d578063e875544614610151578063e8762110146101335763f96dae0a1461010857600080fd5b3461012f578160031936011261012f5760085490516001600160a01b039091168152602090f35b5080fd5b503461012f578160031936011261012f576020906007549051908152f35b503461012f578160031936011261012f57602091549051908152f35b503461012f578160031936011261012f5760209060ff600c5460a81c1690519015158152f35b503461012f578060031936011261012f576101ac6104ef565b6001600160a01b0390811683526002602052818320805460243591908210156101e15784526020938490200154915191168152f35b8480fd5b503461012f57602036600319011261012f5760043560ff811680910361021c57818360ff9260209552600b85522054169051908152f35b8280fd5b503461012f578160031936011261012f576020906001549051908152f35b503461012f578160031936011261012f5760209060ff600c5460b81c1690519015158152f35b503461012f57602036600319011261012f5760209181906001600160a01b0361028b6104ef565b1681526005845220549051908152f35b503461012f57602036600319011261012f5760609181906001600160a01b036102c26104ef565b1681526003602052209060ff600283549301541660ff8251938181161515855260081c166020840152151590820152f35b503461012f578160031936011261012f5760209060ff600c5460b01c1690519015158152f35b503461012f57602036600319011261012f5760209160ff9082906001600160a01b036103436104ef565b168152600d855220541690519015158152f35b503461012f57602036600319011261012f5760209160ff9082906001600160a01b036103806104ef565b168152600e855220541690519015158152f35b503461012f57602036600319011261012f5760043560045481101561021c5760046020935260018060a01b03907f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0154169051908152f35b503461012f578160031936011261012f576020906006549051908152f35b503461012f57602036600319011261012f5760209181906001600160a01b036104306104ef565b1681526010845220549051908152f35b503461012f578160031936011261012f576020906009549051908152f35b503461012f578160031936011261012f5760209060ff600c5460a01c1690519015158152f35b503461012f578160031936011261012f57600c5490516001600160a01b039091168152602090f35b503461012f578160031936011261012f57600f5490516001600160a01b039091168152602090f35b83903461012f578160031936011261012f5780600160209252f35b600435906001600160a01b038216820361050557565b600080fdfea26469706673582212206c556eae46d71c78e2074e6a6d902ddf4286bff926461963446dcc7353661cdc64736f6c63430008130033";

type ComptrollerStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComptrollerStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComptrollerStorage__factory extends ContractFactory {
  constructor(...args: ComptrollerStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ComptrollerStorage & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ComptrollerStorage__factory {
    return super.connect(runner) as ComptrollerStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComptrollerStorageInterface {
    return new Interface(_abi) as ComptrollerStorageInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ComptrollerStorage {
    return new Contract(address, _abi, runner) as unknown as ComptrollerStorage;
  }
}
