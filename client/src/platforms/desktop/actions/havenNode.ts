import { getHavendStateIPC } from "../ipc/misc";
import {
  GET_HAVEND_STATE_FAILED,
  GET_HAVEND_STATE_SUCCEED,
  SET_NODE_FOR_WALLET_FAILED,
  SET_NODE_FOR_WALLET_REQUESTED,
  SET_NODE_FOR_WALLET_SUCCESS,
} from "./types";
import { NodeLocation } from "platforms/desktop/types";
import { HavendState } from "platforms/desktop/ipc/ipc-types";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  addErrorNotification,
  addNotificationByMessage,
} from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";
import { NodeOption } from "../pages/_wallet/settings/node/nodeSetting";
import { walletProxy } from "shared/core/proxy";
import MoneroRpcConnection from "haven-wallet-core/src/main/js/common/MoneroRpcConnection";
import { IMonerRPCConnection } from "typings";

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

export const setNodeForWallet = (
  selectedNodeOption: NodeOption,
  nodeAddress: string,
  nodePort: string
) => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(setNodeForWalletRequested());

    let trusted: boolean;
    let address: string;

    // if using local node, keep address empty
    if (selectedNodeOption.location === NodeLocation.Local) {
      trusted = true;
      address = "";
    } else {
      trusted = false;
      address = nodeAddress + ":" + nodePort;
      const protocolPattern = /^((http|https):\/\/)/;
      if (!protocolPattern.test(address)) {
        address = "http://" + nodeAddress;
      }
    }

    const params = { address: address, trusted };

    const connection: IMonerRPCConnection = {
      username: selectedNodeOption.username,
      password: selectedNodeOption.password,
      uri: address,
    };

    walletProxy
      .setDaemonConnection(connection)
      .then((res: any) => {
        console.log(res);
        dispatch(
          setNodeForWalletSucceed(
            nodeAddress,
            nodePort,
            selectedNodeOption.location
          )
        );
      })
      .catch((error: any) => {
        dispatch(setNodeForWalletFailed(error));
      });
  };
};

const setNodeForWalletRequested = () => {
  return (dispatch: any) => {
    dispatch({
      type: SET_NODE_FOR_WALLET_REQUESTED,
    });
  };
};

const setNodeForWalletSucceed = (
  address: string,
  port: string,
  location: NodeLocation
) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_NODE_FOR_WALLET_SUCCESS,
      payload: { address, port, location },
    });
  };
};
const setNodeForWalletFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch({ type: SET_NODE_FOR_WALLET_FAILED });
    dispatch(
      addErrorNotification("Changing node is not possible in the moment")
    );
  };
};
