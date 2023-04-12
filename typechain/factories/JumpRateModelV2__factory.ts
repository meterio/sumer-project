/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  JumpRateModelV2,
  JumpRateModelV2Interface,
} from "../JumpRateModelV2";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blocksPerYearOnChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseRatePerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplierPerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jumpMultiplierPerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "kink_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "baseRatePerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "multiplierPerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jumpMultiplierPerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "kink",
        type: "uint256",
      },
    ],
    name: "NewInterestParams",
    type: "event",
  },
  {
    inputs: [],
    name: "baseRatePerBlock",
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
    name: "blocksPerYear",
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
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveFactorMantissa",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isInterestRateModel",
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
    name: "jumpMultiplierPerBlock",
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
    name: "kink",
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
    name: "multiplierPerBlock",
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
    name: "owner",
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
        name: "baseRatePerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplierPerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jumpMultiplierPerYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "kink_",
        type: "uint256",
      },
    ],
    name: "updateJumpRateModel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrows",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
    ],
    name: "utilizationRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162000b3d38038062000b3d83398101604081905262000034916200027f565b600080546001600160a01b0319166001600160a01b03831617905560808690528585858585856200006986868686866200007b565b5050505050505050505050506200038e565b6200009585856200016560201b620003001790919060201c565b600255620000ea620000b48683620001b8602090811b6200034b17901c565b620000d6670de0b6b3a764000086620001b860201b6200034b1790919060201c565b6200016560201b620003001790919060201c565b60015562000105828662000165602090811b6200030017901c565b60038190556004829055600254600154604080519283526020830191909152810191909152606081018290527f6960ab234c7ef4b0c9197100f5393cfcde7c453ac910a27bd2000aa1dd4c068d9060800160405180910390a15050505050565b6000620001af83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506200024360201b60201c565b90505b92915050565b600082620001c957506000620001b2565b6000620001d78385620002e5565b905082620001e6858362000313565b14620001af5760405162461bcd60e51b815260206004820152602160248201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f6044820152607760f81b60648201526084015b60405180910390fd5b60008183620002675760405162461bcd60e51b81526004016200023a919062000336565b50600062000276848662000313565b95945050505050565b60008060008060008060c087890312156200029957600080fd5b86516020880151604089015160608a015160808b015160a08c0151949a50929850909650945092506001600160a01b0381168114620002d757600080fd5b809150509295509295509295565b60008160001904831182151516156200030e57634e487b7160e01b600052601160045260246000fd5b500290565b6000826200033157634e487b7160e01b600052601260045260246000fd5b500490565b600060208083528351808285015260005b81811015620003655785810183015185820160400152820162000347565b8181111562000378576000604083870101525b50601f01601f1916929092016040019392505050565b60805161078c620003b16000396000818161014d0152610227015261078c6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638da5cb5b116100715780638da5cb5b1461011d578063a385fb9614610148578063b81688161461016f578063b9f9850a14610182578063f14039de1461018b578063fd2da3391461019457600080fd5b806315f24053146100ae5780632037f3e7146100d45780632191f92a146100e95780636e71e2d8146101015780638726bb8914610114575b600080fd5b6100c16100bc36600461061d565b61019d565b6040519081526020015b60405180910390f35b6100e76100e2366004610649565b6101b4565b005b6100f1600181565b60405190151581526020016100cb565b6100c161010f36600461061d565b610255565b6100c160015481565b600054610130906001600160a01b031681565b6040516001600160a01b0390911681526020016100cb565b6100c17f000000000000000000000000000000000000000000000000000000000000000081565b6100c161017d366004610649565b610293565b6100c160035481565b6100c160025481565b6100c160045481565b60006101aa8484846103ca565b90505b9392505050565b6000546001600160a01b031633146102225760405162461bcd60e51b815260206004820152602660248201527f6f6e6c7920746865206f776e6572206d61792063616c6c20746869732066756e60448201526531ba34b7b71760d11b60648201526084015b60405180910390fd5b61024f7f00000000000000000000000000000000000000000000000000000000000000008585858561048d565b50505050565b600082610264575060006101ad565b6101aa61027b836102758787610514565b90610573565b61028d85670de0b6b3a764000061034b565b90610300565b6000806102a8670de0b6b3a764000084610573565b905060006102b78787876103ca565b905060006102d1670de0b6b3a764000061028d848661034b565b90506102f4670de0b6b3a764000061028d836102ee8c8c8c610255565b9061034b565b98975050505050505050565b600061034283836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506105b5565b90505b92915050565b60008261035a57506000610345565b60006103668385610691565b90508261037385836106b0565b146103425760405162461bcd60e51b815260206004820152602160248201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f6044820152607760f81b6064820152608401610219565b6000806103d8858585610255565b905060045481116104185761041060025461040a670de0b6b3a764000061028d6001548661034b90919063ffffffff16565b90610514565b9150506101ad565b600061044360025461040a670de0b6b3a764000061028d60015460045461034b90919063ffffffff16565b9050600061045c6004548461057390919063ffffffff16565b90506104838261040a670de0b6b3a764000061028d6003548661034b90919063ffffffff16565b93505050506101ad565b6104978486610300565b6002556104a761027b868361034b565b6001556104b48286610300565b60038190556004829055600254600154604080519283526020830191909152810191909152606081018290527f6960ab234c7ef4b0c9197100f5393cfcde7c453ac910a27bd2000aa1dd4c068d9060800160405180910390a15050505050565b60008061052183856106d2565b9050838110156103425760405162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006044820152606401610219565b600061034283836040518060400160405280601f81526020017f536166654d6174683a207375627472616374696f6e20756e646572666c6f77008152506105ec565b600081836105d65760405162461bcd60e51b815260040161021991906106ea565b5060006105e384866106b0565b95945050505050565b600081848411156106105760405162461bcd60e51b815260040161021991906106ea565b5060006105e3848661073f565b60008060006060848603121561063257600080fd5b505081359360208301359350604090920135919050565b6000806000806080858703121561065f57600080fd5b5050823594602084013594506040840135936060013592509050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156106ab576106ab61067b565b500290565b6000826106cd57634e487b7160e01b600052601260045260246000fd5b500490565b600082198211156106e5576106e561067b565b500190565b600060208083528351808285015260005b81811015610717578581018301518582016040015282016106fb565b81811115610729576000604083870101525b50601f01601f1916929092016040019392505050565b6000828210156107515761075161067b565b50039056fea2646970667358221220360a79d4a8c862219a74c629f9e278fa96db5487353661460952c2165f1ee39164736f6c634300080b0033";

