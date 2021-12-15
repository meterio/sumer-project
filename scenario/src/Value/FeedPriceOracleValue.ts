import {Event} from '../Event';
import {World} from '../World';
import {PriceOracle} from '../Contract/PriceOracle';
import {
  getAddressV
} from '../CoreValue';
import {
  AddressV,
  NumberV,
  Value} from '../Value';
import {Arg, Fetcher, getFetcherValue} from '../Command';
import {getFeedPriceOracle, getPriceOracle} from '../ContractLookup';
import { FeedPriceOracle } from '../Contract/FeedPriceOracle';

async function getPrice(world: World, feedPriceOracle: FeedPriceOracle, asset: string): Promise<NumberV> {
  return new NumberV(await feedPriceOracle.methods.getFixedPrice(asset).call());
}

export async function getFeedPriceOracleAddress(world: World, priceOracle: FeedPriceOracle): Promise<AddressV> {
  return new AddressV(priceOracle._address);
}

export function feedPriceOracleFetchers() {
  return [
    new Fetcher<{feedPriceOracle: FeedPriceOracle}, AddressV>(`
        #### Address

        * "Address" - Gets the address of the global price oracle
      `,
      "Address",
      [
        new Arg("feedPriceOracle", getFeedPriceOracle, {implicit: true})
      ],
      (world, {feedPriceOracle}) => getFeedPriceOracleAddress(world, feedPriceOracle)
    ),
    new Fetcher<{feedPriceOracle: FeedPriceOracle, asset: AddressV}, NumberV>(`
        #### Price

        * "Price asset:<Address>" - Gets the price of the given asset
      `,
      "Price",
      [
        new Arg("feedPriceOracle", getFeedPriceOracle, {implicit: true}),
        new Arg("asset", getAddressV,)
      ],
      (world, {feedPriceOracle, asset}) => getPrice(world, feedPriceOracle, asset.val)
    )
  ];
}

export async function getFeedPriceOracleValue(world: World, event: Event): Promise<Value> {
  return await getFetcherValue<any, any>("FeedPriceOracle", feedPriceOracleFetchers(), world, event);
}
