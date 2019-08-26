import {
    CLOSE_WALLET,
    CREATE_WALLET_FAILED,
    CREATE_WALLET_FETCHING,
    CREATE_WALLET_SUCCEED, RESTORE_WALLET_BY_SEED_FAILED,
    RESTORE_WALLET_BY_SEED_FETCHING, RESTORE_WALLET_BY_SEED_SUCCEED, VALIDATE_MNEMONIC_FAILED, VALIDATE_MNEMONIC_SUCCEED,
    QUERY_MNEMONIC_FETCHING,
    QUERY_MNEMONIC_SUCCEED, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED
} from "./types";
import {createWalletRPC, resetSessionId, restoreWalletRPC, queryMnemonicKeyRPC} from "../rpc/rpc";
import {derivatePrivKeysBySeed} from "./key";
import {core} from "../declarations/open_monero.service";


const createWalletFetch = () => ({ type: CREATE_WALLET_FETCHING });
const createWalletSucceed = () => ({
    type: CREATE_WALLET_SUCCEED,
    payload: null
});
const createWalletFailed = error => ({
    type: CREATE_WALLET_FAILED,
    payload: error
});

export const closeWallet = () => {
    resetSessionId();
    return { type: CLOSE_WALLET };
};



export const restoreWallet = seed => {

    return dispatch => {


        core.monero_utils_promise.then(bridge => {

            // 9vxH6ZyyPStir5B9x7rzkoZYKvckQ2J6PQgCfyeVcEYGjGvXy1sSNS7PrzdKe8wVdaSJL8jjb3mGjL9EMVbzWkVWU1n2TRS
            console.log(bridge.decode_address('hvtaFf4rQ9ZQmqsVCG6VMhb2pkX8QpzB6RbK8VaW1uVjhsouUj5oZn4USH141gftUgCh1hHfPjtMtdhuMSm7mVb98rmdgiz9ZH', 1));
            // console.log(bridge.seed_and_keys_from_mnemonic(seed, 1));
        });


/*        // check if user submitted privKey
        if (seed.length === 64) {

            seed = mnemonic.mn_encode(seed);
        }

        dispatch(closeWallet());
        const language = "English";
        const seed_offset = "";

        const params = { seed, language, seed_offset };

        dispatch(restoreWalletFetching());
        restoreWalletRPC(params)
            .then(result => {
                dispatch(derivatePrivKeysBySeed(seed));
                dispatch(restoreWalletSucceed(result));
            })
            .catch(error => {
                dispatch(restoreWalletFailed(error));
           });*/
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

            .then(result => {
                dispatch(derivatePrivKeysBySeed(result.key));
                dispatch(queryMnemonicForWalletGenerationSucceed(result.key));
            })
            .then(() => dispatch(createWalletSucceed()))
            .catch(error => {
                dispatch(createWalletFailed(error));
            })

    };
};

const queryMnemonicForWalletGenerationSucceed = (key) => ({type: QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED, payload:key});

export const mnenomicVerificationSucceed = () =>  ({type: VALIDATE_MNEMONIC_SUCCEED});
export const mneomicVerifcationFailed = () => ({type: VALIDATE_MNEMONIC_FAILED});
