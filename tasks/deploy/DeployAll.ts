import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { readFileSync, writeFileSync } from "fs";
const MANTISSA_DECIMALS = 18;

/**
npx hardhat all \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
task("all", "deploy contract")
    .addParam("json", "config json file")
    .addParam("rpc", "rpc connect")
    .addParam("pk", "proxy admin private key")
    .addOptionalParam("gasprice", "gas price", 0, types.int)
    .setAction(
        async ({ json, rpc, pk, gasprice }, { ethers, run, network }) => {
            await run("compile");

            let config = JSON.parse(readFileSync(json).toString());
            let admin: string;

            if (config.proxyAdmin.address == "") {
                const proxyAdmin = await run("d", {
                    name: "ProxyAdmin",
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.proxyAdmin.address = proxyAdmin.address;
                writeFileSync(json, JSON.stringify(config));
            }
            admin = config.proxyAdmin.address;

            if (config.sumer.address == "") {
                const sumer = await run("dt", {
                    name: config.sumer.name,
                    symbol: config.sumer.symbol,
                    supply: config.sumer.supply,
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.sumer.address = sumer.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.feedPriceOracle.address == "") {
                const feedPriceOracle = await run("do", {
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.feedPriceOracle.address = feedPriceOracle.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.compoundLens.address == "") {
                const compoundLens = await run("dcl", {
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.compoundLens.address = compoundLens.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.underwriterAdmin.address == "") {
                const { impl, proxy } = await run("dua", {
                    sumer: config.sumer.address,
                    admin: admin,
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.underwriterAdmin.implementation = impl.address;
                config.underwriterAdmin.address = proxy.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.suInterestRateModel.address == "") {
                const suInterestRateModel = await run("di", {
                    blocks: config.suInterestRateModel.blocks,
                    base: config.suInterestRateModel.base,
                    mul: config.suInterestRateModel.mul,
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.suInterestRateModel.address = suInterestRateModel.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.cInterestRateModel.address == "") {
                const cInterestRateModel = await run("di", {
                    blocks: config.cInterestRateModel.blocks,
                    base: config.cInterestRateModel.base,
                    mul: config.cInterestRateModel.mul,
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.cInterestRateModel.address = cInterestRateModel.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.comptroller.address == "") {
                const { impl, proxy } = await run("dc", {
                    admin: admin,
                    oracle: config.feedPriceOracle.address,
                    ua: config.underwriterAdmin.address,
                    cfm: config.comptroller.closeFactorMantissa,
                    lim: config.comptroller.liquidationIncentiveMantissa,
                    rpc: rpc,
                    pk: pk,
                    gasprice: gasprice
                });
                config.comptroller.implementation = impl.address;
                config.comptroller.address = proxy.address;
                writeFileSync(json, JSON.stringify(config));
            }

            if (config.cTokens.length > 0) {
                for (let i = 0; i < config.cTokens.length; i++) {
                    let cToken = config.cTokens[i];
                    if (cToken.underly != "" && cToken.address == "") {
                        const { impl, proxy } = await run("dct", {
                            name: cToken.cTokenName,
                            symbol: cToken.cTokenSymbol,
                            decimals: cToken.decimals,
                            underly: cToken.underly,
                            comptroller: config.comptroller.address,
                            irm: config.cInterestRateModel.address,
                            admin: admin,
                            rpc: rpc,
                            pk: pk,
                            gasprice: gasprice
                        });
                        config.cTokens[i].implementation = impl.address;
                        config.cTokens[i].address = proxy.address;
                        writeFileSync(json, JSON.stringify(config));
                    }
                }
            }
            if (config.suTokens.length > 0) {
                for (let i = 0; i < config.suTokens.length; i++) {
                    let suToken = config.suTokens[i];
                    if (suToken.address == "") {
                        const { underly, impl, proxy } = await run("dst", {
                            name: suToken.name,
                            symbol: suToken.symbol,
                            decimals: suToken.decimals,
                            comptroller: config.comptroller.address,
                            irm: config.suInterestRateModel.address,
                            admin: admin,
                            rpc: rpc,
                            pk: pk,
                            gasprice: gasprice
                        });
                        config.suTokens[i].underly = underly.address;
                        config.suTokens[i].implementation = impl.address;
                        config.suTokens[i].address = proxy.address;
                        writeFileSync(json, JSON.stringify(config));
                    }
                }
            }
        }
    );
