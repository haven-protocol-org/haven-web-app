import { HavenAppState } from "platforms/desktop/reducers";
import { GET_ADDRESS_SUCCEED } from "shared/actions/types";

export type AddressEntry = {
  label: string;
  used: boolean;
  address: string;
  index: number;
};

const INITIAL_STATE: AddressEntry[] = [];

export default function (state = INITIAL_STATE, action: any): AddressEntry[] {
  switch (action.type) {
    case GET_ADDRESS_SUCCEED:
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export const selectPrimaryAddress = (adresses: AddressEntry[]): string => {
  const primaryAddress = adresses.find(
    (addressEntry) => addressEntry.index === 0
  );

  return primaryAddress!.address;
};

export const selectAddressCount = (state: HavenAppState) =>
  state.address.length;

export const selectAddressByIndex = (
  address: AddressEntry[],
  addIndex: number
) => {
  const addressEntry = address.find(
    (entry: AddressEntry) => entry.index === addIndex
  );

  return addressEntry;
};
