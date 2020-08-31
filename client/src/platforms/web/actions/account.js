import {
  ACCOUNT_CREATED,
  ACCOUNT_CREATION_FAILED,
  ACCOUNT_CREATION_REQUESTED,
  KEEP_ALIVE,
} from "./types";

import { VALIDATE_MNEMONIC_FAILED } from "../../../shared/actions/types";

import { keysGeneratedFailed, keysGeneratedSucceed } from "./key";
import { core } from "../declarations/haven_core";
import { NET_TYPE_ID } from "../../../constants/env";
import { selectCredentials } from "../reducers/account";
import { createAddressEntry } from ".";
import {selectPrimaryAddress} from "../../../shared/reducers/address";

export const keepAlive = () => {
  return (dispatch, getState) => {
    dispatch({ type: KEEP_ALIVE });
  };
};

export const restoreWallet = (seed) => {
  let keys = null;

  return async (dispatch) => {
   // dispatch(accountCreationRequested());
    const lWallet = await core;
    console.log(lWallet);

  };
};

const loginBE = (address, viewKey, generatedLocally) => {

};

const accountCreationRequested = () => ({ type: ACCOUNT_CREATION_REQUESTED });
const accountCreated = (accountData) => ({
  type: ACCOUNT_CREATED,
  payload: accountData,
});
const accountCreationFailed = (error) => ({
  type: ACCOUNT_CREATION_FAILED,
  payload: error,
});

export const createWallet = () => {



  return async (dispatch) => {


    const lWallet = await core.createWallet({
      path: "sample_wallet_wasm",
      password: "supersecretpassword123",
      networkType: "stagenet"
    });

    const balance = await lWallet.getBalance();
    console.log(balance);
    const seed = await lWallet.getMnemonic();
    console.log(seed);
    const unlockedBalance = await lWallet.getOffshoreBalance();
    console.log(unlockedBalance);


    console.log('done');
    console.log(lWallet);

     dispatch(accountCreationRequested());
   };
  


};

export const mnenomicVerificationSucceed = () => {

};
export const mneomicVerifcationFailed = () => ({
  type: VALIDATE_MNEMONIC_FAILED,
});
