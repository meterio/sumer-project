/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LpOracle, LpOracleInterface } from "../LpOracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "feedId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "source",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "feedDecimals",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "SetFeed",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
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
    name: "feeds",
    outputs: [
      {
        internalType: "bytes32",
        name: "feedId",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "source",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "feedDecimals",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "name",
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
        name: "",
        type: "address",
      },
    ],
    name: "fixedPrices",
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
        name: "cToken_",
        type: "address",
      },
    ],
    name: "getFeed",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "feedId",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "source",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "feedDecimals",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct FeedPriceOracle.FeedData",
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
        name: "cToken_",
        type: "address",
      },
    ],
    name: "getFixedPrice",
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
        name: "lpToken",
        type: "address",
      },
    ],
    name: "getPrice",
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
        name: "cToken_",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "cTokens",
        type: "address[]",
      },
    ],
    name: "getUnderlyingPrices",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPriceOracle",
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
    inputs: [],
    name: "pendingOwner",
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
        name: "cToken_",
        type: "address",
      },
    ],
    name: "removeFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
    ],
    name: "removeFixedPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "feedDecimals_",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setBandFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
    ],
    name: "setChainlinkFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setFixedPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "lpToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setLpOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "feedId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setPythFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "feedDecimals_",
        type: "uint8",
      },
    ],
    name: "setWitnetFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080806040523461006357600180546001600160a01b03199081169091556000805433928116831782556001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a36121dd90816100698239f35b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c9182630c1502eb1461179a5750816316b8e731146116c05781631badc89a14611684578382631e922ea61461164b5750816329290124146114085781632fba4aa91461138657816341976e091461101f57816348a1371b14610ea2578382634b90fd6914610e135750816366331bba14610df7578163688202c514610b6557816369ef32d2146108ed578163715018a61461088857816379ba5097146107c75781638da5cb5b1461079f578163b1b06949146104a7578163cad75c681461020e57508063e30c3978146101e6578063e983fe25146101af578063f2fde38b1461013f5763fc57d4df1461011057600080fd5b3461013b57602036600319011261013b5760209061013461012f6117ce565b611aed565b9051908152f35b5080fd5b82346101ac5760203660031901126101ac576101596117ce565b6101616119c9565b600180546001600160a01b0319166001600160a01b0392831690811790915582549091167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e227008380a380f35b80fd5b503461013b57602036600319011261013b5760209181906001600160a01b036101d66117ce565b1681526003845220549051908152f35b503461013b578160031936011261013b5760015490516001600160a01b039091168152602090f35b9050346104a35760603660031901126104a3576102296117ce565b602435906102356117ff565b9061023e6119c9565b84519161024a836118c0565b8683526001600160a01b0390811691821561046d5716948587526020946002865283600160ff81858c2001541661045f575b600284516102898161188f565b8881528b8a8c888285019389855286828701948d8652606088019460128652608089019b8c52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b161717179055019151908151916001600160401b03831161044c578b61030f8554611855565b8b601f8211610413575b50505089908c601f851160011461039857936000805160206121888339815191529b9a99979593819382936103879b99979461038d575b50501b916000199060031b1c19161790555b815196879687528601528401526012606084015260a0608084015260a0830190611815565b0390a280f35b015192503880610350565b9190601f9493941984168684528c8420935b8181106103fe5750916103879997959391856000805160206121888339815191529e9d9c9a989694106103e5575b505050811b019055610362565b015160001960f88460031b161c191690553880806103d8565b82840151855593860193928d01928d016103aa565b828761043a945220601f860160051c8101918d8710610442575b601f0160051c0190611a21565b8b388b610319565b909150819061042d565b634e487b7160e01b8c526041855260248cfd5b60038852898481205561027c565b865162461bcd60e51b8152602081880152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b8280fd5b919050346104a35760803660031901126104a3576104c36117ce565b6104cb6117e9565b906104d46119b9565b90606435936001600160401b0380861161079b573660238701121561079b57858701358181116107885782519589602098601f199361051a8b86601f840116018b6118db565b808a5236602482840101116104a3578060248c9301838c01378901015261053f6119c9565b6001600160a01b039081169485156107525791849188949316998a97888d5260028b5260ff8d600195869120015416610744575b8c8b8851926105818461188f565b828452898285019360038552818601938d8552606087019360ff169e8f8552608088019c8d528252600290522093518455868401925160ff16835492600160a81b6101009003905160081b169160ff60a81b905160a81b16926001600160501b0360b01b161717179055600201945190815194851161073157508b6106068654611855565b8b601f8211610703575b5050508b8a92601f86116001146106895750938060039a97946000805160206121888339815191529c9a979482946103879b989461067e575b50501b91600019908b1b1c19161790555b80519687968b8852870152850152606084015260a0608084015260a0830190611815565b015192503880610649565b868e528b8e209495949392915084168d5b8181106106ee575092610387989592859260039c99966000805160206121888339815191529e9c9996106106d6575b505050811b01905561065a565b0151600019838d1b60f8161c191690553880806106c9565b82840151855593860193928c01928c0161069a565b8288610729945220601f870160051c8101918d881061044257601f0160051c0190611a21565b8b388b610610565b634e487b7160e01b8d526041905260248cfd5b60038b528c87812055610573565b845162461bcd60e51b8152808b018a9052601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b634e487b7160e01b895260418852602489fd5b8780fd5b50503461013b578160031936011261013b57905490516001600160a01b039091168152602090f35b919050346104a357826003193601126104a357600154916001600160a01b039133838516036108335750506001600160a01b031991821660015582543392811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b6064820152fd5b83346101ac57806003193601126101ac576108a16119c9565b600180546001600160a01b03199081169091558154908116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b8391503461013b578260031936011261013b576109086117ce565b906109116117e9565b6109196119c9565b845190610925826118c0565b8482526001600160a01b03908116938415610b2f571692838552602095600287528560019460ff86848420015416610b21575b600283516109658161188f565b8381528a81018881528582018781528c846060850191600883528d60808701998d8b525252878d209351845560ff8b8501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550191518051916001600160401b038311610b0e57506109e88354611855565b601f8111610ae0575b508990601f8311600114610a685791806103879694928b9c9896946000805160206121888339815191529b9c92610a5d575b5050600019600383901b1c191690881b1790555b80519586958a87528601528401526008606084015260a0608084015260a0830190611815565b015190508c80610a23565b838a528a8a209190601f1984168b5b818110610acb575092899285926000805160206121888339815191529c9d9e9a98966103879a989610610ab2575b505050811b019055610a37565b015160001960f88460031b161c191690558c8080610aa5565b828401518555938a0193928d01928d01610a77565b610b0890848b528b8b20601f850160051c8101918d861061044257601f0160051c0190611a21565b8a6109f1565b634e487b7160e01b8a5260419052602489fd5b600389528183812055610958565b865162461bcd60e51b8152602081860152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b919050346104a35760603660031901126104a357610b816117ce565b91610b8a6117e9565b92610b936119b9565b92610b9c6119c9565b805194610ba8866118c0565b8686526001600160a01b03908116928315610dc15790869493929116958693848952826002602098818a5260ff8c600194859120015416610db3575b8b8a875192610bf28461188f565b828452888285019386855286828701948d865260ff6060890195169e8f8652608089019c8d52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550192518051926001600160401b038411610da05750610c778454611855565b601f8111610d72575b5088908b601f8511600114610cf657938060029a97946000805160206121888339815191529c9a979482946103879b9894610ceb575b50501b916000199060031b1c191617905580519687968b8852870152850152606084015260a0608084015260a0830190611815565b015192503880610cb6565b50848c52898c209293929190601f1984168d5b818110610d5d575092610387989592859260029c99966000805160206121888339815191529e9c999610610d4457505050811b01905561065a565b015160001960f88460031b161c191690553880806106c9565b82840151855593860193928c01928c01610d09565b610d9a90858d528a8d20601f860160051c8101918c871061044257601f0160051c0190611a21565b38610c80565b634e487b7160e01b8c526041905260248bfd5b60038a528b86812055610be4565b825162461bcd60e51b8152602081870152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b50503461013b578160031936011261013b576020905160018152f35b808434610e9f576020366003190112610e9f57600290610e316117ce565b610e396119c9565b6001600160a01b031683526020829052822082815560018101839055018054610e6190611855565b80610e6a575050f35b82601f8211600114610e7c5750505580f35b9091808252610e9a601f60208420940160051c840160018501611a21565b555580f35b50fd5b8391503461013b576020806003193601126104a3578135926001600160401b0384116101ac57366023850112156101ac5783830135610ee0816119a2565b94610eed875196876118db565b8186528386016024809360051b8301019136831161101b579497969593948301905b828210610fea575050508351610f24816119a2565b92610f31875194856118db565b818452610f3d826119a2565b8489019690601f1901368837855b838110610f9257505050505083519485948186019282875251809352850193925b828110610f7b57505050500390f35b835185528695509381019392810192600101610f6c565b9798969794969594610fb66001600160a01b03610faf8385612118565b5116611aed565b610fc0828a612118565b526000198114610fd857600101989796949598610f4b565b634e487b7160e01b8652601183528486fd5b969795969395949381356001600160a01b0381168103611017578152949796959394908801908801610f0f565b8580fd5b8480fd5b919050346104a357602092836003193601126101ac576001600160a01b0392836110476117ce565b845163392f37e960e01b815295911660e0868481845afa801561137c5784968591611322575b5085516370a0823160e01b8082528582018490529093888116908a86602481855afa95861561125e5788966112f3575b508316938851928352868301528982602481875afa9182156112e95787926112b6575b508751938a85888163313ce56760e01b958682525afa94851561125e578895611297575b5088519182528a828881845afa91821561125e5787918c918a94611268575b508a516318160ddd60e01b815292839182905afa90811561125e578891611231575b50670de0b6b3a7640000958681029080820488149015171561121e578161114b91612156565b928681029080820488149015171561121e5761116d6111799261117392612156565b9a611aed565b93611aed565b93601260ff8216106111ff575b50601260ff8216106111cf575b506111a36111aa93928592611a38565b0496611a38565b0484018094116111bc57505051908152f35b634e487b7160e01b825260119052602490fd5b6111aa93926111f486939a6111ee6111e96111a395611a7a565b612176565b90611a38565b999250929350611193565b6112179199506111e961121191611a7a565b82611a38565b9738611186565b634e487b7160e01b895260118852602489fd5b90508a81813d8311611257575b61124881836118db565b8101031261079b575138611125565b503d61123e565b89513d8a823e3d90fd5b611289919450823d8411611290575b61128181836118db565b810190611a61565b9238611103565b503d611277565b6112af9195508b3d8d116112905761128181836118db565b93386110e4565b9091508981813d83116112e2575b6112ce81836118db565b810103126112de575190386110c0565b8680fd5b503d6112c4565b88513d89823e3d90fd5b9095508a81813d831161131b575b61130b81836118db565b8101031261079b5751943861109d565b503d611301565b96505060e0863d8211611374575b8161133d60e093836118db565b81010312611370576080860151801515036113705761136a60c061136360a08901612142565b9701612142565b3861106d565b8380fd5b3d9150611330565b85513d86823e3d90fd5b50503461013b57602036600319011261013b576001600160a01b0391611404908290846113b16117ce565b1681526002602052209160ff8354936113d16002600183015492016118fc565b928051968796875283831660208801528260081c169086015260a81c16606084015260a0608084015260a0830190611815565b0390f35b9050346104a35760603660031901126104a3576114236117ce565b61142b6117e9565b906114346117ff565b9061143d6119c9565b84516001600160a01b039384169390928190611458856118c0565b8885521691821561046d5716948587528260209560028752600160ff81858c2001541661163d575b6002845161148d8161188f565b8881528b8a8c88828501936005855286828701948d8652606088019460128652608089019c8d52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550192518051926001600160401b038411610da057506115138454611855565b601f811161160f575b5088908b601f85116001146115945793610387979593819382936000805160206121888339815191529d9c9b999794611589575b50501b916000199060031b1c19161790555b6005815196879687528601528401526012606084015260a0608084015260a0830190611815565b015192503880611550565b50848c52898c209293929190601f1984168d5b8181106115fa5750916000805160206121888339815191529b9a9997959391856103879a989694106115e1575b505050811b019055611562565b015160001960f88460031b161c191690553880806115d4565b82840151855593860193928c01928c016115a7565b61163790858d528a8d20601f860160051c8101918c871061044257601f0160051c0190611a21565b3861151c565b600388528984812055611480565b808434610e9f576020366003190112610e9f576116666117ce565b61166e6119c9565b6001600160a01b03168252600360205281205580f35b50503461013b578060031936011261013b5761169e6117ce565b6116a66119c9565b6001600160a01b0316825260036020528120602435905580f35b8284346101ac576020918260031936011261013b578060ff611404926116e46117ce565b946060608083516116f48161188f565b83815289810184905284810184905282810184905201526001600160a01b03958616815260028752208251946117298661188f565b81548652600182015491878701948484168652846117606002838b0194868860081c1686528360608d019860a81c168852016118fc565b9660808a0197885282519a8b9a818c5251908b015251169088015251166060860152511660808401525160a08084015260c0830190611815565b849084346104a35760203660031901126104a3576020926001600160a01b036117c16117ce565b1681526003845220548152f35b600435906001600160a01b03821682036117e457565b600080fd5b602435906001600160a01b03821682036117e457565b604435906001600160a01b03821682036117e457565b919082519283825260005b848110611841575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201611820565b90600182811c92168015611885575b602083101461186f57565b634e487b7160e01b600052602260045260246000fd5b91607f1691611864565b60a081019081106001600160401b038211176118aa57604052565b634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b038211176118aa57604052565b90601f801991011681019081106001600160401b038211176118aa57604052565b906040519182600082549261191084611855565b90818452600194858116908160001461197f575060011461193c575b505061193a925003836118db565b565b9093915060005260209081600020936000915b81831061196757505061193a9350820101388061192c565b8554888401850152948501948794509183019161194f565b91505061193a94506020925060ff191682840152151560051b820101388061192c565b6001600160401b0381116118aa5760051b60200190565b6044359060ff821682036117e457565b6000546001600160a01b031633036119dd57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b818110611a2c575050565b60008155600101611a21565b81810292918115918404141715611a4b57565b634e487b7160e01b600052601160045260246000fd5b908160209103126117e4575160ff811681036117e45790565b60ff166012039060ff8211611a4b57565b15611a9257565b60405162461bcd60e51b8152602060048201526011602482015270444543494d414c20554e444552464c4f5760781b6044820152606490fd5b51906001600160501b03821682036117e457565b604d8111611a4b57600a0a90565b6001600160a01b039081166000818152600260209081526040808320815191959194918591611b1b8361188f565b80548352600181015485840160ff918281168252611b5360028c880195878460081c168752856060809a019460a81c168452016118fc565b608091828c019182528686511680611b7c575b5050505050505050508260039394505252205490565b60018686511614611f47575060028585511614611eb35760038585511614611d97575050600495868484511614611c385750505116600514611bc357808080808080611b66565b8493509080602492511696511691875196879384926341976e0960e01b84528301525afa938415611c2d57508193611bfc575b50505090565b9091809350813d8311611c26575b611c1481836118db565b810103126101ac575051388080611bf6565b503d611c0a565b51913d9150823e3d90fd5b959b9a979994925095505084915116915160248651809481936396834ad360e01b83528d8301525afa958615611d8d578596611cf3575b5050505082015160030b810390818060030b03611ce05763ffffffff80921660120390828211611ccd5750611cca9394506001600160401b0391611cc3911692611cbc6012851115611a8b565b5192611adf565b9116611a38565b90565b634e487b7160e01b815260118652602490fd5b634e487b7160e01b815260118552602490fd5b9091928094965082813d8311611d86575b611d0e81836118db565b8101031261101b578551938401906001600160401b039185811083821117611d7357875282518060070b81036112de57855280830151918216820361101757840152848101518060030b810361101b5783860152810151908201529138808080611c6f565b634e487b7160e01b875260418a52602487fd5b503d611d04565b84513d87823e3d90fd5b879a9b508c9997969350611dec959c985084925093611db891945116611a7a565b1699611dc760128c1115611a8b565b511690518551958693849263195556f360e21b84528260048501526044840190611815565b621554d160ea1b87848303926003198401602487015260038152015201915afa948515611ea8578095611e2e575b5050505050906111ee611cca925191611adf565b9091929380955083813d8311611ea1575b611e4981836118db565b810103126101ac578351948501908582106001600160401b03831117611e8d57508352815184528082015190840152810151908201526111ee611cca388080611e1a565b634e487b7160e01b81526041600452602490fd5b503d611e3f565b8351903d90823e3d90fd5b91505082939a9950879650600498979550611ed19291505116611a7a565b1696611ee06012891115611a8b565b511685519485809263029f8a6d60e11b82525afa938415611c2d57508193611f12575b5050506111ee611cca92611adf565b9091809350813d8311611f40575b611f2a81836118db565b810103126101ac5750516111ee611cca38611f03565b503d611f20565b9350505099879894939950809650519788809263313ce56760e01b825260049a8b915afa90811561210e5791611f8989949260a09487916120f1575b50611a7a565b1698611f9860128b1115611a8b565b5116855192838092633fabe5a360e21b82525afa9081156120e7578290839984958594612091575b5050506001600160501b03809116911610612060578087131561202c57620151808201809211611ce05750421161200157505050906111ee611cca92611adf565b5162461bcd60e51b81529182015260076024820152661d1a5b595bdd5d60ca1b604482015260649150fd5b50505162461bcd60e51b815291820152600e60248201526d6e6567617469766520707269636560901b604482015260649150fd5b50505162461bcd60e51b815291820152600b60248201526a5374616c6520707269636560a81b604482015260649150fd5b9350945098505060a0883d82116120df575b816120b060a093836118db565b8101031261013b576120d46120c489611acb565b93868a0151928a01519901611acb565b909792388080611fc0565b3d91506120a3565b84513d84823e3d90fd5b61210891508a3d8c116112905761128181836118db565b38611f83565b86513d86823e3d90fd5b805182101561212c5760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b51906001600160a01b03821682036117e457565b8115612160570490565b634e487b7160e01b600052601260045260246000fd5b60ff16604d8111611a4b57600a0a9056fe3d8adf1be139385d82a5f0d83d5ac348b4bc37e1e1613ccde2a9de0376090c28a2646970667358221220babada5f5a657358f3d174a2fce030eff5ba524ccedff14894dde65ea27d33b564736f6c63430008130033";

export class LpOracle__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LpOracle> {
    return super.deploy(overrides || {}) as Promise<LpOracle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LpOracle {
    return super.attach(address) as LpOracle;
  }
  connect(signer: Signer): LpOracle__factory {
    return super.connect(signer) as LpOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LpOracleInterface {
    return new utils.Interface(_abi) as LpOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LpOracle {
    return new Contract(address, _abi, signerOrProvider) as LpOracle;
  }
}