import {getHavendStateIPC} from "../ipc/misc";
import {
  GET_HAVEND_STATE_FAILED,
  GET_HAVEND_STATE_SUCCEED,
  SET_HAVEN_NODE_FAILED,
  SET_HAVEN_NODE_SUCCESS
} from "./types";
import {NodeLocation} from "platforms/desktop/types";
import {setDaemonRPC} from "platforms/desktop/ipc/rpc/rpc";
import {addErrorNotification, addNotificationByMessage} from "shared/actions/notification";
import {NotificationType} from "constants/notificationList";
import {DesktopAppState} from "platforms/desktop/reducers";
import {HavendState} from "platforms/desktop/ipc/ipc-types";
import {getDaemonsState} from "platforms/desktop/actions/refresh";
import {NodeOption} from "platforms/desktop/pages/_wallet/settings/nodeSetting";

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
    return { type: GET_HAVEND_STATE_SUCCEED, payload: {...havendState, address, port} };

  }

  try {
    const url = new URL(havendState.address);
    address = url.protocol + '//' + url.hostname;
    port = url.port;
  }
  catch (e) {
    address = havendState.address;
    port = "";
  }

  return { type: GET_HAVEND_STATE_SUCCEED, payload: {...havendState, address, port} };
};

const updatehavenNodeStateFailed = (err: any) => {
  return { type: GET_HAVEND_STATE_FAILED, payload: err };
};

export const setHavenNode = (selectedNodeOption:NodeOption, nodeAddress:string, nodePort: string) => {


  return (dispatch: any, getState:() => DesktopAppState) => {


    let trusted: boolean; let address: string;

    // if using local node, keep address empty
    if (selectedNodeOption.location === NodeLocation.Local) {
       trusted = true;
       address = "";
    } else {
     trusted = false;
     address = nodeAddress + ':' + nodePort;
      const protocolPattern =  /^((http|https):\/\/)/;
      if (!protocolPattern.test(address)) {
        address = 'http://' + nodeAddress;
      }
    }

    const params = {address: address, trusted};

    setDaemonRPC(params)
        .then(dispatch(sethavenNodeSucceed(nodeAddress, nodePort, selectedNodeOption.location)))
        .then(dispatch(getDaemonsState()))
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
