import {queryMnemonicKeyRPC, queryViewKeyRPC} from "../rpc/rpc";
import {
    QUERY_MNEMONIC_FETCHING,
    QUERY_MNEMONIC_SUCCEED, QUERY_PRIVATE_VIEW_KEY_FAILED,
    QUERY_PRIVATE_VIEW_KEY_FETCHING,
    QUERY_PRIVATE_VIEW_KEY_SUCCEED
} from "./types";


export const queryKeys = () => {
    return (dispatch, getState) => {
        dispatch(queryPrivateKey());
        dispatch(queryMnemonic());

        queryMnemonicKeyRPC()
            .then(result => dispatch(queryMnemonicSucceed(result.key)))
            .catch(error => dispatch(queryMnemonicFailed(error)));

        queryViewKeyRPC()
            .then(result => dispatch(queryPrivateKeySucceed(result.key)))
            .catch(error => dispatch(queryPrivateKeyFailed(error)));
    };
};

const queryPrivateKey = () => ({ type: QUERY_PRIVATE_VIEW_KEY_FETCHING });
const queryMnemonic = () => ({ type: QUERY_MNEMONIC_FETCHING });
const queryMnemonicSucceed = result => ({
    type: QUERY_MNEMONIC_SUCCEED,
    payload: result
});
const queryMnemonicFailed = error => ({
    type: QUERY_MNEMONIC_SUCCEED,
    payload: error
});
const queryPrivateKeySucceed = result => ({
    type: QUERY_PRIVATE_VIEW_KEY_SUCCEED,
    payload: result
});
const queryPrivateKeyFailed = error => ({
    type: QUERY_PRIVATE_VIEW_KEY_FAILED,
    payload: error
});

