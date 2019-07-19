import {
    CLOSE_WALLET,
    CREATE_WALLET_FAILED,
    CREATE_WALLET_FETCHING,
    CREATE_WALLET_SUCCEED, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED, RESTORE_WALLET_BY_SEED_FAILED,
    RESTORE_WALLET_BY_SEED_FETCHING, RESTORE_WALLET_BY_SEED_SUCCEED, VALIDATE_MNEMONIC_FAILED, VALIDATE_MNEMONIC_SUCCEED
} from "./types";
import {createWalletRPC, queryMnemonicKeyRPC, resetSessionId, restoreWalletRPC} from "../rpc/rpc";


const createWalletFetch = () => ({ type: CREATE_WALLET_FETCHING });
const createWalletSucceed = result => ({
    type: CREATE_WALLET_SUCCEED,
    payload: result
});
const createWalletFailed = error => ({
    type: CREATE_WALLET_FAILED,
    payload: error
});

export const closeWallet = () => {
    resetSessionId();
    return { type: CLOSE_WALLET };
};

const queryMnemonicForWalletGenerationSucceed = (key) => ({type: QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED, payload:key});


export const restoreWallet = seed => {
    return dispatch => {

        dispatch(closeWallet());
        const language = "English";
        const seed_offset = "";

        const params = { seed, language, seed_offset };

        dispatch(restoreWalletFetching());
        restoreWalletRPC(params)
            .then(result => dispatch(restoreWalletSucceed(result)))
            .catch(error => dispatch(restoreWalletFailed(error)));
    };
};

const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = result => ({
    type: RESTORE_WALLET_BY_SEED_SUCCEED,
    payload: result
});
const restoreWalletFailed = error => ({
    type: RESTORE_WALLET_BY_SEED_FAILED,
    payload: error
});

export const createWallet = seed => {
    return dispatch => {

        dispatch(closeWallet());
        dispatch(createWalletFetch());

        const language = "English";
        const params = {language};

        createWalletRPC(params)
            .then(result => queryMnemonicKeyRPC())
            .then(result => dispatch(queryMnemonicForWalletGenerationSucceed(result.key)))
            .then(result => dispatch(createWalletSucceed(result)))
            .catch(error => dispatch(createWalletFailed(error)))

    };
};

export const mnenomicVerificationSucceed = () =>  ({type: VALIDATE_MNEMONIC_SUCCEED});
export const mneomicVerifcationFailed = () => ({type: VALIDATE_MNEMONIC_FAILED});
