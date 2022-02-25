import { Event } from '../Event';
import { addAction, describeUser, World } from '../World';
import { CErc20Delegate } from '../Contract/CErc20Delegate'
import {
  getEventV,
  getStringV,
} from '../CoreValue';
import {
  EventV,
  StringV
} from '../Value';
import { Arg, Command, View, processCommandEvent } from '../Command';
import { getCTokenDelegateData } from '../ContractLookup';
import { buildSuTokenDelegate } from '../Builder/SuTokenDelegateBuilder';
import { verify } from '../Verify';

async function genSuTokenDelegate(world: World, from: string, event: Event): Promise<World> {
  let { world: nextWorld, suTokenDelegate, delegateData } = await buildSuTokenDelegate(world, from, event);
  world = nextWorld;

  world = addAction(
    world,
    `Added suToken ${delegateData.name} (${delegateData.contract}) at address ${suTokenDelegate._address}`,
    delegateData.invokation
  );

  return world;
}

async function verifySuTokenDelegate(world: World, suTokenDelegate: CErc20Delegate, name: string, contract: string, apiKey: string): Promise<World> {
  if (world.isLocalNetwork()) {
    world.printer.printLine(`Politely declining to verify on local network: ${world.network}.`);
  } else {
    await verify(world, apiKey, name, contract, suTokenDelegate._address);
  }

  return world;
}

export function suTokenDelegateCommands() {
  return [
    new Command<{ suTokenDelegateParams: EventV }>(`
        #### Deploy

        * "SuTokenDelegate Deploy ...suTokenDelegateParams" - Generates a new SuTokenDelegate
          * E.g. "SuTokenDelegate Deploy CDaiDelegate cDAIDelegate"
      `,
      "Deploy",
      [new Arg("suTokenDelegateParams", getEventV, { variadic: true })],
      (world, from, { suTokenDelegateParams }) => genSuTokenDelegate(world, from, suTokenDelegateParams.val)
    ),
    new View<{ suTokenDelegateArg: StringV, apiKey: StringV }>(`
        #### Verify

        * "SuTokenDelegate <suTokenDelegate> Verify apiKey:<String>" - Verifies SuTokenDelegate in Etherscan
          * E.g. "SuTokenDelegate cDaiDelegate Verify "myApiKey"
      `,
      "Verify",
      [
        new Arg("suTokenDelegateArg", getStringV),
        new Arg("apiKey", getStringV)
      ],
      async (world, { suTokenDelegateArg, apiKey }) => {
        let [suToken, name, data] = await getCTokenDelegateData(world, suTokenDelegateArg.val);

        return await verifySuTokenDelegate(world, suToken, name, data.get('contract')!, apiKey.val);
      },
      { namePos: 1 }
    ),
  ];
}

export async function processSuTokenDelegateEvent(world: World, event: Event, from: string | null): Promise<World> {
  return await processCommandEvent<any>("SuTokenDelegate", suTokenDelegateCommands(), world, event, from);
}
