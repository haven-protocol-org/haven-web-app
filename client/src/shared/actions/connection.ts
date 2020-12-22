import { havendProxy, walletProxy } from "shared/core/proxy";
import { SET_APP_TO_DAEMON_CONNECTION_STATE, SET_WALLET_CONNECTION_STATE } from "./types";


export const getWalletConnectionState = () => {
  return async (dispatch: any) => {
    const isWalletConnected: boolean = await walletProxy.isWalletConnected();
    dispatch(setWalletConnectionState(isWalletConnected));
  };
};

export const getAppConnectionState = () => {
    return async (dispatch: any) => {
        const isAppConnected: boolean = await havendProxy.isConnected();
        dispatch(setApptoDaemonConnectionState(isAppConnected));
    }
}

 const setWalletConnectionState = (isConnected: boolean) => {
  return { type: SET_WALLET_CONNECTION_STATE, payload: isConnected };
};


const setApptoDaemonConnectionState = (isConnected: boolean) => {
    return { type: SET_APP_TO_DAEMON_CONNECTION_STATE, payload: isConnected };
 }