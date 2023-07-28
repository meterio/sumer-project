/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FraxGaugeFXSRewardsDistributor,
  FraxGaugeFXSRewardsDistributorInterface,
} from "../FraxGaugeFXSRewardsDistributor";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_timelock_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_curator_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_reward_token_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gauge_controller_address",
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
        internalType: "bool",
        name: "distibutions_state",
        type: "bool",
      },
    ],
    name: "DistributionsToggled",
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
        internalType: "bool",
        name: "is_middleman",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "is_active",
        type: "bool",
      },
    ],
    name: "GaugeStateChanged",
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
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RecoveredERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "gauge_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward_amount",
        type: "uint256",
      },
    ],
    name: "RewardDistributed",
    type: "event",
  },
  {
    inputs: [],
    name: "curator_address",
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
        name: "gauge_address",
        type: "address",
      },
    ],
    name: "currentReward",
    outputs: [
      {
        internalType: "uint256",
        name: "reward_amount",
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
        name: "gauge_address",
        type: "address",
      },
    ],
    name: "distributeReward",
    outputs: [
      {
        internalType: "uint256",
        name: "weeks_elapsed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward_tally",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distributionsOn",
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
    name: "gauge_controller",
    outputs: [
      {
        internalType: "contract IFraxGaugeController",
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
        name: "",
        type: "address",
      },
    ],
    name: "gauge_whitelist",
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
    name: "is_middleman",
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
    name: "last_time_gauge_paid",
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
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverERC20",
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
    inputs: [],
    name: "reward_token_address",
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
        name: "_new_curator_address",
        type: "address",
      },
    ],
    name: "setCurator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gauge_controller_address",
        type: "address",
      },
    ],
    name: "setGaugeController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gauge_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_is_middleman",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_is_active",
        type: "bool",
      },
    ],
    name: "setGaugeState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_new_timelock",
        type: "address",
      },
    ],
    name: "setTimelock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "timelock_address",
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
    name: "toggleDistributions",
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
  "0x60803461010157601f6110e438819003918201601f19168301916001600160401b0383118484101761010657808492608094604052833981010312610101576100478161011c565b906100546020820161011c565b9161006d60606100666040850161011c565b930161011c565b6000549360018060a01b03199333858716176000556040519560018060a01b03948580948193823391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36001805516876005541617600555168560045416176004551683600254161760025516906003541617600355600160ff196009541617600955610fb390816101318239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036101015756fe6040608081526004908136101561001557600080fd5b600091823560e01c806291d2b8146108f6578063092193ab146108235780631f8a7edf146107ff5780632fd37b08146107c1578063305d6d5f146106ea57838163570b1e991461060857508063678a2226146105df5780636ca81c1c146105a1578063715018a6146105475780638980f11f146104a55780638da5cb5b1461047d5780639d18e4b014610331578063bdacb303146102d6578063c92073c1146102ad578063d8b9a01814610284578063dc6663c71461025d578063e81e17c614610225578063e90956cf146101b85763f2fde38b146100f357600080fd5b346101b45760203660031901126101b45761010c610950565b9061011561096b565b6001600160a01b0391821692831561016257505082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152fd5b8280fd5b838234610221576020366003190112610221576101d3610950565b82546001600160a01b03926101f791841633149084908215610213575b5050610e17565b166bffffffffffffffffffffffff60a01b600554161760055580f35b9091505416331483866101f0565b5080fd5b5050346102215760203660031901126102215760209181906001600160a01b0361024d610950565b1681526008845220549051908152f35b50346101b457826003193601126101b4575490516001600160a01b03909116815260209150f35b50503461022157816003193601126102215760035490516001600160a01b039091168152602090f35b50503461022157816003193601126102215760055490516001600160a01b039091168152602090f35b838234610221576020366003190112610221576102f1610950565b82546001600160a01b039190821633148015610325575b61031190610e17565b82546001600160a01b031916911617905580f35b50825482163314610308565b5090346101b4576020928360031936011261047a5761038a610351610950565b60035484516334c1e32560e21b81526001600160a01b039283168782019081524260208201529093929091169187918491829160400190565b0381845afa91821561043e57859187918594610448575b508551630a3be75760e01b815292839182905afa90811561043e578391610409575b50670de0b6b3a7640000916103d7916109fb565b049262093a80938481029481860414901517156103f657505051908152f35b634e487b7160e01b825260119052602490fd5b90508581813d8311610437575b61042081836109c3565b810103126101b45751670de0b6b3a76400006103c3565b503d610416565b84513d85823e3d90fd5b9250925081813d8311610473575b61046081836109c3565b810103126101b4578585915192386103a1565b503d610456565b80fd5b505034610221578160031936011261022157905490516001600160a01b039091168152602090f35b50346101b457816003193601126101b4577f55350610fe57096d8c0ffa30beede987326bccfcb0b4415804164d0dd50ce8b1916105336104e3610950565b91610513602435809561050d60018060a01b0391828b541692833314918215610539575050610e17565b85610e5b565b516001600160a01b03909216825260208201929092529081906040820190565b0390a180f35b9091505416331438806101f0565b833461047a578060031936011261047a5761056061096b565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b5050346102215760203660031901126102215760209160ff9082906001600160a01b036105cc610950565b1681526007855220541690519015158152f35b50503461022157816003193601126102215760025490516001600160a01b039091168152602090f35b8281853461022157606036600319011261022157610624610950565b602435918215158084036106e65760443592831515938481036106e2576106aa6060976106c39361068c7f404f22d93b56a7e73713d7bbe543b016084d4d75b4d9177e8b8ab251f6e877d09b60018060a01b03808095541633149182156106d4575050610e17565b1696878b526007602052858b209060ff801983541691151516179055565b60066020528389209060ff801983541691151516179055565b81519384526020840152820152a180f35b90915054163314838f6101f0565b8680fd5b8480fd5b50346101b457826003193601126101b4578254336001600160a01b03918216149081156107b2575b81156107a5575b5015610763575060207fa47e236370e478b9d163098c7c1f4f67b6efbb6683eeb0a669f04f302653779d916009549060ff8083161516809260ff191617600955519015158152a180f35b6020606492519162461bcd60e51b8352820152601f60248201527f4e6f74206f776e65722c2063757261746f722c206f722074696d656c6f636b006044820152fd5b9050815416331438610719565b80915060055416331490610712565b5050346102215760203660031901126102215760209160ff9082906001600160a01b036107ec610950565b1681526006855220541690519015158152f35b50503461022157816003193601126102215760209060ff6009541690519015158152f35b50823461047a57602036600319011261047a575061083f610950565b90600160ff600954161515036108bb576002600154146108785750610868906002600155610a3c565b6001805582519182526020820152f35b606490602084519162461bcd60e51b8352820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b606490602084519162461bcd60e51b835282015260156024820152742234b9ba3934b13aba34b7b7399030b9329037b33360591b6044820152fd5b83823461022157602036600319011261022157610911610950565b82546001600160a01b039261093491841633149084908215610213575050610e17565b166bffffffffffffffffffffffff60a01b600354161760035580f35b600435906001600160a01b038216820361096657565b600080fd5b6000546001600160a01b0316330361097f57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b90601f8019910116810190811067ffffffffffffffff8211176109e557604052565b634e487b7160e01b600052604160045260246000fd5b81810292918115918404141715610a0e57565b634e487b7160e01b600052601160045260246000fd5b90816020910312610966575180151581036109665790565b6001600160a01b03808216600081815260066020908152604080832054929694959260ff1615610ddc57838752600882528087205480610da857506001965b8096815b898110610b8a575087908683526008855242848420556007855260ff8484205416600014610b5457600254845163095ea7b360e01b81526001600160a01b039790971660048801526024870192909252939492938591849160449183918691165af1908115610b495750907fe34918ff1c7084970068b53fd71ad6d8b04e9f15d3886cbf006443e6cdc52ea6939291610b1c575b505b51858152a2565b610b3b90833d8511610b42575b610b3381836109c3565b810190610a24565b5038610b13565b503d610b29565b8351903d90823e3d90fd5b610b859250947fe34918ff1c7084970068b53fd71ad6d8b04e9f15d3886cbf006443e6cdc52ea69560025416610e5b565b610b15565b9788610d01576003548451636472eee160e01b81526001600160a01b038816600482015242602482015290869082906044908290889088165af1908115610cf7579086918591610cc4575b505b8360035416865192838092630a3be75760e01b825260049586915afa908115610cba578691610c81575b50670de0b6b3a764000091610c15916109fb565b0462093a8090818102918183041490151715610c6e578201809211610c5b5750976000198114610c4757600101610a7f565b634e487b7160e01b83526011600452602483fd5b634e487b7160e01b845260119052602483fd5b634e487b7160e01b855260118252602485fd5b90508781813d8311610cb3575b610c9881836109c3565b81010312610caf5751670de0b6b3a7640000610c01565b8580fd5b503d610c8e565b87513d88823e3d90fd5b82819392503d8311610cf0575b610cdb81836109c3565b81010312610cec5785905138610bd5565b8380fd5b503d610cd1565b85513d86823e3d90fd5b816003541662093a808a81029081048b03610d9457420390428211610d945785516334c1e32560e21b81526001600160a01b038916600482015260248101929092528690829060449082905afa908115610cf7579086918591610d65575b50610bd7565b82819392503d8311610d8d575b610d7c81836109c3565b81010312610cec5785905138610d5f565b503d610d72565b634e487b7160e01b85526011600452602485fd5b4203428111610dc85762093a8090049687610a7b57965086955050505050565b634e487b7160e01b88526011600452602488fd5b60649250519062461bcd60e51b82526004820152601560248201527411d85d59d9481b9bdd081dda1a5d195b1a5cdd1959605a1b6044820152fd5b15610e1e57565b60405162461bcd60e51b81526020600482015260156024820152744e6f74206f776e6572206f722074696d656c6f636b60581b6044820152606490fd5b60405163a9059cbb60e01b60208083019182526001600160a01b039490941660248301526044808301959095529381529192601f1992610e9c6064826109c3565b600092839283809351925af1913d15610f74573d67ffffffffffffffff8111610f6057610ed38560405193601f84011601836109c3565b81528091843d92013e5b81610f30575b5015610eec5750565b6064906040519062461bcd60e51b82526004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c4544006044820152fd5b80518015925083908315610f48575b50505038610ee3565b610f589350820181019101610a24565b388281610f3f565b634e487b7160e01b83526041600452602483fd5b50506060610edd56fea26469706673582212203e5103dc886019f4b306acdc9f7d6e4ea4351c921fcee132457413502a764cb464736f6c63430008130033";

