import { IOpenWallet, ICreateWallet } from "typings";
import { getNetworkByName, isDesktop, isWeb } from "constants/env";
import {
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_FAILED,
  OPEN_WALLET_SUCCEED,
  CREATE_WALLET_FAILED,
  CREATE_WALLET_SUCCEED,
  CREATE_WALLET_FETCHING,
  QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  START_WALLET_SESSION,
  STOP_WALLET_SESSION,
  GET_WALLET_HEIGHT_SUCCEED,
  CLOSE_WALLET_SESSION,
} from "./types";
import { walletProxy } from "../core/proxy";
import { addNotificationByMessage } from "./notification";
import { NotificationType } from "constants/notificationList";
import { getXHVBalance, getXUSDBalance } from "./balance";
import { webWalletConnection } from "platforms/web/nodes";
import { connectAppToDaemon as connectAppToDaemon } from "./havend";
import { updateHavenFeatures } from "./havenFeature";
import { Chain } from "shared/reducers/chain";
import { DesktopAppState, HavenAppState } from "platforms/desktop/reducers";
import { getAllTransfers } from "./transferHistory";
import {
  getWalletCacheByName,
  storeWalletInDB,
} from "platforms/web/actions/storage";
import { HavenWalletListener } from "shared/actions/walletListener";
import { selectStorePath } from "platforms/desktop/reducers/storedWallets";
import {
  initDesktopWalletListener,
  removeDesktopListener,
} from "platforms/desktop/ipc/wallet";
import { getAddresses } from "./address";
import { getLastBlockHeader } from "./blockHeaderExchangeRate";
import { refresh } from "./refresh";
import { setWebConfig } from "platforms/web/actions/config";
import { setDesktopConfig } from "platforms/desktop/actions/config";

/** collection of actions to open, create and store wallet */

/** used by browser */
export const openWalletByData = (
  keysData: Uint8Array,
  password: string,
  walletName: string
) => {
  return async (dispatch: any) => {
    const cacheData = await getWalletCacheByName(walletName);
    const walletData: IOpenWallet = {
      keysData,
      //@ts-ignore
      cacheData: new Uint8Array(cacheData),
      password,
      networkType: getNetworkByName(),
      server: webWalletConnection(),
    };
    dispatch(openWallet(walletData, walletName));
  };
};

/** used by nodejs env */
export const openWalletByFile = (filename: string, password: string) => {
  return (dispatch: any, getStore: () => DesktopAppState) => {
    const path = createStorePath(getStore, filename);

    const walletData: IOpenWallet = {
      path,
      password,
      networkType: getNetworkByName(),
      server: webWalletConnection(),
    };

    dispatch(openWallet(walletData, filename));
  };
};

const openWallet = (walletData: IOpenWallet, path: string) => {
  return async (dispatch: any) => {
    dispatch(openWalletFetching());

    const successOrError: boolean | object = await walletProxy.openWallet(
      walletData
    );

    if (successOrError === true) {
      dispatch(openWalletSucceed(path));
      dispatch(
        addNotificationByMessage(
          NotificationType.SUCCESS,
          "Vault was successfully unlocked"
        )
      );
      dispatch(startWalletSession(path));
    } else {
      addNotificationByMessage(
        NotificationType.ERROR,
        "Open vault is not working, please try again soon..."
      );
      dispatch(openWalletFailed(successOrError as object));
    }
  };
};

export const createNewWallet = (
  path: string | undefined,
  password: string,
  walletName: string
) => {
  return async (dispatch: any, getStore: () => HavenAppState) => {
    dispatch(createWalletFetch(walletName));

    let storePath = path;

    if (isDesktop()) {
      storePath = createStorePath(getStore as () => DesktopAppState, path);
    }

    const walletData: ICreateWallet = {
      path: storePath,
      password,
      server: webWalletConnection(),
      networkType: getNetworkByName(),
    };
    const successOrError: boolean | object = await walletProxy.createWallet(
      walletData
    );

    if (successOrError === true) {
      const mnemomic = await walletProxy.getMnemonic();
      dispatch(queryMnemonicForWalletGenerationSucceed(mnemomic));
      dispatch(createWalletSucceed());
      addNotificationByMessage(NotificationType.SUCCESS, "Vault is open");
    } else {
      addNotificationByMessage(
        NotificationType.ERROR,
        "Open vault is not working, please try again soon..."
      );
      dispatch(createWalletFailed(successOrError as object));
    }
  };
};

/**
 * restores/creates a wallet by seed, path is defined for nodejs-wallets and undefined for web wallets
 * @param path
 * @param mnemonic
 * @param password
 * @param walletName
 */
export const restoreWalletByMnemomic = (
  path: string | undefined,
  mnemonic: string,
  password: string,
  walletName: string | undefined
) => {
  return async (dispatch: any, getStore: () => HavenAppState) => {
    let storePath = path;

    if (isDesktop()) {
      storePath = createStorePath(getStore as () => DesktopAppState, path);
    }

    const walletData: ICreateWallet = {
      path: storePath,
      mnemonic,
      password,
      networkType: getNetworkByName(),
      server: webWalletConnection(),
    };

    dispatch(restoreWalletFetching(walletName));
    const successOrError: boolean | object = await walletProxy.createWallet(
      walletData
    );

    if (successOrError === true) {
      dispatch(restoreWalletSucceed(walletName));
      addNotificationByMessage(
        NotificationType.SUCCESS,
        "Restored vault with Mnemomic"
      );
    } else {
      addNotificationByMessage(
        NotificationType.ERROR,
        "Restore vault is not working, please try again soon..."
      );
      dispatch(restoreWalletFailed(successOrError));
    }
  };
};

