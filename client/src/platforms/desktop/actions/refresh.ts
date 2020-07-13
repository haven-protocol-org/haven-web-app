import { selectIsOffshoreEnabled } from "shared/reducers/havenFeature";
import { DesktopAppState } from "platforms/desktop/reducers";
import { getWalletHeightRPC } from "../ipc/rpc/rpc";
import { getBalance } from "./balance";
import {
  getNodeInfo,
  getWalletHeight,
  getWalletHeightFailed,
  getWalletHeightSucceed,
} from "./chain";
import { gethavenNodeState } from "./havenNode";
import { getOffshoreBalance } from "./offshoreBalance";
import { getAddress } from "./subadresses";
import { getTransfers } from "./transferHistory";
import { getWalletRPCState } from "platforms/desktop/actions/walletRPC";
import { selectIsWalletSyncingRemote } from "platforms/desktop/reducers/walletRPC";
import {getExchangeRates} from "shared/actions/exchangeRates";

export const getDaemonsState = () => {
  return (dispatch: any) => {
    dispatch(gethavenNodeState());
    dispatch(getWalletRPCState());
  };
};

export const refresh = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    if (selectIsWalletSyncingRemote(getState())) {
      dispatch(getNodeInfo());

      if (!selectIsOffshoreEnabled(getState())){
          dispatch(getExchangeRates());
      }
      return;
    }

    getWalletHeightRPC()
      .then((res) => dispatch(getWalletHeightSucceed(res.height)))
      .catch((err) => {
        dispatch(getWalletHeightFailed(err));
      })
      // .then(() =>  refreshRPC())
      .then(() => dispatch(getAddress()))
      //.catch(() => dispatch(refreshFailed()))
      .then(() => dispatch(updateApp()));
  };
};

export const updateApp = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    //if we sync via remote node, wallet-rpc will be blocked
    if (selectIsWalletSyncingRemote(getState())) {
      dispatch(getNodeInfo());
      return;
    }

    dispatch(getDaemonsState());
    dispatch(getWalletHeight());
    dispatch(getBalance());
    dispatch(getTransfers());
    dispatch(getNodeInfo());

    if (selectIsOffshoreEnabled(getState())) {
      dispatch(getOffshoreBalance());
    }
  };
};
