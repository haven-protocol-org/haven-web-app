import { UPDATE_SAVED_WALLETS } from "./types";
import { requestSavedWalletsIPC } from "../ipc/misc";

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
