import {miningStatusRPC, startMiningRPC, stopMiningRPC} from "../ipc/rpc/rpc";
import {
    MINING_STATUS_RESPONSE,
    MINING_STATUS_RESPONSE_FAILED,
    REQUEST_MINING_START, REQUEST_MINING_STATUS,
    REQUEST_MINING_STOP
} from "../actions/types";


export const startMining = () => {

    const threads_count = 1;
    const do_background_mining = true;
    const ignore_battery = false;
    const params = {threads_count, do_background_mining, ignore_battery};

    return (dispatch: any) => {

        dispatch({type: REQUEST_MINING_START});

        startMiningRPC(params)
            .then((res: any) => setTimeout( () => dispatch(miningStatus()), 2000))
            .catch((err: any) => setTimeout( () => dispatch(miningStatus()),2000));
    }

};


export const stopMining = () => {

    return (dispatch: any) => {

        dispatch({type: REQUEST_MINING_STOP});

        stopMiningRPC()
            .then((res: any) => setTimeout( () => dispatch(miningStatus()), 2000))
            .catch((err: any) => setTimeout( () => dispatch(miningStatus()),2000));

    }
};



export const miningStatus = () => {

    return (dispatch: any) => {

        dispatch({type: REQUEST_MINING_STATUS});

        miningStatusRPC()
            .then( res => dispatch(getMiningStatusSucceed(res)) )
            .catch( err => dispatch(getMiningStatusFailed(err)) );
    };


};

const getMiningStatusSucceed = (res: any) => {

    return {type: MINING_STATUS_RESPONSE, payload:res};
};


const getMiningStatusFailed = (err: any) => {

    return {type: MINING_STATUS_RESPONSE_FAILED, payload:err};
};
