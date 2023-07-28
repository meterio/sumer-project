/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VotingEscrow, VotingEscrowInterface } from "../VotingEscrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "balget_last_user_slopeanceOf",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "locked",
    outputs: [
      {
        components: [
          {
            internalType: "int128",
            name: "amount",
            type: "int128",
          },
          {
            internalType: "uint256",
            name: "end",
            type: "uint256",
          },
        ],
        internalType: "struct LockedBalance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "locked__end",
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
];

export class VotingEscrow__factory {
  static readonly abi = _abi;
  static createInterface(): VotingEscrowInterface {
    return new utils.Interface(_abi) as VotingEscrowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VotingEscrow {
    return new Contract(address, _abi, signerOrProvider) as VotingEscrow;
  }
}
