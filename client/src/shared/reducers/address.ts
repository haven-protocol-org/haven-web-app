import { HavenAppState } from "platforms/desktop/reducers";
import { bindActionCreators, combineReducers } from "redux";
import {
  GET_ADDRESS_SUCCEED,
  SET_SELECTED_ADDRESS,
} from "shared/actions/types";

export type AddressEntry = {
  label: string;
  used: boolean;
  address: string;
  index: number;
};

const INITIAL_STATE: AddressEntry[] = [];

const entrys = (state = INITIAL_STATE, action: any): AddressEntry[] => {
  switch (action.type) {
    case GET_ADDRESS_SUCCEED:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const selected = (state = 0, action: any): number => {
  switch (action.type) {
    case SET_SELECTED_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

export const address = combineReducers({ selected, entrys });

export const selectPrimaryAddress = (adresses: AddressEntry[]): string => {
  const primaryAddress = adresses.find(
    (addressEntry) => addressEntry.index === 0
  );

  return primaryAddress!.address;
};

export const selectAddressCount = (state: HavenAppState) =>
  state.address.entrys.length;

export const selectAddressByIndex = (
  address: AddressEntry[],
  addIndex: number
) => {
  const addressEntry = address.find(
    (entry: AddressEntry) => entry.index === addIndex
  );

  return addressEntry;
};

export const selectSelectedAddress = (state: HavenAppState) => {
  const selectedAddressIndex = state.address.selected;
  return selectAddressByIndex(state.address.entrys, selectedAddressIndex);
};
