

import * as core from "haven-wallet-core";
import MoneroWalletWasm from "haven-wallet-core/src/main/js/wallet/MoneroWalletWasm";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import bigInt from "big-integer";
import { ICreateWallet, IOpenWallet, ITxConfig, IMonerRPCConnection } from "typings";
import { HavenWalletListener } from "shared/actions/walletListener";
import { bigIntegerToBigInt } from "utility/utility";
import MoneroTxSet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxSet";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { HavenAppState } from "platforms/desktop/reducers";
//const core = require("haven-wallet-core");

let wallet: MoneroWalletWasm;



export const createWallet = async(walletData: ICreateWallet) => {

    try {
        wallet = await core.createWalletWasm(walletData);
        return true;
    }
    catch(e) {
       return e;
    }
}

export const openWallet = async(walletData: IOpenWallet) => {

    try {
        wallet = await core.openWalletWasm();
        return true;
    }
    catch(e) {
        return e;
    }
    
}

export const closeWallet = async() => {

     //@ts-ignore
    return wallet.close();
}

export const getBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:BigInteger =  await wallet.getBalance(accountIdx, subaddressIdx);
    return bigIntegerToBigInt(balance);
}

export const getOffshoreBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:BigInteger = await wallet.getOffshoreBalance(accountIdx, subaddressIdx);
    return bigIntegerToBigInt(balance);
}

export const getUnlockedBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:BigInteger =  await wallet.getUnlockedBalance(accountIdx, subaddressIdx);
    return bigIntegerToBigInt(balance);
}

export const getUnlockedOffshoreBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:BigInteger = await wallet.getUnlockedOffshoreBalance(accountIdx, subaddressIdx);
    return bigIntegerToBigInt(balance);
}

export const getMnemonic = () => {
    return wallet.getMnemonic();
}

export const getPrimaryAddress = async(): Promise<string> => {

    return wallet.getPrimaryAddress();
}

export const getWalletHeight = async() => {

    return wallet.getHeight();
}

export const getNodeHeight = async() => {

    return wallet.getDaemonHeight();
}

export const getChainHeight = async() => {

    return wallet.getDaemonMaxPeerHeight();
}

export const syncWallet = ():Promise<void> => {
 //@ts-ignore
    return wallet.startSyncing();
} 

export const syncAtOnce = () => {
    //@ts-ignore
    return wallet.sync();
}

export const transfer = async (txConfig: Partial<ITxConfig>): Promise<MoneroTxWallet[]> => {
    //@ts-ignore    
    return wallet.createTxs(txConfig);

}

export const getTransfers = async() => {
    //@ts-ignore    
    return wallet.getTransfers();
} 

export const getTxs = async() => {

    //@ts-ignore    
    return wallet.getTxs();
}

export const isWalletSynced = async(): Promise<boolean> => {

    return wallet.isSynced()

}

export const isWalletConnected = async(): Promise<boolean> => {

    return wallet.isConnected();

}

export const relayTxs = async(metaDataList: string[]) => {

    return wallet.relayTxs(metaDataList);
}


export const addWalletListener = (dispatch: any, getStore:() => HavenAppState) => {

    const listener = new HavenWalletListener(dispatch, getStore);
    // @ts-ignore 
    wallet.addListener(listener);
}

