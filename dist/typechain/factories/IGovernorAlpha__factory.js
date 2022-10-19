"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGovernorAlpha__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "getActions",
        outputs: [
            {
                internalType: "address[]",
                name: "targets",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "signatures",
                type: "string[]",
            },
            {
                internalType: "bytes[]",
                name: "calldatas",
                type: "bytes[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "voter",
                type: "address",
            },
        ],
        name: "getReceipt",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
            {
                internalType: "uint96",
                name: "",
                type: "uint96",
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
        name: "proposals",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "startBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "endBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "forVotes",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "againstVotes",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "canceled",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "executed",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IGovernorAlpha__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IGovernorAlpha__factory = IGovernorAlpha__factory;
IGovernorAlpha__factory.abi = _abi;
//# sourceMappingURL=IGovernorAlpha__factory.js.map