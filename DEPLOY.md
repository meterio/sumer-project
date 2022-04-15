# Deploy


### Steps for Contract Deployment with Hardhat (recommended)

```bash
yarn

# config keys for deployment
export SUMER_MAIN_PRIVKEY=
export SUMER_TEST_PRIVKEY=
export SUMER_TOKEN_DEPLOYER_PRIVKEY=

# deploy sutokens
npx hardhat deploySuToken --network [network]

# Deploy CompoundLens, Comp, UnderwriterAdmin, Comptroller
npx hardhat deployComptroller --network [network]

# Deploy CTokens
npx hardhat deployCToken --network [network]

# before doing this, config properly in scripts/tokens.ts
# Config price oracle feeds
npx hardhat configOracle --network [network]

# Config Comptroller with groups
npx hardhat configGroup --network [network]
```

### Steps for Contract Deployment With Saddle (deprecated)

```bash
# Deploy CompoundLens, Comp, UnderwriterAdmin, Comptroller
yarn repl -s script/scen/comptroller.scen -n rinkeby

# Deploy test tokens and cTokens
yarn repl -s script/scen/tokens.scen -n rinkeby

# Deploy suUSD with cb-cli
node index.js --url [rpc-url] deploy --erc20  --erc20Symbol suUSD --erc20Name SumerUSD --gasPrice 40000000000

# Update settings
# set suUSD,suBTC,suETH in "Contracts" and "Tokens" field of rinkeby.json
# Then you could deploy cSu token
yarn repl -s script/scen/sutokens.scen -n rinkeby

# Add minter & Mint (on cb-cli)
node index.js --url [rpc-url] erc20 add-minter --erc20Address [suUSD] --minter [cSuUSD] 
# node index.js --url [rpc-url] erc20 mint --amount 1000000000000000000000000 --erc20Address [suUSD] --receiver [cSuUSD]
```

### Steps for UI deployment

```bash
# update constants.ts for all the contract addresses
# remember to add UnderwriterAdmin
# copy FeedPriceOracle with alias of PriceOracle
# copy cSuUSD with alias of csuUSD
# publish the new @meterio/compound-js package
```

```bash
# update sumer-ui with new @meterio/compound-js
# update token addresses in src/constants/index.js for ERC20 tokens
```

### Utilities

```bash
# deploy ERC20 with proxy (decimals is 18 by default)
npx hardhat deployERC20 --name [name] --symbol [symbol] --network [network]

# add minter
npx hardhat addMinter --token [tokenAddress] --minter [minter] --network [network]

# mint token
npx hardhat mint --token [tokenSymbol] --to [toAddress] --amount [amountInWei] --network [network]

# query for price from oracle
npx hardhat price --token [tokenSymbol]  --network [network]


```