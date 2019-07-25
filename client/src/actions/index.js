import {getAddressRPC} from "../rpc/rpc";

import {
    GET_ADDRESS_FAILED,
    GET_ADDRESS_FETCHING,
    GET_ADDRESS_SUCCEED,

} from "./types";

export * from './prices';
export * from './wallet';
export * from './balance';
export * from './transfer';
export * from './key';
export * from './theme';
export * from './transferHistory';
export * from './chain';



export const getAddress = () => {

    return(dispatch) => {

        dispatch(getAddressFetching());
        getAddressRPC()
            .then(result => dispatch(getAddressSucceed(result)))
            .catch(error => dispatch(getAddressFailed(error)));
    }
};

const getAddressFetching = () => ({type: GET_ADDRESS_FETCHING});
const getAddressSucceed = (result) => ({type: GET_ADDRESS_SUCCEED, payload:result});
const getAddressFailed = (error) => ({type: GET_ADDRESS_FAILED, payload: error});





