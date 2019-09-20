import {
    CLOSE_WALLET,
    VALIDATE_MNEMONIC_FAILED,
    VALIDATE_MNEMONIC_SUCCEED,
    ACCOUNT_CREATED,
    ACCOUNT_CREATION_FAILED,
    ACCOUNT_CREATION_REQUESTED
} from "./types";

import {keysGeneratedFailed, keysGeneratedSucceed} from "./key";
import {core, lWallet} from "../declarations/open_monero.service";
import {addPubAddress, getBalances, getTransfers} from "./index";
import {login} from "../api/api";
import {keysToCamel, logM} from "../utility";


export const closeWallet = () => {
    return { type: CLOSE_WALLET };
};

export const refresh = () => {

    return dispatch => {
        dispatch(getBalances());
        dispatch(getTransfers());
    }
};



export const restoreWallet = seed => {

    let keys = null;

    return dispatch => {

        dispatch(accountCreationRequested());

        try {

            //TODO net type must be env
            keys = lWallet.seed_and_keys_from_mnemonic(seed, core.nettype_utils.network_type.TESTNET);
            keys = keysToCamel(keys);
            dispatch(keysGeneratedSucceed(keys));
            dispatch(addPubAddress(keys.addressString));

        }
        catch(e) {
            dispatch(keysGeneratedFailed(e));
            dispatch(accountCreationFailed(e));
            return;
        }

        dispatch(loginBE(keys.addressString, keys.secViewKeyString, false));
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



export const createWallet = () => {
    return dispatch => {

       core.monero_utils_promise
           .then( bridge => {
           const newWallet = keysToCamel(bridge.newly_created_wallet("english", 1));
           dispatch(addPubAddress(newWallet.addressString));
           delete newWallet.adressString;
           dispatch(keysGeneratedSucceed(newWallet));
       })

    };
};


export const mnenomicVerificationSucceed = () =>  {

    return (dispatch, getState) => {

        const pubViewKeyString = getState().keys.secViewKeyString;
        const address = getState().address.main;

        dispatch(loginBE(address, pubViewKeyString, true));

    };
};
export const mneomicVerifcationFailed = () => ({type: VALIDATE_MNEMONIC_FAILED});
