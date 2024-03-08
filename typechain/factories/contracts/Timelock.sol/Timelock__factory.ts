/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Timelock,
  TimelockInterface,
} from "../../../contracts/Timelock.sol/Timelock";

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
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "agreementIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AgreementClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "agreementIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
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
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "agreementIndex",
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
        name: "agreementIndexes",
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
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "agreementIndex",
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
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "getAllAgreementsFor",
    outputs: [
      {
        components: [
          {
            internalType: "enum ITimelock.TimeLockActionType",
            name: "actionType",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isFrozen",
            type: "bool",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "releaseTime",
            type: "uint48",
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
        internalType: "address",
        name: "underlying",
        type: "address",
      },
      {
        internalType: "address",
        name: "oracle",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    name: "overThreshold",
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
        internalType: "uint48",
        name: "lockDuration",
        type: "uint48",
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
        name: "underlying",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "setThreshold",
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
        name: "isSupport_",
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
        internalType: "bool",
        name: "isSupport",
        type: "bool",
      },
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "lockDuration",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "totalBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
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
            internalType: "bool",
            name: "isSupport",
            type: "bool",
          },
          {
            internalType: "address",
            name: "cToken",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "lockDuration",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "totalBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userAgreements",
    outputs: [
      {
        internalType: "enum ITimelock.TimeLockActionType",
        name: "actionType",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isFrozen",
        type: "bool",
      },
      {
        internalType: "address",
        name: "underlying",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "releaseTime",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060409080825234620003f657620027d5803803809162000022828562000411565b833981016020908183820312620003f65782516001600160401b0393848211620003f657019080601f83011215620003f6578151938411620003fb5760059184831b90865195620000768684018862000411565b86528480870192820101928311620003f65784809101915b838310620003db575050505060019283916002918383556000935b620001c9575b5050505060008052600081528260002033600052815260ff836000205416156200018c575b60008052818152620000ea33846000206200044a565b507f5c91514091af31f62f596a314af7d5be40146b2f2355969392f055e12e0982fb80600052600082528360002033600052825260ff846000205416156200014f575b600052526200014033826000206200044a565b50516122dd9081620004d88239f35b806000526000825283600020336000528252836000208360ff19825416179055333382600080516020620027b5833981519152600080a46200012d565b600080526000815282600020336000528152826000208260ff1982541617905533336000600080516020620027b58339815191528180a4620000d4565b8051841015620003d55783821b81018501516001600160a01b03808216908115620003a0578951632b1e137760e21b8152600491906000908a818581885afa9081156200039657829162000355575b5015620002dc5750895b16918215620002a457600090815290885289812080546001600160a01b0319168317905590815283875288902080546001600160a81b03191660089290921b610100600160a81b0316919091178717815560649084015560001984146200028e578580940193620000a9565b634e487b7160e01b600052601160045260246000fd5b8a5162461bcd60e51b81528083018a90526012602482015271696e76616c696420756e6465726c79696e6760701b6044820152606490fd5b8b51636f307dc360e01b81528a818581885afa9182156200034a57809262000307575b505062000222565b9091508a82813d831162000342575b62000322818362000411565b810103126200033f5750620003379062000435565b3880620002ff565b80fd5b503d62000316565b8d51903d90823e3d90fd5b90508a81813d83116200038e575b6200036f818362000411565b810103126200038a575180151581036200038a573862000218565b5080fd5b503d62000363565b8d513d84823e3d90fd5b895162461bcd60e51b815260048101899052600e60248201526d34b73b30b634b21031aa37b5b2b760911b6044820152606490fd5b620000af565b8190620003e88462000435565b81520191019084906200008e565b600080fd5b634e487b7160e01b600052604160045260246000fd5b601f909101601f19168101906001600160401b03821190821017620003fb57604052565b51906001600160a01b0382168203620003f657565b91906001830160009082825280602052604082205415600014620004d15784549468010000000000000000861015620004bd5760018601808255861015620004a957836040949596828552602085200155549382526020522055600190565b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b83526041600452602483fd5b5092505056fe608080604052600436101561001d575b50361561001b57600080fd5b005b60003560e01c90816301ffc9a7146117b357508063054f7d9c1461179057806315a759a9146116c95780631cea484114611643578063216990f2146114a4578063230f9ca214611433578063248a9ca31461140457806325ad1be5146113c55780632f2ff15d1461130057806336568abe1461126e5780633e4f818e146111db5780634c27984e146111495780636112d0cb14610fea5780636a1d5b1214610f785780636ba4c13814610a2f5780639010d07c146109e857806391d148541461099b5780639d87999014610937578063a217fddf1461091b578063a7c7ce9714610815578063b2118a8d1461076d578063b5eb38d914610311578063b6ee8340146102d6578063ca15c873146102aa578063d06f7c8b146101d2578063d547741f146101935763d6585ecf14610153573861000f565b3461018e57600036600319011261018e5760206040517f5c91514091af31f62f596a314af7d5be40146b2f2355969392f055e12e0982fb8152f35b600080fd5b3461018e57604036600319011261018e5761001b6004356101b2611836565b908060005260006020526101cd6001604060002001546118bc565b611c77565b3461018e57604036600319011261018e577f86a725e4876671b86aaf5bbb6668a32b430109dea4ce8087656c8c3557212d19606061020e611820565b3360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d6020526040902054602435919061024e9060ff16611ec1565b60018060a01b03169081600052600360205261027060406000205482106121a2565b81600052600360205261028781604060002061187d565b5061010061ff0019825416179055604051918252602082015260016040820152a1005b3461018e57602036600319011261018e5760043560005260016020526020604060002054604051908152f35b3461018e57602036600319011261018e5760206001600160a01b03806102fa611820565b166000526004825260406000205416604051908152f35b3461018e57608036600319011261018e576002600435101561018e57610335611836565b606435906001600160a01b038216820361018e57336000908152600460209081526040909120549092906001600160a01b038381169116148061075b575b15610721576001600160a01b038216600090815260058452604090205460ff16156106ee576001600160a01b038116156106b3576001600160a01b03821660010361064157475b6001600160a01b038316600090815260058552604090206001015460443581019081106105e65781106105fc5765ffffffffffff9060018060a01b0384166000526005855260406000209060018201555460a81c1665ffffffffffff4216019165ffffffffffff83116105e65760018060a01b038216600052600384526040600020928354936040519261044d84611c0d565b61045960043585612118565b8684019060008252604085019460018060a01b0382168652606081019265ffffffffffff8616845260808201946044358652600160401b8a10156105d057896104a79160018201815561187d565b9290926105ba57519460028610156105a45761056565ffffffffffff6060966105418d9b6105136001976104fc7fe3a904f3529e76a4b31e0dbe7529706ca9afd42bd13d823d275daa4f4c388d619d8b612124565b51895461ff00191690151560081b61ff0016178955565b51875462010000600160b01b03191660a088901b8890039190911660101b62010000600160b01b0316178755565b51855465ffffffffffff60b01b1916911660b01b65ffffffffffff60b01b16178455565b5191015565ffffffffffff60405194610580866004356118af565b604435868b01521660408501526001600160a01b03908116951692a4604051908152f35b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052600060045260246000fd5b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b815260048101859052601a60248201527f6e6f7420656e6f75676820756e6465726c792062616c616e63650000000000006044820152606490fd5b6040516370a0823160e01b815230600482015283816024816001600160a01b0387165afa9081156106a75760009161067a575b506103ba565b90508381813d83116106a0575b6106918183611c29565b8101031261018e575184610674565b503d610687565b6040513d6000823e3d90fd5b60405162461bcd60e51b8152600481018490526013602482015272696e76616c69642062656e656669636961727960681b6044820152606490fd5b60405162461bcd60e51b815260048101849052600b60248201526a37b7363c9031ba37b5b2b760a91b6044820152606490fd5b60405162461bcd60e51b8152600481018490526012602482015271696e76616c696420756e6465726c79696e6760701b6044820152606490fd5b506001600160a01b0382161515610373565b3461018e57606036600319011261018e57610786611820565b61078e611836565b3360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d6020908152604090912054604435937f9b793652de97f04c5168920587bad4b1c6345295a8f5ad31c59ff946a26f91d292916107f39060ff16611ec1565b6001600160a01b039081169361080a868287611f04565b6040519586521693a3005b3461018e5760208060031936011261018e576001600160a01b039081610839611820565b166000526003815260406000208054916108528361213c565b926108606040519485611c29565b8084528184018093600052826000206000915b8383106108f8575050505060405192818401908285525180915260408401929160005b8281106108a35785850386f35b909192938260a060019287516108ba8282516118af565b808401511515828501526040808201518c169083015260608082015165ffffffffffff16908301526080908101519082015201950193929101610896565b60028560019261090a859a989a6121ee565b815201920192019190959395610873565b3461018e57600036600319011261018e57602060405160008152f35b3461018e57604036600319011261018e57610950611820565b33600090815260008051602061228883398151915260205260409020546109799060ff16611e88565b6001600160a01b03166000908152600560205260409020602435600290910155005b3461018e57604036600319011261018e576109b4611836565b600435600052600060205260406000209060018060a01b0316600052602052602060ff604060002054166040519015158152f35b3461018e57604036600319011261018e5760043560005260016020526020610a166024356040600020611d0f565b905460405160039290921b1c6001600160a01b03168152f35b3461018e5760208060031936011261018e5760043567ffffffffffffffff811161018e57610a6190369060040161184c565b60029291929182805414610f3457828055610a7b8261213c565b93610a896040519586611c29565b8285528185018360051b82019136831161018e578390915b838310610f245750505050835160005b818110610ea857505060ff938460065416610e715760005b838110610ad65760018555005b610ae08183612163565b5190610aea612177565b50336000526003808552610b0460406000205484106121a2565b33600052808552610b22610b1c84604060002061187d565b506121ee565b9065ffffffffffff90816060840151164210610e2c5786830151610df45733600052808752610b5e610b5886604060002061187d565b90612245565b33600052808752604060002091825492600019938481019081116105e657610b859161187d565b5033600052828952610b9b87604060002061187d565b9290926105ba578c90828403610d64575b5050505033600052865260406000209081548015610d4e570190610bd3610b58838361187d565b55604081019260018060a01b039081855116908351938a8510156105a457608001938451610c0460405180936118af565b898201527fb2aa8609e0de604016ce8820114893d6a9b5cf2461feac3bcb3a9aa19565ad8260403392a48351600192908216838103610d3c57508051804710610cf757600080808093335af1610c58612047565b5015610c8c575b51935116600052600585526040600020019182549081039081116105e657610c879255612154565b610ac9565b60405162461bcd60e51b815260048101889052603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d617920686176652072657665727465640000000000006064820152608490fd5b60405162461bcd60e51b815260048101899052601d60248201527f416464726573733a20696e73756666696369656e742062616c616e63650000006044820152606490fd5b8151610d49913390611f04565b610c5f565b634e487b7160e01b600052603160045260246000fd5b610d9782610d78610de29486541687612124565b845460081c16859061ff00825491151560081b169061ff001916179055565b8254845462010000600160b01b03191662010000600160b01b039091161784558254845465ffffffffffff60b01b191660b091821c92909216901b65ffffffffffff60b01b16178355565b6001809101549101558a808b81610bac565b60405162461bcd60e51b815260048101889052601060248201526f30b3b932b2b6b2b73a10333937bd32b760811b6044820152606490fd5b60405162461bcd60e51b815260048101889052601860248201527f72656c656173652074696d65206e6f74207265616368656400000000000000006044820152606490fd5b60405162461bcd60e51b815260048101839052600f60248201526e3a34b6b2a637b1b590333937bd32b760891b6044820152606490fd5b600181018082116105e6575b828110610eca5750610ec590612154565b610ab1565b610eee90610ed88389612163565b51610ee3828a612163565b5111610ef357612154565b610eb4565b610efd8389612163565b51610f08828a612163565b51610f13858b612163565b52610f1e828a612163565b52612154565b8235815291810191849101610aa1565b6064906040519062461bcd60e51b82526004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b3461018e57602036600319011261018e5760a06001600160a01b0380610f9c611820565b166000526005602052604060002080549065ffffffffffff60026001830154920154926040519460ff8216151586528160081c16602086015260a81c16604084015260608301526080820152f35b3461018e57608036600319011261018e57611003611820565b61100b611836565b906064359060ff821680920361018e5760018060a01b038091169182600052602080946005825260248460406000205460081c16604051958693849263fc57d4df60e01b84526004840152165afa9182156106a75760009261111a575b50819082156110e757601281106110b6575b50611089915060443590612256565b919050600052600582526002604060002001546ec097ce7bc90715b34b9f10000000006040519204118152f35b905060120360ff81116105e65760ff16604d81116105e657611089916110df91600a0a90612256565b90508461107a565b60405162461bcd60e51b815260048101869052600b60248201526a383934b1b29032b93937b960a91b6044820152606490fd5b9091508381813d8311611142575b6111328183611c29565b8101031261018e57519084611068565b503d611128565b3461018e57604036600319011261018e57611162611820565b6024359060018060a01b0380911660005260036020526040600020805483101561018e5760a0926111929161187d565b5065ffffffffffff6001825492015491604051936111b38560ff84166118af565b60ff8260081c16151560208601528160101c16604085015260b01c1660608301526080820152f35b3461018e57604036600319011261018e576111f4611820565b6024359065ffffffffffff8216820361018e5733600090815260008051602061228883398151915260205260409020546112309060ff16611e88565b6001600160a01b03166000908152600560205260409020805465ffffffffffff60a81b191660a89290921b65ffffffffffff60a81b16919091179055005b3461018e57604036600319011261018e57611287611836565b336001600160a01b038216036112a35761001b90600435611c77565b60405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608490fd5b3461018e57604036600319011261018e5761001b6004356001611321611836565b91806000526020906000825261133d83604060002001546118bc565b8060005260008252604060002093838060a01b03169384600052825260ff6040600020541615611376575b600052526040600020611d27565b8060005260008252604060002084600052825260406000208360ff198254161790553384827f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4611368565b3461018e57602036600319011261018e576001600160a01b036113e6611820565b166000526005602052602060ff604060002054166040519015158152f35b3461018e57602036600319011261018e5760043560005260006020526020600160406000200154604051908152f35b3461018e57600036600319011261018e57336000908152600080516020612288833981519152602052604090205461146d9060ff16611e88565b60ff19600654166006557f0ce8871c7e2eb42254688f1718b08852040553665ad8b4e64d57729e3bffcae8602060405160008152a1005b3461018e5760208060031936011261018e5760043567ffffffffffffffff811161018e576114d690369060040161184c565b6114df8161213c565b916114ed6040519384611c29565b818352601f196114fc8361213c565b0160005b81811061162657505060005b82811061158e57505050604051908282018383528151809152836040840192019360005b82811061153d5784840385f35b8551805115158552808301516001600160a01b03168584015260408082015165ffffffffffff169086015260608082015190860152608090810151908501529481019460a090930192600101611530565b929391926001600160a01b03600582811b8401358281169392919084900361018e5761161d9360005285526002604060002065ffffffffffff604051936115d485611c0d565b82549060ff8216151586528160081c168986015260a81c166040840152600181015460608401520154608082015261160c8288612163565b526116178187612163565b50612154565b9392919361150c565b9480939495611633612177565b8282890101520194939294611500565b3461018e57600036600319011261018e573360009081527fac55d60145c2b1e72232130507b090ddd2cd26daa31eeab1e3e64b89140e668d602052604090205461168f9060ff16611ec1565b600160ff1960065416176006557f0ce8871c7e2eb42254688f1718b08852040553665ad8b4e64d57729e3bffcae8602060405160018152a1005b3461018e57606036600319011261018e576116e2611820565b6116ea611836565b906044359182151580930361018e5733600090815260008051602061228883398151915260205260409020546117229060ff16611e88565b60018060a01b0380831660005260046020526040600020911690816bffffffffffffffffffffffff60a01b825416179055600052600560205260406000209160ff8354911691610100600160a81b039060081b16906affffffffffffffffffffff60a81b1617179055600080f35b3461018e57600036600319011261018e57602060ff600654166040519015158152f35b3461018e57602036600319011261018e576004359063ffffffff60e01b821680920361018e57602091635a05180f60e01b81149081156117f5575b5015158152f35b637965db0b60e01b81149150811561180f575b50836117ee565b6301ffc9a760e01b14905083611808565b600435906001600160a01b038216820361018e57565b602435906001600160a01b038216820361018e57565b9181601f8401121561018e5782359167ffffffffffffffff831161018e576020808501948460051b01011161018e57565b80548210156118995760005260206000209060011b0190600090565b634e487b7160e01b600052603260045260246000fd5b9060028210156105a45752565b6000818152602090808252604092838220338352835260ff8483205416156118e45750505050565b835167ffffffffffffffff9190336060820184811183821017611bd6578752602a82528582019287368537825115611bc25760308453825191600192831015611bae576078602185015360295b838111611b445750611b025790875194608086019086821090821117611aee57885260428552868501956060368837855115611ada57603087538551821015611ada5790607860218701536041915b818311611a6c57505050611a2a57938593611a1093611a016048946119d87f416363657373436f6e74726f6c3a206163636f756e742000000000000000000099611a269b519a8b978801525180926037880190611bea565b8401917001034b99036b4b9b9b4b733903937b6329607d1b603784015251809386840190611bea565b01036028810185520183611c29565b5162461bcd60e51b815291829160048301611c4b565b0390fd5b60648587519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f81166010811015611ac6576f181899199a1a9b1b9c1cb0b131b232b360811b901a611a9c8589611cfe565b5360041c928015611ab257600019019190611980565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b634e487b7160e01b87526041600452602487fd5b60648789519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b90600f81166010811015611b9a576f181899199a1a9b1b9c1cb0b131b232b360811b901a611b728387611cfe565b5360041c908015611b865760001901611931565b634e487b7160e01b88526011600452602488fd5b634e487b7160e01b89526032600452602489fd5b634e487b7160e01b87526032600452602487fd5b634e487b7160e01b86526032600452602486fd5b634e487b7160e01b86526041600452602486fd5b60005b838110611bfd5750506000910152565b8181015183820152602001611bed565b60a0810190811067ffffffffffffffff8211176105d057604052565b90601f8019910116810190811067ffffffffffffffff8211176105d057604052565b60409160208252611c6b8151809281602086015260208686019101611bea565b601f01601f1916010190565b906040611cb492600090808252816020528282209360018060a01b03169384835260205260ff8383205416611cb7575b8152600160205220611dac565b50565b8082528160205282822084835260205282822060ff1981541690553384827ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b8580a4611ca7565b908151811015611899570160200190565b80548210156118995760005260206000200190600090565b91906001830160009082825280602052604082205415600014611da657845494600160401b861015611d925783611d82611d6b886001604098999a01855584611d0f565b819391549060031b91821b91600019901b19161790565b9055549382526020522055600190565b634e487b7160e01b83526041600452602483fd5b50925050565b90600182019060009281845282602052604084205490811515600014611e815760001991808301818111611e6d57825490848201918211611b8657808203611e38575b50505080548015611e2457820191611e078383611d0f565b909182549160031b1b191690555582526020526040812055600190565b634e487b7160e01b86526031600452602486fd5b611e58611e48611d6b9386611d0f565b90549060031b1c92839286611d0f565b90558652846020526040862055388080611def565b634e487b7160e01b87526011600452602487fd5b5050505090565b15611e8f57565b60405162461bcd60e51b815260206004820152600a60248201526937b7363c9030b236b4b760b11b6044820152606490fd5b15611ec857565b60405162461bcd60e51b815260206004820152601460248201527337b7363c9032b6b2b933b2b731bc9030b236b4b760611b6044820152606490fd5b60405163a9059cbb60e01b602082019081526001600160a01b03938416602483015260448083019590955293815267ffffffffffffffff926080820192848411838510176105d057169060c0810193838510908511176105d057611fa993604052602083527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656460a0820152600080958192519082855af1611fa3612047565b91612087565b908151918215928315612019575b50505015611fc157565b60405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608490fd5b81929350906020918101031261204357602001519081151582036120405750388080611fb7565b80fd5b5080fd5b3d15612082573d9067ffffffffffffffff82116105d05760405191612076601f8201601f191660200184611c29565b82523d6000602084013e565b606090565b919290156120e9575081511561209b575090565b3b156120a45790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156120fc5750805190602001fd5b60405162461bcd60e51b8152908190611a269060048301611c4b565b60028210156105a45752565b9060028110156105a45760ff80198354169116179055565b67ffffffffffffffff81116105d05760051b60200190565b60001981146105e65760010190565b80518210156118995760209160051b010190565b6040519061218482611c0d565b60006080838281528260208201528260408201528260608201520152565b156121a957565b60405162461bcd60e51b815260206004820152601c60248201527f61677265656d656e7420696e646578206f7574206f6620626f756e64000000006044820152606490fd5b906040516121fb81611c0d565b60806001829465ffffffffffff815461221760ff821687612118565b60ff8160081c1615156020870152838060a01b038160101c16604087015260b01c1660608501520154910152565b906105ba5760018160008093550155565b90811561227d578082029182048082036105e657146122785750600290600090565b600091565b505060009060009056fead3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5a264697066735822122069aba3b34a8a0045d03526e64ed382bdd1625cf2b98b8e936cec0f0f0465011164736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

type TimelockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TimelockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Timelock__factory extends ContractFactory {
  constructor(...args: TimelockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    cTokens: AddressLike[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(cTokens, overrides || {});
  }
  override deploy(
    cTokens: AddressLike[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(cTokens, overrides || {}) as Promise<
      Timelock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Timelock__factory {
    return super.connect(runner) as Timelock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimelockInterface {
    return new Interface(_abi) as TimelockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Timelock {
    return new Contract(address, _abi, runner) as unknown as Timelock;
  }
}
