import { Event } from '../Event';
import { addAction, World } from '../World';
import { ComptrollerImpl } from '../Contract/ComptrollerImpl';
import { Invokation, invoke } from '../Invokation';
import { getAddressV, getExpNumberV, getNumberV, getStringV } from '../CoreValue';
import { AddressV, NumberV, StringV } from '../Value';
import { Arg, Fetcher, getFetcherValue } from '../Command';
import { storeAndSaveContract } from '../Networks';
import { getContract, getTestContract } from '../Contract';
import { UnderwriterAdmin } from '../Contract/UnderwriterAdmin';

const UnderwriterAdminContract = getContract('UnderwriterAdmin');
export interface UnderwriterAdminData {
  invokation: Invokation<UnderwriterAdmin>;
  name: string;
  contract: string;
  description: string;
}

export async function buildUnderwriterAdmin(
  world: World,
  from: string,
  event: Event
): Promise<{ world: World; underwriterAdminImpl: UnderwriterAdmin; underwriterAdminData: UnderwriterAdminData;  }> {
  const fetchers = [
    new Fetcher<{ governanceToken: AddressV }, UnderwriterAdminData>(
      `
        #### Standard

        * "Standard governanceToken:<String>" - The standard Comptroller contract
          * E.g. "UnderwriterAdmin Deploy Standard (Comp Address)"
      `,
      'Standard',
      [new Arg('governanceToken', getAddressV)],
      async (world, { governanceToken }) => {
        return {
          invokation: await UnderwriterAdminContract.deploy<UnderwriterAdmin>(world, from, [governanceToken.val]),
          name: "UnderwriterAdmin",
          contract: 'UnderwriterAdmin',
          description: 'Standard UnderwriterAdmin'
        };
      }
    ),
  ];

  let underwriterAdminData = await getFetcherValue<any, UnderwriterAdminData>(
    'DeployUnderwriterAdmin',
    fetchers,
    world,
    event
  );
  let invokation = underwriterAdminData.invokation;
  delete underwriterAdminData.invokation;

  if (invokation.error) {
    throw invokation.error;
  }
  const underwriterAdminImpl = invokation.value!;

  world = await storeAndSaveContract(world, underwriterAdminImpl, underwriterAdminData.name, invokation, [
    {
      index: ['UnderwriterAdmin', underwriterAdminData.name],
      data: {
        address: underwriterAdminImpl._address,
        contract: underwriterAdminData.contract,
        description: underwriterAdminData.description
      }
    }
  ]);

  return { world, underwriterAdminImpl, underwriterAdminData };
}
