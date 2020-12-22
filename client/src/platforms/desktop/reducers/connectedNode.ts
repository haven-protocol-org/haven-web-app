import { AnyAction, combineReducers } from "redux";
import { NodeLocation, LocalNode, SelectedNode, BasicNode } from "platforms/desktop/types";
import { DesktopAppState } from "platforms/desktop/reducers/index";
import {
  SET_NODE_FOR_WALLET_SUCCESS,
  APP_TO_DAEMON_CONNECTION_STATE,
  SET_NODE_LIST_FOR_WALLET_SUCCESS,
} from "platforms/desktop/actions/types";

const INITAL_STATE_SELECTED: SelectedNode = {
  address: "",
  location: NodeLocation.None,
  port: "",
  appIsConnected: false,
};


const INITIAL_STATE_LIST: BasicNode[] = [];


export const connectedNode = (
  state = INITAL_STATE_SELECTED,
  action: AnyAction
): SelectedNode => {
  switch (action.type) {
    case SET_NODE_FOR_WALLET_SUCCESS:
      return { ...state, ...action.payload };
    case APP_TO_DAEMON_CONNECTION_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const nodeList = (state = INITIAL_STATE_LIST, action: AnyAction
): BasicNode[] => {
  switch (action.type) {
    case SET_NODE_LIST_FOR_WALLET_SUCCESS:
      return action.payload;
         default:
      return state;
  }
};

export const selectRemoteDefaultNode = (state: DesktopAppState): BasicNode => {

  return state.nodeList.find(remoteNode => remoteNode.default)!;

}


export const selectIsDaemonSet = (state: DesktopAppState): boolean => {
  return state.connectedNode.location !== NodeLocation.None;
};

export const selectisLocalNode = (node: SelectedNode) => {
  return node.location === NodeLocation.Local;
};

/** is only from interest when we deal with local node */
export const isConnected = (node: LocalNode) => {
  return node.connections.out > 0 || node.connections.in > 0;
};
