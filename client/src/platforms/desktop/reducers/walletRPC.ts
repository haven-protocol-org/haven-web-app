import { AnyAction } from "redux";
import {RunningState} from "platforms/desktop/types";
import {GET_WALLET_RPC_STATE_SUCCEED} from "platforms/desktop/actions/types";




const INITAL_STATE: RunningState = {

    isRunning:false
};

export const walletRPC = (
    state = INITAL_STATE,
    action: AnyAction
): RunningState => {
    switch (action.type) {
        case GET_WALLET_RPC_STATE_SUCCEED:
            return { ...action.payload };
        default:
            return state;
    }
};
