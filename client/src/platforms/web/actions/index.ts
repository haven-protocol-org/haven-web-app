import {AddressEntry} from "shared/reducers/address";
import {getAddressSucceed} from "shared/actions";
import {UPDATE_CHAIN_DATA} from "platforms/web/actions/types";

export * from "./account";
export * from "./balance";
export * from "./key";
export * from "./transferHistory";
export * from "./sendFunds";
export * from "./xhvVsCurrencies";
export * from "./exchangeRates";

export const createAddressEntry = (address: string) => {

  return (dispatch: any) => {
    /** create same entry like in desktop version, to unify address entrys */
    const addressEntry: AddressEntry = {
      address,
      address_index: 0,
      label: 'Primary Account',
      used: true,

    };

  dispatch(getAddressSucceed([addressEntry]));
  }

};


export const updateChainData = ({
  start_height,
  scanned_block_height,
  blockchain_height,
  scanned_block_timestamp
}:any) => {
  return {
    type: UPDATE_CHAIN_DATA,
    payload: {
      start_height,
      scanned_block_height,
      blockchain_height,
      scanned_block_timestamp
    }
  };
};
