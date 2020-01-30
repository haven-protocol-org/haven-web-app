import { ADD_PUB_ADDRESS, CLOSE_WALLET } from "./types";

export * from "./prices";
export * from "./theme";
export * from "./forex";

export const addPubAddress = address => ({
  type: ADD_PUB_ADDRESS,
  payload: address
});

export const closeWallet = () => {
  return { type: CLOSE_WALLET };
};
