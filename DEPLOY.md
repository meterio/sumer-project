# Deploy

### Steps

```bash
# Deploy CompoundLens, Comp, UnderwriterAdmin, Comptroller
yarn repl -s script/scen/comptroller.scen -n rinkeby

# Deploy test tokens and cTokens
yarn repl -s script/scen/tokens.scen -n rinkeby

# Create group data on UnderwriterAdmin
yarn repl -s script/scen/groups.scen -n rinkeby

# Set feed/price data on FeedPriceOracle
yarn repl -s script/scen/feeds.scen -n rinkeby

# Deploy suUSD with cb-cli
node index.js --url [rpc-url] deploy --erc20  --erc20Symbol suUSD --erc20Name SumerUSD --gasPrice 40000000000

# Update settings
# set suUSD in "Contracts" field of rinkeby.json
# Then you could deploy cSu token
yarn repl -s script/scen/sutokens.scen -n rinkeby

# Add minter & Mint (on cb-cli)
node index.js --url [rpc-url] erc20 add-minter --erc20Address [suUSD] --minter [cSuUSD] 
node index.js --url [rpc-url] erc20 mint --amount 1000000000000000000000000 --erc20Address [suUSD] --receiver [cSuUSD]

# Call Comptroller:supportMarket to actually enable ctokens
```