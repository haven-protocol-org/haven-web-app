import {AnyAction} from "redux";
import {
    MINING_STATUS_RESPONSE, MINING_STATUS_RESPONSE_FAILED,
    REQUEST_MINING_START,
    REQUEST_MINING_STATUS,
    REQUEST_MINING_STOP
} from "../actions/types";

export enum MiningRequestTypes {
    Start,Stop,Status,None
}


export interface MiningStatus {

    active:boolean;
    address:string;
    speed:number;
    threads_count:number;
    smartMining:boolean;
    miningRequest:MiningRequestTypes;

}


const INITIAL_STATE:MiningStatus = {

    active:false,
    address:"",
    speed:0,
    threads_count:0,
    smartMining:false,
    miningRequest:MiningRequestTypes.None

};


export const mining =  (state = INITIAL_STATE, action: AnyAction ):MiningStatus => {

    switch(action.type) {

        case REQUEST_MINING_START:
            return {...state, miningRequest: MiningRequestTypes.Start};

        case REQUEST_MINING_STOP:
            return {...state, miningRequest: MiningRequestTypes.Stop};

        case REQUEST_MINING_STATUS:
            return {...state, miningRequest: MiningRequestTypes.Status};

        case MINING_STATUS_RESPONSE:
            return {...action.payload, miningRequest: MiningRequestTypes.None};

        case MINING_STATUS_RESPONSE_FAILED:
            return {...state, miningRequest: MiningRequestTypes.None};

        default:
            return state;

    }

};


