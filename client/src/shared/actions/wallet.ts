import { IOpenWallet, IMonerRPCConnection, ICreateWallet } from "typings"
import { getNetworkByName } from "constants/env"
import { OPEN_WALLET_FETCHING, OPEN_WALLET_FAILED, OPEN_WALLET_SUCCEED, CREATE_WALLET_FAILED, CREATE_WALLET_SUCCEED, CREATE_WALLET_FETCHING, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED, VALIDATE_MNEMONIC_SUCCEED, VALIDATE_MNEMONIC_FAILED, RESTORE_WALLET_BY_SEED_FETCHING, RESTORE_WALLET_BY_SEED_SUCCEED, RESTORE_WALLET_BY_SEED_FAILED } from "platforms/desktop/actions/types"
import { createWallet as createWalletCore, openWallet as openWalletCore, getMnemonic, addWalletListener, getOffshoreBalance, syncWallet } from "../wallet-core/wallet-core"
import { addErrorNotification, addNotificationByMessage } from "./notification"
import { NotificationType } from "constants/notificationList"
import { getXHVBalance, getXUSDBalance } from "./balance"
import { getPrimaryAddress } from "./address"

/** collection of actions to open, create and store wallet */

const webWalletConnection: IMonerRPCConnection = {
    uri:'http://localhost:37750', username:'super', password:'super'
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
            dispatch(startWalletSession());
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

    return async(dispatch: any) => {


        dispatch(createWalletFetch())
        const successOrError: boolean | object = await createWalletCore(walletData);


        if (successOrError === true) {
            const mnemomic = getMnemonic();
            dispatch(queryMnemonicForWalletGenerationSucceed(mnemomic));
            dispatch(createWalletSucceed())
            addNotificationByMessage(NotificationType.SUCCESS, 'wallet is open');
        }
        else {
            addNotificationByMessage(NotificationType.ERROR, 'open wallet is not working, pls try again tomorrow');
            dispatch(createWalletFailed(successOrError as object))
         }
    }
}

export const restoreWalletByMnemomic = (mnemonic: string, password: string) => {

    const walletData:ICreateWallet = {
        mnemonic, password, networkType: getNetworkByName(), server: webWalletConnection
    }

    return async(dispatch: any) => {
        dispatch(createWalletFetch())
        const successOrError: boolean | object = await createWalletCore(walletData);

        if (successOrError === true) {
            dispatch(restoreWalletSucceed());
            addNotificationByMessage(NotificationType.SUCCESS, 'restored wallet by Mnemomic');
            dispatch(startWalletSession());
            
        }
        else {
            addNotificationByMessage(NotificationType.ERROR, 'restore wallet is not working, pls try again tomorrow');
            dispatch(restoreWalletFailed(successOrError));
         }

    }


}

export const restoreWalletByKeys = (primaryAddress: string, privateSpendKey: string, privateVieKey: string, password: string) => {

    const walletData:ICreateWallet = {
    networkType: getNetworkByName(), server: webWalletConnection, password
    }

    return async(dispatch: any) => {

        dispatch(createWalletFetch())
        const successOrError: boolean | object = await createWalletCore(walletData);


        if (successOrError === true) {
            dispatch(restoreWalletSucceed());
            addNotificationByMessage(NotificationType.SUCCESS, 'restored wallet by keys');
            dispatch(startWalletSession());
            
        }
        else {
            addNotificationByMessage(NotificationType.ERROR, 'open wallet is not working, pls try again tomorrow');
            dispatch(restoreWalletFailed(successOrError));
         }
    }
}

export const mnenomicVerificationSucceed = (fileName: string) => {
    
    
    return (dispatch: any) => {
     dispatch({
            type: VALIDATE_MNEMONIC_SUCCEED,
            payload: fileName,
          })

          dispatch(startWalletSession());
        
    }
    
};
  export const mneomicVerifcationFailed = () => ({
    type: VALIDATE_MNEMONIC_FAILED,
  });


const startWalletSession = () => {

    return (dispatch: any) => {

        addWalletListener(dispatch);
        syncWallet();
        dispatch(getPrimaryAddress())
        dispatch(getXHVBalance());
        dispatch(getXUSDBalance());
        //dispatch
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

const queryMnemonicForWalletGenerationSucceed = (key: string) => ({
    type: QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED,
    payload: key,
  });
  


  const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = () => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
});
const restoreWalletFailed = (error: any) => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error,
});