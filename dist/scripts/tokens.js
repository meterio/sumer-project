"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underlyingTokens = exports.suTokens = exports.priceFeeds = exports.eqAssetGroups = exports.groupNums = exports.FeedType = void 0;
const ethers_1 = require("ethers");
var FeedType;
(function (FeedType) {
    FeedType[FeedType["Fixed"] = 0] = "Fixed";
    FeedType[FeedType["Chainlink"] = 1] = "Chainlink";
    FeedType[FeedType["Witnet"] = 2] = "Witnet";
})(FeedType = exports.FeedType || (exports.FeedType = {}));
exports.groupNums = {
    cBTCK: 1,
    csuBTC: 1,
    cWBTC: 1,
    cETH: 2,
    csuETH: 2,
    cUSDC: 3,
    cUSDT: 3,
    csuUSD: 3,
    cKCS: 4,
};
exports.eqAssetGroups = [
    {
        id: 1,
        name: 'Bitcoin',
        inGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.9', 18),
        inGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.7', 18),
        interGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.8', 18),
        interGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.6', 18),
    },
    {
        id: 2,
        name: 'Ether',
        inGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.9', 18),
        inGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.7', 18),
        interGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.8', 18),
        interGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.6', 18),
    },
    {
        id: 3,
        name: 'StableCoin',
        inGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.9', 18),
        inGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.7', 18),
        interGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.8', 18),
        interGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.6', 18),
    },
    {
        id: 4,
        name: 'KCS',
        inGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.9', 18),
        inGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.7', 18),
        interGroupCTokenRateMantissa: ethers_1.utils.parseUnits('0.8', 18),
        interGroupSuTokenRateMantissa: ethers_1.utils.parseUnits('0.6', 18),
    },
];
exports.priceFeeds = {
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
            feedAddr: '0xffa9c435D9A19072d44265cceBEf8760fC03B446',
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
        { ctoken: 'csuUSD', type: FeedType.Fixed, fixed: '1000000000000000000', decimals: 0, feedAddr: '' },
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
        {
            ctoken: 'cKCS',
            type: FeedType.Witnet,
            feedAddr: '0x76d5Addc0C5F174b74C9B7f3a71c38eD6366750c',
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
            feedAddr: '0xbAc8068Bd402d256505FA1b0281d669e026627EB',
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
        { ctoken: 'csuUSD', type: FeedType.Fixed, fixed: '1000000000000000000', decimals: 0, feedAddr: '' },
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
        {
            ctoken: 'cKCS',
            type: FeedType.Witnet,
            feedAddr: '0xD1B976c7d61c616f18D657297394680026367619',
            decimals: 6,
            fixed: '',
        },
    ],
    rinkeby: [
        { ctoken: 'cUSDC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cUSDT', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cWBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
        { ctoken: 'cETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuUSD', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'csuETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
    ],
    metertest: [
        { ctoken: 'cUSDC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cUSDT', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cWBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
        { ctoken: 'cETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuUSD', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'csuETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
    ],
    metermain: [
        { ctoken: 'cUSDC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cUSDT', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'cWBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
        { ctoken: 'cETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuUSD', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1000000000000000000' },
        { ctoken: 'csuETH', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '1100000000000000000000' },
        { ctoken: 'csuBTC', type: FeedType.Fixed, feedAddr: '', decimals: 0, fixed: '20000000000000000000000' },
    ],
};
// IMPORTANT!!!!!!! read before you make changes
// don't change order of this array
// please make it incremental, don't remove any tokens that already exists
// the order will affect tx nonce and affect deployed token address
exports.suTokens = [
    { name: 'suUSD', symbol: 'suUSD', decimals: 18, minter: 'csuUSD' },
    { name: 'suETH', symbol: 'suETH', decimals: 18, minter: 'csuETH' },
    { name: 'suBTC', symbol: 'suBTC', decimals: 18, minter: 'csuBTC' },
];
exports.underlyingTokens = {
    kcc: [
        {
            name: 'KCC-Peg USD Coin',
            symbol: 'USDC',
            decimals: 18,
            address: '0x980a5afef3d17ad98635f6c5aebcbaeded3c3430',
            cTokenName: 'Sumer USD Coin',
            native: false,
        },
        {
            name: 'KCC-Peg Tether USD',
            symbol: 'USDT',
            decimals: 18,
            address: '0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48',
            cTokenName: 'Sumer Tether USD',
            native: false,
        },
        {
            name: 'KCC-Peg Ether',
            symbol: 'ETH',
            decimals: 18,
            address: '0xf55af137a98607f7ed2efefa4cd2dfe70e4253b1',
            cTokenName: 'Sumer Ether',
            native: false,
        },
        {
            name: 'KCC-Peg BTCK Token',
            symbol: 'BTCK',
            decimals: 18,
            address: '0xfa93c12cd345c658bc4644d1d4e1b9615952258c',
            cTokenName: 'Sumer BTCK Token',
            native: false,
        },
    ],
    kcctest: [
        {
            name: 'KuCoin Token',
            symbol: 'KCS',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            cTokenName: 'Sumer KCS',
            native: true,
        },
        {
            name: 'Test USD Coin',
            symbol: 'USDC',
            decimals: 18,
            address: '0xf60b2DB9567D7402f40f6324e9A0E196aDF2C7a4',
            cTokenName: 'Sumer USD Coin',
            native: false,
        },
        {
            name: 'Test USDT',
            symbol: 'USDT',
            decimals: 18,
            address: '0x3765f40e2F5dfe1b3A5ae124331929e59d6157D2',
            cTokenName: 'Sumer Tether USD',
            native: false,
        },
        {
            name: 'Test Ether',
            symbol: 'ETH',
            decimals: 18,
            address: '0x0cf649c095096A7142Cf844895ebCD2BfB299933',
            cTokenName: 'Sumer Ether',
            native: false,
        },
        {
            name: 'Test BTCK Token',
            symbol: 'BTCK',
            decimals: 18,
            address: '0x07670d43C518372af1E48c62F3b1dBab7CA29185',
            cTokenName: 'Sumer BTCK Token',
            native: false,
        },
    ],
    goerli: [
        {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 18,
            address: '0x7Eb831a9Ff611B4C5144C0059A8d0d25e378F988',
            cTokenName: 'Sumer USD Coin',
            native: false,
        },
        {
            name: 'Tether USD',
            symbol: 'USDT',
            decimals: 18,
            address: '0x806333bE61588D011548209ED7c2cc3f8aafeAA1',
            cTokenName: 'Sumer Tether USD',
            native: false,
        },
        {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
            address: '0x0000000000000000000000000000000000000000',
            cTokenName: 'Sumer Ether',
            native: true,
        },
        {
            name: 'WBTC Token',
            symbol: 'WBTC',
            decimals: 18,
            address: '0xdd89A42f7a89d0a4Ff1154F1464D9036f2468C65',
            cTokenName: 'Sumer BTCK Token',
            native: false,
        },
    ],
    metertest: [
        {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 18,
            address: '0x8ae4c669f147737085a23d578c1da94d3e39879f',
            cTokenName: 'Sumer USD Coin',
            native: false,
        },
        {
            name: 'Tether USD',
            symbol: 'USDT',
            decimals: 18,
            address: '0xda5f90e416a22f6f65ed586a859c8666ce6ce1d1',
            cTokenName: 'Sumer Tether USD',
            native: false,
        },
        {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
            address: '0xe8876830e7cc85dae8ce31b0802313caf856886f',
            cTokenName: 'Sumer Ether',
            native: false,
        },
        {
            name: 'WBTC Token',
            symbol: 'WBTC',
            decimals: 8,
            address: '0xCFd9102A2675E0d898982F1fD1dd0264aAA901Da',
            cTokenName: 'Sumer BTCK Token',
            native: false,
        },
        {
            name: 'Binance USD',
            symbol: 'BUSD',
            decimals: 18,
            address: '0x660a3a1141632c9dcad8a5a3350f7ddd720bc15c',
            cTokenName: 'Sumer Binance USD',
            native: false,
        },
    ],
};
//# sourceMappingURL=tokens.js.map