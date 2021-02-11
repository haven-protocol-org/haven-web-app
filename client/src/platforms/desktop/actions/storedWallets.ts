import { UPDATE_SAVED_WALLETS } from "./types";
import { requestSavedWalletsIPC } from "../ipc/misc";
import {  NET_TYPE_ID } from "constants/env";
import { logM } from "utility/utility";

export const getSavedWallets = () => {
  return (dispatch: any) => {
    requestSavedWalletsIPC(NET_TYPE_ID)
      .then((savedWallets: { wallets: string[]; storePath: string }) =>
        dispatch(updateSavedWallets(savedWallets))
      )
      .catch((err) => logM(err));
  };
};

const updateSavedWallets = (savedWallets: {
  wallets: string[];
  storePath: string;
}) => {
  return { type: UPDATE_SAVED_WALLETS, payload: savedWallets };
};
