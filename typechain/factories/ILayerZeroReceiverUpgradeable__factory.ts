/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ILayerZeroReceiverUpgradeable,
  ILayerZeroReceiverUpgradeableInterface,
} from "../ILayerZeroReceiverUpgradeable";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
      {
        internalType: "uint64",
        name: "_nonce",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ILayerZeroReceiverUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): ILayerZeroReceiverUpgradeableInterface {
    return new utils.Interface(_abi) as ILayerZeroReceiverUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ILayerZeroReceiverUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ILayerZeroReceiverUpgradeable;
  }
}
