import { AnyAction } from "redux";
import { LocalNode } from "platforms/desktop/types";
import { GET_HAVEND_STATE_SUCCEED } from "platforms/desktop/actions/types";

const INITAL_STATE: LocalNode = {
  isRunning: false,
  isMining: false,
  connections: { in: 0, out: 0 },
};

export const localNode = (
  state = INITAL_STATE,
  action: AnyAction
): LocalNode => {
  switch (action.type) {
    case GET_HAVEND_STATE_SUCCEED:
      return { ...action.payload };
    default:
      return state;
  }
};

/** is only from interest when we deal with local node */
export const isConnected = (node: LocalNode) => {
  return node.connections.out > 0 || node.connections.in > 0;
};
