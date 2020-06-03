import {
  createAddressRPC,
  getAddressRPC,
  labelAdressRPC,
} from "platforms/desktop/ipc/rpc/rpc";
import { addErrorNotification } from "shared/actions/notification";
import { getAddressSucceed } from "../../../shared/actions";

export const getAddress = () => {
  return (dispatch: any) => {
    getAddressRPC()
      .then((res) => dispatch(getAddressSucceed(res.addresses)))
      .catch((e) => addErrorNotification(e));
  };
};

export const createAdress = (label: string) => {
  return (dispatch: any) => {
    createAddressRPC(label)
      .then((res) => dispatch(getAddress()))
      .catch((e) => addErrorNotification(e));
  };
};

export const labelAddress = (label: string, addressIndex: number) => {
  return (dispatch: any) => {
    labelAdressRPC(label, addressIndex)
      .then((res) => dispatch(getAddress()))
      .catch((e) => addErrorNotification(e));
  };
};
