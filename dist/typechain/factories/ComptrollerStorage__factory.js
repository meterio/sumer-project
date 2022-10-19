"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComptrollerStorage__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newSpeed",
                type: "uint256",
            },
        ],
        name: "CompBorrowSpeedUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "CompGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newSpeed",
                type: "uint256",
            },
        ],
        name: "CompSupplySpeedUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "contributor",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newSpeed",
                type: "uint256",
            },
        ],
        name: "ContributorCompSpeedUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "borrower",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "compDelta",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "compBorrowIndex",
                type: "uint256",
            },
        ],
        name: "DistributedBorrowerComp",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "supplier",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "compDelta",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "compSupplyIndex",
                type: "uint256",
            },
        ],
        name: "DistributedSupplierComp",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "MarketEntered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "MarketExited",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
        ],
        name: "MarketListed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "oldCloseFactorMantissa",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newCloseFactorMantissa",
                type: "uint256",
            },
        ],
        name: "NewCloseFactor",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "oldLiquidationIncentiveMantissa",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newLiquidationIncentiveMantissa",
                type: "uint256",
            },
        ],
        name: "NewLiquidationIncentive",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "oldPriceOracle",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newPriceOracle",
                type: "address",
            },
        ],
        name: "NewPriceOracle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "cToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "SetMaxSupply",
        type: "event",
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
        name: "accountAssets",
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
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "allMarkets",
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
        name: "closeFactorMantissa",
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
        name: "compAccrued",
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
        name: "compBorrowSpeeds",
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
        name: "compBorrowState",
        outputs: [
            {
                internalType: "uint224",
                name: "index",
                type: "uint224",
            },
            {
                internalType: "uint32",
                name: "block",
                type: "uint32",
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
        name: "compBorrowerIndex",
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
        name: "compContributorSpeeds",
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
        name: "compInitialIndex",
        outputs: [
            {
                internalType: "uint224",
                name: "",
                type: "uint224",
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
        name: "compSupplierIndex",
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
        name: "compSupplySpeeds",
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
        name: "compSupplyState",
        outputs: [
            {
                internalType: "uint224",
                name: "index",
                type: "uint224",
            },
            {
                internalType: "uint32",
                name: "block",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isComptroller",
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
        name: "lastContributorBlock",
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
        name: "liquidationIncentiveMantissa",
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
        name: "markets",
        outputs: [
            {
                internalType: "bool",
                name: "isListed",
                type: "bool",
            },
            {
                internalType: "uint8",
                name: "equalAssetGrouId",
                type: "uint8",
            },
            {
                internalType: "bool",
                name: "isComped",
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
        name: "maxSupply",
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
        name: "oracle",
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
        name: "underWriterAdmin",
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
const _bytecode = "0x608060405234801561001057600080fd5b50610618806100206000396000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c80639cc7becf116100ad578063cc7ebdc411610071578063cc7ebdc414610385578063dce15449146103ab578063e8755446146103d7578063f4a433c0146103df578063f851a440146104055761012b565b80639cc7becf146102b9578063a7f0e231146102df578063b21be7fd14610303578063bea6b8b814610331578063ca0af043146103575761012b565b80636b79c38d116100f45780636b79c38d146101cd5780637dc0d1d01461021b5780638c57804e146102235780638e8f294b14610249578063986ab838146102935761012b565b80627e3dd2146101305780632408d5f01461014c5780634ada90af1461017057806352d84d1e1461018a5780636aa875b5146101a7575b600080fd5b61013861040d565b604080519115158252519081900360200190f35b610154610412565b604080516001600160a01b039092168252519081900360200190f35b610178610421565b60408051918252519081900360200190f35b610154600480360360208110156101a057600080fd5b5035610427565b610178600480360360208110156101bd57600080fd5b50356001600160a01b0316610451565b6101f3600480360360208110156101e357600080fd5b50356001600160a01b0316610463565b604080516001600160e01b03909316835263ffffffff90911660208301528051918290030190f35b61015461048d565b6101f36004803603602081101561023957600080fd5b50356001600160a01b031661049c565b61026f6004803603602081101561025f57600080fd5b50356001600160a01b03166104c6565b60408051931515845260ff9092166020840152151582820152519081900360600190f35b610178600480360360208110156102a957600080fd5b50356001600160a01b03166104ee565b610178600480360360208110156102cf57600080fd5b50356001600160a01b0316610500565b6102e7610512565b604080516001600160e01b039092168252519081900360200190f35b6101786004803603604081101561031957600080fd5b506001600160a01b0381358116916020013516610525565b6101786004803603602081101561034757600080fd5b50356001600160a01b0316610542565b6101786004803603604081101561036d57600080fd5b506001600160a01b0381358116916020013516610554565b6101786004803603602081101561039b57600080fd5b50356001600160a01b0316610571565b610154600480360360408110156103c157600080fd5b506001600160a01b038135169060200135610583565b6101786105bb565b610178600480360360208110156103f557600080fd5b50356001600160a01b03166105c1565b6101546105d3565b600181565b6001546001600160a01b031681565b60045481565b6007818154811061043757600080fd5b6000918252602090912001546001600160a01b0316905081565b60106020526000908152604090205481565b6008602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6002546001600160a01b031681565b6009602052600090815260409020546001600160e01b03811690600160e01b900463ffffffff1682565b6006602052600090815260409020805460029091015460ff8083169261010090048116911683565b600d6020526000908152604090205481565b60116020526000908152604090205481565b6ec097ce7bc90715b34b9f100000000081565b600a60209081526000928352604080842090915290825290205481565b600e6020526000908152604090205481565b600b60209081526000928352604080842090915290825290205481565b600c6020526000908152604090205481565b6005602052816000526040600020818154811061059f57600080fd5b6000918252602090912001546001600160a01b03169150829050565b60035481565b600f6020526000908152604090205481565b6000546001600160a01b03168156fea2646970667358221220b451d66c97c7ddcdf534a13930035b2a8943fd8ac6996bf5ab126cdf167fc93564736f6c63430007060033";
class ComptrollerStorage__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ComptrollerStorage__factory = ComptrollerStorage__factory;
ComptrollerStorage__factory.bytecode = _bytecode;
ComptrollerStorage__factory.abi = _abi;
//# sourceMappingURL=ComptrollerStorage__factory.js.map