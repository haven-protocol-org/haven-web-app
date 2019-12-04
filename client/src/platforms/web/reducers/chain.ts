import { UPDATE_CHAIN_DATA } from "../../../shared/actions/types";
import {SyncState} from "../../../shared/types/types";
import {AnyAction} from "redux";

const INITIAL_STATE = {
  start_height: -1,
  scanned_block_Height: -1,
  blockchain_height: -1,
  scanned_block_timestamp: -1
};

export const chain = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_CHAIN_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

export const selectBlockchainHeight = (state:any) => {
  return state.chain.blockchain_height;
};

export const selectWebSyncState = (state: any): SyncState => {

  const isSyncing =  state.chain.blockchain_height > state.chain.scanned_block_height + 5;
  const blockHeight = state.chain.blockchain_height;
  const scannedHeight = state.chain.scanned_block_height;
  const scannedDate = new Date(state.chain.scanned_block_timestamp * 1000);

  return {isSyncing, blockHeight, scannedHeight, scannedDate}


};
