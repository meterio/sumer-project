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
  RedemptionManager,
  RedemptionManagerInterface,
} from "../../../contracts/Comptroller/RedemptionManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_baseRate",
        type: "uint256",
      },
    ],
    name: "BaseRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "LastFeeOpTimeUpdated",
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
    inputs: [],
    name: "BETA",
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
    name: "DECIMAL_PRECISION",
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
    name: "MAX_BORROWING_FEE",
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
    name: "MINUTE_DECAY_FACTOR",
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
    name: "REDEMPTION_FEE_FLOOR",
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
    name: "SECONDS_IN_ONE_MINUTE",
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
    name: "baseRate",
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
        name: "redeemAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "suToken",
        type: "address",
      },
      {
        internalType: "contract IPriceOracle",
        name: "oracle",
        type: "address",
      },
    ],
    name: "calcActualRepayAndSeize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    inputs: [],
    name: "comptroller",
    outputs: [
      {
        internalType: "contract IComptroller",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "getFirstProvider",
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
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_id",
        type: "address",
      },
    ],
    name: "getNextProvider",
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
    name: "getRedemptionRate",
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
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "hasNoProvider",
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
        name: "_admin",
        type: "address",
      },
      {
        internalType: "contract ISortedBorrows",
        name: "_sortedBorrows",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastFeeOperationTime",
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
    inputs: [
      {
        internalType: "contract IComptroller",
        name: "_comptroller",
        type: "address",
      },
    ],
    name: "setComptroller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISortedBorrows",
        name: "_sortedBorrows",
        type: "address",
      },
    ],
    name: "setSortedBorrows",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sortedBorrows",
    outputs: [
      {
        internalType: "contract ISortedBorrows",
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
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
    name: "updateBaseRateFromRedemption",
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
        name: "csuToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
    ],
    name: "updateSortedBorrows",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001657611f2a908161001c8239f35b600080fdfe608060408181526004908136101561001657600080fd5b600092833560e01c90816301ffc9a714610fa057508063071a754114610f845780631f68f20a14610f655780632409266914610f43578063248a9ca314610f1857806328d28b5b14610ef65780632b11551a14610e955780632f2ff15d14610ddb57806336568abe14610d49578063485cc95514610b8557806350e8542314610b245780635fe3b56714610afb57806361ec893d14610adf5780638bad38dd14610a0b5780639010d07c146109ca57806391d148541461098357838163947f5b7714610642575080639d3fe0b01461050e578063a20baee6146104eb578063a217fddf146104d0578063bbf56b3a14610464578063c33520eb1461038d578063c7b554811461036a578063ca15c87314610342578063d380a37c14610323578063d547741f146102e6578063d99550c91461022e578063ec8b88ee146102015763fb02cd421461016557600080fd5b346101fd5760203660031901126101fd57602061018061106d565b60c9548351633b725b2360e01b81526001600160a01b039283169581019590955284916024918391165afa9182156101f357602093926101c4575b50519015158152f35b6101e5919250833d81116101ec575b6101dd8183611422565b8101906117e3565b90386101bb565b503d6101d3565b81513d85823e3d90fd5b8280fd5b83823461022a578160031936011261022a5760c95490516001600160a01b039091168152602090f35b5080fd5b5090346101fd57816003193601126101fd5761029191602061024e61106d565b92610257611057565b60c95484516339ed25cd60e01b81526001600160a01b03968716938101938452918616602084015290958692918616918391829160400190565b03915afa9283156102dc57602094936102ad575b505191168152f35b6102ce919350843d81116102d5575b6102c68183611422565b81019061190b565b91386102a5565b503d6102bc565b81513d86823e3d90fd5b50346101fd57806003193601126101fd57610320913561031b6001610309611057565b93838752606560205286200154611277565b611470565b80f35b83823461022a578160031936011261022a5760209060cc549051908152f35b5090346101fd5760203660031901126101fd5760209282913581526097845220549051908152f35b83823461022a578160031936011261022a5760209051670ddd4b8c6c7d70d88152f35b50346101fd5760203660031901126101fd576103a761106d565b6103af611083565b60c95482516344b7213760e11b815290936001600160a01b039390916020818481888a165afa90811561045a57879161043c575b501561040057505016906001600160601b0360a01b161760c95580f35b906020606492519162461bcd60e51b83528201526016602482015275696e76616c696420736f7274656420626f72726f777360501b6044820152fd5b610454915060203d81116101ec576101dd8183611422565b386103e3565b82513d89823e3d90fd5b5090346101fd5760a03660031901126101fd5761047f611057565b6001600160a01b0391906044359083821682036104cb576064359284841684036104cb5760843594851685036104c7576104bb9596503561197d565b82519182526020820152f35b8680fd5b600080fd5b83823461022a578160031936011261022a5751908152602090f35b83823461022a578160031936011261022a5760209051670de0b6b3a76400008152f35b5082903461022a578060031936011261022a5761053f60018060a01b0360ca5416331461053a816117fb565b6117fb565b60cc54670de0b6b3a76400008061056c610564603c61055e86426116e6565b0461183a565b60cb5461102e565b049061057b602435873561100e565b60011c820180921161062d57808210156106255750925b83156106125760208484603c6105d4868460cb557fc454ee9b76c52f782a256af821b857ca6e125d1e3333bcede402fec2bed9600c868551878152a1426116e6565b10156105e1575b51908152f35b4260cc557f860f8d2f0c74dd487e89e2883e3b25b8159ce1e1b3433a291cba7b82c508f3bc838251428152a16105db565b634e487b7160e01b815260018552602490fd5b905092610592565b601186634e487b7160e01b6000525260246000fd5b8084843461097f578060031936011261097f5761065d61106d565b610665611057565b60ca546001600160a01b0394919061068090861633146117fb565b8351637f4e225760e11b8152602093808716939185818481885afa908115610975578991610958575b50156106b3578780f35b8551926395dd919360e01b84528781169788848601528685602481895afa94851561094e578a9561091f575b5060c9548851631da4d95d60e31b81526001600160a01b038086168783019081529085166020820152918316918990829081906040010381855afa90811561088f578c91610902575b5015610899575060c95488516239c6e160ea1b81526001600160a01b03808616878301908152908516602082015290949183169391908990869081906040010381875afa94851561088f57908992918d96610868575b508a516339ed25cd60e01b81526001600160a01b039182168882019081529290911660208301529190829081906040015b0381865afa97881561085e578b9861083f575b5050813b1561083b57899681889460a4978b519c8d9a8b9963bc9b5bd560e01b8b528a0152602489015260448801521660648601521660848401525af1908115610832575061081b575b50505b80828080808080808780f35b610824906113a4565b61082f57808261080c565b80fd5b513d84823e3d90fd5b8980fd5b610856929850803d106102d5576102c68183611422565b958b806107c2565b89513d8d823e3d90fd5b8392919650610886906107af943d85116102d5576102c68183611422565b9590919261077e565b8a513d8e823e3d90fd5b9596505050509082969495963b156108fe5760a492859187519889968795633e499e0560e11b8752860152602485015260448401528160648401528160848401525af190811561083257506108ef575b5061080f565b6108f8906113a4565b816108e9565b8480fd5b6109199150893d8b116101ec576101dd8183611422565b8d610728565b9094508681813d8311610947575b6109378183611422565b8101031261083b5751938b6106df565b503d61092d565b88513d8c823e3d90fd5b61096f9150863d88116101ec576101dd8183611422565b8a6106a9565b87513d8b823e3d90fd5b5050fd5b5090346101fd57816003193601126101fd578160209360ff926109a4611057565b90358252606586528282206001600160a01b039091168252855220549151911615158152f35b5090346101fd57816003193601126101fd576020926109f59135815260978452826024359120611644565b905491519160018060a01b039160031b1c168152f35b5090346101fd5760203660031901126101fd5780356001600160a01b0381169290839003610adb57610a3b611083565b8051623f1ee960e11b81526020818481875afa908115610ad1578591610ab3575b5015610a7a5750506001600160601b0360a01b60ca54161760ca5580f35b906020606492519162461bcd60e51b8352820152601360248201527234b73b30b634b21031b7b6b83a3937b63632b960691b6044820152fd5b610acb915060203d81116101ec576101dd8183611422565b38610a5c565b82513d87823e3d90fd5b8380fd5b83823461022a578160031936011261022a5760209051603c8152f35b83823461022a578160031936011261022a5760ca5490516001600160a01b039091168152602090f35b50346101fd5760203660031901126101fd576024906020610b4361106d565b60c9548351631bdb4c8d60e01b81526001600160a01b039283169681019690965290938591829086165afa9283156102dc57602094936102ad57505191168152f35b5090346101fd57816003193601126101fd57610b9f61106d565b90610ba8611057565b9184549260ff8460081c161592838094610d3c575b8015610d25575b15610ccb575060ff1984811660011787559383610cba575b50858052606560209081528587206001600160a01b03938416808952908252868820549195610c1e9260ff1615610c72575b508780526097865286882061165c565b50166001600160601b0360a01b60c954161760c955610c3b578280f35b7f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989161ff001984541684555160018152a138808280f35b88805260658752878920828a5287526001888a20918254161790553381897f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8180a438610c0e565b61ffff191661010117865538610bdc565b608490602087519162461bcd60e51b8352820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152fd5b50303b158015610bc45750600160ff861614610bc4565b50600160ff861610610bbd565b5091903461022a578260031936011261022a57610d64611057565b90336001600160a01b03831603610d8057906103209135611470565b608490602085519162461bcd60e51b8352820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152fd5b50346101fd57806003193601126101fd57610e489135906097610dfc611057565b9280865260209060658252610e1660018589200154611277565b808752606582528387206001600160a01b039095168088529482528387205460ff1615610e4c575b865252832061165c565b5080f35b808752606582528387208588528252838720805460ff191660011790553385827f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8a80a4610e3e565b50823461082f578060031936011261082f5760cb54906611c37937e08000918201809211610ee3575060209250670de0b6b3a764000080821015610edb57509051908152f35b9050906105db565b634e487b7160e01b815260118452602490fd5b83823461022a578160031936011261022a57602090516611c37937e080008152f35b5090346101fd5760203660031901126101fd5781602093600192358152606585522001549051908152f35b83823461022a578160031936011261022a576020905166b1a2bc2ec500008152f35b83823461022a578160031936011261022a5760209060cb549051908152f35b83823461022a578160031936011261022a576020905160028152f35b849084346101fd5760203660031901126101fd573563ffffffff60e01b81168091036101fd5760209250635a05180f60e01b8114908115610fe3575b5015158152f35b637965db0b60e01b811491508115610ffd575b5083610fdc565b6301ffc9a760e01b14905083610ff6565b8115611018570490565b634e487b7160e01b600052601260045260246000fd5b8181029291811591840414171561104157565b634e487b7160e01b600052601160045260246000fd5b602435906001600160a01b03821682036104cb57565b600435906001600160a01b03821682036104cb57565b3360009081527fffdfc1249c027f9191656349feb0761381bb32c9f557e01f419fd08754bf5a1b602090815260408083205490929060ff16156110c557505050565b6110ce33611535565b835190826110db83611406565b6042835284830193606036863783511561126357603085538351906001918210156112635790607860218601536041915b8183116111f5575050506111b3576111619385936111999361118a6048946111af9951988576020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8b978801528251928391603789019101611381565b8401917001034b99036b4b9b9b4b733903937b6329607d1b603784015251809386840190611381565b01036028810185520183611422565b5162461bcd60e51b815291829160048301611444565b0390fd5b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f8116601081101561124f576f181899199a1a9b1b9c1cb0b131b232b360811b901a611225858861150e565b5360041c92801561123b5760001901919061110c565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b600081815260209060658252604092838220338352835260ff8483205416156112a05750505050565b6112a933611535565b8451916112b583611406565b6042835284830193606036863783511561126357603085538351906001918210156112635790607860218601536041915b81831161133b575050506111b3576111619385936111999361118a6048946111af9951988576020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8b978801528251928391603789019101611381565b909192600f8116601081101561124f576f181899199a1a9b1b9c1cb0b131b232b360811b901a61136b858861150e565b5360041c92801561123b576000190191906112e6565b60005b8381106113945750506000910152565b8181015183820152602001611384565b67ffffffffffffffff81116113b857604052565b634e487b7160e01b600052604160045260246000fd5b6020810190811067ffffffffffffffff8211176113b857604052565b6040810190811067ffffffffffffffff8211176113b857604052565b6080810190811067ffffffffffffffff8211176113b857604052565b90601f8019910116810190811067ffffffffffffffff8211176113b857604052565b604091602082526114648151809281602086015260208686019101611381565b601f01601f1916010190565b9060406114ae9260009080825260656020528282209360018060a01b03169384835260205260ff83832054166114b1575b81526097602052206116f3565b50565b808252606560205282822084835260205282822060ff1981541690553384827ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b8580a46114a1565b906706f05b59d3b20000820180921161104157565b90815181101561151f570160200190565b634e487b7160e01b600052603260045260246000fd5b604051906060820182811067ffffffffffffffff8211176113b857604052602a825260208201604036823782511561151f5760309053815160019081101561151f57607860218401536029905b8082116115d65750506115925790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f8116601081101561162f576f181899199a1a9b1b9c1cb0b131b232b360811b901a611605848661150e565b5360041c91801561161a576000190190611582565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b805482101561151f5760005260206000200190600090565b919060018301600090828252806020526040822054156000146116e057845494680100000000000000008610156116cc57836116bc6116a5886001604098999a01855584611644565b819391549060031b91821b91600019901b19161790565b9055549382526020522055600190565b634e487b7160e01b83526041600452602483fd5b50925050565b9190820391821161104157565b906001820190600092818452826020526040842054908115156000146117dc57600019918083018181116117c8578254908482019182116117b45780820361177f575b5050508054801561176b5782019161174e8383611644565b909182549160031b1b191690555582526020526040812055600190565b634e487b7160e01b86526031600452602486fd5b61179f61178f6116a59386611644565b90549060031b1c92839286611644565b90558652846020526040862055388080611736565b634e487b7160e01b88526011600452602488fd5b634e487b7160e01b87526011600452602487fd5b5050505090565b908160209103126104cb575180151581036104cb5790565b1561180257565b60405162461bcd60e51b815260206004820152601060248201526f37b7363c9031b7b6b83a3937b63632b960811b6044820152606490fd5b90631f540500808311611903575b5081156118f657670de0b6b3a764000091670ddd4b8c6c7d70d8905b600191828211156118d75781831661189c5761189161188c82670de0b6b3a76400009361102e565b6114f9565b04911c925b92611864565b936118c261188c670de0b6b3a76400006118ba61188c82958a61102e565b04968061102e565b0491600019820191821161161a571c92611896565b6118f2925061188c915093670de0b6b3a7640000939461102e565b0490565b670de0b6b3a76400009150565b915038611848565b908160209103126104cb57516001600160a01b03811681036104cb5790565b1561193157565b60405162461bcd60e51b815260206004820152600b60248201526a383934b1b29032b93937b960a91b6044820152606490fd5b908160209103126104cb575160ff811681036104cb5790565b909194929360018060a01b038096169060408051926361bfb47160e11b84528860049616868501526024956080858881855afa938415611d7b57600080968196611d37575b50611d04578515611cf3578a1683519a63fc57d4df60e01b9a8b8d52169788838d015260209a8b8d8381865afa9c8d15611c0e5760009d611cc2575b508c611a0f8d9e9d9c9d151561192a565b86519d8e868163313ce56760e01b9e8f82525afa9d8e15611cb75760009e611c98575b50865190611a3f826113ce565b815260ff819e1660128110611c53575b50508a9082875180958193825288888301525afa918215611c4857600092611c19575b50611a7e82151561192a565b845191611a8a836113ce565b8252819885519081528a818581885afa908115611c0e578b959493929160ff91600091611be1575b501660128110611b95575b5050845163bd6d894d60e01b815293928492915082906000905af1968715611b8a579089939291600098611b51575b505093611b2b93611b30611b439794611b2b611b2b95611b269b995199611b128b6113ce565b8a52670de0b6b3a76400009b8c9589611d86565b611d86565b611e94565b51049080821015611b4857508098611d86565b510490565b90508098611d86565b9080939450819892983d8311611b83575b611b6c8183611422565b8101031261082f5750519487919083611b30611aec565b503d611b62565b82513d6000823e3d90fd5b919394509198506012039060128211611bce57604d8211611bce575091611bc38992600094600a0a90611d86565b979091923880611abd565b634e487b7160e01b600090815260118a52fd5b611c019150873d8911611c07575b611bf98183611422565b810190611964565b38611ab2565b503d611bef565b86513d6000823e3d90fd5b90918a82813d8311611c41575b611c308183611422565b8101031261082f5750519038611a72565b503d611c26565b85513d6000823e3d90fd5b90919d5060120360ff8111611c845760ff16604d8111611c84578b91611c7c91600a0a90611d86565b9c9038611a4f565b82601186634e487b7160e01b600052526000fd5b611cb0919e508c8d3d10611c0757611bf98183611422565b9c38611a32565b87513d6000823e3d90fd5b8c81813d8311611cec575b611cd78183611422565b81010312611ce857519c508b6119fe565b8d80fd5b503d611ccd565b506000995089985050505050505050565b835162461bcd60e51b8152602081840152600e818a01526d39b730b839b437ba1032b93937b960911b6044820152606490fd5b95509095506080853d8211611d73575b81611d5460809383611422565b8101031261082f575083516020850151606090950151949590386119c2565b3d9150611d47565b83513d6000823e3d90fd5b90611daa916000604051611d99816113ce565b525190611da4611dbc565b91611e66565b60405190611db7826113ce565b815290565b60405190611dc9826113ea565b601782527f6d756c7469706c69636174696f6e206f766572666c6f770000000000000000006020830152565b15611dfd5750565b60405162461bcd60e51b81529081906111af9060048301611444565b801591828015611e5e575b611e5657670de0b6b3a7640000808302938385048214171561104157611e4d611e53938561100e565b14611df5565b90565b505050600090565b506000611e24565b9182158015611e8c575b611e565781611e4d611e85611e53948661102e565b948561100e565b508115611e70565b90611eba611daa926000604051611eaa816113ce565b5251611eb4611dbc565b90611e19565b905190611eef604051611ecc816113ea565b600e81526d646976696465206279207a65726f60901b6020820152831515611df5565b61100e56fea26469706673582212202aed3e5cd30c0975961ef49f8e86f722bea0517b7c1d0290c01b605df9872cb164736f6c63430008130033";

type RedemptionManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RedemptionManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RedemptionManager__factory extends ContractFactory {
  constructor(...args: RedemptionManagerConstructorParams) {
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
      RedemptionManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RedemptionManager__factory {
    return super.connect(runner) as RedemptionManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RedemptionManagerInterface {
    return new Interface(_abi) as RedemptionManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RedemptionManager {
    return new Contract(address, _abi, runner) as unknown as RedemptionManager;
  }
}
