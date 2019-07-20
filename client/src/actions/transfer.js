import {getTransferRPC, transferRPC} from "../rpc/rpc";
import {
    GET_TRANSFERS_FAILED,
    GET_TRANSFERS_FETCHING,
    GET_TRANSFERS_SUCCEED, TRANSFER_FAILED,
    TRANSFER_FETCHING,
    TRANSFER_SUCCEED
} from "./types";

 import {getBalances} from "./";
import {addErrorNotification, addNotificationByKey} from "./notification";

export const transfer = (address, amount) => {
    amount = amount * 1e12;
    return (dispatch, getState) => {
        dispatch(transferFetch({ address, amount }));
        const params = { destinations: [{ address, amount }], ring_size: 11 };

        transferRPC(params)
            .then(result => {
                dispatch(transferSucceed(result));
                dispatch(addNotificationByKey(TRANSFER_SUCCEED));
                dispatch(getTransfers());
                dispatch(getBalances());
            })
            .catch(error => dispatch(manageTransferFailed(error)));
    };
};

export const getTransfers = () => {
    return dispatch => {
        dispatch(getTransfersFetching());
        const params = { in: true, out: true, pending: true };
        getTransferRPC(params)
            .then(mergeAndSort)
            .then(result => {dispatch(getTransfersSucceed(result))})
            .catch(error => {
                dispatch(getTransfersFailed(error))
            });
    };
};

const getTransfersFetching = () => ({
    type: GET_TRANSFERS_FETCHING,
    payload: { isFetching: true }
});

const getTransfersSucceed = result => ({
    type: GET_TRANSFERS_SUCCEED,
    payload: result
});

const getTransfersFailed = error => ({
    type: GET_TRANSFERS_FAILED,
    payload: error
});

const transferFetch = params => ({
    type: TRANSFER_FETCHING,
    payload: { ...params, isFetching: true }
});
const transferSucceed = result => ({
    type: TRANSFER_SUCCEED,
    payload: { ...result, isFetching: false }
});

const manageTransferFailed = error => {
    return dispatch => {
        dispatch(transferFailed(error));
        dispatch(addErrorNotification(error));
    }
};


const transferFailed = error => ({type: TRANSFER_FAILED, payload: {...error, isFetching: false}});


const mergeAndSort = (result) => {

    const all = [...result.in, ...result.out,...result.pending? result.pending : []];
    all.sort( (a,b) =>  b.timestamp - a.timestamp );
    result.all = all;
    return result;

};
