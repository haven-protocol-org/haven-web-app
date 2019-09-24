import {
    SEND_FUNDS_STARTED, SEND_FUNDS_STATUS_UPDATE,

} from "../actions/types";


const INITIAL_STATE = {

    code:0,
    msg:'',
    isProcessing:false

};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEND_FUNDS_STARTED:
            return {...state};
        case SEND_FUNDS_STATUS_UPDATE:
            return {...state};
        default:
            return state;
    }
}

