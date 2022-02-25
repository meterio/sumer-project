import { Event } from '../Event';
import { World } from '../World';
import { CErc20Delegate } from '../Contract/CErc20Delegate';
import {
  getCoreValue,
  mapValue
} from '../CoreValue';
import { Arg, Fetcher, getFetcherValue } from '../Command';
import {
  AddressV,
  Value,
} from '../Value';
import { getWorldContractByAddress, getSuTokenDelegateAddress } from '../ContractLookup';

export async function getSuTokenDelegateV(world: World, event: Event): Promise<CErc20Delegate> {
  const address = await mapValue<AddressV>(
    world,
    event,
    (str) => new AddressV(getSuTokenDelegateAddress(world, str)),
    getCoreValue,
    AddressV
  );

  return getWorldContractByAddress<CErc20Delegate>(world, address.val);
}

async function suTokenDelegateAddress(world: World, suTokenDelegate: CErc20Delegate): Promise<AddressV> {
  return new AddressV(suTokenDelegate._address);
}

export function suTokenDelegateFetchers() {
  return [
    new Fetcher<{ suTokenDelegate: CErc20Delegate }, AddressV>(`
        #### Address

        * "SuTokenDelegate <SuTokenDelegate> Address" - Returns address of SuTokenDelegate contract
          * E.g. "SuTokenDelegate cDaiDelegate Address" - Returns cDaiDelegate's address
      `,
      "Address",
      [
        new Arg("suTokenDelegate", getSuTokenDelegateV)
      ],
      (world, { suTokenDelegate }) => suTokenDelegateAddress(world, suTokenDelegate),
      { namePos: 1 }
    ),
  ];
}

export async function getSuTokenDelegateValue(world: World, event: Event): Promise<Value> {
  return await getFetcherValue<any, any>("SuTokenDelegate", suTokenDelegateFetchers(), world, event);
}
