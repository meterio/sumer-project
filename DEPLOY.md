# Deploy

### Steps for Contract Deployment

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
