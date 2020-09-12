

import * as core from "haven-wallet-core";
import MoneroWalletWasm from "haven-wallet-core/src/main/js/wallet/MoneroWalletWasm";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import bigInt from "big-integer";
import { ICreateWallet, IOpenWallet } from "typings";
import { HavenWalletListener } from "shared/actions/walletListener";
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

// export const get

export const transfer = async () => {


}

export const onshore = async() => {


}

export const offshore = async() => {


}


export const addWalletListener = (dispatch: any) => {

    const listener = new HavenWalletListener(dispatch);
    wallet.addListener(listener);
}



const bigIntegerToBigInt = (value: BigInteger):bigInt.BigInteger => {

        return  bigInt(value.toString(10));

}
