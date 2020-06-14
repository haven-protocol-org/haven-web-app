import { OFFSHORE_ENABLED } from "constants/env";
import {
  REFRESH_FAILED,
  REFRESH_SUCCEED,
  START_REFRESH,
} from "platforms/desktop/actions/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import {getWalletHeightRPC, refreshRPC} from "../ipc/rpc/rpc";
import { getBalance } from "./balance";
import {
  getNodeInfo,
  getWalletHeight,
  getWalletHeightFailed,
  getWalletHeightSucceed,
} from "./chain";
import { getDaemonStates } from "./daemonState";
import { getOffshoreBalance } from "./offshoreBalance";
import { getAddress } from "./subadresses";
import { getTransfers } from "./transferHistory";

export const refresh = () => {
  return (dispatch: any) => {
    dispatch(startRefresh());

    getWalletHeightRPC()
      .then((res) => dispatch(getWalletHeightSucceed(res.height)))
      .catch((err) => {
        dispatch(getWalletHeightFailed(err));
        dispatch(refreshFailed());
      })
      .then(() =>  refreshRPC())
      .then(() => dispatch(refreshSucceed()))
      .then(() => dispatch(getAddress()))
      //.catch(() => dispatch(refreshFailed()))
      .then(() => dispatch(updateApp()));
  };
};

export const updateApp = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
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
  return { type: START_REFRESH };
};

const refreshSucceed = () => {
  return { type: REFRESH_SUCCEED };
};

const refreshFailed = () => {
  return { type: REFRESH_FAILED };
};
