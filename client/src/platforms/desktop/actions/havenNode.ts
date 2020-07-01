import {getDaemonStatesIPC} from "../ipc/misc";
import {
  GET_LOCAL_HAVEN_NODE_FAILED,
  GET_LOCAL_HAVEN_NODE_STATE_SUCCEED,
  SET_HAVEN_NODE_FAILED,
  SET_HAVEN_NODE_SUCCESS
} from "./types";
import {NodeLocation, RunningState} from "platforms/desktop/types";
import {setDaemonRPC} from "platforms/desktop/ipc/rpc/rpc";
import {addErrorNotification, addNotificationByMessage} from "shared/actions/notification";
import {NotificationType} from "constants/notificationList";
import {DesktopAppState} from "platforms/desktop/reducers";

export const gethavenNodeState = () => {
  return (dispatch: any) => {
    getDaemonStatesIPC()
      .then((res) => {
        dispatch(updatehavenNodeState(res));
      })
      .catch((err) => dispatch(updatehavenNodeStateFailed(err)));
  };
};

const updatehavenNodeState = (states: RunningState) => {
  return { type: GET_LOCAL_HAVEN_NODE_STATE_SUCCEED, payload: states };
};

const updatehavenNodeStateFailed = (err: any) => {
  return { type: GET_LOCAL_HAVEN_NODE_FAILED, payload: err };
};

export const setHavenNode = (address: string, port: string, location: NodeLocation) => {

  // check if current uri is not the one





  return (dispatch: any, getState:() => DesktopAppState) => {

    let newAdress = '';
    let newPort = '';
    if (location !== NodeLocation.Local) {

      newPort = port;
      newAdress = address;

    }

    const params = {address: newAdress + newPort, trusted:true};

    setDaemonRPC(params)
        .then(dispatch(sethavenNodeSucceed(address, port, location)))
        .catch((error) => dispatch(sethavenNodeFailed(error)));
  }

};


const sethavenNodeSucceed = (address: string, port: string, location: NodeLocation) => {

  return (dispatch: any) => {

    dispatch({type: SET_HAVEN_NODE_SUCCESS, payload:{address, port, location}});
    dispatch(addNotificationByMessage( NotificationType.SUCCESS, "Good job, you switched you daemon"));

  }
};


const sethavenNodeFailed = (error: any) => {


  return (dispatch: any) => {

    dispatch({type: SET_HAVEN_NODE_FAILED});
    dispatch(addErrorNotification(error));

  }

};
