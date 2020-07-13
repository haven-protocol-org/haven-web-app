import {getHavendStateIPC} from "../ipc/misc";
import {GET_HAVEND_STATE_FAILED, GET_HAVEND_STATE_SUCCEED,} from "./types";
import {NodeLocation} from "platforms/desktop/types";
import {HavendState} from "platforms/desktop/ipc/ipc-types";

export const gethavenNodeState = () => {
  return (dispatch: any) => {
    getHavendStateIPC()
      .then((res: HavendState) => {
        dispatch(updatehavenNodeState(res));
      })
      .catch((err) => dispatch(updatehavenNodeStateFailed(err)));
  };
};

const updatehavenNodeState = (havendState: HavendState) => {
  let address = "";
  let port = "";

  if (havendState.location === NodeLocation.Local) {
    return {
      type: GET_HAVEND_STATE_SUCCEED,
      payload: { ...havendState, address, port },
    };
  }

  try {
    const url = new URL(havendState.address);
    address = url.protocol + "//" + url.hostname;
    port = url.port;
  } catch (e) {
    address = havendState.address;
    port = "";
  }

  return {
    type: GET_HAVEND_STATE_SUCCEED,
    payload: { ...havendState, address, port },
  };
};

const updatehavenNodeStateFailed = (err: any) => {
  return { type: GET_HAVEND_STATE_FAILED, payload: err };
};

