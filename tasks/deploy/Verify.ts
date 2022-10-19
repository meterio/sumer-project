import hre from "hardhat";
import axios from "axios";
import { Logger } from "tslog";
import {log} from "../../log_settings";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();
// tslint:disable-next-line:no-var-requires
const argv = require('yargs/yargs')()
  .env('')
  .options({
    networkScanKey: {
      type: "string",
    },
  }).argv;

export class Verify {

  public static async sourcify() {
    try {
      await hre.run("sourcify")
    } catch (e) {
      log.info('error verify ' + e);
    }
  }

  public static async verify(address: string) {
    try {
      await hre.run("verify:verify", {
        address
      })
    } catch (e) {
      log.info('error verify ' + e);
    }
  }
  public static async verifyAll() {
    try {
      await hre.run("sourcify")
    } catch (e) {
      log.info('error verify ' + e);
    }
  }

  // tslint:disable-next-line:no-any
  public static async verifyWithArgs(address: string, args: any[]) {
    try {
      await hre.run("verify:verify", {
        address, constructorArguments: args
      })
    } catch (e) {
      log.info('error verify ' + e);
    }
  }

  // tslint:disable-next-line:no-any
  public static async verifyWithContractName(address: string, contractPath: string, args?: any[]) {
    try {
      await hre.run("verify:verify", {
        address, contract: contractPath, constructorArguments: args
      })
    } catch (e) {
      log.info('error verify ' + e);
    }
  }

  // tslint:disable-next-line:no-any
  public static async verifyWithArgsAndContractName(address: string, args: any[], contractPath: string) {
    try {
      await hre.run("verify:verify", {
        address, constructorArguments: args, contract: contractPath
      })
    } catch (e) {
      log.info('error verify ' + e);
    }
  }

}
