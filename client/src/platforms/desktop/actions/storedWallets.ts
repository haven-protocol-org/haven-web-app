import { UPDATE_SAVED_WALLETS } from "./types";
import { requestSavedWalletsIPC } from "../ipc/misc";
import {  NET_TYPE_ID } from "constants/env";

export const getSavedWallets = () => {
  return (dispatch: any) => {
    requestSavedWalletsIPC(NET_TYPE_ID)
      .then((savedWallets: { wallets: string[]; storePath: string }) =>
        dispatch(updateSavedWallets(savedWallets))
      )
      .catch((err) => console.log(err));
  };
};

const updateSavedWallets = (savedWallets: {
  wallets: string[];
  storePath: string;
}) => {
  return { type: UPDATE_SAVED_WALLETS, payload: savedWallets };
};
