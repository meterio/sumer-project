"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JugLike__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "base",
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
                name: "",
                type: "bytes32",
            },
        ],
        name: "ilks",
        outputs: [
            {
                internalType: "uint256",
                name: "duty",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "rho",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060d78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80635001f3b5146037578063d9638d3614604f575b600080fd5b603d6082565b60408051918252519081900360200190f35b606960048036036020811015606357600080fd5b50356088565b6040805192835260208301919091528051918290030190f35b60015481565b600060208190529081526040902080546001909101548256fea2646970667358221220aa1956664c4ef348718bdfa6d3ffcc0d058481cfbd78f7e9cebbc546b50a21e964736f6c63430007060033";
class JugLike__factory extends ethers_1.ContractFactory {
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
exports.JugLike__factory = JugLike__factory;
JugLike__factory.bytecode = _bytecode;
JugLike__factory.abi = _abi;
//# sourceMappingURL=JugLike__factory.js.map