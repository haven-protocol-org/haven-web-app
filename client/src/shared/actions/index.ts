import { GET_ADDRESS_SUCCEED } from "./types";
import { AddressEntry } from "../reducers/address";

export * from "./prices";
export * from "./theme";

export const getAddressSucceed = (payload: AddressEntry[]) => ({
  type: GET_ADDRESS_SUCCEED,
  payload,
});
