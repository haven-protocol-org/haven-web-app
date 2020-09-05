import { IOpenWallet, IMonerRPCConnection, ICreateWallet } from "typings"
import { getNetworkByName } from "constants/env"
import { OPEN_WALLET_FETCHING, OPEN_WALLET_FAILED, OPEN_WALLET_SUCCEED, CREATE_WALLET_FAILED, CREATE_WALLET_SUCCEED, CREATE_WALLET_FETCHING } from "platforms/desktop/actions/types"
import { createWallet as createWalletCore, openWallet as openWalletCore } from "../../platforms/web/wallet-core/wallet-core"
import { addErrorNotification, addNotificationByMessage } from "./notification"
import { NotificationType } from "constants/notificationList"

/** collection of actions to open, create and store wallet */

const webWalletConnection: IMonerRPCConnection = {
    uri:'http://localhost:37750', username:'test', password:'test'
}



/** used by browser */
export const openWalletByData = (keysData: Uint8Array, cacheData: Uint8Array, password: string, path: string) => {

    const walletData: IOpenWallet = {
        keysData, cacheData, password, networkType:getNetworkByName(), server: webWalletConnection
    }

    return (dispatch: any) => {
        dispatch(openWallet(walletData, path))
    }
    
}

/** used by nodejs env */
export const openWalletByFile = (path: string, password: string) => {

    const walletData: IOpenWallet = {
        path, password, networkType:getNetworkByName(), server: webWalletConnection
    }

    return (dispatch: any) => {
        dispatch(openWallet(walletData, path))
    }
}


const openWallet = (walletData: IOpenWallet, path: string) => {


    return async(dispatch: any) => {

        dispatch(openWalletFetching);

        const successOrError: boolean | object = await openWalletCore(walletData);

        if (successOrError === true) {
            dispatch(openWalletSucceed(path))
            addNotificationByMessage(NotificationType.SUCCESS, 'wallet is open');
        }
        else {
            addNotificationByMessage(NotificationType.ERROR, 'open wallet is not working, pls try again tomorrow');
            dispatch(openWalletFailed(successOrError as object))
         }
    }
}

/** store wallet data as file */
export const storeWalletData = () => {



}



export const createNewWallet = (path: string, password: string) => {

    const walletData: ICreateWallet = {
        path, password, server: webWalletConnection, networkType: getNetworkByName()
    }

    

}

export const restoreWalletByMnemomic = (mnemonic: string, password: string) => {

    const walletData:ICreateWallet = {
        mnemonic, password, networkType: getNetworkByName(), server: webWalletConnection
    }

    return (dispatch: any) => {
        dispatch(createWallet(walletData))
    }


}

export const restoreWalletByKeys = (primaryAddress: string, privateSpendKey: string, privateVieKey: string, password: string) => {

    const walletData:ICreateWallet = {
    networkType: getNetworkByName(), server: webWalletConnection, password
    }

    return (dispatch: any) => {
        dispatch(createWallet(walletData))
    }



}

const createWallet = (walletData: ICreateWallet) => {




    return async(dispatch: any) => {


        dispatch(createWalletFetch())
        const successOrError: boolean | object = await createWalletCore(walletData);


        if (successOrError === true) {
            dispatch(createWalletSucceed())
            addNotificationByMessage(NotificationType.SUCCESS, 'wallet is open');
        }
        else {
            addNotificationByMessage(NotificationType.ERROR, 'open wallet is not working, pls try again tomorrow');
            dispatch(createWalletFailed(successOrError as object))
         }


    }

}

const openWalletFetching = () => {
    return { type: OPEN_WALLET_FETCHING };
};

const openWalletSucceed = (fileName: string) => {
    return { type: OPEN_WALLET_SUCCEED, payload: fileName };
};
  
const openWalletFailed = (error: object) => {
    return { type: OPEN_WALLET_FAILED, payload: error };
}

const createWalletFetch = () => ({ type: CREATE_WALLET_FETCHING });

const createWalletSucceed = () => ({
  type: CREATE_WALLET_SUCCEED,
});
const createWalletFailed = (error: object) => ({
  type: CREATE_WALLET_FAILED, payload: error
});