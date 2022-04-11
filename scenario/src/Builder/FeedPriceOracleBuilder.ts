import {Event} from '../Event';
import {addAction, World} from '../World';
import {Invokation, invoke} from '../Invokation';
import {Arg, Fetcher, getFetcherValue} from '../Command';
import {storeAndSaveContract} from '../Networks';
import {getContract, getTestContract} from '../Contract';
import { FeedPriceOracle } from '../Contract/FeedPriceOracle';


const FeedPriceOracleContract = getContract("FeedPriceOracle")

export interface FeedPriceOracleData {
  invokation: Invokation<FeedPriceOracle>;
  name: string;
  contract: string;
  description: string;
}

export async function buildFeedPriceOracle(world: World, from: string, event: Event): Promise<{world: World, feedPriceOracleImpl: FeedPriceOracle, priceOracleData: FeedPriceOracleData}> {
  const fetchers = [
    
    new Fetcher<{}, FeedPriceOracleData>(`
        #### Feed

        * "Feed" - The feed price oracle that read price from Chainlink aggregators
          * E.g. "FeedPriceOracle Deploy Feed"
    `,
    "Feed",
    [],
    async (world, {})=>{
      return {
        invokation: await FeedPriceOracleContract.deploy<FeedPriceOracle>(world, from, []),
        name: "FeedPriceOracle",
        contract: "FeedPriceOracle",
        description: "Feed Price Oracle"
      }
    }),
  ];

  let priceOracleData = await getFetcherValue<any, FeedPriceOracleData>("DeployFeedPriceOracle", fetchers, world, event);
  console.log(priceOracleData)
  let invokation = priceOracleData.invokation!;
  delete priceOracleData.invokation;
  console.log(invokation)

  if (invokation.error) {
    throw invokation.error;
  }
  const feedPriceOracleImpl = invokation.value!;


  world = await storeAndSaveContract(world, feedPriceOracleImpl, priceOracleData.name, invokation, [
    {
      index: ['FeedPriceOracle', priceOracleData.name],
      data: {
        address: feedPriceOracleImpl._address,
        contract: priceOracleData.contract,
        description: priceOracleData.description
      }
    }
  ]);

  return {world, feedPriceOracleImpl, priceOracleData};
}

