import { getBalance } from "./balance";
import {getNodeInfo, getWalletHeight, getWalletHeightFailed, getWalletHeightSucceed} from "./chain";
import { getTransfers } from "./transferHistory";
import {getWalletHeightRPC} from "../ipc/rpc/rpc";
import { getOffshoreBalance } from "./offshoreBalance";
import { getDaemonStates } from "./daemonState";
import {OFFSHORE_ENABLED} from "constants/env";
import {DesktopAppState} from "platforms/desktop/reducers";
import {REFRESH_FAILED, REFRESH_SUCCEED, START_REFRESH} from "platforms/desktop/actions/types";
import {getOwnAddress} from "platforms/desktop/actions/walletSession";

export const refresh = () => {
  return (dispatch: any) => {

    dispatch(startRefresh());

    getWalletHeightRPC()
        .then(res => dispatch(getWalletHeightSucceed(res.height)))
        .catch(err => {
          dispatch(getWalletHeightFailed(err));
          dispatch(refreshFailed());
        })
        //. then(() =>  refreshRPC())
        .then(()=> dispatch(refreshSucceed()))
        .then(() => dispatch(getOwnAddress()))
        //.catch(() => dispatch(refreshFailed()))
        .then(() => dispatch(updateApp()));
  };
};

export const updateApp = () => {
  return (dispatch: any, getState:() => DesktopAppState) => {

    dispatch(getDaemonStates());
    dispatch(getNodeInfo());


    dispatch(getWalletHeight());
    dispatch(getBalance());
    dispatch(getTransfers());


    if (OFFSHORE_ENABLED) {

      dispatch(getOffshoreBalance());
    }
  };
};


const startRefresh = () => {
  return {type: START_REFRESH};
};

const refreshSucceed = () => {
  return {type: REFRESH_SUCCEED};
};


const refreshFailed = () => {
  return {type: REFRESH_FAILED};
};

