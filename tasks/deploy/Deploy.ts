import { ethers, web3, deployments } from "hardhat";
import { log } from "../../log_settings";
import { ContractFactory, utils, Wallet } from "ethers";
import { Libraries, DeployOptions } from "hardhat-deploy/dist/types";

const libraries = new Map<string, string>([
    ['', '']
]);

export class Deploy {

    // ************ CONTRACT CONNECTION **************************

    public static async deployContract<T extends ContractFactory>(
        signer: Wallet,
        name: string,
        // tslint:disable-next-line:no-any
        ...args: any[]
    ) {
        log.info(`Deploying ${name}`);
        log.info("Account balance: " + utils.formatUnits(await signer.getBalance(), 18));
        const { deploy } = deployments;

        const gasPrice = await web3.eth.getGasPrice();
        log.info("Gas price: " + gasPrice);
        const lib: string | undefined = libraries.get(name);
        let _override: DeployOptions;
        if (lib) {
            log.info('DEPLOY LIBRARY', lib, 'for', name);
            const libAddress = (await Deploy.deployContract(signer, lib)).address;
            const librariesObj: Libraries = {};
            librariesObj[lib] = libAddress;
            _override = {
                from: signer.address,
                args: args,
                libraries: librariesObj,
                skipIfAlreadyDeployed: true
            }
        } else {
            _override = {
                from: signer.address,
                args: args,
                skipIfAlreadyDeployed: false
            }
        }
        const result = await deploy(name, _override);
        const instance = await ethers.getContractAt(name, result.address, signer);
        log.info('Deploy tx:', result.transactionHash);
        log.info('Receipt', result.address)
        return instance;
    }
}  