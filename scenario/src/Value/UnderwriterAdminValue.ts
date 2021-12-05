import { Event } from '../Event';
import { World } from '../World';
import { UnderwriterAdmin } from '../Contract/UnderwriterAdmin';
import {
  AddressV,
  Value
} from '../Value';
import { Arg, Fetcher, getFetcherValue } from '../Command';
import { getUnderwriterAdmin } from '../ContractLookup';

export function underwriterAdminFetchers() {
  return [
    new Fetcher<{ underwriterAdmin: UnderwriterAdmin }, AddressV>(`
        #### Address

        * "<UnderwriterAdmin> Address" - Returns the address of UnderwriterAdmin token
          * E.g. "UnderwriterAdmin Address"
      `,
      "Address",
      [
        new Arg("underwriterAdmin", getUnderwriterAdmin, { implicit: true })
      ],
      async (world, { underwriterAdmin }) => new AddressV(underwriterAdmin._address)
    ),
  ];
}

export async function getUnderwriterAdminValue(world: World, event: Event): Promise<Value> {
  return await getFetcherValue<any, any>("UnderwriterAdmin", underwriterAdminFetchers(), world, event);
}
