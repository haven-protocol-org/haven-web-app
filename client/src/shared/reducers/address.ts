import {GET_ADDRESS_SUCCEED} from "shared/actions/types";
import {DesktopAppState} from "platforms/desktop/reducers";
import {WebAppState} from "platforms/web/reducers";

export type AddressEntry = {
  label: string;
  used: boolean;
  address: string;
  address_index: number;
};

const INITIAL_STATE: AddressEntry[] = [];

export default function (state = INITIAL_STATE, action: any): AddressEntry[] {
  switch (action.type) {
    case GET_ADDRESS_SUCCEED:
      return action.payload;
    default:
      return state;
  }
}


export const selectPrimaryAddress = (adresses: AddressEntry[]): string => {

    const primaryAddress = adresses.find((addressEntry) => addressEntry.address_index === 0);

    return primaryAddress!.address

};
