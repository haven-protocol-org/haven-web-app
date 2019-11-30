import {getDaemonStatesIPC} from "../ipc/misc";
import {DaemonStates} from "../reducers/daemonStates";
import {UPDATE_DAEMON_STATES} from "./types";


export const getDaemonStates = () => {

    return (dispatch: any) => {
        getDaemonStatesIPC()
            .then(res => dispatch(updateDaemonStates(res)))
    }
};


const updateDaemonStates = (states: DaemonStates) => {
  return {type: UPDATE_DAEMON_STATES, payload: states};
};
