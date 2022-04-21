/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UnderwriterAdmin,
  UnderwriterAdminInterface,
} from "../../../contracts/UnderWriterAdmin.sol/UnderwriterAdmin";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gov",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "action",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "pauseState",
        type: "bool",
      },
    ],
    name: "ActionPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "action",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "pauseState",
        type: "bool",
      },
    ],
    name: "ActionPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "error",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "info",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "detail",
        type: "uint256",
      },
    ],
    name: "Failure",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBorrowCap",
        type: "uint256",
      },
    ],
    name: "NewBorrowCap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldBorrowCapGuardian",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newBorrowCapGuardian",
        type: "address",
      },
    ],
    name: "NewBorrowCapGuardian",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldPauseGuardian",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPauseGuardian",
        type: "address",
      },
    ],
    name: "NewPauseGuardian",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_borrowGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_getBorrowCapGuardian",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
    ],
    name: "_getBorrowPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
    ],
    name: "_getMarketBorrowCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
    ],
    name: "_getMintPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_getPauseGuardian",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_getSeizePaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_getSuTokenRateMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_getTransferPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_mintGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newBorrowCapGuardian",
        type: "address",
      },
    ],
    name: "_setBorrowCapGuardian",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "_setBorrowPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken[]",
        name: "cTokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "newBorrowCaps",
        type: "uint256[]",
      },
    ],
    name: "_setMarketBorrowCaps",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract CToken",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "_setMintPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newPauseGuardian",
        type: "address",
      },
    ],
    name: "_setPauseGuardian",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "_setSeizePaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_suTokenRateMantissa",
        type: "uint256",
      },
    ],
    name: "_setSuTokenRateMantissa",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "_setTransferPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract UnderwriterProxy",
        name: "proxy",
        type: "address",
      },
    ],
    name: "become",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "borrowCapGuardian",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "borrowCaps",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "borrowGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "eqAssetGroup",
    outputs: [
      {
        internalType: "uint8",
        name: "groupId",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "groupName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "inGroupCTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "inGroupSuTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interGroupCTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interGroupSuTokenRateMantissa",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "equalAssetsGroupNum",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getCompAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint8",
        name: "groupId",
        type: "uint8",
      },
    ],
    name: "getEqAssetGroup",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "groupId",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "groupName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "inGroupCTokenRateMantissa",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inGroupSuTokenRateMantissa",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interGroupCTokenRateMantissa",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interGroupSuTokenRateMantissa",
            type: "uint256",
          },
        ],
        internalType: "struct UnderwriterAdminInterface.EqualAssets",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getEqAssetGroupNum",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "governanceToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mintGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "pauseGuardian",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "pendingAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "pendingImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint8",
        name: "groupId",
        type: "uint8",
      },
    ],
    name: "removeEqAssetGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "seizeGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint8",
        name: "groupId",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "groupName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "inGroupCTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "inGroupSuTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interGroupCTokenRateMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interGroupSuTokenRateMantissa",
        type: "uint256",
      },
    ],
    name: "setEqAssetGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_governanceToken",
        type: "address",
      },
    ],
    name: "setGovTokenAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "suTokenRateMantissa",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "transferGuardianPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001d8b38038062001d8b833981016040819052620000349162000087565b60048054336001600160a01b031991821617909155600580549091166001600160a01b0392909216919091179055670de0b6b3a7640000600655620000dc565b80516200008181620000c2565b92915050565b6000602082840312156200009a57600080fd5b6000620000a8848462000074565b949350505050565b60006001600160a01b03821662000081565b620000cd81620000b0565b8114620000d957600080fd5b50565b611c9f80620000ec6000396000f3fe608060405234801561001057600080fd5b50600436106102485760003560e01c80636d154ea51161013b578063a1194c8e116100b8578063c42e5b2b1161007c578063c42e5b2b1461049f578063e6653f3d146104a7578063f598c7ac146104af578063f851a440146104b7578063f96dae0a146104bf57610248565b8063a1194c8e14610439578063a7e9613f1461044c578063a89695a01461045f578063ac0b0bb714610472578063b9412e3b1461047a57610248565b806387f76303116100ff57806387f76303146103ee5780638ebf6364146103f65780639baa4ed1146104095780639d1b5a0a146104115780639fe07e901461041957610248565b80636d154ea51461038f578063715cfdd9146103a2578063731f0c2b146103b5578063840f82ac146103c8578063866613d8146103db57610248565b80633bcf7ec1116101c957806358db8e3d1161018d57806358db8e3d1461033b5780635a0f74a71461034e5780635c60da1b146103615780635f5af1aa14610369578063607ef6c11461037c57610248565b80633bcf7ec1146102f05780633c94786f1461030357806347bd11ad1461030b5780634a584432146103205780634cab0f2d1461033357610248565b8063255109131161021057806325510913146102b057806326782247146102b85780632d70db78146102c0578063391957d7146102d3578063396f7b23146102e857610248565b806318c882a51461024d5780631db9dfa41461027657806321af45691461028b578063241b4367146102a057806324a3d622146102a8575b600080fd5b61026061025b36600461146e565b6104c7565b60405161026d919061197a565b60405180910390f35b61027e6105b5565b60405161026d9190611adb565b6102936105bf565b60405161026d9190611951565b6102606105ce565b6102936105de565b6102606105f2565b610293610602565b6102606102ce366004611432565b610611565b6102e66102e136600461137e565b6106e6565b005b61029361076f565b6102606102fe36600461146e565b61077e565b610260610852565b610313610862565b60405161026d9190611aa5565b61031361032e36600461137e565b610868565b61029361087a565b6103136103493660046114e4565b61088e565b61026061035c366004611450565b61091b565b610293610939565b61031361037736600461137e565b610948565b6102e661038a3660046113c2565b6109de565b61026061039d36600461137e565b610b2a565b6102606103b0366004611450565b610b3f565b6102606103c336600461137e565b610b5d565b6102e66103d636600461137e565b610b72565b6102e66103e93660046114a8565b610bbe565b610260610bed565b610260610404366004611432565b610bfd565b61027e610cc2565b610293610ccb565b61042c6104273660046114e4565b610cda565b60405161026d9190611a94565b6102e6610447366004611450565b610dce565b61031361045a366004611450565b610f02565b61031361046d366004611502565b610f1d565b610260610fff565b61048d6104883660046114e4565b61100f565b60405161026d96959493929190611ae9565b6102936110d5565b6102606110e4565b6103136110f4565b6102936110fa565b610293611109565b60075460009061010090046001600160a01b03163314806104f257506004546001600160a01b031633145b6105175760405162461bcd60e51b815260040161050e90611a04565b60405180910390fd5b6004546001600160a01b031633148061053257506001821515145b61054e5760405162461bcd60e51b815260040161050e906119d5565b6001600160a01b03831660009081526009602052604090819020805460ff1916841515179055517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b0906105a490859085906119b6565b60405180910390a150805b92915050565b60075460ff165b90565b600a546001600160a01b031681565b600754600160c01b900460ff1690565b60075461010090046001600160a01b031681565b600754600160b81b900460ff1690565b6001546001600160a01b031681565b60075460009061010090046001600160a01b031633148061063c57506004546001600160a01b031633145b6106585760405162461bcd60e51b815260040161050e90611a04565b6004546001600160a01b031633148061067357506001821515145b61068f5760405162461bcd60e51b815260040161050e906119d5565b6007805460ff60c01b1916600160c01b841515021790556040517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de0906106d69084906119e5565b60405180910390a150805b919050565b6004546001600160a01b031633146107105760405162461bcd60e51b815260040161050e90611a14565b600a80546001600160a01b038381166001600160a01b03198316179092556040519116907feda98690e518e9a05f8ec6837663e188211b2da8f4906648b323f2c1d4434e2990610763908390859061195f565b60405180910390a15050565b6003546001600160a01b031681565b60075460009061010090046001600160a01b03163314806107a957506004546001600160a01b031633145b6107c55760405162461bcd60e51b815260040161050e90611a04565b6004546001600160a01b03163314806107e057506001821515145b6107fc5760405162461bcd60e51b815260040161050e906119d5565b6001600160a01b03831660009081526008602052604090819020805460ff1916841515179055517f71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b0906105a49085908590611988565b600754600160a81b900460ff1681565b60065481565b600b6020526000908152604090205481565b60075461010090046001600160a01b031690565b6004546000906001600160a01b031633146108b6576108af60016014611118565b90506106e1565b60ff82166000908152600c60205260408120805460ff19168155906108de600183018261117f565b50600060028201819055600382018190556004820181905560059091018190556007805460ff808216600019011660ff1990911617905592915050565b6001600160a01b031660009081526008602052604090205460ff1690565b6002546001600160a01b031681565b6004546000906001600160a01b03163314610969576108af60016013611118565b600780546001600160a01b03848116610100908102610100600160a81b031984161793849055604051928190048216937f0613b6ee6a04f0d09f390e4d9318894b9f6ac7fd83897cd8d18896ba579c401e936109cd9386939092049091169061195f565b60405180910390a160009392505050565b6004546001600160a01b0316331480610a015750600a546001600160a01b031633145b610a1d5760405162461bcd60e51b815260040161050e90611a44565b82818115801590610a2d57508082145b610a495760405162461bcd60e51b815260040161050e90611a64565b60005b82811015610b2157848482818110610a6057fe5b90506020020135600b6000898985818110610a7757fe5b9050602002016020610a8c9190810190611450565b6001600160a01b03168152602081019190915260400160002055868682818110610ab257fe5b9050602002016020610ac79190810190611450565b6001600160a01b03167f6f1951b2aad10f3fc81b86d91105b413a5b3f847a34bbc5ce1904201b14438f6868684818110610afd57fe5b90506020020135604051610b119190611aa5565b60405180910390a2600101610a4c565b50505050505050565b60096020526000908152604090205460ff1681565b6001600160a01b031660009081526009602052604090205460ff1690565b60086020526000908152604090205460ff1681565b6004546001600160a01b03163314610b9c5760405162461bcd60e51b815260040161050e90611a24565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b6004546001600160a01b03163314610be85760405162461bcd60e51b815260040161050e90611a34565b600655565b600754600160b81b900460ff1681565b60075460009061010090046001600160a01b0316331480610c2857506004546001600160a01b031633145b610c445760405162461bcd60e51b815260040161050e90611a04565b6004546001600160a01b0316331480610c5f57506001821515145b610c7b5760405162461bcd60e51b815260040161050e906119d5565b6007805460ff60b81b1916600160b81b841515021790556040517fef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de0906106d6908490611a74565b60075460ff1681565b6005546001600160a01b031690565b610ce26111c3565b60ff8281166000908152600c6020908152604091829020825160c08101845281549094168452600180820180548551600261010094831615949094026000190190911692909204601f8101859004850283018501909552848252919385840193919291830182828015610d965780601f10610d6b57610100808354040283529160200191610d96565b820191906000526020600020905b815481529060010190602001808311610d7957829003601f168201915b505050505081526020016002820154815260200160038201548152602001600482015481526020016005820154815250509050919050565b806001600160a01b031663f851a4406040518163ffffffff1660e01b815260040160206040518083038186803b158015610e0757600080fd5b505afa158015610e1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610e3f91908101906113a4565b6001600160a01b0316336001600160a01b031614610e6f5760405162461bcd60e51b815260040161050e90611a84565b806001600160a01b031663c1e803346040518163ffffffff1660e01b8152600401602060405180830381600087803b158015610eaa57600080fd5b505af1158015610ebe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610ee291908101906114c6565b15610eff5760405162461bcd60e51b815260040161050e90611a54565b50565b6001600160a01b03166000908152600b602052604090205490565b6004546000906001600160a01b03163314610f4557610f3e60016014611118565b9050610ff5565b6040805160c08101825260ff89811680835260208084018b81528486018b9052606085018a90526080850189905260a085018890526000928352600c8252949091208351815460ff191693169290921782559251805192939192610faf92600185019201906111fc565b5060408201516002820155606082015160038201556080820151600482015560a0909101516005909101556007805460ff8082166001011660ff19909116179055600090505b9695505050505050565b600754600160c01b900460ff1681565b600c602090815260009182526040918290208054600180830180548651600261010094831615949094026000190190911692909204601f810186900486028301860190965285825260ff9092169492939092908301828280156110b35780601f10611088576101008083540402835291602001916110b3565b820191906000526020600020905b81548152906001019060200180831161109657829003601f168201915b5050505050908060020154908060030154908060040154908060050154905086565b600a546001600160a01b031690565b600754600160b01b900460ff1681565b60065490565b6004546001600160a01b031681565b6005546001600160a01b031681565b60007f45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa083601181111561114757fe5b83601481111561115357fe5b600060405161116493929190611ab3565b60405180910390a182601181111561117857fe5b9392505050565b50805460018160011615610100020316600290046000825580601f106111a55750610eff565b601f016020900490600052602060002090810190610eff919061127a565b6040518060c00160405280600060ff16815260200160608152602001600081526020016000815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061123d57805160ff191683800117855561126a565b8280016001018555821561126a579182015b8281111561126a57825182559160200191906001019061124f565b5061127692915061127a565b5090565b6105bc91905b808211156112765760008155600101611280565b80356105af81611c24565b80516105af81611c24565b60008083601f8401126112bc57600080fd5b50813567ffffffffffffffff8111156112d457600080fd5b6020830191508360208202830111156112ec57600080fd5b9250929050565b80356105af81611c38565b80356105af81611c41565b600082601f83011261131a57600080fd5b813561132d61132882611b71565b611b4a565b9150808252602083016020830185838301111561134957600080fd5b611354838284611bde565b50505092915050565b80356105af81611c4a565b80516105af81611c4a565b80356105af81611c53565b60006020828403121561139057600080fd5b600061139c8484611294565b949350505050565b6000602082840312156113b657600080fd5b600061139c848461129f565b600080600080604085870312156113d857600080fd5b843567ffffffffffffffff8111156113ef57600080fd5b6113fb878288016112aa565b9450945050602085013567ffffffffffffffff81111561141a57600080fd5b611426878288016112aa565b95989497509550505050565b60006020828403121561144457600080fd5b600061139c84846112f3565b60006020828403121561146257600080fd5b600061139c84846112fe565b6000806040838503121561148157600080fd5b600061148d85856112fe565b925050602061149e858286016112f3565b9150509250929050565b6000602082840312156114ba57600080fd5b600061139c848461135d565b6000602082840312156114d857600080fd5b600061139c8484611368565b6000602082840312156114f657600080fd5b600061139c8484611373565b60008060008060008060c0878903121561151b57600080fd5b60006115278989611373565b965050602087013567ffffffffffffffff81111561154457600080fd5b61155089828a01611309565b955050604061156189828a0161135d565b945050606061157289828a0161135d565b935050608061158389828a0161135d565b92505060a061159489828a0161135d565b9150509295509295509295565b6115aa81611ba6565b82525050565b6115aa81611bb1565b6115aa81611bb6565b6115aa81611bd3565b60006115d682611b99565b6115e08185611b9d565b93506115f0818560208601611bea565b6115f981611c1a565b9093019392505050565b6000611610600483611b9d565b63135a5b9d60e21b815260200192915050565b6000611630601683611b9d565b756f6e6c792061646d696e2063616e20756e706175736560501b815260200192915050565b6000611662600583611b9d565b645365697a6560d81b815260200192915050565b6000611683602783611b9d565b7f6f6e6c7920706175736520677561726469616e20616e642061646d696e2063618152666e20706175736560c81b602082015260400192915050565b60006116cc602683611b9d565b7f6f6e6c792061646d696e2063616e2073657420626f72726f772063617020677581526530b93234b0b760d11b602082015260400192915050565b6000611714601283611b9d565b711bdb9b1e4818591b5a5b8818d85b881cd95d60721b815260200192915050565b6000611742600683611b9d565b65426f72726f7760d01b815260200192915050565b6000611764602683611b9d565b7f6f6e6c792061646d696e2063616e20736574207375546f6b656e526174654d618152656e746973736160d01b602082015260400192915050565b60006117ac603583611b9d565b7f6f6e6c792061646d696e206f7220626f72726f772063617020677561726469618152746e2063616e2073657420626f72726f77206361707360581b602082015260400192915050565b6000611803601583611b9d565b7418da185b99d9481b9bdd08185d5d1a1bdc9a5e9959605a1b815260200192915050565b6000611834600d83611b9d565b6c1a5b9d985b1a59081a5b9c1d5d609a1b815260200192915050565b600061185d600883611b9d565b672a3930b739b332b960c11b815260200192915050565b6000611881602783611b9d565b7f6f6e6c7920756e6974726f6c6c65722061646d696e2063616e206368616e676581526620627261696e7360c81b602082015260400192915050565b805160009060c08401906118d18582611948565b50602083015184820360208601526118e982826115cb565b91505060408301516118fe604086018261193f565b506060830151611911606086018261193f565b506080830151611924608086018261193f565b5060a083015161193760a086018261193f565b509392505050565b6115aa816105bc565b6115aa81611bcd565b602081016105af82846115a1565b6040810161196d82856115a1565b61117860208301846115a1565b602081016105af82846115b0565b6060810161199682856115b9565b81810360208301526119a781611603565b905061117860408301846115b0565b606081016119c482856115b9565b81810360208301526119a781611735565b602080825281016105af81611623565b604080825281016119f581611655565b90506105af60208301846115b0565b602080825281016105af81611676565b602080825281016105af816116bf565b602080825281016105af81611707565b602080825281016105af81611757565b602080825281016105af8161179f565b602080825281016105af816117f6565b602080825281016105af81611827565b604080825281016119f581611850565b602080825281016105af81611874565b6020808252810161117881846118bd565b602081016105af828461193f565b60608101611ac1828661193f565b611ace602083018561193f565b61139c60408301846115c2565b602081016105af8284611948565b60c08101611af78289611948565b8181036020830152611b0981886115cb565b9050611b18604083018761193f565b611b25606083018661193f565b611b32608083018561193f565b611b3f60a083018461193f565b979650505050505050565b60405181810167ffffffffffffffff81118282101715611b6957600080fd5b604052919050565b600067ffffffffffffffff821115611b8857600080fd5b506020601f91909101601f19160190565b5190565b90815260200190565b60006105af82611bc1565b151590565b60006105af82611ba6565b6001600160a01b031690565b60ff1690565b60006105af826105bc565b82818337506000910152565b60005b83811015611c05578181015183820152602001611bed565b83811115611c14576000848401525b50505050565b601f01601f191690565b611c2d81611ba6565b8114610eff57600080fd5b611c2d81611bb1565b611c2d81611bb6565b611c2d816105bc565b611c2d81611bcd56fea365627a7a72315820300e9d721d62854108791ef11cbb4655940061bedfa2bf106e00a9210bdd67896c6578706572696d656e74616cf564736f6c63430005100040";

type UnderwriterAdminConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnderwriterAdminConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnderwriterAdmin__factory extends ContractFactory {
  constructor(...args: UnderwriterAdminConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gov: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnderwriterAdmin> {
    return super.deploy(_gov, overrides || {}) as Promise<UnderwriterAdmin>;
  }
  override getDeployTransaction(
    _gov: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gov, overrides || {});
  }
  override attach(address: string): UnderwriterAdmin {
    return super.attach(address) as UnderwriterAdmin;
  }
  override connect(signer: Signer): UnderwriterAdmin__factory {
    return super.connect(signer) as UnderwriterAdmin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnderwriterAdminInterface {
    return new utils.Interface(_abi) as UnderwriterAdminInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnderwriterAdmin {
    return new Contract(address, _abi, signerOrProvider) as UnderwriterAdmin;
  }
}
