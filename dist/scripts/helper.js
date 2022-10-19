"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.deployContractWithOverride = exports.deployContract = exports.getContractJson = exports.listContracts = exports.getContract = exports.gasLeft = exports.MINTER_ROLE = exports.overrides = exports.BN = exports.expandTo18Decimals = void 0;
const fs_1 = require("fs");
const ethers_1 = require("ethers");
const pathLib = __importStar(require("path"));
const fs = __importStar(require("fs"));
function expandTo18Decimals(n) {
    return ethers_1.BigNumber.from(n).mul(ethers_1.BigNumber.from(10).pow(18));
}
exports.expandTo18Decimals = expandTo18Decimals;
function BN(n) {
    return ethers_1.BigNumber.from(n);
}
exports.BN = BN;
exports.overrides = {
    gasLimit: 8000000,
};
exports.MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
exports.gasLeft = BN(28975827); //1ba22d3
function getContract(network, name) {
    const nameArr = name.split(':');
    const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
    const path = `./deployments/${network}/`;
    const latest = `${contractName}.json`;
    const fullpath = pathLib.join(__dirname, '..', path, latest);
    if ((0, fs_1.existsSync)(fullpath)) {
        let json = JSON.parse((0, fs_1.readFileSync)(fullpath).toString());
        return json.address;
    }
    else {
        return ethers_1.constants.AddressZero;
    }
}
exports.getContract = getContract;
function listContracts(network) {
    const deployDir = `./deployments`;
    const networks = fs.readdirSync(deployDir);
    let result = {};
    if (networks.includes(network)) {
        const base = pathLib.join(__dirname, '..', 'deployments', network);
        const files = fs.readdirSync(base);
        for (const f of files) {
            if (f.endsWith('.json')) {
                const name = f.replace('.json', '');
                const address = JSON.parse(fs.readFileSync(pathLib.join(base, f)).toString()).address;
                if (name && address) {
                    result[name] = address;
                }
            }
        }
    }
    return result;
}
exports.listContracts = listContracts;
function getContractJson(network, name) {
    const nameArr = name.split(':');
    const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
    const path = `./deployments/${network}/`;
    const latest = `${contractName}.json`;
    const fullpath = pathLib.join(__dirname, '..', path, latest);
    if ((0, fs_1.existsSync)(fullpath)) {
        return JSON.parse((0, fs_1.readFileSync)(fullpath).toString());
    }
    else {
        return '';
    }
}
exports.getContractJson = getContractJson;
async function deployContract(ethers, name, network, signer, args = [], libraries = {}, alias = '') {
    const address = getContract(network, alias || name);
    if (address == ethers_1.constants.AddressZero || network == 'hardhat') {
        const signerAddr = await signer.getAddress();
        const factory = await ethers.getContractFactory(name, {
            signer: signer,
            libraries: libraries,
        });
        const contract = await factory.deploy(...args, exports.overrides);
        console.log('Deploying:', alias || name);
        console.log('  to', contract.address);
        console.log(`  by ${signerAddr}`);
        console.log('  in', contract.deployTransaction.hash);
        await saveFile(network, alias || name, contract, args, libraries);
        return contract.deployed();
    }
    else {
        console.log('Contract:', alias || name);
        console.log('  on', address);
        return await ethers.getContractAt(name, address, signer);
    }
}
exports.deployContract = deployContract;
async function deployContractWithOverride(ethers, name, network, signer, args = [], libraries = {}, alias = '') {
    const signerAddr = await signer.getAddress();
    const factory = await ethers.getContractFactory(name, {
        signer: signer,
        libraries: libraries,
    });
    const contract = await factory.deploy(...args, exports.overrides);
    console.log('Deploying:', alias || name);
    console.log('  to', contract.address);
    console.log(`  by ${signerAddr}`);
    console.log('  in', contract.deployTransaction.hash);
    await saveFile(network, alias || name, contract, args, libraries);
    return contract.deployed();
}
exports.deployContractWithOverride = deployContractWithOverride;
async function saveFile(network, name, contract, args = [], libraries = {}) {
    const nameArr = name.split(':');
    const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
    const path = `./deployments/${network}/`;
    const file = `${contractName}.json`;
    (0, fs_1.mkdirSync)(path, { recursive: true });
    if (contractName != name) {
        (0, fs_1.writeFileSync)(path + file, JSON.stringify({
            address: contract.address,
            constructorArguments: args,
            libraries: libraries,
            contract: name,
        }, null, 2));
    }
    else {
        (0, fs_1.writeFileSync)(path + file, JSON.stringify({
            address: contract.address,
            constructorArguments: args,
            libraries: libraries,
        }));
    }
}
exports.saveFile = saveFile;
//# sourceMappingURL=helper.js.map