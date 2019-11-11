import { OPEN_WALLET_FAILED, OPEN_WALLET_SUCCEED} from "./types";
import {openWalletRPC} from "../rpc/rpc";
import {CLOSE_WALLET} from "../../../actions/types";


export const closeWallet = () => {
    return { type: CLOSE_WALLET };
};






export const openWallet = (filename, password) => {


    const params = {filename, password};


    return dispatch => {


        openWalletRPC(params)
            .then( () =>  dispatch(openWalletSucceed(filename)))
            .catch( error =>  dispatch(openWalletFailed(error)));

    }


};

const openWalletSucceed =  (fileName) => {

    return {type: OPEN_WALLET_SUCCEED, payload:fileName}

};

const openWalletFailed =  (error) => {

    return {type: OPEN_WALLET_FAILED, payload:error}

};
