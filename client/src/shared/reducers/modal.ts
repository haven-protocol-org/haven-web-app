import { AnyAction } from "redux";
import { HIDE_MODAL, SHOW_MODAL } from "../actions/types";

export enum MODAL_TYPE {
  None,
  ConfirmTx,
  ConfirmExchange,
  EditAddress,
  ShowQRCode,
  ShowAddressModal,
}

const INITIAL_STATE: MODAL_TYPE = MODAL_TYPE.None;

export default function (state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload;
    case HIDE_MODAL:
      return MODAL_TYPE.None;
    default:
      return state;
  }
}
