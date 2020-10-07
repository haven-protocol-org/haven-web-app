import { HavenAppState } from "platforms/desktop/reducers";
import { storeWalletInDB } from "platforms/web/actions/storage";
import { closeWallet as closeWalletCore, stopSyncing } from "../core/wallet";
import { STOP_WALLET_SESSION } from "platforms/desktop/actions/types";

export const closeWallet = (isWeb: boolean) => {
  return async (dispatch: any, getState: () => HavenAppState) => {
    // closing wallet is handled differently for web and desktop
    if (isWeb) {
      // if its a temporary wallet ( just login via seed ) we don't store the wallet in any way
      const activeWallet = getState().walletSession.activeWallet;

      if (activeWallet !== undefined) {
        await storeWalletInDB(activeWallet);
      }
      await stopSyncing();
      await closeWalletCore(false);
    } else {
      await closeWalletCore(true);
    }

    dispatch({ type: STOP_WALLET_SESSION });
  };
};
