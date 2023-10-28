/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FeedPriceOracleSafe,
  FeedPriceOracleSafeInterface,
} from "../FeedPriceOracleSafe";

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
    ],
    name: "setLpFeed",
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
        internalType: "uint256",
        name: "_validTimePeriod",
        type: "uint256",
      },
    ],
    name: "setPythValidTimePeriod",
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
  {
    inputs: [],
    name: "validTimePeriod",
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

const _bytecode =
  "0x6080806040523461006957600180546001600160a01b03199081169091556000805433928116831782556001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a36107086004556121f5908161006f8239f35b600080fdfe6040608081526004908136101561001557600080fd5b600091823560e01c90816303b0f9a3146114915781630c1502eb1461146957816316b8e7311461138f5781631badc89a14611353578382631e922ea61461131a575081632601c6b11461109c5781632fba4aa91461101a57816348a1371b14610e9d578382634b90fd6914610e0e5750816366331bba14610df2578163688202c514610b7357816369ef32d2146108fb578163715018a61461089657816379ba5097146107d55781638da5cb5b146107ad578163b1b06949146104d3578163cad75c6814610239578163cbdaeaba1461021757508063e30c3978146101ef578063e983fe25146101b8578063f2fde38b146101485763fc57d4df1461011957600080fd5b346101445760203660031901126101445760209061013d6101386114f7565b611a12565b9051908152f35b5080fd5b82346101b55760203660031901126101b5576101626114f7565b61016a6116f7565b600180546001600160a01b0319166001600160a01b0392831690811790915582549091167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e227008380a380f35b80fd5b50346101445760203660031901126101445760209181906001600160a01b036101df6114f7565b1681526003845220549051908152f35b503461014457816003193601126101445760015490516001600160a01b039091168152602090f35b90503461023557826003193601126102355760209250549051908152f35b8280fd5b905034610235576060366003190112610235576102546114f7565b602435906044356001600160a01b03818116918290036104cf576102766116f7565b855192610282846115d3565b87845282156104995716948587526020946002865283600160ff81858c2001541661048b575b600284516102b5816115a2565b8881528b8a8c888285019389855286828701948d8652606088019460128652608089019b8c52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b161717179055019151908151916001600160401b038311610478578b61033b8554611568565b8b601f821161043f575b50505089908c601f85116001146103c457936000805160206121a08339815191529b9a99979593819382936103b39b9997946103b9575b50501b916000199060031b1c19161790555b815196879687528601528401526012606084015260a0608084015260a0830190611528565b0390a280f35b01519250388061037c565b9190601f9493941984168684528c8420935b81811061042a5750916103b39997959391856000805160206121a08339815191529e9d9c9a98969410610411575b505050811b01905561038e565b015160001960f88460031b161c19169055388080610404565b82840151855593860193928d01928d016103d6565b8287610466945220601f860160051c8101918d871061046e575b601f0160051c019061174f565b8b388b610345565b9091508190610459565b634e487b7160e01b8c526041855260248cfd5b6003885289848120556102a8565b865162461bcd60e51b8152602081880152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b8680fd5b91905034610235576080366003190112610235576104ef6114f7565b906104f8611512565b916105016116cc565b90606435926001600160401b038085116107a957366023860112156107a95784870135958861052f886116dc565b9661053c855198896115ee565b8888523660248a83010111610144578860249960209a8b9301838b0137880101526105656116f7565b6001600160a01b039081169384156107735716808952600287528289206001908101549198899688949360ff16610765575b8b8a8751926105a5846115a2565b828452888285019360038552818601938c8552606087019360ff169d8e8552608088019b8c528252600290522093518455858401925160ff16835492600160a81b6101009003905160081b169160ff60a81b905160a81b16926001600160501b0360b01b161717179055600201935190815193841161075257506106298454611568565b601f8111610724575b5088908b601f85116001146106a857938060039a97946000805160206121a08339815191529c9a979482946103b39b989461069d575b50501b91600019908b1b1c19161790555b80519687968b8852870152850152606084015260a0608084015260a0830190611528565b015192503880610668565b50848c52898c209293929190601f1984168d5b81811061070f5750926103b3989592859260039c99966000805160206121a08339815191529e9c9996106106f7575b505050811b019055610679565b0151600019838d1b60f8161c191690553880806106ea565b82840151855593860193928c01928c016106bb565b61074c90858d528a8d20601f860160051c8101918c871061046e57601f0160051c019061174f565b38610632565b634e487b7160e01b8c526041905260248bfd5b60038a528b86812055610597565b835162461bcd60e51b8152808a01899052601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b8780fd5b505034610144578160031936011261014457905490516001600160a01b039091168152602090f35b91905034610235578260031936011261023557600154916001600160a01b039133838516036108415750506001600160a01b031991821660015582543392811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b6064820152fd5b83346101b557806003193601126101b5576108af6116f7565b600180546001600160a01b03199081169091558154908116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b839150346101445782600319360112610144576109166114f7565b9061091f611512565b6109276116f7565b845190610933826115d3565b8482526001600160a01b03908116938415610b3d571692838552602095600287528560019460ff86848420015416610b2f575b60028351610973816115a2565b8381528a81018881528582018781528c846060850191600883528d60808701998d8b525252878d209351845560ff8b8501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550191518051916001600160401b038311610b1c57506109f68354611568565b601f8111610aee575b508990601f8311600114610a765791806103b39694928b9c9896946000805160206121a08339815191529b9c92610a6b575b5050600019600383901b1c191690881b1790555b80519586958a87528601528401526008606084015260a0608084015260a0830190611528565b015190508c80610a31565b838a528a8a209190601f1984168b5b818110610ad9575092899285926000805160206121a08339815191529c9d9e9a98966103b39a989610610ac0575b505050811b019055610a45565b015160001960f88460031b161c191690558c8080610ab3565b828401518555938a0193928d01928d01610a85565b610b1690848b528b8b20601f850160051c8101918d861061046e57601f0160051c019061174f565b8a6109ff565b634e487b7160e01b8a5260419052602489fd5b600389528183812055610966565b865162461bcd60e51b8152602081860152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b9190503461023557606036600319011261023557610b8f6114f7565b91610b98611512565b92610ba16116cc565b92610baa6116f7565b805194610bb6866115d3565b8686526001600160a01b03908116928315610dbc5790869493929116958693848952826002602098818a5260ff8c600194859120015416610dae575b8b8a875192610c00846115a2565b828452888285019386855286828701948d865260ff6060890195169e8f8652608089019c8d52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550192518051926001600160401b0384116107525750610c858454611568565b601f8111610d80575b5088908b601f8511600114610d0457938060029a97946000805160206121a08339815191529c9a979482946103b39b9894610cf9575b50501b916000199060031b1c191617905580519687968b8852870152850152606084015260a0608084015260a0830190611528565b015192503880610cc4565b50848c52898c209293929190601f1984168d5b818110610d6b5750926103b3989592859260029c99966000805160206121a08339815191529e9c999610610d5257505050811b019055610679565b015160001960f88460031b161c191690553880806106ea565b82840151855593860193928c01928c01610d17565b610da890858d528a8d20601f860160051c8101918c871061046e57601f0160051c019061174f565b38610c8e565b60038a528b86812055610bf2565b825162461bcd60e51b8152602081870152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b5050346101445781600319360112610144576020905160018152f35b808434610e9a576020366003190112610e9a57600290610e2c6114f7565b610e346116f7565b6001600160a01b031683526020829052822082815560018101839055018054610e5c90611568565b80610e65575050f35b82601f8211600114610e775750505580f35b9091808252610e95601f60208420940160051c84016001850161174f565b555580f35b50fd5b8391503461014457602080600319360112610235578135926001600160401b0384116101b557366023850112156101b55783830135610edb816116b5565b94610ee8875196876115ee565b8186528386016024809360051b83010191368311611016579497969593948301905b828210610fe5575050508351610f1f816116b5565b92610f2c875194856115ee565b818452610f38826116b5565b8489019690601f1901368837855b838110610f8d57505050505083519485948186019282875251809352850193925b828110610f7657505050500390f35b835185528695509381019392810192600101610f67565b9798969794969594610fb16001600160a01b03610faa8385612029565b5116611a12565b610fbb828a612029565b526000198114610fd357600101989796949598610f46565b634e487b7160e01b8652601183528486fd5b969795969395949381356001600160a01b0381168103611012578152949796959394908801908801610f0a565b8580fd5b8480fd5b505034610144576020366003190112610144576001600160a01b0391611098908290846110456114f7565b1681526002602052209160ff83549361106560026001830154920161160f565b928051968796875283831660208801528260081c169086015260a81c16606084015260a0608084015260a0830190611528565b0390f35b9050346102355781600319360112610235576110b66114f7565b6110be611512565b906110c76116f7565b8351916110d3836115d3565b8583526001600160a01b039081169182156112e45716938486528260209460028652600160ff81858b200154166112d6575b60028451611112816115a2565b8a81528a898b88828501936005855286828701948d8652606088019460128652608089019c8d52835252209351845560ff868501935116835492610100600160a81b03905160081b169160ff60a81b905160a81b16926001600160501b0360b01b1617171790550192518051926001600160401b0384116112c357506111988454611568565b601f8111611295575b5087908a601f85116001146112195793806103b3979460059a979482946000805160206121a08339815191529d9b989461120e575b50501b916000199060031b1c19161790555b80519586958a87528601528401526012606084015260a0608084015260a0830190611528565b0151925038806111d6565b50848b52888b209293929190601f1984168c5b8181106112805750926000805160206121a08339815191529a98959285926103b3999660059c999610611267575b505050811b0190556111e8565b015160001960f88460031b161c1916905538808061125a565b82840151855593860193928b01928b0161122c565b6112bd90858c52898c20601f860160051c8101918b871061046e57601f0160051c019061174f565b386111a1565b634e487b7160e01b8b526041905260248afd5b600387528884812055611105565b855162461bcd60e51b8152602081870152601060248201526f41646472657373206973205a65726f2160801b6044820152606490fd5b808434610e9a576020366003190112610e9a576113356114f7565b61133d6116f7565b6001600160a01b03168252600360205281205580f35b50503461014457806003193601126101445761136d6114f7565b6113756116f7565b6001600160a01b0316825260036020528120602435905580f35b8284346101b55760209182600319360112610144578060ff611098926113b36114f7565b946060608083516113c3816115a2565b83815289810184905284810184905282810184905201526001600160a01b03958616815260028752208251946113f8866115a2565b815486526001820154918787019484841686528461142f6002838b0194868860081c1686528360608d019860a81c1688520161160f565b9660808a0197885282519a8b9a818c5251908b015251169088015251166060860152511660808401525160a08084015260c0830190611528565b5050346101445760203660031901126101445760209181906001600160a01b036101df6114f7565b905034610235576020366003190112610235578035916114af6116f7565b603c83106114bc57505580f35b906020606492519162461bcd60e51b83528201526015602482015274076616c696454696d65506572696f64203e3d20363605c1b6044820152fd5b600435906001600160a01b038216820361150d57565b600080fd5b602435906001600160a01b038216820361150d57565b919082519283825260005b848110611554575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201611533565b90600182811c92168015611598575b602083101461158257565b634e487b7160e01b600052602260045260246000fd5b91607f1691611577565b60a081019081106001600160401b038211176115bd57604052565b634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b038211176115bd57604052565b90601f801991011681019081106001600160401b038211176115bd57604052565b906040519182600082549261162384611568565b908184526001948581169081600014611692575060011461164f575b505061164d925003836115ee565b565b9093915060005260209081600020936000915b81831061167a57505061164d9350820101388061163f565b85548884018501529485019487945091830191611662565b91505061164d94506020925060ff191682840152151560051b820101388061163f565b6001600160401b0381116115bd5760051b60200190565b6044359060ff8216820361150d57565b6001600160401b0381116115bd57601f01601f191660200190565b6000546001600160a01b0316330361170b57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b81811061175a575050565b6000815560010161174f565b90670de0b6b3a76400009182810292818404149015171561178357565b634e487b7160e01b600052601160045260246000fd5b8181029291811591840414171561178357565b906040516117b9816115a2565b60806117f5600283958054855260ff6001820154818116602088015260018060a01b038160081c16604088015260a81c1660608601520161160f565b910152565b9081602091031261150d575160ff8116810361150d5790565b6040513d6000823e3d90fd5b60ff166012039060ff821161178357565b1561183757565b60405162461bcd60e51b8152602060048201526011602482015270444543494d414c20554e444552464c4f5760781b6044820152606490fd5b51906001600160501b038216820361150d57565b908160a091031261150d5761189881611870565b916020820151916040810151916118b6608060608401519301611870565b90565b156118c057565b60405162461bcd60e51b815260206004820152600b60248201526a5374616c6520707269636560a81b6044820152606490fd5b156118fa57565b60405162461bcd60e51b815260206004820152600e60248201526d6e6567617469766520707269636560901b6044820152606490fd5b9062015180820180921161178357565b9190820180921161178357565b1561195457565b60405162461bcd60e51b81526020600482015260076024820152661d1a5b595bdd5d60ca1b6044820152606490fd5b604d811161178357600a0a90565b9081602091031261150d575190565b9081606091031261150d576040519060608201908282106001600160401b038311176115bd57604091825280518352602081015160208401520151604082015290565b6119f560409283835283830190611528565b90602081830391015260038152621554d160ea1b60208201520190565b6001600160a01b0381166000908152600260205260409020611a33906117ac565b6040810180519092916001600160a01b039091169081611a6d575b50506001600160a01b0316600090815260036020526040902090505490565b602080820192600160ff611a82865160ff1690565b1614611c765750600260ff611a98855160ff1690565b1614611bdc5750600360ff611aae845160ff1690565b1614611b0757600460ff611ac3845160ff1690565b1614611afa575060ff611ad96005925160ff1690565b1614611ae6578180611a4e565b50516118b6906001600160a01b0316611dd1565b9150506118b69150612053565b611b80939250606091506080611b61611b55611b55611b3a611b34611b2f8888015160ff1690565b61181f565b60ff1690565b96611b486012891115611830565b516001600160a01b031690565b6001600160a01b031690565b91015190604051808096819463195556f360e21b8352600483016119e3565b03915afa918215611bd7576118b692611ba391600091611ba9575b505191611983565b90611799565b611bca915060603d8111611bd0575b611bc281836115ee565b8101906119a0565b38611b9b565b503d611bb8565b611813565b93915060049250611c0f611b55611b55611c01611b34611b2f60608a97015160ff1690565b94611b486012871115611830565b60405163029f8a6d60e11b815293849182905afa918215611bd7576118b693600093611c41575b5050611ba390611983565b611ba39293509081611c6792903d10611c6f575b611c5f81836115ee565b810190611991565b919038611c36565b503d611c55565b909350600492508391506040519283809263313ce56760e01b82525afa908115611bd757611b55611b55611cbf611b3460a095611ccd95600498600092611d85575b505061181f565b95611b486012881115611830565b604051633fabe5a360e21b815292839182905afa8015611bd7576118b69260008092818091611d3b575b611ba394955091611d1d611d2e92611d36946001600160501b03809116911610156118b9565b611d29600087136118f3565b611930565b42111561194d565b611983565b505050611ba39150611d36611d2e611d6c611d1d9560a03d8111611d7e575b611d6481836115ee565b810190611884565b9298508897509450909250611cf79050565b503d611d5a565b611da49250803d10611dab575b611d9c81836115ee565b8101906117fa565b3880611cb8565b503d611d92565b9081602091031261150d57516001600160a01b038116810361150d5790565b604051630dfe168160e01b81526020906001600160a01b038316908281600481855afa908115611bd7578390600092611e82575b5060405163d21220a760e01b81529192829060049082905afa928315611bd757600093611e4d575b5050611e399083611ed3565b90611e449192611ed3565b6118b691611940565b611e399293509081611e7392903d10611e7b575b611e6b81836115ee565b810190611db2565b919038611e2d565b503d611e61565b60049250611e9c90823d8411611e7b57611e6b81836115ee565b91611e05565b8115611eac570490565b634e487b7160e01b600052601260045260246000fd5b60ff16604d811161178357600a0a90565b6040516370a0823160e01b81526001600160a01b038281166004830152838116939290916020918282602481895afa918215611bd757600496849160009461200a575b5060405163313ce56760e01b815297889182905afa958615611bd757600096611fe9575b5082906004604051809681936318160ddd60e01b8352165afa908115611bd757611f8093611f7a93600093611fc4575b5050611f7590611766565b611ea2565b91611a12565b6118b692611f9b9290601260ff821610611fa9575b50611799565b670de0b6b3a7640000900490565b90611ba3611fb9611fbe9361181f565b611ec2565b38611f95565b611f759293509081611fe192903d10611c6f57611c5f81836115ee565b919038611f6a565b8391965061200390823d8411611dab57611d9c81836115ee565b9590611f3a565b612022919450823d8411611c6f57611c5f81836115ee565b9238611f16565b805182101561203d5760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b90604060018060a01b038184015116925160045490825191602083019163052571af60e51b8352602484015260448301526044825260808201916001600160401b0392818110848211176115bd5784526000958692839251915afa3d15612197573d906120bf826116dc565b916120cc855193846115ee565b82523d86602084013e5b1561216557608081805181010312611016576020810151928360070b8403611012578101518281160361101657606001518060030b80910361101657840393848060030b036121515763ffffffff8095166012039085821161215157506118b6939461214a9116611d366012821115611830565b9116611799565b634e487b7160e01b81526011600452602490fd5b825162461bcd60e51b815260206004820152600b60248201526a70797468206572726f722160a81b6044820152606490fd5b6060906120d656fe3d8adf1be139385d82a5f0d83d5ac348b4bc37e1e1613ccde2a9de0376090c28a26469706673582212207bfd31a8acafcfb4829148d04ca4b61c59b271444f297f3af92258ed8359940d64736f6c63430008130033";

export class FeedPriceOracleSafe__factory extends ContractFactory {
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
  ): Promise<FeedPriceOracleSafe> {
    return super.deploy(overrides || {}) as Promise<FeedPriceOracleSafe>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FeedPriceOracleSafe {
    return super.attach(address) as FeedPriceOracleSafe;
  }
  connect(signer: Signer): FeedPriceOracleSafe__factory {
    return super.connect(signer) as FeedPriceOracleSafe__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeedPriceOracleSafeInterface {
    return new utils.Interface(_abi) as FeedPriceOracleSafeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeedPriceOracleSafe {
    return new Contract(address, _abi, signerOrProvider) as FeedPriceOracleSafe;
  }
}
