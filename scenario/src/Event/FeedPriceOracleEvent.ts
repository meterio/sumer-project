import {Event} from '../Event';
import {addAction, World} from '../World';
import {FeedPriceOracle} from '../Contract/FeedPriceOracle';
import {invoke} from '../Invokation';
import {
  getAddressV,
  getExpNumberV,
} from '../CoreValue';
import {
  AddressV,
  NumberV,
} from '../Value';
import {Arg, Command, processCommandEvent, View} from '../Command';
import {getFeedPriceOracle} from '../ContractLookup';

async function setFixedPrice(world: World, from: string, priceOracle: FeedPriceOracle, cToken: string, amount: NumberV): Promise<World> {
  return addAction(
    world,
    `Set price oracle price for ${cToken} to ${amount.show()}`,
    await invoke(world, priceOracle.methods.setFixedPrice(cToken, amount.encode()), from)
  );
}

async function setFeed(world: World, from: string, priceOracle: FeedPriceOracle, cToken: string, feed: string, decimals: number): Promise<World> {
  return addAction(
    world,
    `Set price oracle feed for ${cToken} to ${feed} with decimals of ${decimals}`,
    await invoke(world, priceOracle.methods.setFeed(cToken, feed, decimals), from)
  );
}

export function feedPriceOracleCommands() {
  return [
    new Command<{priceOracle: FeedPriceOracle, cToken: AddressV, amount: NumberV}>(`
        #### SetFixedPrice

        * "SetFixedPrice <CToken> <Amount>" - Sets the per-ether price for the given cToken
          * E.g. "FeedPriceOracle SetPrice cZRX 1.0"
      `,
      "SetPrice",
      [
        new Arg("priceOracle", getFeedPriceOracle, {implicit: true}),
        new Arg("cToken", getAddressV),
        new Arg("amount", getExpNumberV)
      ],
      (world, from, {priceOracle, cToken, amount}) => setFixedPrice(world, from, priceOracle, cToken.val, amount)
    ),

    new Command<{priceOracle: FeedPriceOracle, cToken: AddressV, feed: AddressV, decimals: NumberV}>(`
        #### SetFeed

        * "SetDirectPrice <Address> <Amount>" - Sets the per-ether price for the given cToken
          * E.g. "FeedPriceOracle SetFeed (Address TTT) (Address TTTFeed) 8"
      `,
      "SetFeed",
      [
        new Arg("priceOracle", getFeedPriceOracle, {implicit: true}),
        new Arg("cToken", getAddressV),
        new Arg("feed", getAddressV),
        new Arg("decimals", getExpNumberV)
      ],
      (world, from, {priceOracle, cToken, feed, decimals}) => setFeed(world, from, priceOracle, cToken.val, feed.val,decimals.toNumber())
    ),
  ];
}

export async function processFeedPriceOracleEvent(world: World, event: Event, from: string | null): Promise<World> {
  return await processCommandEvent<any>("FeedPriceOracle", feedPriceOracleCommands(), world, event, from);
}
