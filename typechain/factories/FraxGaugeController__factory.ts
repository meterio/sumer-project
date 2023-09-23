/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FraxGaugeController,
  FraxGaugeControllerInterface,
} from "../FraxGaugeController";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_voting_escrow",
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
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "type_id",
        type: "int128",
      },
    ],
    name: "AddType",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "ApplyOwnership",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "CommitOwnership",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "gauge_type",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "NewGauge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "gauge_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "total_weight",
        type: "uint256",
      },
    ],
    name: "NewGaugeWeight",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int128",
        name: "type_id",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "total_weight",
        type: "uint256",
      },
    ],
    name: "NewTypeWeight",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "gauge_addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "VoteForGauge",
    type: "event",
  },
  {
    inputs: [],
    name: "MULTIPLIER",
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
    name: "WEEK",
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
    name: "WEIGHT_VOTE_DELAY",
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
      {
        internalType: "int128",
        name: "gauge_type",
        type: "int128",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "add_gauge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "add_type",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
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
    name: "apply_transfer_ownership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "change_gauge_weight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "new_rate",
        type: "uint256",
      },
    ],
    name: "change_global_emission_rate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int128",
        name: "type_id",
        type: "int128",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "change_type_weight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "changes_sum",
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "changes_weight",
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
    name: "checkpoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "checkpoint_gauge",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "commit_transfer_ownership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "future_admin",
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
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "gauge_relative_weight",
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
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "gauge_relative_weight_write",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    name: "gauge_type_names",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "gauge_types",
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
        name: "",
        type: "address",
      },
    ],
    name: "gauge_types_",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gauges",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "get_corrected_info",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bias",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slope",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lock_end",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fxs_amount",
            type: "uint256",
          },
        ],
        internalType: "struct CorrectedPoint",
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
    name: "get_gauge_weight",
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
    name: "get_total_weight",
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
        internalType: "int128",
        name: "type_id",
        type: "int128",
      },
    ],
    name: "get_type_weight",
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
        internalType: "int128",
        name: "type_id",
        type: "int128",
      },
    ],
    name: "get_weights_sum_per_type",
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
    name: "global_emission_rate",
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "last_user_vote",
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
    name: "n_gauge_types",
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
    inputs: [],
    name: "n_gauges",
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
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "points_sum",
    outputs: [
      {
        internalType: "uint256",
        name: "bias",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slope",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "points_total",
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
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "points_type_weight",
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "points_weight",
    outputs: [
      {
        internalType: "uint256",
        name: "bias",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slope",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "time_sum",
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
    name: "time_total",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "time_type_weight",
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
    name: "time_weight",
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
    name: "token",
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
        name: "_gauge_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_user_weight",
        type: "uint256",
      },
    ],
    name: "vote_for_gauge_weights",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "vote_user_power",
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vote_user_slopes",
    outputs: [
      {
        internalType: "uint256",
        name: "slope",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "power",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voting_escrow",
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
];

const _bytecode =
  "0x6080346200016157601f620026e838819003918201601f19168301916001600160401b038311848410176200016657808492604094855283398101031262000161576200005a602062000052836200017c565b92016200017c565b600480546001600160801b0319166001179055670de0b6b3a76400006006556001600160a01b0391821691908215620001325716908115620000fb5760018060a01b03199033826000541617600055816002541617600255600354161760035562093a80804204818102918183041490151715620000e5576005556040516125569081620001928239f35b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b815260206004820152600f60248201526e215f766f74696e675f657363726f7760881b6044820152606490fd5b60405162461bcd60e51b815260206004820152600760248201526610afba37b5b2b760c91b6044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620001615756fe6080604052600436101561001257600080fd5b60003560e01c806301c082101461199b578063059f8b16146119785780630a3be7571461195a5780630f467f98146118ef5780631142916b146118c057806317f7182a1461189757806318dfe921146115cb5780632a327fd7146115785780633f9095b714611522578063411e74b5146114e55780634e791a3a1461148f5780634f6ffd0714611471578063513872bd1461145357806351ce6b59146114215780635a549158146113ef578063615e5237146113c55780636472eee11461138b5780636977ff921461135c5780636a1c05ae146112b65780636a41ac7f146112715780636b441a40146111f85780636f214a6a1461119857806372fdccfa146111385780637e418fa0146110e457806392d0d23214610ea85780639d3d023014610e5d5780639fba03a114610e3c578063a4d7a25014610dff578063a9b48c0114610db1578063afd2bb4914610d6c578063b053918714610d33578063b94b89da14610cf3578063c2c4c5c114610cd8578063d3078c9414610ca9578063d4d2646e14610afd578063d713632814610436578063d958a8fc14610352578063db1ca26014610316578063dfe05031146102ed578063e93841d0146102c9578063edba527314610275578063f4359ce514610257578063f851a4401461022e5763fc0c546a1461020057600080fd5b34610229576000366003190112610229576002546040516001600160a01b039091168152602090f35b600080fd5b34610229576000366003190112610229576000546040516001600160a01b039091168152602090f35b3461022957600036600319011261022957602060405162093a808152f35b34610229576040366003190112610229576001600160a01b036102966119c9565b1660005263b2d05e1060205260406000206024356000526020526040806000206001815491015482519182526020820152f35b3461022957600036600319011261022957602060045460801d60405190600f0b8152f35b34610229576000366003190112610229576003546040516001600160a01b039091168152602090f35b34610229576040366003190112610229576103506103326119f5565b61034760018060a01b03600054163314612404565b60243590612421565b005b34610229576020806003193601126102295761036c6119f5565b600f0b60005263b2d05e0b815260406000209060405191826000825461039181611a7b565b938484526001918683821691826000146104145750506001146103d5575b50506103bd92500383611a59565b6103d1604051928284938452830190611ab5565b0390f35b85925060005281600020906000915b8583106103fc5750506103bd935082010185806103af565b805483890185015287945086939092019181016103e4565b92509350506103bd94915060ff191682840152151560051b82010185806103af565b346102295760403660031901126102295761044f6119c9565b61045833611b80565b90604060208301519201519062093a8091824201804211610a5e57839004928381810204811484151715610a5e57808402821115610ab95761271060243511610a74573360005263b2d05e0d602052604060002060018060a01b038416600052602052604060002054620d2f008101809111610a5e574210610a22576001600160a01b038316600090815263b2d05e0760205260409020546104fc90600f0b611d1c565b90600082600f0b126109eb573360005263b2d05e12602052604060002060018060a01b0385166000526020526040600020906105b06105a961271061058161057760026040519761054c89611a05565b80548952600181015460208a01520154806040890152600090878d0281116109d7575b508751611d70565b9a60243590611d70565b04956040519661059088611a05565b8752602435602088015280604088015283890290611b53565b8551611d70565b953360005261271063b2d05e08806020526105e36105d860406000205460208a015190611d63565b602087015190611b53565b9033600052602052806040600020551161099c577f45ca9a4c8d0119eb329e580d28fe689e484e1be230da8037ade9547d2d25cc91976080976106db610628896121cf565b9260018060a01b038a1660005263b2d05e1060205260406000208686026000526020526106cf600160406000200154936106618a611e7f565b8a600f0b60005263b2d05e1160205260406000208989026000526020526106918260016040600020015498611d63565b84808210610991576106a291611b53565b8d60018060a01b031660005263b2d05e1060205260406000208a8a02600052602052604060002055611d63565b81811061091657611b53565b86600f0b60005263b2d05e11602052604060002085850260005260205260406000205583830260408601511160001461091d5761077591610733610724610766938a5190611d63565b87519081811061091657611b53565b60018060a01b038a1660005263b2d05e106020526040600020868602600052602052600160406000200155875190611d63565b84519081811061091657611b53565b9184600f0b60005263b2d05e11602052604060002091026000526020526001604060002001555b426040820151116108a5575b50815160018060a01b03841660005263b2d05e0c602052604060002060408401516000526020526107df6040600020918254611d63565b9055815190600f0b60005263b2d05e0e602052604060002060408301516000526020526108126040600020918254611d63565b905561081c612013565b503360005263b2d05e12602052604060002060018060a01b038316600052602052600260408060002092805184556020810151600185015501519101553360005263b2d05e0d602052604060002060018060a01b038216600052602052426040600020556040519042825233602083015260018060a01b031660408201526024356060820152a1005b805160018060a01b03851660005263b2d05e0c602052604060002060408301516000526020526108db6040600020918254611b53565b905580519082600f0b60005263b2d05e0e60205260408060002091015160005260205261090e6040600020918254611b53565b9055856107a8565b5080611b53565b5050845160018060a01b03871660005263b2d05e1060205260406000208383026000526020526109566001604060002001918254611d63565b905584519184600f0b60005263b2d05e116020526040600020910260005260205261098a6001604060002001918254611d63565b905561079c565b6106a2915080611b53565b60405162461bcd60e51b81526020600482015260136024820152722ab9b2b2103a37b79036bab1b4103837bbb2b960691b6044820152606490fd5b6109e59150878d0290611b53565b8d61056f565b60405162461bcd60e51b815260206004820152600f60248201526e11d85d59d9481b9bdd081859191959608a1b6044820152606490fd5b60405162461bcd60e51b815260206004820152601460248201527321b0b73737ba103b37ba329039b79037b33a32b760611b6044820152606490fd5b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b815260206004820152601e60248201527f596f75207573656420616c6c20796f757220766f74696e6720706f77657200006044820152606490fd5b606460405162461bcd60e51b815260206004820152602060248201527f596f757220746f6b656e206c6f636b206578706972657320746f6f20736f6f6e6044820152fd5b3461022957604036600319011261022957610b166119c9565b6024359060018060a01b03610b3081600054163314612404565b81168060005260209263b2d05e078452610b5a610b54604060002054600f0b611d1c565b936121cf565b90610b6484611d92565b94610b6e85611e7f565b610b76612013565b9062093a8094854201804211610a5e57869004868102968188041490151715610a5e57610bdb908760005263b2d05e1085526040600020876000528552856040600020558760005263b2d05e09855286604060002055610bd68684611d63565b611b53565b9680600f0b60005263b2d05e1184526040600020866000528452876040600020556001600160801b031696633b9aca00881015610c935788610c59610c6594610c537f54c0cf3647e6cdb2fc0a7876e60ba77563fceedf2e06c01c597f8dccb9e6bd729c610c5f958b60809e633b9aca070155611d70565b90611d63565b92611d70565b90611b53565b928060005263b2d05e0a825283604060002055600555604051938452429084015260408301526060820152a1005b634e487b7160e01b600052603260045260246000fd5b34610229576040366003190112610229576020610cd0610cc76119c9565b6024359061232e565b604051908152f35b34610229576000366003190112610229576020610cd0612013565b34610229576020366003190112610229576001600160a01b03610d146119c9565b1660005263b2d05e076020526020604060002054600f0b604051908152f35b3461022957602036600319011261022957600435633b9aca0081101561022957600701546040516001600160a01b039091168152602090f35b3461022957604036600319011261022957610d856119f5565b600f0b60005263b2d05e0f60205260406000206024356000526020526020604060002054604051908152f35b3461022957604036600319011261022957610dca6119f5565b600f0b60005263b2d05e1160205260406000206024356000526020526040806000206001815491015482519182526020820152f35b34610229576020366003190112610229576001600160a01b03610e206119c9565b1660005263b2d05e096020526020604060002054604051908152f35b34610229576000366003190112610229576020600454600f0b604051908152f35b34610229576040366003190112610229576001600160a01b03610e7e6119c9565b1660005263b2d05e0c60205260406000206024356000526020526020604060002054604051908152f35b346102295760403660031901126102295767ffffffffffffffff60043581811161022957366023820112156102295780600401358281116110ce5760405190602090601f1993610eff8386601f8501160185611a59565b818452366024838301011161022957816000926024859301838701378401015260243592610f3860018060a01b03600054163314612404565b600454600f0b948560005263b2d05e0b835260406000209184519182116110ce578190610f658454611a7b565b601f811161107d575b508490601f831160011461101b5750600091611010575b508160011b916000199060031b1c19161790555b610fa284611d40565b6001600160801b031960045416906001600160801b03161760045582610fc457005b83610ff3611007947f6fbe76157c712f16b5a3c44ed48baa04e3450bc3fab0c020e848aca72bbccc8496612421565b604051938493604085526040850190611ab5565b918301520390a1005b905084015187610f85565b9091169083600052846000209160005b86828210611067575050908360019493921061104e575b5050811b019055610f99565b86015160001960f88460031b161c191690558780611042565b600184958293958b01518155019401920161102b565b9091508360005284600020601f840160051c8101918685106110c4575b90601f859493920160051c01905b8181106110b55750610f6e565b600081558493506001016110a8565b909150819061109a565b634e487b7160e01b600052604160045260246000fd5b34610229576040366003190112610229576110fd6119c9565b6111056119df565b9060018060a01b0380911660005263b2d05e0d602052604060002091166000526020526020604060002054604051908152f35b34610229576020366003190112610229576111516119f5565b80600f0b60005263b2d05e0f6020526040600020906001600160801b0316633b9aca00811015610c9357637735940701546000526020526020604060002054604051908152f35b34610229576020366003190112610229576111b16119f5565b80600f0b60005263b2d05e116020526040600020906001600160801b0316633b9aca00811015610c9357633b9aca0701546000526020526020604060002054604051908152f35b34610229576020366003190112610229577f2f56810a6bf40af059b96d3aea4db54081f378029a518390491093a7b67032e960206112346119c9565b6000546001600160a01b03919061124e9083163314611af5565b16806bffffffffffffffffffffffff60a01b6001541617600155604051908152a1005b346102295760403660031901126102295761128a6119f5565b600f0b60005263b2d05e0e60205260406000206024356000526020526020604060002054604051908152f35b34610229576000366003190112610229576000546001600160a01b036112df8183163314611af5565b60015416908115611327576001600160a01b03191681176000556040519081527febee2d5739011062cb4f14113f3b36bf0ffe3da5c0568f64189d1012a118910590602090a1005b60405162461bcd60e51b815260206004820152600d60248201526c10b33aba3ab932afb0b236b4b760991b6044820152606490fd5b346102295760003660031901126102295760055460005263b2d05e0a6020526020604060002054604051908152f35b34610229576040366003190112610229576020610cd06113a96119c9565b6113b2816121cf565b506113bb612013565b506024359061232e565b34610229576020366003190112610229576113e66113e16119c9565b6121cf565b50610350612013565b3461022957602036600319011261022957600435633b9aca0081101561022957602090633b9aca070154604051908152f35b3461022957602036600319011261022957600435633b9aca008110156102295760209063773594070154604051908152f35b34610229576000366003190112610229576020600554604051908152f35b34610229576000366003190112610229576020604051620d2f008152f35b34610229576020366003190112610229576001600160a01b036114b06119c9565b1660005263b2d05e10602052604060002063b2d05e096020526040600020546000526020526020604060002054604051908152f35b34610229576020366003190112610229576001600160a01b036115066119c9565b1660005263b2d05e086020526020604060002054604051908152f35b34610229576020366003190112610229576001600160a01b036115436119c9565b1660005263b2d05e07602052602061156d604060002054600f0b611568811515611ce2565b611d1c565b60405190600f0b8152f35b346102295760203660031901126102295760806115a46115966119c9565b61159e611b2e565b50611b80565b60606040519180518352602081015160208401526040810151604084015201516060820152f35b34610229576060366003190112610229576115e46119c9565b60249081359182600f0b9081840361022957600054604435936001600160a01b03916116139083163314611af5565b600084121580611889575b61162790611ce2565b16938460005263b2d05e07602092818452604060002054600f0b61185757600454926fffffffffffffffffffffffffffffffff19608085901d8161166a82611d40565b60801b166001600160801b0380971617600455851693633b9aca0094858110156118425760070180546001600160a01b0319168b1790556116aa83611d40565b908a600052875260406000209182541690861617905562093a809384420180421161182d578590048581029581870414901517156118185787611769575b1691821015611755577ffd55b3191f9c9dd92f4f134dd700e7d76f6a0c836a08687023d6d38f03ebd877606088888888888089633b9aca070180541561174d575b50508460005263b2d05e0982526040600020556040519384528301526040820152a1005b558088611729565b634e487b7160e01b60009081526032600452fd5b61177282611d92565b61177b83611e7f565b9061178e611787612013565b928b611d63565b8960005263b2d05e118952604060002088600052895260406000205583831686811015611803578a6117cc939289610c5393633b9aca070155611d70565b8560005263b2d05e0a8752604060002055846005558860005263b2d05e1086526040600020856000528652876040600020556116e8565b85634e487b7160e01b60005260326004526000fd5b82634e487b7160e01b60005260116004526000fd5b83634e487b7160e01b60005260116004526000fd5b84634e487b7160e01b60005260326004526000fd5b83600c6064926040519262461bcd60e51b845260048401528201526b2167617567655f747970657360a01b6044820152fd5b50600454600f0b841261161e565b34610229576000366003190112610229576001546040516001600160a01b039091168152602090f35b346102295760203660031901126102295760043560005263b2d05e0a6020526020604060002054604051908152f35b34610229576040366003190112610229576119086119c9565b6119106119df565b9060018060a01b0380911660005263b2d05e126020526040600020911660005260205260606040600020805490600260018201549101549060405192835260208301526040820152f35b34610229576000366003190112610229576020600654604051908152f35b34610229576000366003190112610229576020604051670de0b6b3a76400008152f35b34610229576020366003190112610229576119c160018060a01b03600054163314612404565b600435600655005b600435906001600160a01b038216820361022957565b602435906001600160a01b038216820361022957565b6004359081600f0b820361022957565b6060810190811067ffffffffffffffff8211176110ce57604052565b6080810190811067ffffffffffffffff8211176110ce57604052565b6040810190811067ffffffffffffffff8211176110ce57604052565b90601f8019910116810190811067ffffffffffffffff8211176110ce57604052565b90600182811c92168015611aab575b6020831014611a9557565b634e487b7160e01b600052602260045260246000fd5b91607f1691611a8a565b919082519283825260005b848110611ae1575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201611ac0565b15611afc57565b60405162461bcd60e51b815260206004820152600a60248201526937b7363c9030b236b4b760b11b6044820152606490fd5b60405190611b3b82611a21565b60006060838281528260208201528260408201520152565b91908203918211610a5e57565b8115611b6a570490565b634e487b7160e01b600052601260045260246000fd5b611b88611b2e565b50600354604080516370a0823160e01b81526001600160a01b0393841660048201819052909360209316908385602481855afa948515611cd757600095611ca8575b508290602482518094819363cbf9fe5f60e01b835260048301525afa908115611c9d57600091611c49575b50906001600160801b038383015192511692600090428411611c2e575b825195611c1e87611a21565b8652850152830152606082015290565b9050611c43611c3d4285611b53565b86611b60565b90611c12565b8281813d8311611c96575b611c5e8183611a59565b81010312611c9257825191611c7283611a3d565b81519081600f0b8203611c8f575082528301518184015238611bf5565b80fd5b5080fd5b503d611c54565b82513d6000823e3d90fd5b90948482813d8311611cd0575b611cbf8183611a59565b81010312611c8f5750519382611bca565b503d611cb5565b83513d6000823e3d90fd5b15611ce957565b60405162461bcd60e51b815260206004820152600b60248201526a2167617567655f7479706560a81b6044820152606490fd5b600f0b600019019060016001607f1b0319821260016001607f1b03831317610a5e57565b600f0b6001019060016001607f1b03821360016001607f1b0319831217610a5e57565b91908201809211610a5e57565b81810292918115918404141715610a5e57565b6000198114610a5e5760010190565b80600f0b906001600160801b031690633b9aca008210159182610c935763773594070180549091908015611e765760009282845263b2d05e0f94602086815260409081872085885281528187205497875b6101f48110611df9575b50505050505050505090565b428711611e715762093a808701809711611e5d5786888a52828452848a20818b5284528a858b205585428211611e3a575b5050611e3590611d83565b611de3565b611e49578655611e3585611e2a565b634e487b7160e01b8a52603260045260248afd5b634e487b7160e01b89526011600452602489fd5b611ded565b50505050600090565b80600f0b906001600160801b031690633b9aca008210159182610c9357633b9aca070180549091908015611e765760009282845263b2d05e1194602095808752604090818720858852885281872091805198611eda8a611a3d565b83548a5260018094015492818b01938452895b6101f48110611f06575b50505050505050505050505190565b428911611ff75762093a8098898101809111611fe35780998651818102918183041490151715611fcf57808e91825111600014611fc357611f479151611b53565b8d528a8c5263b2d05e0e8452848c20818d528452611f69858d20548751611b53565b86525b8a8c52828452848c20818d528452848c208d51815587875191015587428211611fa0575b5050611f9b90611d83565b611eed565b611faf578855611f9b87611f90565b634e487b7160e01b8c52603260045260248cfd5b508c90528b8652611f6c565b634e487b7160e01b8d52601160045260248dfd5b634e487b7160e01b8c52601160045260248cfd5b611ef7565b600f0b60016001607f1b038114610a5e5760010190565b600580546004908154600f90810b4283116121a5575b60009280845263b2d05e0a936020918583526040928383205497835b80880b6064811215612194578714612079578061206461207492611e7f565b5061206e81611d92565b50611ffc565b612045565b50979896909192939495965b84915b6101f4831061209f575b5050505050505050505090565b91939597999a90929496989a42871161218b575062093a80860180961161217857859a879188925b838d0b6064811215612160578c81146121245761211e91610c53828e8e8e8e61211897835263b2d05e11815283832082845281528383205494835263b2d05e0f815283832091835252205490611d70565b93611ffc565b926120c7565b509b999761215192949b99979593509c95909c5b8088528b86528c89892055428111612158575b50611d83565b9198612088565b83553861214b565b509b999761215192949b99979593509c95909c612138565b634e487b7160e01b875260118b52602487fd5b99819b50612092565b505097989690919293949596612085565b9162093a7f1981019081116121ba5791612029565b601184634e487b7160e01b6000525260246000fd5b6001600160a01b0316600081815263b2d05e096020818152604080842054929391929182156123255763b2d05e109485855282822084835285528282209483519761221989611a3d565b8654895260018097015496828a01978852845b6101f48110612244575b505050505050505050505190565b4288116123205762093a809788810180911161230c5780988a518181029181830414901517156122f857908c826122d794938251116000146122ec5761228a9151611b53565b8d5284885263b2d05e0c865288882081895286526122ac898920548c51611b53565b8b525b8488528b865288882081895286528888208d518155848c519101554281116122dc5750611d83565b61222c565b848852868652888820553861214b565b50889052878b526122af565b634e487b7160e01b88526011600452602488fd5b634e487b7160e01b87526011600452602487fd5b612236565b94505050505090565b9062093a80809104818102918183041490151715610a5e5760009080825260209063b2d05e0a825260409081842054948515156000146123fb576001600160a01b031680855263b2d05e0784528285205490939061238e90600f0b611d1c565b600f0b855263b2d05e0f815282852082865281528285205493855263b2d05e1081528285209185525282205491670de0b6b3a764000091808302928304036123e757506123e492916123df91611d70565b611b60565b90565b634e487b7160e01b81526011600452602490fd5b50505050905090565b1561240b57565b634e487b7160e01b600052600160045260246000fd5b9061242b82611d92565b9061243583611e7f565b9161243e612013565b9262093a8093844201804211610a5e57859004858102958187041490151715610a5e5761247692610c59610c5f92610c538786611d70565b91600081815263b2d05e0a60205283604082205584600f0b9485825263b2d05e0f60205260408220838352602052836040832055826005556001600160801b031690633b9aca0082101561250c57509181608094927e170bcdc909b6ac6e12d020fe8942256312cdcd555fb6d712899eba56d2f901969463773594070155604051938452602084015260408301526060820152a1565b634e487b7160e01b81526032600452602490fdfea2646970667358221220eeb0b643164caa56b98a81dbed46678d7264c3270ddc98ee4d6ad46e24250c0864736f6c63430008130033";

export class FraxGaugeController__factory extends ContractFactory {
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
    _token: string,
    _voting_escrow: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FraxGaugeController> {
    return super.deploy(
      _token,
      _voting_escrow,
      overrides || {}
    ) as Promise<FraxGaugeController>;
  }
  getDeployTransaction(
    _token: string,
    _voting_escrow: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, _voting_escrow, overrides || {});
  }
  attach(address: string): FraxGaugeController {
    return super.attach(address) as FraxGaugeController;
  }
  connect(signer: Signer): FraxGaugeController__factory {
    return super.connect(signer) as FraxGaugeController__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FraxGaugeControllerInterface {
    return new utils.Interface(_abi) as FraxGaugeControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FraxGaugeController {
    return new Contract(address, _abi, signerOrProvider) as FraxGaugeController;
  }
}
