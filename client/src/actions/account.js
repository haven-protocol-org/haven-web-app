import {
    CLOSE_WALLET,
    CREATE_WALLET_FAILED,
    CREATE_WALLET_FETCHING,
    CREATE_WALLET_SUCCEED,
    VALIDATE_MNEMONIC_FAILED,
    VALIDATE_MNEMONIC_SUCCEED,
    ACCOUNT_CREATED,
    ACCOUNT_CREATION_FAILED,
    ACCOUNT_CREATION_REQUESTED
} from "./types";
import {createWalletRPC, resetSessionId, restoreWalletRPC, queryMnemonicKeyRPC} from "../rpc/rpc";
import {keysGeneratedFailed, keysGeneratedSucceed} from "./key";
import {core, lWallet} from "../declarations/open_monero.service";
import {addPubAddress} from "./index";
import {login} from "../api/api";
import {logM} from "../utility";


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

    let keys = null;

    return dispatch => {

        dispatch(accountCreationRequested());

        try {

            //TODO net type must be env
            keys = lWallet.seed_and_keys_from_mnemonic(seed, core.nettype_utils.network_type.TESTNET);
            dispatch(keysGeneratedSucceed(keys));
            dispatch(addPubAddress(keys.address_string));

        }
        catch(e) {
            dispatch(keysGeneratedFailed(e));
            dispatch(accountCreationFailed(e));
            return;
        }

        dispatch(loginBE(keys.address_string, keys.sec_viewKey_string, false));
    };
};

const loginBE = (address, viewKey, generatedLocally) => {

    return dispatch => {

        login(address, viewKey, generatedLocally)
            .then(res => dispatch(accountCreated(res)))
            .catch(err => dispatch(accountCreationFailed(err)))

    }
};

const accountCreationRequested = () => ({type: ACCOUNT_CREATION_REQUESTED});
const accountCreated = (accountData) => ({type: ACCOUNT_CREATED, payload: accountData});
const accountCreationFailed = (error) => ({type: ACCOUNT_CREATION_FAILED, payload: error});



export const createWallet = seed => {
    return dispatch => {

        dispatch(closeWallet());
        dispatch(createWalletFetch());

        const language = "English";


    };
};


export const mnenomicVerificationSucceed = () =>  ({type: VALIDATE_MNEMONIC_SUCCEED});
export const mneomicVerifcationFailed = () => ({type: VALIDATE_MNEMONIC_FAILED});
