import {
  CLOSE_WALLET,
  VALIDATE_MNEMONIC_FAILED,
  ACCOUNT_CREATED,
  ACCOUNT_CREATION_FAILED,
  ACCOUNT_CREATION_REQUESTED
} from "./types";

import { keysGeneratedFailed, keysGeneratedSucceed } from "./key";
import { core } from "../declarations/open_monero.service";
import { addPubAddress, getTransfers } from "./index";
import { login } from "../api/api";
import { NET_TYPE_ID } from "../constants/env";

export const closeWallet = () => {
  return { type: CLOSE_WALLET };
};

export const refresh = () => {
  return dispatch => {
    dispatch(getTransfers());
  };
};

export const restoreWallet = (seed) => {

  let keys = null;

  return async (dispatch) => {
    dispatch(accountCreationRequested());

    try {
      const lWallet = await core.monero_utils_promise
        keys = lWallet.seed_and_keys_from_mnemonic(seed, NET_TYPE_ID);
        keys.mnemonic_string = seed;
        seed = null;
        dispatch(keysGeneratedSucceed(keys));
        dispatch(addPubAddress(keys.address_string));
    } catch (e) {
      dispatch(keysGeneratedFailed(e));
      dispatch(accountCreationFailed(e));
      return;
    }
    dispatch(loginBE(keys.address_string, keys.sec_viewKey_string, false));
  };
};

const loginBE = (address, viewKey, generatedLocally) => {
  return dispatch => {
    login(address, viewKey, generatedLocally)
      .then(res => dispatch(accountCreated(res)))
      .catch(err => dispatch(accountCreationFailed(err)));
  };
};

const accountCreationRequested = () => ({ type: ACCOUNT_CREATION_REQUESTED });
const accountCreated = accountData => ({
  type: ACCOUNT_CREATED,
  payload: accountData
});
const accountCreationFailed = error => ({
  type: ACCOUNT_CREATION_FAILED,
  payload: error
});

export const createWallet = () => {
  return dispatch => {
    core.monero_utils_promise.then(bridge => {
      const newWallet = bridge.newly_created_wallet("english", NET_TYPE_ID);
      dispatch(addPubAddress(newWallet.address_string));
      delete newWallet.adress_string;
      dispatch(keysGeneratedSucceed(newWallet));
    });
  };
};

export const mnenomicVerificationSucceed = () => {
  return (dispatch, getState) => {
    const viewKey = getState().keys.sec_viewKey_string;
    const address = getState().address.main;

    dispatch(accountCreationRequested());
    dispatch(loginBE(address, viewKey, true));
  };
};
export const mneomicVerifcationFailed = () => ({
  type: VALIDATE_MNEMONIC_FAILED
});
