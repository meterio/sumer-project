/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Timelock, TimelockInterface } from "../Timelock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "cTokens",
        type: "address[]",
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
        name: "agreementId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "AgreementClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "agreementId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "releaseTime",
        type: "uint256",
      },
    ],
    name: "AgreementCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "agreementId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "AgreementFrozen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RescueERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "TimeLockFrozen",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMERGENCY_ADMIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "agreementCount",
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
    name: "cTokenToUnderlying",
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
        internalType: "uint256[]",
        name: "agreementIds",
        type: "uint256[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "underlying",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "createAgreement",
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
        internalType: "uint256",
        name: "agreementId",
        type: "uint256",
      },
    ],
    name: "freezeAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "freezeAllAgreements",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "frozen",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        name: "underlying",
        type: "address",
      },
    ],
    name: "isSupport",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "rescueERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "underlying",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lockDuration",
        type: "uint256",
      },
    ],
    name: "setLockDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlying",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isSupport",
        type: "bool",
      },
    ],
    name: "setUnderly",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "underlyingDetail",
    outputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lockDuration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isSupport",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "underlyings",
        type: "address[]",
      },
    ],
    name: "underlyingDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "cToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lockDuration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isSupport",
            type: "bool",
          },
        ],
        internalType: "struct ITimelock.Underlying[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unfreezeAllAgreements",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "userAgreements",
    outputs: [
      {
        components: [
          {
            internalType: "enum ITimelock.TimeLockActionType",
            name: "actionType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isFrozen",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "releaseTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct ITimelock.Agreement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604090808252346200039e576200225c8038038091620000228285620003b9565b833981019060209081818403126200039e5780516001600160401b03918282116200039e57019280601f850112156200039e578351918211620003a35760059382851b908651936200007786840186620003b9565b845284808501928201019283116200039e5784809101915b8383106200038357505050506001928391826002556000925b620001c7575b50505060008052600081528260002033600052815260ff836000205416156200018a575b60008052818152620000e83384600020620003f2565b507f5c91514091af31f62f596a314af7d5be40146b2f2355969392f055e12e0982fb80600052600082528360002033600052825260ff846000205416156200014d575b600052526200013e3382600020620003f2565b5051611dbc9081620004808239f35b806000526000825283600020336000528252836000208360ff198254161790553333826000805160206200223c833981519152600080a46200012b565b600080526000815282600020336000528152826000208260ff19825416179055333360006000805160206200223c8339815191528180a4620000d2565b80518310156200037d5782821b81018401516001600160a01b0390811690811562000348578751632b1e137760e21b81526004919087818481875afa9081156200033d57600091620002fc575b501562000264575050600090815282855286902080546001600160a01b031916861790555b60001983146200024e578480930192620000a8565b634e487b7160e01b600052601160045260246000fd5b90918689518094636f307dc360e01b825281845afa928315620002f157600093620002af575b50600090815284875288902080546001600160a01b0319169190921617905562000239565b90928782813d8311620002e9575b620002c98183620003b9565b81010312620002e65750620002de90620003dd565b91386200028a565b80fd5b503d620002bd565b89513d6000823e3d90fd5b8881813d831162000335575b620003148183620003b9565b81010312620003315751908115158203620002e657503862000214565b5080fd5b503d62000308565b8a513d6000823e3d90fd5b875162461bcd60e51b815260048101879052600e60248201526d63546f6b656e206973207a65726f60901b6044820152606490fd5b620000ae565b81906200039084620003dd565b81520191019084906200008f565b600080fd5b634e487b7160e01b600052604160045260246000fd5b601f909101601f19168101906001600160401b03821190821017620003a357604052565b51906001600160a01b03821682036200039e57565b919060018301600090828252806020526040822054156000146200047957845494680100000000000000008610156200046557600186018082558610156200045157836040949596828552602085200155549382526020522055600190565b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b83526041600452602483fd5b5092505056fe608080604052600436101561001d575b50361561001b57600080fd5b005b60003560e01c90816301ffc9a7146113a157508063054f7d9c1461137e57806315a759a9146112b45780631cea48411461122e578063216990f2146110a3578063230f9ca214611020578063248a9ca314610ff157806325ad1be514610faf5780632f2ff15d14610eea578063338b5e4a14610e7457806336568abe14610de25780636a1d5b1214610d7e5780636ba4c138146109e7578063828af1c01461083d5780639010d07c146107f657806391d14854146107a9578063a217fddf1461078d578063b2118a8d146106e5578063b5eb38d9146102e5578063b6ee8340146102aa578063bb7bb2781461028c578063c00be5a1146101e8578063ca15c873146101bc578063d547741f1461017d5763d6585ecf1461013d573861000f565b346101785760003660031901126101785760206040517f5c91514091af31f62f596a314af7d5be40146b2f2355969392f055e12e0982fb8152f35b600080fd5b346101785760403660031901126101785761001b60043561019c611424565b908060005260006020526101b7600160406000200154611478565b611845565b346101785760203660031901126101785760043560005260016020526020604060002054604051908152f35b34610178576020366003190112610178573360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d602052604090819020547f17d959c0b127f515500ffa7023094c3b316df7b6560c901b523cd2cdd182842791906004359061025d9060ff16611abd565b60008181526004602090815290839020805460ff60a81b1916600160a81b1790558251918252600190820152a1005b34610178576000366003190112610178576020600754604051908152f35b346101785760203660031901126101785760206001600160a01b03806102ce61140e565b166000526005825260406000205416604051908152f35b34610178576080366003190112610178576002600435101561017857610309611424565b606435906001600160a01b038216820361017857336000908152600560205260409020546001600160a01b03828116911614806106d3575b1561069a576001600160a01b03811660009081526006602052604090206003015460ff1615610667576001600160a01b03821615610623576001600160a01b0381166001036105ab57475b60018060a01b03821660005260066020526103b16044356001604060002001546118cc565b8110610576576001600160a01b038216600090815260066020526040902060010155600754906103e082611cfd565b6007556001600160a01b03811660009081526006602052604090206002015461040990426118cc565b604051610415816117db565b61042160043582611d0c565b60018060a01b03831660208201526000604082015260018060a01b038516606082015281608082015260443560a082015283600052600460205260406000209481519060028210156105605786600360a07fc18e66e51a3840cd10d3fc178011fc4bdc7c741008ceb930316f9a128a7833809560809560209b54610100600160a81b038d84015160081b169060ff8060a81b6040860151151560a81b1693169069ffffffffffffffffffff60b01b16171717845560018401600180841b036060830151166bffffffffffffffffffffffff841b825416179055858101516002850155015191015560018060a01b03811660005260038752610526866040600020611918565b506040519386855261053c88860160043561146b565b604435604086015260608501526001600160a01b03908116941692a3604051908152f35b634e487b7160e01b600052602160045260246000fd5b60405162461bcd60e51b815260206004820152600d60248201526c3130b630b731b29032b93937b960991b6044820152606490fd5b6040516370a0823160e01b81523060048201526020816024816001600160a01b0386165afa908115610617576000916105e5575b5061038c565b90506020813d60201161060f575b81610600602093836117f7565b810103126101785751836105df565b3d91506105f3565b6040513d6000823e3d90fd5b606460405162461bcd60e51b815260206004820152602060248201527f42656e65666963696172792063616e74206265207a65726f20616464726573736044820152fd5b60405162461bcd60e51b815260206004820152600b60248201526a1393d517d4d5541413d49560aa1b6044820152606490fd5b60405162461bcd60e51b815260206004820152601160248201527021a0a62622a92fa727aa2fa1aa27a5a2a760791b6044820152606490fd5b506001600160a01b0381161515610341565b34610178576060366003190112610178576106fe61140e565b610706611424565b3360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d6020908152604090912054604435937f9b793652de97f04c5168920587bad4b1c6345295a8f5ad31c59ff946a26f91d2929161076b9060ff16611abd565b6001600160a01b0390811693610782868287611b09565b6040519586521693a3005b3461017857600036600319011261017857602060405160008152f35b34610178576040366003190112610178576107c2611424565b600435600052600060205260406000209060018060a01b0316600052602052602060ff604060002054166040519015158152f35b3461017857604036600319011261017857600435600052600160205260206108246024356040600020611900565b905460405160039290921b1c6001600160a01b03168152f35b3461017857602080600319360112610178576001600160a01b03908161086161140e565b168060005260038083526040600020549061087b82611d5a565b9261088960405194856117f7565b828452601f1961089884611d5a565b018560005b8281106109d15750505060005b8381106109355750505050604051918083018184528251809152816040850193019160005b8281106108dc5785850386f35b909192938260c060019287516108f382825161146b565b808401518b16828501526040808201511515908301526060808201518c16908301526080808201519083015260a09081015190820152019501939291016108cf565b6109cc908260005283875261094e816040600020611900565b905490851b1c600052600487526040600020846040519161096e836117db565b805460ff9061097f82821686611d0c565b8c8160081c168c86015260a81c16151560408401528a600182015416606084015260028101546080840152015460a08201526109bb8288611d72565b526109c68187611d72565b50611cfd565b6108aa565b6109d9611d28565b82828901015201869061089d565b346101785760203660031901126101785760043567ffffffffffffffff811161017857610a1890369060040161143a565b6002805414610d39576002805560ff60085416610cff5760005b818110610a40576001600255005b610a4b818385611d18565b3590610a55611d28565b5081600052600460205260406000209160405192610a72846117db565b805490610a8260ff831686611d0c565b60018060a01b038260081c16602086015260ff604086019260a81c161515825260018060a01b03600182015416806060870152600360028301549260808801938452015460a08701523303610cc857514210610c835751610c4b578060005260046020526000600360408220828155826001820155826002820155015560018060a01b036060840151166000526003602052610b228160406000206119a2565b508251906002821015610560577f9a5d3e138696102987c3cdfac21da0f69567c94642e536d6b42754d2428df2be606060018060a01b036020870151169260a0870151610b8560018060a01b03848a01511696604051938452602084019061146b565b6040820152a360208201516001600160a01b031660018103610c275750600080808060018060a01b0360608701511660a087015190828215610c1e575bf115610617575b60a082015191602060018060a01b039101511660005260066020526001604060002001918254908103908111610c0857610c039255611cfd565b610a32565b634e487b7160e01b600052601160045260246000fd5b506108fc610bc2565b606083015160a0840151610c469290916001600160a01b031690611b09565b610bc9565b60405162461bcd60e51b815260206004820152601060248201526f20b3b932b2b6b2b73a10333937bd32b760811b6044820152606490fd5b60405162461bcd60e51b815260206004820152601860248201527f52656c656173652074696d65206e6f74207265616368656400000000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152600f60248201526e4e6f742062656e656669636961727960881b6044820152606490fd5b60405162461bcd60e51b81526020600482015260126024820152712a34b6b2a637b1b59034b990333937bd32b760711b6044820152606490fd5b60405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606490fd5b346101785760203660031901126101785760806001600160a01b0380610da261140e565b1660005260066020526040600020908154169060018101549060ff6003600283015492015416916040519384526020840152604083015215156060820152f35b3461017857604036600319011261017857610dfb611424565b336001600160a01b03821603610e175761001b90600435611845565b60405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608490fd5b3461017857604036600319011261017857610e8d61140e565b3360009081527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb56020526040902054610ec89060ff16611a7e565b6001600160a01b03166000908152600660205260409020602435600290910155005b346101785760403660031901126101785761001b6004356001610f0b611424565b918060005260209060008252610f278360406000200154611478565b8060005260008252604060002093838060a01b03169384600052825260ff6040600020541615610f60575b600052526040600020611918565b8060005260008252604060002084600052825260406000208360ff198254161790553384827f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4610f52565b34610178576020366003190112610178576001600160a01b03610fd061140e565b166000526006602052602060ff600360406000200154166040519015158152f35b346101785760203660031901126101785760043560005260006020526020600160406000200154604051908152f35b34610178576000366003190112610178573360009081527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5602052604090205461106c9060ff16611a7e565b60ff19600854166008557f0ce8871c7e2eb42254688f1718b08852040553665ad8b4e64d57729e3bffcae8602060405160008152a1005b34610178576020806003193601126101785760043567ffffffffffffffff8111610178576110d590369060040161143a565b906110df82611d5a565b916110ed60405193846117f7565b808352601f196110fc82611d5a565b0160005b8181106111f557505060005b81811061117c57505050604051908282018383528151809152836040840192019360005b82811061113d5784840385f35b855180516001600160a01b0316855280830151858401526040808201519086015260609081015115159085015294810194608090930192600101611130565b61118a818385969795611d18565b356001600160a01b038181169291839003610178576111ec926000526006855260ff60036040600020604051936111c0856117a9565b815416845260018101548885015260028101546040850152015416151560608201526109bb8288611d72565b9392919361110c565b9480939495604051611206816117a9565b6000815260008382015260006040820152600060608201528282890101520194939294611100565b34610178576000366003190112610178573360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d602052604090205461127a9060ff16611abd565b600160ff1960085416176008557f0ce8871c7e2eb42254688f1718b08852040553665ad8b4e64d57729e3bffcae8602060405160018152a1005b34610178576060366003190112610178576112cd61140e565b6112d5611424565b9060443591821515809303610178573360009081527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb56020526040902054600392906113239060ff16611a7e565b60018060a01b0380911690816000526005602052604060002092166bffffffffffffffffffffffff60a01b9281848254161790556000526006602052604060002091825416178155019060ff80198354169116179055600080f35b3461017857600036600319011261017857602060ff600854166040519015158152f35b34610178576020366003190112610178576004359063ffffffff60e01b821680920361017857602091635a05180f60e01b81149081156113e3575b5015158152f35b637965db0b60e01b8114915081156113fd575b50836113dc565b6301ffc9a760e01b149050836113f6565b600435906001600160a01b038216820361017857565b602435906001600160a01b038216820361017857565b9181601f840112156101785782359167ffffffffffffffff8311610178576020808501948460051b01011161017857565b9060028210156105605752565b6000818152602090808252604092838220338352835260ff8483205416156114a05750505050565b339084516060810181811067ffffffffffffffff821117611772578652602a8152848101918636843781511561175e576030835381519360019485101561174a576078602184015360295b8581116116e0575061169e57865193611503856117a9565b6042855286850195606036883785511561168a5760308753855182101561168a5790607860218701536041915b81831161161c575050506115da579385936115c0936115b16048946115887f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000996115d69b519a8b978801525180926037880190611786565b8401917001034b99036b4b9b9b4b733903937b6329607d1b603784015251809386840190611786565b010360288101855201836117f7565b5162461bcd60e51b815291829160048301611819565b0390fd5b60648587519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f81166010811015611676576f181899199a1a9b1b9c1cb0b131b232b360811b901a61164c85896118d9565b5360041c92801561166257600019019190611530565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b60648688519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b90600f81166010811015611736576f181899199a1a9b1b9c1cb0b131b232b360811b901a61170e83866118d9565b5360041c90801561172257600019016114eb565b634e487b7160e01b87526011600452602487fd5b634e487b7160e01b88526032600452602488fd5b634e487b7160e01b86526032600452602486fd5b634e487b7160e01b85526032600452602485fd5b634e487b7160e01b85526041600452602485fd5b60005b8381106117995750506000910152565b8181015183820152602001611789565b6080810190811067ffffffffffffffff8211176117c557604052565b634e487b7160e01b600052604160045260246000fd5b60c0810190811067ffffffffffffffff8211176117c557604052565b90601f8019910116810190811067ffffffffffffffff8211176117c557604052565b604091602082526118398151809281602086015260208686019101611786565b601f01601f1916010190565b90604061188292600090808252816020528282209360018060a01b03169384835260205260ff8383205416611885575b81526001602052206119a2565b50565b8082528160205282822084835260205282822060ff1981541690553384827ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b8580a4611875565b91908201809211610c0857565b9081518110156118ea570160200190565b634e487b7160e01b600052603260045260246000fd5b80548210156118ea5760005260206000200190600090565b9190600183016000908282528060205260408220541560001461199c57845494680100000000000000008610156119885783611978611961886001604098999a01855584611900565b819391549060031b91821b91600019901b19161790565b9055549382526020522055600190565b634e487b7160e01b83526041600452602483fd5b50925050565b90600182019060009281845282602052604084205490811515600014611a77576000199180830181811161172257825490848201918211611a6357808203611a2e575b50505080548015611a1a578201916119fd8383611900565b909182549160031b1b191690555582526020526040812055600190565b634e487b7160e01b86526031600452602486fd5b611a4e611a3e6119619386611900565b90549060031b1c92839286611900565b905586528460205260408620553880806119e5565b634e487b7160e01b88526011600452602488fd5b5050505090565b15611a8557565b60405162461bcd60e51b815260206004820152601060248201526f21a0a62622a92fa727aa2fa0a226a4a760811b6044820152606490fd5b15611ac457565b60405162461bcd60e51b815260206004820152601a60248201527f43414c4c45525f4e4f545f454d455247454e43595f41444d494e0000000000006044820152606490fd5b916040918251906020948583019363a9059cbb60e01b855260018060a01b038093166024850152604484015260448352611b42836117a9565b16908351918483019167ffffffffffffffff92848110848211176117c55786528684527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656487850152600080958192519082855af1903d15611c61573d9283116117725790611bcf939291865192611bc289601f19601f84011601856117f7565b83523d868985013e611c6c565b805180611bde575b5050505050565b81859181010312611c5d5783015190811591821503611c5a5750611c0457808080611bd7565b60849250519062461bcd60e51b82526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152fd5b80fd5b5080fd5b90611bcf9392506060915b91929015611cce5750815115611c80575090565b3b15611c895790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b825190915015611ce15750805190602001fd5b60405162461bcd60e51b81529081906115d69060048301611819565b6000198114610c085760010190565b60028210156105605752565b91908110156118ea5760051b0190565b60405190611d35826117db565b8160a06000918281528260208201528260408201528260608201528260808201520152565b67ffffffffffffffff81116117c55760051b60200190565b80518210156118ea5760209160051b01019056fea2646970667358221220f59267348cf5fb6c402d82f0af779d3c27ec59fb9d036a133e8e2d4c87beffdf64736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

export class Timelock__factory extends ContractFactory {
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
    cTokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Timelock> {
    return super.deploy(cTokens, overrides || {}) as Promise<Timelock>;
  }
  getDeployTransaction(
    cTokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(cTokens, overrides || {});
  }
  attach(address: string): Timelock {
    return super.attach(address) as Timelock;
  }
  connect(signer: Signer): Timelock__factory {
    return super.connect(signer) as Timelock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimelockInterface {
    return new utils.Interface(_abi) as TimelockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Timelock {
    return new Contract(address, _abi, signerOrProvider) as Timelock;
  }
}
