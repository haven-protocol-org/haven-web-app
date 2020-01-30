import {
  GET_BLOCK_HEIGHT_SUCCEED,
  GET_BLOCK_INFO_SUCEED,
  REFRESH_FAILED,
  REFRESH_SUCCEED,
  START_REFRESH
} from "../actions/types";
import { AnyAction } from "redux";
import { SyncState } from "shared/types/types";
import {DesktopAppState} from "platforms/desktop/reducers/index";

interface Chain {
  walletHeight: number;
  nodeHeight: number;
  chainHeight: number;
  isRefreshing: boolean;
}

const INITIAL_STATE: Chain = { walletHeight: 0, chainHeight: 0, nodeHeight: 0, isRefreshing: false };

export const chain = (state = INITIAL_STATE, action: AnyAction): Chain => {
  switch (action.type) {
    case GET_BLOCK_INFO_SUCEED:
    case GET_BLOCK_HEIGHT_SUCCEED:
      return { ...state, ...action.payload };
    case START_REFRESH:
    return {...state, isRefreshing:true};
    case REFRESH_FAILED:
    case REFRESH_SUCCEED:
    return {...state, isRefreshing: false};
    default:
      return state;
  }
};

export const selectBlockHeight = (state: DesktopAppState) => {
  return state.chain.chainHeight;
};

export const selectNodeHeight = (state: DesktopAppState) => {
  return state.chain.nodeHeight;
};

export const selectDesktopSyncState = (state: DesktopAppState): SyncState => {
  const isSyncing = state.chain.chainHeight > state.chain.walletHeight + 1;
  const blockHeight = state.chain.chainHeight;
  const scannedHeight = state.chain.walletHeight;

  return { isSyncing, blockHeight, scannedHeight };
};

export const selectWalletHeight = (state: DesktopAppState) => {
  return state.chain.walletHeight;
};

export const isRefreshing = (state: DesktopAppState) => {
  return state.chain.isRefreshing;
};


export const isWalletSynced = (state: DesktopAppState): boolean => {

  if (state.chain.walletHeight === 0) {
    return false;
  }

  // give it a little tolerance, if we are almost synced we just ignore that
  return state.chain.walletHeight >= state.chain.nodeHeight -5;

};
