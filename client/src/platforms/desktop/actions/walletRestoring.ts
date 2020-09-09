import {
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED,
} from "./types";
import { restoreWalletRPC } from "../ipc/rpc/rpc";
import { AddressEntry } from "shared/reducers/address";
import { getAddressSucceed } from "shared/actions";

export const restoreWallet = (seed: string, filename: string, password: string) => {
  return (dispatch: any) => {
    // check if user submitted privKey
    if (seed.length === 64) {
      //  seed = mnemonic.mn_encode(seed);
    }

    const params = { seed, filename, password };

    dispatch(restoreWalletFetching());
    restoreWalletRPC(params)
      .then((result) => {
        dispatch(restoreWalletSucceed(filename));
        dispatch(createAddressEntry(result.address));
      })
      .catch((error) => {
        console.log(error);
        dispatch(restoreWalletFailed(error));
      });
  };
};

const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = (result: any) => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
  payload: result,
});
const restoreWalletFailed = (error: any) => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error,
});


 const createAddressEntry = (address: string) => {

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