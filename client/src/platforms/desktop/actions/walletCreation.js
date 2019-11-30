import {
    CREATE_WALLET_FAILED,
    CREATE_WALLET_FETCHING,
    CREATE_WALLET_SUCCEED,
     VALIDATE_MNEMONIC_FAILED, VALIDATE_MNEMONIC_SUCCEED, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED
} from "./types";
import {createWalletRPC, queryMnemonicKeyRPC} from "../ipc/rpc/rpc";
import {closeWallet} from "./walletSession";


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
