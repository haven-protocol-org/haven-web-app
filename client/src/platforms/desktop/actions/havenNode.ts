import { getHavendStateIPC } from "../ipc/misc";
import { GET_HAVEND_STATE_FAILED, GET_HAVEND_STATE_SUCCEED } from "./types";
import { NodeLocation } from "platforms/desktop/types";
import { HavendState } from "platforms/desktop/ipc/ipc-types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { addNotificationByMessage } from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";

export const gethavenNodeState = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    getHavendStateIPC()
      .then((res: HavendState) => {
        if (!getState().havenNode.isRunning && res.isRunning) {
          dispatch(
            addNotificationByMessage(
              NotificationType.SUCCESS,
              "Attempting to connect to a Local node"
            )
          );
        } else if (getState().havenNode.isRunning && !res.isRunning) {
          dispatch(
            addNotificationByMessage(
              NotificationType.SUCCESS,
              "Local node is no longer running"
            )
          );
        }

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
