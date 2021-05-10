import { walletProxy } from "shared/core/proxy";
import { GET_ADDRESS_FAILED, GET_ADDRESS_SUCCEED, SET_SELECTED_ADDRESS } from "./types";
import { AddressEntry } from "shared/reducers/address";
import { addErrorNotification } from "./notification";
import MoneroSubaddress from "haven-wallet-core/src/main/js/wallet/model/MoneroSubaddress";
import { saveWallet } from "./walletSession";

export const getAddresses = () => {
  return (dispatch: any) => {
    walletProxy
      .getSubAddresses()
      .then((rawAddresses: MoneroSubaddress[]) => {
        const adressEntrys: AddressEntry[] = rawAddresses.map(parseAddress);
        dispatch(getAddressSucceed(adressEntrys));
      })
      .catch((e) => {
        addErrorNotification(e);
        dispatch(getAddressFailed());
      
      });
  };
};

export const createAddress = (label: string) => {
  return (dispatch: any) => {
    walletProxy
      .createSubAddress(label)
      .then((moneroAddress: MoneroSubaddress) => {
        dispatch(getAddressSucceed([parseAddress(moneroAddress)]))
        dispatch(saveWallet())
      }
      )
      .catch((e: any) => addErrorNotification(e));
  };
};

export const getAddressSucceed = (payload: AddressEntry[]) => ({
  type: GET_ADDRESS_SUCCEED,
  payload,
});

export const getAddressFailed = () => ({
  type: GET_ADDRESS_FAILED
});

const parseAddress = (moneroAddress: MoneroSubaddress): AddressEntry => ({
  index: moneroAddress.getIndex(),
  label: moneroAddress.getLabel(),
  address: moneroAddress.getAddress(),
  used: moneroAddress.isUsed(),
});

export const setSelectedAddress = (selectedAddressIndex: number) => {
  return (dispatch: any) => {
    dispatch({ type: SET_SELECTED_ADDRESS, payload: selectedAddressIndex });
  };
};
