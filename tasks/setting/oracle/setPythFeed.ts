import { task } from 'hardhat/config';
import { types } from 'hardhat/config';
import { ContractTransaction } from 'ethers';
import { PythOracle } from '../../../typechain';

/**
npx hardhat spf \
--address <Pyth oracle address> \
--rpc http://127.0.0.1:7545 \
--pk <admin private key> \
--gasprice 1000000000
 */
const json = [
  {
    cToken: '0x5b1Cac7De2434CB46cbB8934F21D4327C113dF9E',
    feedId: '0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'suBTC'
  },
  {
    cToken: '0xe516404e5e51bFFf269549666c19d2AE8C0f76F7',
    feedId: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'suETH'
  },
  {
    cToken: '0x443062b9caC64764f7532d21fd7D0019d9219b39',
    feedId: '0x06c532524fabd49cc142815502d785e4f34ec3bd035480efb770568d423f46c6',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'sdrBUSD'
  },
  {
    cToken: '0x6a1CaB79D12A444b93cFFe80C7cA6E5Ee986DcAE',
    feedId: '0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 8,
    name: 'sdrBTC'
  },
  {
    cToken: '0x282824688A435A56473801EE8fb435F339b9F9B7',
    feedId: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'sdrETH'
  },
  {
    cToken: '0x66860B7271436943c8BbD3B9290C69Cd8c04AdF1',
    feedId: '0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 6,
    name: 'sdrUSDT'
  },
  {
    cToken: '0xcE7Bc76A7B0075e120D6F76Fb706Bf8B09DA16C2',
    feedId: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 6,
    name: 'sdrUSDC'
  },
  {
    cToken: '0xBa774C1BBE546394AaDbf794964448078eF38d07',
    feedId: '0x8fece987ff24a0a7ec4d87c29d337e7b54989663536b73883ae8387589cfea2d',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'sdrMTR'
  },
  {
    cToken: '0xab46E0F3f3a3c118fC7623049Ddf0C875B47fc74',
    feedId: '0xa5fd90e292644d5f9b79a1640f464fcae4b8cb925465d197a78185a308603606',
    addr: '0x5ff5b9039fbd8256864a4460b7ea77093a65b1b5',
    tokenDecimals: 18,
    name: 'sdrMTRG'
  }
];
task('spf', 'set Pyth oracle')
  .addParam('address', 'Pyth oracle address')
  .addParam('rpc', 'rpc connect')
  .addParam('pk', 'proxy admin private key')
  .addOptionalParam('gasprice', 'gas price', 0, types.int)
  .setAction(async ({ address, rpc, pk, gasprice }, { ethers, run }) => {
    await run('compile');
    let override = {};
    if (gasprice > 0) {
      override = {
        gasPrice: gasprice
      };
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(pk, provider);
    let receipt: ContractTransaction;

    const pythOracle = (await ethers.getContractAt('PythOracle', address, wallet)) as PythOracle;
    console.log('find PythOracle:', address);
    for (let i = 0; i < json.length; i++) {
      receipt = await pythOracle.setFeedId(
        json[i].cToken,
        json[i].feedId,
        json[i].addr,
        json[i].tokenDecimals,
        json[i].name,
        override
      );
      console.log('setFeedId tx:', receipt.hash);
    }
  });
