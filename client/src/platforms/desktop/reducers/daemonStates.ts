import {AnyAction} from "redux";
import {UPDATE_DAEMON_STATES} from "../actions/types";

export interface DAEMON_STATE  {

    isRunning: boolean,
    code?: number,
    signal?: string,

}

export interface DaemonStates {
    wallet: DAEMON_STATE,
    node:DAEMON_STATE
}


const INITAL_STATE: DaemonStates = {

    node:{isRunning: false},
    wallet: {isRunning: false}

};



export const daemonStates = (state = INITAL_STATE, action: AnyAction): DaemonStates => {


    switch (action.type) {

        case UPDATE_DAEMON_STATES:
        return action.payload;

        default:
            return state;

    }



};
