import {
    OPEN_WALLET_FAILED,
    OPEN_WALLET_FETCHING,
    OPEN_WALLET_SUCCEED,
    RESTORE_WALLET_BY_SEED_FAILED,
    RESTORE_WALLET_BY_SEED_SUCCEED
} from "../actions/types";
import {getMessageOfError} from "../../../utility/utility";


const INITIAL_STATE = { filename:"", error: null, isFetching:false, isWalletOpen:false};

export const walletSession =  function(state = INITIAL_STATE, action) {
    switch (action.type) {

        case OPEN_WALLET_FAILED:
        case RESTORE_WALLET_BY_SEED_FAILED:
            return {...state, error: action.payload, isFetching:false, isWalletOpen:false};
        case OPEN_WALLET_SUCCEED:
        case RESTORE_WALLET_BY_SEED_SUCCEED:
            return {error:null, isFetching: false, filename:action.payload, isWalletOpen:true };
        case OPEN_WALLET_FETCHING:
            return {...state,  isFetching: true };
        default:
            return state;
    }
};


export const selectIsLoggedIn = (state) => {

    return state.walletSession.isWalletOpen;

};


export const selectErrorMessageForLogin = (state) => {

    if (state.walletSession.error) {
        return getMessageOfError(state.walletSession.error);
    }

    return "";

};

export const selectIsRequestingLogin = (state) => {

    return state.walletSession.isFetching;

};
