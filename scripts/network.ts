const dotenv = require('dotenv');
dotenv.config();
export const RPCS = {
  hardhat: {
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
    gasLimit: 80000000,
  },
  ganache: {
    url: `http://127.0.0.1:7545`,
    chainId: 1337,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  ropsten: {
    url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  rinkeby: {
    url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.SUMER_TOKEN_DEPLOYER_PRIVKEY, process.env.SUMER_TEST_PRIVKEY],
  },
  goerli: {
    url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  kovan: {
    url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  bsctest: {
    url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
    chainId: 97,
    gasPrice: 20000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  bscmain: {
    url: `https://bsc-dataseed.binance.org`,
    chainId: 56,
    gasPrice: 20000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  hecotest: {
    url: `https://http-testnet.hecochain.com`,
    chainId: 256,
    gasPrice: 1000000000,
    gasLimit: 8000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  hecomain: {
    url: `https://http-mainnet.hecochain.com`,
    chainId: 128,
    gasPrice: 2000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  metertest: {
    url: `https://rpctest.meter.io`,
    chainId: 83,
    gasPrice: 500000000000,
    accounts: [process.env.SUMER_TEST_PRIVKEY, process.env.SUMER_TOKEN_DEPLOYER_PRIVKEY],
  },
  metermain: {
    url: `https://rpc.meter.io`,
    chainId: 82,
    gasPrice: 500000000000,
    accounts: [process.env.SUMER_MAIN_PRIVKEY, process.env.SUMER_TOKEN_DEPLOYER_PRIVKEY],
  },
  clvtest: {
    url: `https://rpc.clover.finance`,
    chainId: 1023,
    gasPrice: 50000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  clvmain: {
    url: `https://rpc-ivy.clover.finance`,
    chainId: 1024,
    gasPrice: 50000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  haicmain: {
    url: `http://121.40.100.237:8022`,
    chainId: 17843,
    gasPrice: 2000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  galtmain: {
    url: `http://121.41.85.86:8025`,
    chainId: 17845,
    gasPrice: 50000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  coinextest: {
    url: `https://testnet-rpc1.coinex.net`,
    chainId: 53,
    gasPrice: 500000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  coinexmain: {
    url: `https://rpc.coinex.net`,
    chainId: 52,
    gasPrice: 500000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  maticmain: {
    url: `https://rpc-mainnet.maticvigil.com`,
    chainId: 137,
    gasPrice: 5000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  matictest: {
    url: `https://rpc-mumbai.maticvigil.com`,
    chainId: 80001,
    gasPrice: 1000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  ftmtest: {
    url: `https://rpc.testnet.fantom.network`,
    chainId: 4002,
    gasPrice: 20000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  ftmmain: {
    url: `https://rpcapi.fantom.network`,
    chainId: 250,
    gasPrice: 60000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  hootest: {
    url: `https://http-testnet.hoosmartchain.com`,
    chainId: 170,
    gasPrice: 150000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  hoomain: {
    url: `https://http-mainnet.hoosmartchain.com`,
    chainId: 70,
    gasPrice: 10000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  oktest: {
    url: `https://exchaintestrpc.okex.org`,
    chainId: 65,
    gasPrice: 100000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  okmain: {
    url: `https://exchainrpc.okex.org`,
    chainId: 66,
    gasPrice: 100000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  xdai: {
    url: `https://rpc.xdaichain.com`,
    chainId: 100,
    gasPrice: 20000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  harmonymain: {
    url: `https://api.s0.t.hmny.io`,
    chainId: 1666600000,
    gasPrice: 10000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  harmonytest: {
    url: `https://api.s0.b.hmny.io`,
    chainId: 1666700000,
    gasPrice: 10000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  avaxtest: {
    url: `https://api.avax-test.network/ext/bc/C/rpc`,
    chainId: 43113,
    gasPrice: 225000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  avaxmain: {
    url: `https://api.avax.network/ext/bc/C/rpc`,
    chainId: 43114,
    gasPrice: 225000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  celotest: {
    url: `https://alfajores-forno.celo-testnet.org`,
    chainId: 44787,
    gasPrice: 500000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  celomain: {
    url: `https://forno.celo.org`,
    chainId: 42220,
    gasPrice: 500000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  moonbeamtest: {
    url: `https://rpc.testnet.moonbeam.network`,
    chainId: 1287,
    gasPrice: 1000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  moonbeam: {
    url: `https://rpc.api.moonbeam.network`,
    chainId: 1284,
    gasPrice: 1000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  tkmtest1: {
    url: `http://43.247.184.48:32021`,
    chianId: 60001,
    gasPrice: 400000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
    timeout: 9999999,
  },
  tkmtest2: {
    url: `http://43.247.184.49:32016`,
    chianId: 60002,
    gasPrice: 400000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  tkmtest103: {
    url: `http://43.247.184.49:32021`,
    chianId: 60103,
    gasPrice: 400000000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  tkm1: {
    url: `https://test103.thinkiumrpc.net`,
    chianId: 70001,
    gasPrice: 400000000000,
    gasLimit: 6000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  tkm103: {
    url: `http://proxy103.thinkiumrpc.net`,
    chianId: 70103,
    gasPrice: 400000000000,
    gasLimit: 6000000,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  kcctest: {
    url: 'https://rpc-testnet.kcc.network',
    chainId: 322,
    gasPrice: 1000000000,
    gasLimit: 6000000,
    accounts: [process.env.SUMER_TEST_PRIVKEY, process.env.SUMER_TOKEN_DEPLOYER_PRIVKEY],
  },
  kcc: {
    url: 'https://rpc-mainnet.kcc.network',
    chainId: 321,
    gasPrice: 1000000000,
    gasLimit: 6000000,
    accounts: [process.env.SUMER_MAIN_PRIVKEY, process.env.SUMER_TOKEN_DEPLOYER_PRIVKEY],
  },
};
