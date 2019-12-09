import { getDaemonStatesIPC } from "../ipc/misc";
import { DaemonStates } from "../reducers/daemonStates";
import {UPDATE_DAEMON_STATES, UPDATE_DAEMON_STATES_FAILED} from "./types";

export const getDaemonStates = () => {
  return (dispatch: any) => {
    getDaemonStatesIPC()
        .then(res => {
          dispatch(updateDaemonStates(res))
        })
        .catch(err => dispatch(updateDaemonStatesFailed(err)));
  };
};

const updateDaemonStates = (states: DaemonStates) => {
  return { type: UPDATE_DAEMON_STATES, payload: states };
};

const updateDaemonStatesFailed = (err: any) => {
  return { type: UPDATE_DAEMON_STATES_FAILED, payload: err };
};

