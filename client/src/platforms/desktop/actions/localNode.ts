import { getLocalNodeStateIPC, startLocalNodeIPC, stopLocalNodeIPC } from "../ipc/localNode";
import { GET_HAVEND_STATE_FAILED, GET_HAVEND_STATE_SUCCEED } from "./types";
import { ProcessState } from "platforms/desktop/ipc/ipc-types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { addNotificationByMessage } from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";

export const getLocalNodeState = () => {
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


export const startLocalNode = () => {
  return (dispatch: any) => {
    startLocalNodeIPC();
    dispatch(addNotificationByMessage(NotificationType.SUCCESS, 'Starting local node in background - placeholder'));
  }
}

export const stopLocalNode = () => {
  return (dispatch: any) => {

    stopLocalNodeIPC();
    dispatch(addNotificationByMessage(NotificationType.SUCCESS, 'Stopping local node - placeholder'));
  }
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
