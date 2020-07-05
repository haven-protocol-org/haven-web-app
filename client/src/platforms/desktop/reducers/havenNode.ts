import {AnyAction} from "redux";
import {NodeLocation, NodeState} from "platforms/desktop/types";
import {DesktopAppState} from "platforms/desktop/reducers/index";
import {GET_HAVEND_STATE_SUCCEED} from "platforms/desktop/actions/types";


const INITAL_STATE: NodeState = {
  isRunning: false, isMining: false,
  connections: {in:0, out:0}, address:'',
  location: NodeLocation.None, port:''
};

export const havenNode = (
  state = INITAL_STATE,
  action: AnyAction
): NodeState => {
  switch (action.type) {
    case  GET_HAVEND_STATE_SUCCEED:
      return { ...action.payload };
    default:
      return state;
  }
};


export const selectIsDaemonSet = (state: DesktopAppState): boolean => {
  return state.havenNode.location !== NodeLocation.None
};



export const selectisLocalNode = (node: NodeState) => {

  return node.location === NodeLocation.Local;

};


/** is only from interest when we deal with local node */
export const isConnected = (node: NodeState) => {

  return node.connections.out > 0 || node.connections.in > 0;

};
