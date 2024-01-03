import { task } from 'hardhat/config';
import { log } from '../../log_settings';
import { readFileSync } from 'fs';

import https from 'https';
import { CompoundLens__factory, Multicall2 } from '../../typechain';
import { BigNumber, utils, BytesLike } from 'ethers';

/**
npx hardhat ap \
--json "config json file" \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> 
 */
type Call = {
  target: string;
  callData: BytesLike;
};

type Pos = {
  account: string;
  markets: string[];
  liquidity: string;
  shortfall: string;
};

const expScale = BigNumber.from(BigNumber.from(10).pow(18));

task('ap', 'get all positions')
  .addParam('json', 'config json file')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .setAction(async ({ json, rpc, pk }, { ethers, run, network }) => {
    const config = JSON.parse(readFileSync(json).toString());
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    log.info('wallet:', wallet.address);

    const allPositions = JSON.parse(readFileSync('./allPositions.json').toString());
    const comptrollerInterface = CompoundLens__factory.createInterface();
    const multicall = (await ethers.getContractAt('Multicall2', config.multicall2.address, wallet)) as Multicall2;

    let calls: Call[] = [];
    let positons: Pos[] = [];
    for (let i = 0; i < allPositions.accounts.length; i++) {
      let account = allPositions.accounts[i].address;
      let callData = comptrollerInterface.encodeFunctionData('getAccountLimits', [config.comptroller.address, account]);

      calls.push({
        target: config.compoundLens.address,
        callData: callData,
      });
    }
    const result = await multicall.callStatic.aggregate(calls);
    const returnData = result.returnData;

    for (let i = 0; i < allPositions.accounts.length; i++) {
      let pos = comptrollerInterface.decodeFunctionResult('getAccountLimits', returnData[i]);
      positons.push({
        account: allPositions.accounts[i].address,
        markets: pos[0][0],
        liquidity: pos[0][1].toString(),
        shortfall: pos[0][2].toString(),
      });
    }
    console.table(positons);
  });
