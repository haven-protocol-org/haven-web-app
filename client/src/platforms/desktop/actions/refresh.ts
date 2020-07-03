import { OFFSHORE_ENABLED } from "constants/env";
import { DesktopAppState } from "platforms/desktop/reducers";
import {getWalletHeightRPC, refreshRPC} from "../ipc/rpc/rpc";
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
import {getWalletRPCState} from "platforms/desktop/actions/walletRPC";
import {selectIsWalletSyncingRemote} from "platforms/desktop/reducers/walletRPC";



export const getDaemonsState = () => {

  return (dispatch: any) => {
    dispatch(gethavenNodeState());
    dispatch(getWalletRPCState());
  }


};

export const refresh = () => {
  return (dispatch: any, getState:() => DesktopAppState) => {


    if (selectIsWalletSyncingRemote(getState())) {


      dispatch(getDaemonsState());
      dispatch(getNodeInfo());
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

      dispatch(getDaemonsState());
      dispatch(getNodeInfo());

    } else {

      dispatch(getDaemonsState());
      dispatch(getWalletHeight());
      dispatch(getBalance());
      dispatch(getTransfers());
      dispatch(getNodeInfo());

      if (OFFSHORE_ENABLED) {
        dispatch(getOffshoreBalance());
      }

    }



  };
};