export const restoreWalletByKeys = (
  path: string | undefined,
  primaryAddress: string,
  privateSpendKey: string,
  privateVieKey: string,
  password: string,
  walletName: string
) => {
  const walletData: ICreateWallet = {
    path,
    networkType: getNetworkByName(),
    server: webWalletConnection(),
    password,
  };

  return async (dispatch: any) => {
    dispatch(createWalletFetch(walletName));
    const successOrError: boolean | object = await walletProxy.createWallet(
      walletData
    );

    if (successOrError === true) {
      dispatch(restoreWalletSucceed(path));
      addNotificationByMessage(
        NotificationType.SUCCESS,
        "Restored vault with Keystore"
      );
    } else {
      addNotificationByMessage(
        NotificationType.ERROR,
        "Open vault is not working, please try again soon..."
      );
      dispatch(restoreWalletFailed(successOrError));
    }
  };
};

export const startWalletSession = (
  walletName: string | undefined = undefined
) => {
  return async (dispatch: any, getStore: () => HavenAppState) => {

    if (isWeb()) {
      dispatch(setWebConfig());
    } else {
      dispatch(setDesktopConfig());
    }


    // initialize own connection to daemon ( needed for fetching block headers )
    dispatch({ type: START_WALLET_SESSION, payload: walletName });
    dispatch(connectAppToDaemon());
    // fetch latest prices once at start
    dispatch(getLastBlockHeader());
    await dispatch(initReduxWallet());

    // start wallet listeners
    const listener = new HavenWalletListener(dispatch, getStore);
    if (isWeb()) {
      walletProxy.addWalletListener(listener);
    } else {
      walletProxy.addWalletListener();
      initDesktopWalletListener(listener);
    }
    walletProxy.syncWallet();

    //core.syncAtOnce(1);
  };
};

export const closeWallet = (isWeb: boolean) => {
  return async (dispatch: any, getState: () => HavenAppState) => {
    // closing wallet is handled differently for web and desktop

    dispatch({type: CLOSE_WALLET_SESSION})
    if (isWeb) {
      await dispatch(storeWalletInDB());
      await walletProxy.stopSyncing();
      await walletProxy.closeWallet(false);
    } else {
      await walletProxy.stopSyncing();
      await walletProxy.closeWallet(true);
      removeDesktopListener();
    }

    dispatch({ type: STOP_WALLET_SESSION });
  };
};

// init some basic data before wallet listener
// will be responsible for data updates
const initReduxWallet = () => {
  return async (dispatch: any) => {
    dispatch(getXHVBalance());
    dispatch(getXUSDBalance());
    dispatch(getAllTransfers());
    dispatch(getAddresses());
    dispatch(refresh());
    const chainHeight = await walletProxy.getChainHeight();
    const nodeHeight = await walletProxy.getNodeHeight();
    const walletHeight = await walletProxy.getWalletHeight();

    const chainHeights: Partial<Chain> = {
      walletHeight,
      nodeHeight,
      chainHeight,
    } as Partial<Chain>;

    dispatch(onWalletSyncUpdateSucceed(chainHeights));
    dispatch(updateHavenFeatures(nodeHeight));

    return;
  };
};

export const onWalletSyncUpdateSucceed = (heights: Partial<Chain>) => {
  return { type: GET_WALLET_HEIGHT_SUCCEED, payload: heights };
};

const openWalletFetching = () => {
  return { type: OPEN_WALLET_FETCHING };
};

const openWalletSucceed = (fileName: string) => {
  return { type: OPEN_WALLET_SUCCEED, payload: fileName };
};

const openWalletFailed = (error: object) => {
  return { type: OPEN_WALLET_FAILED, payload: error };
};

const createWalletFetch = (walletName: string) => ({
  type: CREATE_WALLET_FETCHING,
  payload: walletName,
});

const createWalletSucceed = () => ({
  type: CREATE_WALLET_SUCCEED,
});
const createWalletFailed = (error: object) => ({
  type: CREATE_WALLET_FAILED,
  payload: error,
});

const queryMnemonicForWalletGenerationSucceed = (key: string) => ({
  type: QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED,
  payload: key,
});


const restoreWalletFetching = (walletName: string | undefined) => ({
  type: RESTORE_WALLET_BY_SEED_FETCHING,
  payload: walletName,
});
const restoreWalletSucceed = (name: string | undefined) => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
  payload: name,
});
const restoreWalletFailed = (error: any) => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error,
});

export const rescanBlockchain = async () => {
  return walletProxy.rescanBlockchain();
};

const createStorePath = (
  getStore: () => DesktopAppState,
  filename: string | undefined
) => {
  if (filename === undefined) {
    return filename;
  }

  const storePath = selectStorePath(getStore());

  if (storePath) {
    return storePath + "/" + filename;
  }
  return filename;
};
