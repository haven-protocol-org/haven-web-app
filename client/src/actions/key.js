import {queryMnemonicKeyRPC, queryViewKeyRPC, querySpendKeyRPC} from "../rpc/rpc";
import {
    CREATE_PUB_KEYS_FAILED,
    CREATE_PUB_KEYS_SUCCEED,
    QUERY_MNEMONIC_FETCHING,
    QUERY_MNEMONIC_SUCCEED, QUERY_PRIVATE_VIEW_KEY_FAILED,
    QUERY_PRIVATE_VIEW_KEY_FETCHING,
    QUERY_PRIVATE_VIEW_KEY_SUCCEED, QUERY_SPEND_KEY_FAILED, QUERY_SPEND_KEY_SUCCEED
} from "./types";

import {getAddress} from "./index";

import {cnUtil} from "../declarations/open_monero.service";


export const queryKeys = () => {
    return (dispatch, getState) => {
        dispatch(queryPrivateKey());
        dispatch(queryMnemonic());


        if (getState().address.main === "") {
            dispatch(getAddress());
        }

        queryMnemonicKeyRPC()
            .then(result => dispatch(queryMnemonicSucceed(result.key)))
            .catch(error => dispatch(queryMnemonicFailed(error)));

        queryViewKeyRPC()
            .then(result => dispatch(queryPrivateKeySucceed(result.key)))
            .catch(error => dispatch(queryPrivateKeyFailed(error)));

        querySpendKeyRPC()
            .then(result => dispatch(querySpendKeySucceed(result.key)))
            .catch(error => dispatch(querySpendKeyFailed(error)));
    };
};

export const createPubKeys = (address) => {

    return (dispatch) => {
        try {
            const keys = cnUtil.decode_address(address);
            dispatch(createPubKeysSucceed(keys));
        }
        catch(e){
            dispatch(createPubKeysFailed(e));
        }
    }
};

const createPubKeysSucceed = (keys) => ({type:CREATE_PUB_KEYS_SUCCEED, payload: keys})
const createPubKeysFailed = (error) => ({type:CREATE_PUB_KEYS_FAILED, payload: error})

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

const querySpendKeyFailed = result => ({
    type: QUERY_SPEND_KEY_FAILED,
    payload: result
});

const querySpendKeySucceed = error => ({
    type: QUERY_SPEND_KEY_SUCCEED,

    payload: error
});