export class JumpRateModelV2__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    blocksPerYearOnChain: BigNumberish,
    baseRatePerYear: BigNumberish,
    multiplierPerYear: BigNumberish,
    jumpMultiplierPerYear: BigNumberish,
    kink_: BigNumberish,
    owner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<JumpRateModelV2> {
    return super.deploy(
      blocksPerYearOnChain,
      baseRatePerYear,
      multiplierPerYear,
      jumpMultiplierPerYear,
      kink_,
      owner_,
      overrides || {}
    ) as Promise<JumpRateModelV2>;
  }
  getDeployTransaction(
    blocksPerYearOnChain: BigNumberish,
    baseRatePerYear: BigNumberish,
    multiplierPerYear: BigNumberish,
    jumpMultiplierPerYear: BigNumberish,
    kink_: BigNumberish,
    owner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      blocksPerYearOnChain,
      baseRatePerYear,
      multiplierPerYear,
      jumpMultiplierPerYear,
      kink_,
      owner_,
      overrides || {}
    );
  }
  attach(address: string): JumpRateModelV2 {
    return super.attach(address) as JumpRateModelV2;
  }
  connect(signer: Signer): JumpRateModelV2__factory {
    return super.connect(signer) as JumpRateModelV2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JumpRateModelV2Interface {
    return new utils.Interface(_abi) as JumpRateModelV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JumpRateModelV2 {
    return new Contract(address, _abi, signerOrProvider) as JumpRateModelV2;
  }
}
