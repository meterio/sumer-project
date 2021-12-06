import {Event} from '../Event';
import {addAction, describeUser, World} from '../World';
import {decodeCall, getPastEvents} from '../Contract';
import {UnderwriterAdmin} from '../Contract/UnderwriterAdmin';
import {CToken} from '../Contract/CToken';
import {invoke} from '../Invokation';
import {
  getAddressV,
  getBoolV,
  getEventV,
  getExpNumberV,
  getNumberV,
  getPercentV,
  getStringV,
} from '../CoreValue';
import {
  AddressV,
  BoolV,
  EventV,
  NumberV,
  StringV
} from '../Value';
import {Arg, Command,  processCommandEvent} from '../Command';
import {getUnderwriterAdmin} from '../ContractLookup';
import {getCTokenV} from '../Value/CTokenValue';
import { buildUnderwriterAdmin } from '../Builder/UnderwriterAdminBuilder';

async function genUnderwriterAdmin(world: World, from: string, params: Event): Promise<World> {
  let {world: nextWorld, underwriterAdminImpl: UnderwriterAdmin, underwriterAdminData: underwriterAdminData} = await buildUnderwriterAdmin(world, from, params);
  world = nextWorld;

  world = addAction(
    world,
    `Added UnderWriterAdmin (${underwriterAdminData.description}) at address ${UnderwriterAdmin._address}`,
    underwriterAdminData.invokation
  );

  return world;
};


export function underwriterAdminCommands() {
  return [
    new Command<{underwriterAdminParams: EventV}>(`
        #### Deploy

        * "UnderwriterAdmin Deploy ...underwriterAdminParams" - Generates a new UnderwriterAdmin (not as Impl)
          * E.g. "UnderwriterAdmin Deploy YesNo"
      `,
      "Deploy",
      [new Arg("underwriterAdminParams", getEventV, {variadic: true})],
      (world, from, {underwriterAdminParams}) => genUnderwriterAdmin(world, from, underwriterAdminParams.val)
    ),
  ];
}

export async function processUnderwriterAdminEvent(world: World, event: Event, from: string | null): Promise<World> {
  return await processCommandEvent<any>("UnderwriterAdmin", underwriterAdminCommands(), world, event, from);
}
