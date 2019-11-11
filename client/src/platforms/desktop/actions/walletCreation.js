import {
    CLOSE_WALLET,
    CREATE_WALLET_FAILED,
    CREATE_WALLET_FETCHING,
    CREATE_WALLET_SUCCEED, RESTORE_WALLET_BY_SEED_FAILED,
    RESTORE_WALLET_BY_SEED_FETCHING, RESTORE_WALLET_BY_SEED_SUCCEED, VALIDATE_MNEMONIC_FAILED, VALIDATE_MNEMONIC_SUCCEED,
    QUERY_MNEMONIC_FETCHING,
    QUERY_MNEMONIC_SUCCEED, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED
} from "./types";
import {createWalletRPC, restoreWalletRPC, queryMnemonicKeyRPC} from "../rpc/rpc";
import {derivatePrivKeysBySeed} from "./key";
import {mnemonic} from "../declarations/open_monero.service";


const createWalletFetch = () => ({ type: CREATE_WALLET_FETCHING });
const createWalletSucceed = () => ({
    type: CREATE_WALLET_SUCCEED,
    payload: null
});
const createWalletFailed = error => ({
    type: CREATE_WALLET_FAILED,
    payload: error
});



export const createWallet = (seed, filename, password) => {
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
