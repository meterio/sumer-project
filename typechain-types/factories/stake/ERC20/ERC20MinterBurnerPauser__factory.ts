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
  ERC20MinterBurnerPauser,
  ERC20MinterBurnerPauserInterface,
} from "../../../stake/ERC20/ERC20MinterBurnerPauser";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
        indexed: true,
        internalType: "address",
        name: "from",
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
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
    name: "MINTER_ROLE",
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
    name: "PAUSER_ROLE",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001dbf38038062001dbf833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b506040526020908101518551909350859250849183918391620001c191600491850190620003f5565b508051620001d7906005906020840190620003f5565b50506006805461ff001960ff1990911660121716905550620002166000620002076001600160e01b03620002a616565b6001600160e01b03620002ab16565b604080516a4d494e5445525f524f4c4560a81b8152905190819003600b0190206200024e90620002076001600160e01b03620002a616565b604080516a5041555345525f524f4c4560a81b8152905190819003600b0190206200028690620002076001600160e01b03620002a616565b506200029d9050816001600160e01b03620002c416565b50505062000497565b335b90565b620002c082826001600160e01b03620002da16565b5050565b6006805460ff191660ff92909216919091179055565b600082815260208181526040909120620002ff91839062000c096200035c821b17901c565b15620002c057620003186001600160e01b03620002a616565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006200037c836001600160a01b0384166001600160e01b036200038516565b90505b92915050565b60006200039c83836001600160e01b03620003dd16565b620003d4575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200037f565b5060006200037f565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200043857805160ff191683800117855562000468565b8280016001018555821562000468579182015b82811115620004685782518255916020019190600101906200044b565b50620004769291506200047a565b5090565b620002a891905b8082111562000476576000815560010162000481565b61191880620004a76000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c806370a08231116100f9578063a457c2d711610097578063d539139311610071578063d53913931461051f578063d547741f14610527578063dd62ed3e14610553578063e63ab1e914610581576101a9565b8063a457c2d7146104aa578063a9059cbb146104d6578063ca15c87314610502576101a9565b80639010d07c116100d35780639010d07c1461042f57806391d148541461046e57806395d89b411461049a578063a217fddf146104a2576101a9565b806370a08231146103d557806379cc6790146103fb5780638456cb5914610427576101a9565b8063313ce567116101665780633f4ba83a116101405780633f4ba83a1461037c57806340c10f191461038457806342966c68146103b05780635c975abb146103cd576101a9565b8063313ce5671461030657806336568abe146103245780633950935114610350576101a9565b806306fdde03146101ae578063095ea7b31461022b57806318160ddd1461026b57806323b872dd14610285578063248a9ca3146102bb5780632f2ff15d146102d8575b600080fd5b6101b6610589565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101f05781810151838201526020016101d8565b50505050905090810190601f16801561021d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102576004803603604081101561024157600080fd5b506001600160a01b03813516906020013561061f565b604080519115158252519081900360200190f35b61027361063d565b60408051918252519081900360200190f35b6102576004803603606081101561029b57600080fd5b506001600160a01b03813581169160208101359091169060400135610643565b610273600480360360208110156102d157600080fd5b50356106d0565b610304600480360360408110156102ee57600080fd5b50803590602001356001600160a01b03166106e5565b005b61030e610751565b6040805160ff9092168252519081900360200190f35b6103046004803603604081101561033a57600080fd5b50803590602001356001600160a01b031661075a565b6102576004803603604081101561036657600080fd5b506001600160a01b0381351690602001356107bb565b61030461080f565b6103046004803603604081101561039a57600080fd5b506001600160a01b038135169060200135610880565b610304600480360360208110156103c657600080fd5b50356108f1565b610257610905565b610273600480360360208110156103eb57600080fd5b50356001600160a01b0316610913565b6103046004803603604081101561041157600080fd5b506001600160a01b03813516906020013561092e565b61030461098e565b6104526004803603604081101561044557600080fd5b50803590602001356109fd565b604080516001600160a01b039092168252519081900360200190f35b6102576004803603604081101561048457600080fd5b50803590602001356001600160a01b0316610a22565b6101b6610a40565b610273610aa1565b610257600480360360408110156104c057600080fd5b506001600160a01b038135169060200135610aa6565b610257600480360360408110156104ec57600080fd5b506001600160a01b038135169060200135610b14565b6102736004803603602081101561051857600080fd5b5035610b28565b610273610b3f565b6103046004803603604081101561053d57600080fd5b50803590602001356001600160a01b0316610b62565b6102736004803603604081101561056957600080fd5b506001600160a01b0381358116916020013516610bbb565b610273610be6565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106155780601f106105ea57610100808354040283529160200191610615565b820191906000526020600020905b8154815290600101906020018083116105f857829003601f168201915b5050505050905090565b600061063361062c610c1e565b8484610c22565b5060015b92915050565b60035490565b6000610650848484610d0e565b6106c68461065c610c1e565b6106c185604051806060016040528060288152602001611742602891396001600160a01b038a1660009081526002602052604081209061069a610c1e565b6001600160a01b03168152602081019190915260400160002054919063ffffffff610e7716565b610c22565b5060019392505050565b60009081526020819052604090206002015490565b60008281526020819052604090206002015461070890610703610c1e565b610a22565b6107435760405162461bcd60e51b815260040180806020018281038252602f815260200180611640602f913960400191505060405180910390fd5b61074d8282610f0e565b5050565b60065460ff1690565b610762610c1e565b6001600160a01b0316816001600160a01b0316146107b15760405162461bcd60e51b815260040180806020018281038252602f81526020018061188a602f913960400191505060405180910390fd5b61074d8282610f7d565b60006106336107c8610c1e565b846106c185600260006107d9610c1e565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610fec16565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902061083b90610703610c1e565b6108765760405162461bcd60e51b81526004018080602001828103825260398152602001806116916039913960400191505060405180910390fd5b61087e611046565b565b604080516a4d494e5445525f524f4c4560a81b8152905190819003600b0190206108ac90610703610c1e565b6108e75760405162461bcd60e51b815260040180806020018281038252603681526020018061176a6036913960400191505060405180910390fd5b61074d82826110e7565b6109026108fc610c1e565b826111e5565b50565b600654610100900460ff1690565b6001600160a01b031660009081526001602052604090205490565b600061096b826040518060600160405280602481526020016117a06024913961095e86610959610c1e565b610bbb565b919063ffffffff610e7716565b905061097f83610979610c1e565b83610c22565b61098983836111e5565b505050565b604080516a5041555345525f524f4c4560a81b8152905190819003600b0190206109ba90610703610c1e565b6109f55760405162461bcd60e51b815260040180806020018281038252603781526020018061182e6037913960400191505060405180910390fd5b61087e6112ed565b6000828152602081905260408120610a1b908363ffffffff61137216565b9392505050565b6000828152602081905260408120610a1b908363ffffffff61137e16565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106155780601f106105ea57610100808354040283529160200191610615565b600081565b6000610633610ab3610c1e565b846106c1856040518060600160405280602581526020016118656025913960026000610add610c1e565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610e7716565b6000610633610b21610c1e565b8484610d0e565b600081815260208190526040812061063790611393565b604080516a4d494e5445525f524f4c4560a81b8152905190819003600b01902081565b600082815260208190526040902060020154610b8090610703610c1e565b6107b15760405162461bcd60e51b81526004018080602001828103825260308152602001806117126030913960400191505060405180910390fd5b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902081565b6000610a1b836001600160a01b03841661139e565b3390565b6001600160a01b038316610c675760405162461bcd60e51b815260040180806020018281038252602481526020018061180a6024913960400191505060405180910390fd5b6001600160a01b038216610cac5760405162461bcd60e51b81526004018080602001828103825260228152602001806116ca6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610d535760405162461bcd60e51b81526004018080602001828103825260258152602001806117e56025913960400191505060405180910390fd5b6001600160a01b038216610d985760405162461bcd60e51b815260040180806020018281038252602381526020018061161d6023913960400191505060405180910390fd5b610da38383836113e8565b610de6816040518060600160405280602681526020016116ec602691396001600160a01b038616600090815260016020526040902054919063ffffffff610e7716565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610e1b908263ffffffff610fec16565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610f065760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610ecb578181015183820152602001610eb3565b50505050905090810190601f168015610ef85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828152602081905260409020610f2c908263ffffffff610c0916565b1561074d57610f39610c1e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610f9b908263ffffffff6113f316565b1561074d57610fa8610c1e565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015610a1b576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b61104e610905565b611096576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b6006805461ff00191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6110ca610c1e565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b038216611142576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b61114e600083836113e8565b600354611161908263ffffffff610fec16565b6003556001600160a01b03821660009081526001602052604090205461118d908263ffffffff610fec16565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b03821661122a5760405162461bcd60e51b81526004018080602001828103825260218152602001806117c46021913960400191505060405180910390fd5b611236826000836113e8565b6112798160405180606001604052806022815260200161166f602291396001600160a01b038516600090815260016020526040902054919063ffffffff610e7716565b6001600160a01b0383166000908152600160205260409020556003546112a5908263ffffffff61140816565b6003556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6112f5610905565b1561133a576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b6006805461ff0019166101001790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110ca610c1e565b6000610a1b8383611465565b6000610a1b836001600160a01b0384166114c9565b6000610637826114e1565b60006113aa83836114c9565b6113e057508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610637565b506000610637565b6109898383836114e5565b6000610a1b836001600160a01b038416611534565b60008282111561145f576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b815460009082106114a75760405162461bcd60e51b81526004018080602001828103825260228152602001806115fb6022913960400191505060405180910390fd5b8260000182815481106114b657fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b6114f0838383610989565b6114f8610905565b156109895760405162461bcd60e51b815260040180806020018281038252602a8152602001806118b9602a913960400191505060405180910390fd5b600081815260018301602052604081205480156115f0578354600019808301919081019060009087908390811061156757fe5b906000526020600020015490508087600001848154811061158457fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806115b457fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610637565b600091505061063756fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f2061646472657373416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e7445524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332305072657365744d696e7465725061757365723a206d75737420686176652070617573657220726f6c6520746f20756e706175736545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332305072657365744d696e7465725061757365723a206d7573742068617665206d696e74657220726f6c6520746f206d696e7445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332305072657365744d696e7465725061757365723a206d75737420686176652070617573657220726f6c6520746f20706175736545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a264697066735822122078dc3be81f51104950699ead91490e3c469a246171fda1ed8f9fef1e39a88f1c64736f6c634300060b0033";

type ERC20MinterBurnerPauserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20MinterBurnerPauserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20MinterBurnerPauser__factory extends ContractFactory {
  constructor(...args: ERC20MinterBurnerPauserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: string,
    symbol: string,
    decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20MinterBurnerPauser> {
    return super.deploy(
      name,
      symbol,
      decimals,
      overrides || {}
    ) as Promise<ERC20MinterBurnerPauser>;
  }
  override getDeployTransaction(
    name: string,
    symbol: string,
    decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, decimals, overrides || {});
  }
  override attach(address: string): ERC20MinterBurnerPauser {
    return super.attach(address) as ERC20MinterBurnerPauser;
  }
  override connect(signer: Signer): ERC20MinterBurnerPauser__factory {
    return super.connect(signer) as ERC20MinterBurnerPauser__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20MinterBurnerPauserInterface {
    return new utils.Interface(_abi) as ERC20MinterBurnerPauserInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20MinterBurnerPauser {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC20MinterBurnerPauser;
  }
}
