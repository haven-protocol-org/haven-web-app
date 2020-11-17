import { getLocalNodeStateIPC } from "../ipc/misc";
import { GET_HAVEND_STATE_FAILED, GET_HAVEND_STATE_SUCCEED } from "./types";
import { ProcessState } from "platforms/desktop/ipc/ipc-types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { addNotificationByMessage } from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";

export function getLocalNodeState() {
  return (dispatch: any, getState: () => DesktopAppState) => {
    getLocalNodeStateIPC()
      .then((res: ProcessState) => {
        if (!getState().localNode.isRunning && res.isRunning) {
          dispatch(
            addNotificationByMessage(
              NotificationType.SUCCESS,
              "Attempting to connect to a Local node"
            )
          );
        } else if (getState().localNode.isRunning && !res.isRunning) {
          dispatch(
            addNotificationByMessage(
              NotificationType.SUCCESS,
              "Local node is no longer running"
            )
          );
        }
        dispatch(updateLocalNodeState(res));
      })
      .catch((err) => dispatch(updateLocalNodeStateFailed(err)));
  };
}

const updateLocalNodeState = (processState: ProcessState) => {
  return {
    type: GET_HAVEND_STATE_SUCCEED,
    payload: { ...processState },
  };
};
const updateLocalNodeStateFailed = (err: any) => {
  return { type: GET_HAVEND_STATE_FAILED, payload: err };
};
