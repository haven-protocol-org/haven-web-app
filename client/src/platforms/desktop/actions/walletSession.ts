import {OPEN_WALLET_FAILED, OPEN_WALLET_FETCHING, OPEN_WALLET_SUCCEED, UPDATE_SAVED_WALLETS} from "./types";
import {closeWalletRPC, openWalletRPC} from "../ipc/rpc/rpc";
import {CLOSE_WALLET} from "shared/actions/types";
import {requestSavedWalletsIPC} from "../ipc/misc";
import {SavedWallet} from "../reducers/walletSession";


export const closeWallet = () => {


    closeWalletRPC();
    return (dispatch: any) => {
        dispatch(closeWalletSucceed())
    }

};

const closeWalletSucceed = () => {

    return {type:CLOSE_WALLET};

};



export const getSavedWallets = () => {

    return (dispatch: any) => {

            requestSavedWalletsIPC()
                .then( (wallets: SavedWallet[]) => dispatch(updateSavedWallets(wallets)))
                .catch((err) => console.log(err));
    }

};



const updateSavedWallets = (savedWallets: SavedWallet[]) => {


    return {type: UPDATE_SAVED_WALLETS, payload: savedWallets};

};




export const openWallet = (filename: string, password: string) => {

    const params = {filename, password};


    return (dispatch: any) => {

        dispatch(openWalletFetching());

        openWalletRPC(params)
            .then( () =>  dispatch(openWalletSucceed(filename)))
            .catch( (error: any) =>  dispatch(openWalletFailed(error)));

    }
};

const openWalletSucceed =  (fileName: string) => {

    return {type: OPEN_WALLET_SUCCEED, payload:fileName}

};

const openWalletFailed =  (error: object) => {

    return {type: OPEN_WALLET_FAILED, payload:error}

};


const openWalletFetching =  () => {

    return {type: OPEN_WALLET_FETCHING}

};