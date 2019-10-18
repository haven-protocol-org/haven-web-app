import { UPDATE_CHAIN_DATA } from "../actions/types";

const INITIAL_STATE = {
  start_height: -1,
  scanned_block_Height: -1,
  blockchain_height: -1,
};

export const chain = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CHAIN_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

export const selectBlockchainHeight = state => {
  return state.chain.blockchain_height;
};

export const selectIsSyncing = (state) => {

  return state.chain.blockchain_height > state.chain.scanned_block_Height + 5;


};
