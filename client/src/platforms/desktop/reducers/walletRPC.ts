import {AnyAction} from "redux";
import {
  GET_WALLET_RPC_STATE_SUCCEED,
  SET_NODE_FOR_WALLET_FAILED,
  SET_NODE_FOR_WALLET_REQUESTED,
  SET_NODE_FOR_WALLET_SUCCESS,
} from "platforms/desktop/actions/types";
import {WalletState} from "platforms/desktop/ipc/ipc-types";
import {DesktopAppState} from "platforms/desktop/reducers/index";
import {selectisLocalNode} from "platforms/desktop/reducers/havenNode";
import {ThreeState} from "shared/types/types";


interface WalletRPC extends WalletState {
  isSwitchingNode: boolean,
}

const INITAL_STATE: WalletRPC = {
  isConnectedToDaemon: ThreeState.Unset,
  isSyncing: false,
  syncHeight: 0,
  isRunning: true,
  isReachable: false,
  isSwitchingNode: false,
};

export const walletRPC = (
  state = INITAL_STATE,
  action: AnyAction
): WalletRPC => {
  switch (action.type) {
    case GET_WALLET_RPC_STATE_SUCCEED:
      return { ...action.payload };
    case SET_NODE_FOR_WALLET_SUCCESS:
      return { ...state, isConnectedToDaemon: ThreeState.Unset, isSyncing: false, isSwitchingNode: false };
    case SET_NODE_FOR_WALLET_FAILED:
      return { ...state, isSwitchingNode: false };
    case SET_NODE_FOR_WALLET_REQUESTED:
      return { ...state, isSwitchingNode: true };
    default:
      return state;
  }
};

export const selectIsWalletSyncingRemote = (state: DesktopAppState) => {
  const isRemote = !selectisLocalNode(state.havenNode);
  const isSyncing = state.walletRPC.isSyncing;
  return isRemote && isSyncing;
};
