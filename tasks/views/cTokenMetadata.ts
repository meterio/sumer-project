import { task } from 'hardhat/config';
import { types } from "hardhat/config";
import { log } from "../../log_settings";
import { readFileSync } from "fs";
import {  CompoundLens } from '../../typechain';

/**
npx hardhat cmd \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */

task('cmd', 'sdrToken metadata')
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
        let config = JSON.parse(readFileSync(json).toString());
        let override = {}
        if (gasprice > 0) {
            override = {
                gasPrice: gasprice
            }
        }
        let provider = new ethers.providers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(pk, provider);
        log.info("wallet:",wallet.address);
        let cTokens: string[] = [];
        type CTokenMetadata = {
            cToken: string,
            exchangeRateCurrent: string,
            supplyRatePerBlock: string,
            borrowRatePerBlock: string,
            reserveFactorMantissa: string,
            totalBorrows: string,
            totalReserves: string,
            totalSupply: string,
            totalCash: string,
            isListed: string,
            underlyingAssetAddress: string,
            cTokenDecimals: string,
            underlyingDecimals: string,
            isCToken: string,
            isCEther: string,
            borrowCap: string,
            depositCap: string,
            liquidationIncentive: string,
            groupId: string,
            intraRate: string,
            mintRate: string,
            interRate: string,
            discountRate: string
        }
        let metadatas: CTokenMetadata[] = [];


        for (let i = 0; i < config.cTokens.tokens.length; i++) {
            cTokens.push(config.cTokens.tokens[i].address);
        }


        for (let i = 0; i < config.suTokens.tokens.length; i++) {
            cTokens.push(config.suTokens.tokens[i].address);
        }
        console.log(cTokens)
        const lens = await ethers.getContractAt("CompoundLens", config.compoundLens.address, wallet) as CompoundLens;
        const cTokenMetadataAll = await lens.callStatic.cTokenMetadataAll(cTokens, override);
        for (let i = 0; i < cTokenMetadataAll.length; i++) {
            metadatas.push({
                cToken: cTokenMetadataAll[i][0].toString(),
                exchangeRateCurrent:  cTokenMetadataAll[i][1].toString(),
                supplyRatePerBlock:  cTokenMetadataAll[i][2].toString(),
                borrowRatePerBlock:  cTokenMetadataAll[i][3].toString(),
                reserveFactorMantissa:  cTokenMetadataAll[i][4].toString(),
                totalBorrows:  cTokenMetadataAll[i][5].toString(),
                totalReserves: cTokenMetadataAll[i][6].toString(),
                totalSupply:  cTokenMetadataAll[i][7].toString(),
                totalCash: cTokenMetadataAll[i][8].toString(),
                isListed:  cTokenMetadataAll[i][9].toString(),
                underlyingAssetAddress:  cTokenMetadataAll[i][10].toString(),
                cTokenDecimals:  cTokenMetadataAll[i][11].toString(),
                underlyingDecimals:  cTokenMetadataAll[i][12].toString(),
                isCToken:  cTokenMetadataAll[i][13].toString(),
                isCEther:  cTokenMetadataAll[i][14].toString(),
                borrowCap:  cTokenMetadataAll[i][15].toString(),
                depositCap:  cTokenMetadataAll[i][16].toString(),
                liquidationIncentive:  cTokenMetadataAll[i][17].toString(),
                groupId:  cTokenMetadataAll[i][18].toString(),
                intraRate:  cTokenMetadataAll[i][19].toString(),
                mintRate:  cTokenMetadataAll[i][20].toString(),
                interRate:  cTokenMetadataAll[i][21].toString(),
                discountRate:  cTokenMetadataAll[i][22].toString()
            })
        }
        console.table(metadatas);
    });