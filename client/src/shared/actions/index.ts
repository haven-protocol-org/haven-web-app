import { CLOSE_WALLET, GET_ADDRESS_SUCCEED } from "./types";
import { AddressEntry } from "../reducers/address";

export * from "./prices";
export * from "./theme";
export * from "./forex";

export const getAddressSucceed = (payload: AddressEntry[]) => ({
  type: GET_ADDRESS_SUCCEED,
  payload,
});

// TODO close core wallet
export const closeWallet = () => {
  return { type: CLOSE_WALLET };
};
