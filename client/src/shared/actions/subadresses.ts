import { walletProxy } from "shared/core/proxy";
import { addErrorNotification } from "shared/actions/notification";
import { getAddressSucceed } from ".";

export const getAddress = () => {
  return (dispatch: any) => {
    walletProxy
      .getSubAddresses()
      .then((res: any) => dispatch(getAddressSucceed(res.addresses)))
      .catch((e) => addErrorNotification(e));
  };
};

export const createAddress = (label: string) => {
  return (dispatch: any) => {
    walletProxy
      .createSubAddress(label)
      .then((re: any) => dispatch(getAddress()))
      .catch((e: any) => addErrorNotification(e));
  };
};

export const labelAddress = (label: string, addressIndex: number) => {
  return (dispatch: any) => {
    walletProxy
      .labelAddress(label, addressIndex)
      .then((res: any) => dispatch(getAddress()))
      .catch((e: any) => addErrorNotification(e));
  };
};
