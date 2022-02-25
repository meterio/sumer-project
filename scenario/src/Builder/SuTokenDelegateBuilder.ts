import { Event } from '../Event';
import { World } from '../World';
import { SuErc20Delegate, SuErc20DelegateScenario } from '../Contract/SuErc20Delegate';
import { Invokation } from '../Invokation';
import { getStringV } from '../CoreValue';
import { AddressV, NumberV, StringV } from '../Value';
import { Arg, Fetcher, getFetcherValue } from '../Command';
import { storeAndSaveContract } from '../Networks';
import { getContract, getTestContract } from '../Contract';

const SuErc20DelegateContract = getContract('suErc20Delegate');
const SuErc20DelegateScenarioContract = getTestContract('suErc20DelegateScenario');


export interface SuTokenDelegateData {
  invokation: Invokation<SuErc20Delegate>;
  name: string;
  contract: string;
  description?: string;
}

export async function buildSuTokenDelegate(
  world: World,
  from: string,
  params: Event
): Promise<{ world: World; suTokenDelegate: SuErc20Delegate; delegateData: SuTokenDelegateData }> {
  const fetchers = [
    new Fetcher<{ name: StringV; }, SuTokenDelegateData>(
      `
        #### SuErc20Delegate

        * "SuErc20Delegate name:<String>"
          * E.g. "SuTokenDelegate Deploy SuErc20Delegate cDAIDelegate"
      `,
      'SuErc20Delegate',
      [
        new Arg('name', getStringV)
      ],
      async (
        world,
        { name }
      ) => {
        return {
          invokation: await SuErc20DelegateContract.deploy<SuErc20Delegate>(world, from, []),
          name: name.val,
          contract: 'SuErc20Delegate',
          description: 'Standard SuErc20 Delegate'
        };
      }
    ),

    new Fetcher<{ name: StringV; }, SuTokenDelegateData>(
      `
        #### SuErc20DelegateScenario

        * "SuErc20DelegateScenario name:<String>" - A SuErc20Delegate Scenario for local testing
          * E.g. "SuTokenDelegate Deploy SuErc20DelegateScenario cDAIDelegate"
      `,
      'SuErc20DelegateScenario',
      [
        new Arg('name', getStringV),
      ],
      async (
        world,
        { name }
      ) => {
        return {
          invokation: await SuErc20DelegateScenarioContract.deploy<SuErc20DelegateScenario>(world, from, []),
          name: name.val,
          contract: 'SuErc20DelegateScenario',
          description: 'Scenario SuErc20 Delegate'
        };
      }
    )
  ];

  let delegateData = await getFetcherValue<any, SuTokenDelegateData>("DeploySuToken", fetchers, world, params);
  let invokation = delegateData.invokation;
  delete delegateData.invokation;

  if (invokation.error) {
    throw invokation.error;
  }

  const suTokenDelegate = invokation.value!;

  world = await storeAndSaveContract(
    world,
    suTokenDelegate,
    delegateData.name,
    invokation,
    [
      {
        index: ['SuTokenDelegate', delegateData.name],
        data: {
          address: suTokenDelegate._address,
          contract: delegateData.contract,
          description: delegateData.description
        }
      }
    ]
  );

  return { world, suTokenDelegate, delegateData };
}
