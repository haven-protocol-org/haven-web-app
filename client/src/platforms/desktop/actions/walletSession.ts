import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_SUCCEED,
  UPDATE_SAVED_WALLETS,
} from "./types";
import { closeWalletRPC, openWalletRPC, storeWalletRPC } from "../ipc/rpc/rpc";
import { CLOSE_WALLET } from "shared/actions/types";
import { requestSavedWalletsIPC } from "../ipc/misc";
import { addErrorNotification } from "shared/actions/notification";
import { isDevMode } from "constants/env";

export const closeWallet = () => {
  return (dispatch: any) => {
    /*
    if (isDevMode()) {
      storeWalletRPC()
          .catch((e) => addErrorNotification("wallet state could not be stored"))
          .then( () =>  closeWalletRPC())
          .catch((err) => dispatch(addErrorNotification('wallet is busy, you cannot logout in the moment')))
          .finally((() => dispatch(closeWalletSucceed())));

      return;
    }
    */

    storeWalletRPC()
      .catch((e) => {
        dispatch(
          addErrorNotification(
            "Vault is busy, and can't logout right now. Please wait a moment."
          )
        );
        return true;
      })
      .then(() => closeWalletRPC())
      .then(() => dispatch(closeWalletSucceed()))
      .catch((err) =>
        dispatch(
          addErrorNotification(
            "Vault is busy, and can't logout right now. Please wait a moment."
          )
        )
      );
  };
};

const closeWalletSucceed = () => {
  return { type: CLOSE_WALLET };
};

export const getSavedWallets = () => {
  return (dispatch: any) => {
    requestSavedWalletsIPC()
      .then((wallets: string[]) => dispatch(updateSavedWallets(wallets)))
      .catch((err) => console.log(err));
  };
};

const updateSavedWallets = (savedWallets: string[]) => {
  return { type: UPDATE_SAVED_WALLETS, payload: savedWallets };
};

export const openWallet = (filename: string, password: string) => {
  const params = { filename, password };

  return (dispatch: any) => {
    dispatch(openWalletFetching());

    openWalletRPC(params)
      .then(() => dispatch(openWalletSucceed(filename)))
      .catch((error: any) => dispatch(openWalletFailed(error)));
  };
};

const openWalletSucceed = (fileName: string) => {
  return { type: OPEN_WALLET_SUCCEED, payload: fileName };
};

const openWalletFailed = (error: object) => {
  return { type: OPEN_WALLET_FAILED, payload: error };
};

const openWalletFetching = () => {
  return { type: OPEN_WALLET_FETCHING };
};
