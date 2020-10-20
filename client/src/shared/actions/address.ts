import { walletProxy } from "shared/core/proxy";
import { GET_ADDRESS_SUCCEED } from "./types";
import { AddressEntry } from "shared/reducers/address";

export const getPrimaryAddress = () => {
  return async (dispatch: any) => {
    const address = await walletProxy.getPrimaryAddress();

    console.log(address);

    const addressEntry: AddressEntry = {
      label: "Primary Address",
      address,
      address_index: 0,
      used: true,
    } as AddressEntry;

    dispatch(addAddress(addressEntry));

    return;
  };
};

const addAddress = (payload: any) => {
  return { type: GET_ADDRESS_SUCCEED, payload };
};