export class FraxGaugeFXSRewardsDistributor__factory extends ContractFactory {
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
    _timelock_address: string,
    _curator_address: string,
    _reward_token_address: string,
    _gauge_controller_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FraxGaugeFXSRewardsDistributor> {
    return super.deploy(
      _timelock_address,
      _curator_address,
      _reward_token_address,
      _gauge_controller_address,
      overrides || {}
    ) as Promise<FraxGaugeFXSRewardsDistributor>;
  }
  getDeployTransaction(
    _timelock_address: string,
    _curator_address: string,
    _reward_token_address: string,
    _gauge_controller_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _timelock_address,
      _curator_address,
      _reward_token_address,
      _gauge_controller_address,
      overrides || {}
    );
  }
  attach(address: string): FraxGaugeFXSRewardsDistributor {
    return super.attach(address) as FraxGaugeFXSRewardsDistributor;
  }
  connect(signer: Signer): FraxGaugeFXSRewardsDistributor__factory {
    return super.connect(signer) as FraxGaugeFXSRewardsDistributor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FraxGaugeFXSRewardsDistributorInterface {
    return new utils.Interface(_abi) as FraxGaugeFXSRewardsDistributorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FraxGaugeFXSRewardsDistributor {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FraxGaugeFXSRewardsDistributor;
  }
}