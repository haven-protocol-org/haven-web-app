import { IOpenWallet, ICreateWallet } from "typings";
import { getNetworkByName } from "constants/env";
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
} from "platforms/desktop/actions/types";
import {
  createWallet as createWalletCore,
  openWallet as openWalletCore,
  getMnemonic,
  addWalletListener,
  syncWallet,
  getNodeHeight,
  isWalletConnected,
  getWalletHeight,
  getChainHeight,
  syncAtOnce,
} from "../core/wallet";
import { addNotificationByMessage } from "./notification";
import { NotificationType } from "constants/notificationList";
import { getXHVBalance, getXUSDBalance } from "./balance";
import { getPrimaryAddress } from "./address";
import { webWalletConnection } from "platforms/web/nodes";
import { createDaemonConnection } from "./havend";
import { updateHavenFeatures } from "./havenFeature";
import { SET_WALLET_CONNECTION_STATE } from "./types";
import { Chain } from "shared/reducers/chain";
import { onWalletSyncUpdateSucceed } from "./chain";
import { HavenAppState } from "platforms/desktop/reducers";
import { getAllTransfers } from "./transferHistory";
import { getWalletCacheByName } from "platforms/web/actions/storage";

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
export const openWalletByFile = (path: string, password: string) => {
  const walletData: IOpenWallet = {
    path,
    password,
    networkType: getNetworkByName(),
    server: webWalletConnection(),
  };

  return (dispatch: any) => {
    dispatch(openWallet(walletData, path));
  };
};

const openWallet = (walletData: IOpenWallet, path: string) => {
  return async (dispatch: any) => {
    dispatch(openWalletFetching());

    const successOrError: boolean | object = await openWalletCore(walletData);

    if (successOrError === true) {
      dispatch(openWalletSucceed(path));
      dispatch(
        addNotificationByMessage(NotificationType.SUCCESS, "Vault is open")
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
  const walletData: ICreateWallet = {
    path,
    password,
    server: webWalletConnection(),
    networkType: getNetworkByName(),
  };

  return async (dispatch: any) => {
    dispatch(createWalletFetch(walletName));
    const successOrError: boolean | object = await createWalletCore(walletData);

    if (successOrError === true) {
      const mnemomic = await getMnemonic();
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
  const walletData: ICreateWallet = {
    path,
    mnemonic,
    password,
    networkType: getNetworkByName(),
    server: webWalletConnection(),
  };

  return async (dispatch: any) => {
    dispatch(restoreWalletFetching());
    const successOrError: boolean | object = await createWalletCore(walletData);

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
    const successOrError: boolean | object = await createWalletCore(walletData);

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
    // initialize own connection to daemon ( needed for fetching block headers )
    dispatch({ type: START_WALLET_SESSION, payload: walletName });
    dispatch(createDaemonConnection());

    await dispatch(initReduxWallet());

    // start wallet listeners
    addWalletListener(dispatch, getStore);
    //syncWallet();
    syncAtOnce(1);
  };
};

// init some basic data before wallet listener
// will be responsible for data updates
const initReduxWallet = () => {
  return async (dispatch: any) => {
    dispatch(getXHVBalance());
    dispatch(getXUSDBalance());
    dispatch(getAllTransfers());
    dispatch(getPrimaryAddress());
    const isConnected = await isWalletConnected();
    dispatch(setWalletConnectionState(isConnected));
    const chainHeight = await getChainHeight();
    const nodeHeight = await getNodeHeight();
    const walletHeight = await getWalletHeight();

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

const setWalletConnectionState = (isConnected: boolean) => {
  return { type: SET_WALLET_CONNECTION_STATE, payload: isConnected };
};

const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = (name: string | undefined) => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
  payload: name,
});
const restoreWalletFailed = (error: any) => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error,
});
