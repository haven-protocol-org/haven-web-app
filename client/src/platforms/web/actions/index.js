import {
  ADD_PUB_ADDRESS,
  UPDATE_CHAIN_DATA
} from "../../../shared/actions/types";

export * from "./account";
export * from "./balance";
export * from "./key";
export * from "./transferHistory";
export * from "./sendFunds";
export * from "./xhvVsCurrencies";

export const addPubAddress = address => ({
  type: ADD_PUB_ADDRESS,
  payload: address
});
export const updateChainData = ({
  start_height,
  scanned_block_height,
  blockchain_height,
  scanned_block_timestamp
}) => {
  return {
    type: UPDATE_CHAIN_DATA,
    payload: {
      start_height,
      scanned_block_height,
      blockchain_height,
      scanned_block_timestamp
    }
  };
};
