import {
  ACCOUNT_CREATED,
  ACCOUNT_CREATION_FAILED,
  ACCOUNT_CREATION_REQUESTED,
  KEEP_ALIVE
} from "./types";

import { VALIDATE_MNEMONIC_FAILED } from "../../../shared/actions/types";

import { keysGeneratedFailed, keysGeneratedSucceed } from "./key";
import { core } from "../declarations/open_monero.service";
import { addPubAddress } from "../../../shared/actions";
import { login, ping } from "../api/api";
import { NET_TYPE_ID } from "../../../constants/env";
import { selectCredentials } from "../reducers/account";

export const keepAlive = () => {
  return (dispatch, getState) => {
    ping(selectCredentials(getState()));
    dispatch({ type: KEEP_ALIVE });
  };
};

export const restoreWallet = seed => {
  let keys = null;

  return async dispatch => {
    dispatch(accountCreationRequested());
    const lWallet = await core.monero_utils_promise;
    // check if user submitted privKey

    try {
      if (seed.length === 64) {
        keys = lWallet.address_and_keys_from_seed(seed, NET_TYPE_ID);
        keys.mnemonic_string = lWallet.mnemonic_from_seed(seed, "English");
      } else {
        keys = lWallet.seed_and_keys_from_mnemonic(seed, NET_TYPE_ID);
        keys.mnemonic_string = seed;
      }

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
