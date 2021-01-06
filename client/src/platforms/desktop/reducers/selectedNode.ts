import { AnyAction } from "redux";
import { NodeLocation, LocalNode, SelectedNode, BasicNode, RemoteNode, NodeConnection } from "platforms/desktop/types";
import { DesktopAppState } from "platforms/desktop/reducers/index";
import {
  SET_NODE_FOR_WALLET_REQUESTED,
  SET_NODE_FOR_WALLET_SUCCESS,
  SET_NODE_LIST_FOR_WALLET_SUCCESS,
} from "platforms/desktop/actions/types";
import { SET_APP_TO_DAEMON_CONNECTION_STATE, SET_WALLET_CONNECTION_STATE } from "shared/actions/types";

const INITAL_NODE_STATE: SelectedNode = {
  address: "",
  location: NodeLocation.None,
  port: "",
};


const INITAL_CONNECTION_STATE: NodeConnection = {
  isWalletConectedToDaemon: false,
  isAppConnectedToDaemon: false,
  isConnecting: false
}


const INITIAL_STATE_LIST: RemoteNode[] = [];


export const connectedNode = (
  state = { ...INITAL_NODE_STATE, ...INITAL_CONNECTION_STATE } ,
  action: AnyAction
): SelectedNode & NodeConnection => {
  switch (action.type) {
    case SET_WALLET_CONNECTION_STATE:
      return { ...state, isWalletConectedToDaemon: action.payload, isConnecting: false };
    case SET_APP_TO_DAEMON_CONNECTION_STATE:
       return { ...state, isAppConnectedToDaemon: action.payload };
    case SET_NODE_FOR_WALLET_SUCCESS:
      return { ...state, ...action.payload };
      case SET_NODE_FOR_WALLET_REQUESTED:
        return {...state, isConnecting: true};
    default:
      return state;
  }
};

export const nodeList = (state = INITIAL_STATE_LIST, action: AnyAction
): RemoteNode[] => {
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
