import { UPDATE_SAVED_WALLETS } from "./types";
import { requestSavedWalletsIPC } from "../ipc/misc";

export const getSavedWallets = () => {
  return (dispatch: any) => {
    requestSavedWalletsIPC()
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
