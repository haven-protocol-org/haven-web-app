import { isWeb } from "constants/env";
import { initDesktopWalletListener, removeDesktopListener } from "platforms/desktop/ipc/wallet";
import { HavenAppState } from "platforms/desktop/reducers";
import { setWebConfig } from "platforms/web/actions/config";
import { storeWalletInDB } from "platforms/web/actions/storage";
import { walletProxy } from "shared/core/proxy";
import { Chain } from "shared/reducers/chain";
import { getAddresses } from "./address";
import { getXHVBalance, getXUSDBalance } from "./balance";
import { getLastBlockHeader } from "./blockHeaderExchangeRate";
import { connectAppToDaemon } from "./havend";
import { updateHavenFeatures } from "./havenFeature";
import { refresh } from "./refresh";
import { getAllTransfers } from "./transferHistory";
import { CLOSE_WALLET_SESSION, START_WALLET_SESSION, STOP_WALLET_SESSION } from "./types";
import { onWalletSyncUpdateSucceed } from "./walletCreation";
import { HavenWalletListener } from "./walletListener";

export const startWalletSession = (
    walletName: string | undefined = undefined
  ) => {
    return async (dispatch: any, getStore: () => HavenAppState) => {
  
      if (isWeb()) {
        dispatch(setWebConfig());
      } 
  
  
      // initialize own connection to daemon ( needed for fetching block headers )
      dispatch({ type: START_WALLET_SESSION, payload: walletName });
      dispatch(connectAppToDaemon());
      // fetch latest prices once at start
      dispatch(getLastBlockHeader());

  
      // start wallet listeners
      const listener = new HavenWalletListener(dispatch, getStore);
      if (isWeb()) {
        walletProxy.addWalletListener(listener);
      } else {
        walletProxy.addWalletListener();
        initDesktopWalletListener(listener);
      }

      await dispatch(initWallet());
      walletProxy.syncWallet();
  
    };
  };



  export const initChainData = () => {

    return async(dispatch: any) => {

    const chainHeight = await walletProxy.getChainHeight();
    const nodeHeight = await walletProxy.getNodeHeight();
    const walletHeight = await walletProxy.getWalletHeight();
    const chainHeights: Partial<Chain> = {
      walletHeight,
      nodeHeight,
      chainHeight: chainHeight < nodeHeight? nodeHeight : chainHeight,
    } as Partial<Chain>;

    dispatch(onWalletSyncUpdateSucceed(chainHeights));
    dispatch(updateHavenFeatures(nodeHeight));
    }

  }
  
  // init some basic data before wallet listener
  // will be responsible for data updates
  export const initWallet = () => {
    return async (dispatch: any) => {
      dispatch(getXHVBalance());
      dispatch(getXUSDBalance());
      dispatch(getAllTransfers());
      dispatch(getAddresses());
      dispatch(refresh());
 
      dispatch(initChainData());
  
      return;
    };
  };


  export const closeWallet = (isWeb: boolean) => {
    return async (dispatch: any, getState: () => HavenAppState) => {
      // closing wallet is handled differently for web and desktop
  
      dispatch({type: CLOSE_WALLET_SESSION})
      if (isWeb) {
        await walletProxy.stopSyncing();
        await dispatch(storeWalletInDB());
        await walletProxy.closeWallet(false);
      } else {
        await walletProxy.stopSyncing();
        await walletProxy.closeWallet(true);
        removeDesktopListener();
      }
  
      dispatch({ type: STOP_WALLET_SESSION });
    };
  };


  export const saveWallet = () => {

    return (dispatch: any) => {

        if (isWeb()) {
            dispatch(storeWalletInDB());
        }else {
            walletProxy.saveWallet();
        }
    }
  }