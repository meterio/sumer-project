"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.getContract = exports.deployContract = exports.compileSetting = exports.allowVerifyChain = void 0;
const fs_1 = require("fs");
exports.allowVerifyChain = [
    "mainnet",
    "ropsten",
    "rinkeby",
    "goerli",
    "kovan",
    "bsctest",
    "bscmain",
    "hecotest",
    "hecomain",
    "maticmain",
    "ftmtest",
    "ftmmain",
    "hoomain",
];
function compileSetting(version, runs) {
    return {
        version: version,
        settings: {
            optimizer: {
                enabled: true,
                runs: runs,
            },
            outputSelection: {
                "*": {
                    "*": [
                        "abi",
                        "evm.bytecode",
                        "evm.deployedBytecode",
                        "evm.methodIdentifiers",
                        "metadata",
                        "storageLayout"
                    ],
                    "": [
                        "ast"
                    ]
                }
            }
        },
    };
}
exports.compileSetting = compileSetting;
async function deployContract(name, network, getContractFactory, signer, args = [], libraries = {}) {
    const factory = await getContractFactory(name, {
        signer: signer,
        libraries: libraries,
    });
    const contract = await factory.deploy(...args);
    console.log("Deploying", name);
    console.log("  to", contract.address);
    console.log("  in", contract.deployTransaction.hash);
    console.log("  receipt", await contract.deployTransaction.wait());
    await saveFile(network, name, contract, args, libraries);
    return contract.deployed();
}
exports.deployContract = deployContract;
function getContract(network, name) {
    const nameArr = name.split(":");
    const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
    const path = `./deployments/${network}/`;
    const latest = `${contractName}.json`;
    if ((0, fs_1.existsSync)(path + latest)) {
        return JSON.parse((0, fs_1.readFileSync)(path + latest).toString());
    }
    else {
        return "";
    }
}
exports.getContract = getContract;
async function saveFile(network, name, contract, args = [], libraries = {}) {
    const nameArr = name.split(":");
    const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
    const path = `./deployments/${network}/`;
    const file = `${contractName}.json`;
    (0, fs_1.mkdirSync)(path, { recursive: true });
    if (contractName != name) {
        (0, fs_1.writeFileSync)(path + file, JSON.stringify({
            address: contract.address,
            constructorArguments: args,
            libraries: libraries,
            contract: name
        }));
    }
    else {
        (0, fs_1.writeFileSync)(path + file, JSON.stringify({
            address: contract.address,
            constructorArguments: args,
            libraries: libraries
        }));
    }
}
exports.saveFile = saveFile;
//# sourceMappingURL=deployTool.js.map