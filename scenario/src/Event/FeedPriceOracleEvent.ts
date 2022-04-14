import {Event} from '../Event';
import {addAction, World} from '../World';
import {FeedPriceOracle} from '../Contract/FeedPriceOracle';
import {invoke} from '../Invokation';
import {
  getEventV,
  getAddressV,
  getNumberV,
} from '../CoreValue';
import {
  EventV,
  AddressV,
  NumberV,
} from '../Value';
import {Arg, Command, processCommandEvent, View} from '../Command';
import {getFeedPriceOracle} from '../ContractLookup';
import { buildFeedPriceOracle } from '../Builder/FeedPriceOracleBuilder';

async function genFeedPriceOracle(world: World, from: string, params: Event): Promise<World> {
  let {world: nextWorld, feedPriceOracleImpl, priceOracleData} = await buildFeedPriceOracle(world, from, params);
  world = nextWorld;

  world = addAction(
    world,
    `Deployed FeedPriceOracle (${priceOracleData.description}) to address ${feedPriceOracleImpl._address}`,
    priceOracleData.invokation!
  );

  return world;
}

async function setFixedPrice(world: World, from: string, priceOracle: FeedPriceOracle, cToken: string, amount: NumberV): Promise<World> {
  return addAction(
    world,
    `Set price oracle price for ${cToken} to ${amount.show()}`,
    await invoke(world, priceOracle.methods.setFixedPrice(cToken, amount.encode()), from)
  );
}

async function setFeed(world: World, from: string, priceOracle: FeedPriceOracle, cToken: string, feed: string, decimals: number): Promise<World> {
  console.log("TYPE: ", typeof priceOracle)
  console.log("methods: ", priceOracle.methods)
  return addAction(
    world,
    `Set price oracle feed for ${cToken} to ${feed} with decimals of ${decimals}`,
    await invoke(world, priceOracle.methods.setFeed(cToken, feed, decimals), from)
  );
}

async function setWitnetFeed(world: World, from: string, priceOracle: FeedPriceOracle, cToken: string, feed: string, tokenDecimals: number, feedDecimals: number): Promise<World> {
  console.log("TYPE: ", typeof priceOracle)
  console.log("methods: ", priceOracle.methods)
  return addAction(
    world,
    `Set price oracle witnet feed for ${cToken} to ${feed} with tokenDecimals=${tokenDecimals} and feedDecimals=${feedDecimals}`,
    await invoke(world, priceOracle.methods.setWitnetFeed(cToken, feed, tokenDecimals, feedDecimals), from)
  );
}

export function feedPriceOracleCommands() {
  return [
    new Command<{params: EventV}>(`
        #### Deploy

        * "Deploy ...params" - Generates a new price oracle
          * E.g. "FeedPriceOracle Deploy Feed"
      `,
      "Deploy",
      [
        new Arg("params", getEventV, {variadic: true})
      ],
      (world, from, {params}) => {console.log("CALLING"); return genFeedPriceOracle(world, from, params.val)}
    ),
    new Command<{priceOracle: FeedPriceOracle, cToken: AddressV, amount: NumberV}>(`
        #### SetFixedPrice

        * "SetFixedPrice <CToken> <Amount>" - Sets the per-ether price for the given cToken
          * E.g. "FeedPriceOracle SetFixedPrice cETH 1.0"
      `,
      "SetFixedPrice",
      [
        new Arg("priceOracle", getFeedPriceOracle, {implicit: true}),
        new Arg("cToken", getAddressV),
        new Arg("amount", getNumberV)
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
        new Arg("decimals", getNumberV)
      ],
      (world, from, {priceOracle, cToken, feed, decimals}) => setFeed(world, from, priceOracle, cToken.val, feed.val,decimals.toNumber())
    ),
    new Command<{priceOracle: FeedPriceOracle, cToken: AddressV, feed: AddressV, tokenDecimals: NumberV, feedDecimals: NumberV}>(`
        #### SetWitnetFeed

        * "SetWitnetFeed <Address> <Amount> <Amount>" - Sets the witnet feed
          * E.g. "FeedPriceOracle SetWitnetFeed (Address TTT) 18 6"
      `,
      "SetWitnetFeed",
      [
        new Arg("priceOracle", getFeedPriceOracle, {implicit: true}),
        new Arg("cToken", getAddressV),
        new Arg("feed", getAddressV),
        new Arg("tokenDecimals", getNumberV),
        new Arg("feedDecimals", getNumberV)
      ],
      (world, from, {priceOracle, cToken, feed, tokenDecimals, feedDecimals}) => setWitnetFeed(world, from, priceOracle, cToken.val, feed.val,tokenDecimals.toNumber(), feedDecimals.toNumber())
    ),
  ];
}

export async function processFeedPriceOracleEvent(world: World, event: Event, from: string | null): Promise<World> {
  return await processCommandEvent<any>("FeedPriceOracle", feedPriceOracleCommands(), world, event, from);
}
