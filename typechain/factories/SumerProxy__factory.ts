/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SumerProxy, SumerProxyInterface } from "../SumerProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60406080815262000c578038038062000018816200030b565b9283398101906060818303126200030657620000348162000347565b916020926200004584840162000347565b8584015190936001600160401b0391908282116200030657019280601f850112156200030657835193620000836200007d866200035c565b6200030b565b948086528786019288828401011162000306578288620000a4930162000378565b823b15620002ac577f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b03199081166001600160a01b0386811691821790935590959194600093909290917fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8580a2805115801590620002a4575b620001f5575b50505050507fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103937f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f86865493815196818616885216958684820152a18315620001a3575016179055516108009081620004578239f35b60849086519062461bcd60e51b82526004820152602660248201527f455243313936373a206e65772061646d696e20697320746865207a65726f206160448201526564647265737360d01b6064820152fd5b895194606086019081118682101762000290578a52602785527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c89860152660819985a5b195960ca1b8a860152516200027a9493929183918291845af4903d1562000286573d6200026a6200007d826200035c565b90815280938a3d92013e6200039d565b5038808080806200012d565b606092506200039d565b634e487b7160e01b85526041600452602485fd5b508362000127565b865162461bcd60e51b815260048101879052602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608490fd5b600080fd5b6040519190601f01601f191682016001600160401b038111838210176200033157604052565b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036200030657565b6001600160401b0381116200033157601f01601f191660200190565b60005b8381106200038c5750506000910152565b81810151838201526020016200037b565b91929015620004025750815115620003b3575090565b3b15620003bd5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b825190915015620004165750805190602001fd5b6044604051809262461bcd60e51b82526020600483015262000448815180928160248601526020868601910162000378565b601f01601f19168101030190fdfe60806040523661012e5760008051602061078b833981519152546001600160a01b03163303610129576000356001600160e01b031916631b2ce7f360e11b8103610054575061004c6103d1565b602081519101f35b63278f794360e11b8103610070575061006b610573565b61004c565b6308f2839760e41b8103610087575061006b6102fb565b6303e1469160e61b810361009e575061006b610220565b635c60da1b60e01b036100b35761006b610259565b60405162461bcd60e51b815260206004820152604260248201527f5472616e73706172656e745570677261646561626c6550726f78793a2061646d60448201527f696e2063616e6e6f742066616c6c6261636b20746f2070726f78792074617267606482015261195d60f21b608482015260a490fd5b610171565b60008051602061078b833981519152546001600160a01b03163303610171576000356001600160e01b031916631b2ce7f360e11b8103610054575061004c6103d1565b6000805160206107ab83398151915254600090819081906001600160a01b0316368280378136915af43d82803e156101a7573d90f35b3d90fd5b634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff8211176101dd57604052565b6101ab565b6020810190811067ffffffffffffffff8211176101dd57604052565b90601f8019910116810190811067ffffffffffffffff8211176101dd57604052565b610228610604565b60018060a01b0360008051602061078b833981519152541660405190602082015260208152610256816101c1565b90565b610261610604565b60018060a01b036000805160206107ab833981519152541660405190602082015260208152610256816101c1565b600435906001600160a01b03821682036102a557565b600080fd5b60209060031901126102a5576004356001600160a01b03811681036102a55790565b67ffffffffffffffff81116101dd57601f01601f191660200190565b604051906102f5826101e2565b60008252565b610303610604565b366004116102a5576001600160a01b038061031d366102aa565b1660008051602061078b833981519152917f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f604084549281519084168152846020820152a1811561037d576001600160a01b0319161790556102566102e8565b60405162461bcd60e51b815260206004820152602660248201527f455243313936373a206e65772061646d696e20697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b6103d9610604565b366004116102a5576001600160a01b036103f2366102aa565b1660405190610400826101e2565b60008252803b15610497576000805160206107ab83398151915280546001600160a01b03191682179055807fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a281511580159061048f575b610475575b505060405161046e816101e2565b6000815290565b6104879161048161060b565b91610665565b503880610460565b50600061045b565b60405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608490fd5b803b15610497576000805160206107ab83398151915280546001600160a01b0319166001600160a01b0383169081179091557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a281511580159061056b575b61055c575050565b6105689161048161060b565b50565b506001610554565b366004116102a55760403660031901126102a55761058f61028f565b6024359067ffffffffffffffff82116102a557366023830112156102a5578160040135906105bc826102cc565b916105ca60405193846101fe565b80835236602482860101116102a55760208160009260246105fc970183870137840101526001600160a01b03166104f2565b6102566102e8565b346102a557565b604051906060820182811067ffffffffffffffff8211176101dd5760405260278252660819985a5b195960ca1b6040837f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208201520152565b6000806102569493602081519101845af43d156106a4573d91610687836102cc565b9261069560405194856101fe565b83523d6000602085013e6106f8565b6060916106f8565b156106b357565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b91929015610718575081511561070c575090565b610256903b15156106ac565b82519091501561072b5750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b828510610771575050604492506000838284010152601f80199101168101030190fd5b848101820151868601604401529381019385935061074e56feb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca26469706673582212200b8d3a4814f32b8d85640ca374151d562bb5372aa77b250d79b6a2170d97ed5e64736f6c63430008130033";

export class SumerProxy__factory extends ContractFactory {
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
    logic: string,
    admin_: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<SumerProxy> {
    return super.deploy(
      logic,
      admin_,
      data,
      overrides || {}
    ) as Promise<SumerProxy>;
  }
  getDeployTransaction(
    logic: string,
    admin_: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(logic, admin_, data, overrides || {});
  }
  attach(address: string): SumerProxy {
    return super.attach(address) as SumerProxy;
  }
  connect(signer: Signer): SumerProxy__factory {
    return super.connect(signer) as SumerProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SumerProxyInterface {
    return new utils.Interface(_abi) as SumerProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SumerProxy {
    return new Contract(address, _abi, signerOrProvider) as SumerProxy;
  }
}
