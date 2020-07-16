import { MODAL_TYPE } from "../reducers/modal";
import { HIDE_MODAL, SHOW_MODAL } from "./types";

export const showModal = (modalType: MODAL_TYPE) => ({
  type: SHOW_MODAL,
  payload: modalType,
});
export const hideModal = () => ({ type: HIDE_MODAL });
