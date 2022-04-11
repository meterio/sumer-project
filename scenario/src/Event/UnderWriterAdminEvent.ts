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

async function setEqAssetGroup(world: World, from: string, underwriterAdmin: UnderwriterAdmin, groupId: number, groupName:string, inGroupCTokenRateMantissa: NumberV, inGroupSuTokenRateMantissa: NumberV, interGroupCTokenRateMantissa: NumberV, interGroupSuTokenRateMantissa: NumberV): Promise<World> {
  return addAction(
    world,
    `Set asset group for ${groupId} to ${groupName} with rate mantissa of ${inGroupCTokenRateMantissa.show()}`,
    await invoke(world, underwriterAdmin.methods.setEqAssetGroup(groupId, groupName, inGroupCTokenRateMantissa.encode(), inGroupSuTokenRateMantissa.encode(), interGroupCTokenRateMantissa.encode(), interGroupSuTokenRateMantissa.encode()), from)
  );
}


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

    new Command<{underwriterAdmin: UnderwriterAdmin, groupId: NumberV, groupName: StringV, inGroupCTokenRateMantissa:NumberV, inGroupSuTokenRateMantissa: NumberV, interGroupCTokenRateMantissa: NumberV, interGroupSuTokenRateMantissa: NumberV}>(`
        #### SetEqAssetGroup

        * "SetEqAssetGroup <groupId> <GroupName> <inGroupCTokenRateMantissa> <inGroupSuTokenRateMantissa> <interGroupCTokenRateMantissa> <interGroupSuTokenRateMantissa>" - Sets asset group for each ctoken
          * E.g. "UnderwriterAdmin SetEqAssetGroup (CToken cUSDT Address) Stable 9e17"
      `,
      "SetEqAssetGroup",
      [
        new Arg("underwriterAdmin", getUnderwriterAdmin, {implicit: true}),
        new Arg("groupId", getNumberV),
        new Arg("groupName", getStringV),
        new Arg("inGroupCTokenRateMantissa", getNumberV),
        new Arg("inGroupSuTokenRateMantissa", getNumberV),
        new Arg("interGroupCTokenRateMantissa", getNumberV),
        new Arg("interGroupSuTokenRateMantissa", getNumberV)
      ],
      (world, from, {underwriterAdmin, groupId, groupName, inGroupCTokenRateMantissa, inGroupSuTokenRateMantissa, interGroupCTokenRateMantissa, interGroupSuTokenRateMantissa}) => setEqAssetGroup(world, from, underwriterAdmin, groupId.toNumber(), groupName.val, inGroupCTokenRateMantissa, inGroupSuTokenRateMantissa, interGroupCTokenRateMantissa, interGroupSuTokenRateMantissa),
    ),
  ];
}

export async function processUnderwriterAdminEvent(world: World, event: Event, from: string | null): Promise<World> {
  return await processCommandEvent<any>("UnderwriterAdmin", underwriterAdminCommands(), world, event, from);
}
