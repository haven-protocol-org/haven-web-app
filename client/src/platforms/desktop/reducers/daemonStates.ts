import { AnyAction } from "redux";
import { UPDATE_DAEMON_STATES } from "../actions/types";

export enum NodeLocation {
  Local,Remote
}


export interface NodeState extends RunningState {

  location:NodeLocation;
  uri: string;
  isMining:boolean;
  connections:{in:number, out:number};

}


export interface RunningState {
  isRunning: boolean;
  code?: number;
  signal?: string;
}

export interface DaemonStates {
  wallet: RunningState;
  node: RunningState;
}

const INITAL_STATE: DaemonStates = {
  node: { isRunning: false },
  wallet: { isRunning: false }
};

export const daemonStates = (
  state = INITAL_STATE,
  action: AnyAction
): DaemonStates => {
  switch (action.type) {
    case UPDATE_DAEMON_STATES:
      return {...action.payload};

    default:
      return state;
  }
};
