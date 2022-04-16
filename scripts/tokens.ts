interface UnderlyingConfig {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  cTokenName: string;
}
interface SuTokenConfig {
  name: string;
  symbol: string;
  decimals: number;
}

export enum FeedType {
  Fixed,
  Chainlink,
  Witnet,
}
interface PriceFeed {
  ctoken: string;
  type: FeedType;
  fixed: string;
  feedAddr: string;
  decimals: number;
}
export const groupNums: { [key: string]: number } = {
  cBTC: 1,
  csuBTC: 1,

  cETH: 2,
  csuETH: 2,

  cUSDC: 3,
  cUSDT: 3,
  csuUSD: 3,
};

export const priceFeeds: { [key: string]: PriceFeed[] } = {
  kcc: [
    {
      ctoken: 'cUSDC',
      type: FeedType.Witnet,
      feedAddr: '0xffa9c435D9A19072d44265cceBEf8760fC03B446',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cUSDT',
      type: FeedType.Witnet,
      feedAddr: '0xA6434C9F9de740B895886A982Cfe5B3CF223be82',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cBTCK',
      type: FeedType.Witnet,
      feedAddr: '0xE22f48DDdcb34BD34489fE224d7fFC1b0a361D87',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cETH',
      type: FeedType.Witnet,
      feedAddr: '0xF849C1ddd19f524c12A043556fAa5602a6B81F98',
      decimals: 6,
      fixed: '',
    },
    { ctoken: 'csuUSD', type: FeedType.Fixed, fixed: '1000000000000000', decimals: 0, feedAddr: '' },
    {
      ctoken: 'csuETH',
      type: FeedType.Witnet,
      feedAddr: '0xF849C1ddd19f524c12A043556fAa5602a6B81F98',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'csuBTC',
      type: FeedType.Witnet,
      feedAddr: '0xE22f48DDdcb34BD34489fE224d7fFC1b0a361D87',
      decimals: 6,
      fixed: '',
    },
  ],
  kcctest: [
    {
      ctoken: 'cUSDC',
      type: FeedType.Witnet,
      feedAddr: '0x4eF17f49758B4C130f9b6DA45Ba30A8566d37F9a',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cUSDT',
      type: FeedType.Witnet,
      feedAddr: '0xD1B976c7d61c616f18D657297394680026367619',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cBTCK',
      type: FeedType.Witnet,
      feedAddr: '0x7bedADcb912F7A0b8E5C4269C670C55D961B4654',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'cETH',
      type: FeedType.Witnet,
      feedAddr: '0xc2C7609090e14F8a69dF6081e385b205D4a9cd9a',
      decimals: 6,
      fixed: '',
    },
    { ctoken: 'csuUSD', type: FeedType.Fixed, fixed: '1000000000000000', decimals: 0, feedAddr: '' },
    {
      ctoken: 'csuETH',
      type: FeedType.Witnet,
      feedAddr: '0xc2C7609090e14F8a69dF6081e385b205D4a9cd9a',
      decimals: 6,
      fixed: '',
    },
    {
      ctoken: 'csuBTC',
      type: FeedType.Witnet,
      feedAddr: '0x7bedADcb912F7A0b8E5C4269C670C55D961B4654',
      decimals: 6,
      fixed: '',
    },
  ],
};

// IMPORTANT!!!!!!! read before you make changes
// don't change order of this array
// please make it incremental, don't remove any tokens that already exists
// the order will affect tx nonce and affect deployed token address
export const suTokens: SuTokenConfig[] = [
  { name: 'suUSD', symbol: 'suUSD', decimals: 18 },
  { name: 'suETH', symbol: 'suETH', decimals: 18 },
  { name: 'SuBTC', symbol: 'suBTC', decimals: 18 },
];

export const underlyingTokens: { [key: string]: UnderlyingConfig[] } = {
  kcc: [
    {
      name: 'KCC-Peg USD Coin',
      symbol: 'USDC',
      decimals: 18,
      address: '0x980a5afef3d17ad98635f6c5aebcbaeded3c3430',
      cTokenName: 'Sumer USD Coin',
    },
    {
      name: 'KCC-Peg Tether USD',
      symbol: 'USDT',
      decimals: 18,
      address: '0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48',
      cTokenName: 'Sumer Tether USD',
    },
    {
      name: 'KCC-Peg Ether',
      symbol: 'ETH',
      decimals: 18,
      address: '0xf55af137a98607f7ed2efefa4cd2dfe70e4253b1',
      cTokenName: 'Sumer Ether',
    },
    {
      name: 'KCC-Peg BTCK Token',
      symbol: 'BTCK',
      decimals: 18,
      address: '0xfa93c12cd345c658bc4644d1d4e1b9615952258c',
      cTokenName: 'Sumer BTCK Token',
    },
  ],
  kcctest: [
    {
      name: 'Test USD Coin',
      symbol: 'USDC',
      decimals: 18,
      address: '0xf60b2DB9567D7402f40f6324e9A0E196aDF2C7a4',
      cTokenName: 'Sumer USD Coin',
    },
    {
      name: 'Test USDT',
      symbol: 'USDT',
      decimals: 18,
      address: '0x3765f40e2F5dfe1b3A5ae124331929e59d6157D2',
      cTokenName: 'Sumer Tether USD',
    },
    {
      name: 'Test Ether',
      symbol: 'ETH',
      decimals: 18,
      address: '0x0cf649c095096A7142Cf844895ebCD2BfB299933',
      cTokenName: 'Sumer Ether',
    },
    {
      name: 'Test BTCK Token',
      symbol: 'BTCK',
      decimals: 18,
      address: '0x07670d43C518372af1E48c62F3b1dBab7CA29185',
      cTokenName: 'Sumer BTCK Token',
    },
  ],
};