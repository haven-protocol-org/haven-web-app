import {AnyAction} from "redux";
import {LocalNodeAddress, NodeLocation, NodeState} from "platforms/desktop/types";


const INITAL_STATE: NodeState = {
  isRunning: false, isMining: false,
  connections: {in:0, out:0}, address:'',
  location: NodeLocation.Local, port:''
};

export const havenNode = (
  state = INITAL_STATE,
  action: AnyAction
): NodeState => {
  switch (action.type) {
    case 'GET_LOCAL_HAVEN_NODE_FAILED':
      return { ...action.payload };

    default:
      return state;
  }
};



export const selectisLocalNode = (node: NodeState) => {

  return node.address === LocalNodeAddress;

};


/** is only from interest when we deal with local node */
export const isConnected = (node: NodeState) => {

  return node.connections.out > 0 || node.connections.in > 0;

};
