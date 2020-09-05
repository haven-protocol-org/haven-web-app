

import * as core from "haven-wallet-core";
import MoneroWalletWasm from "haven-wallet-core/src/main/js/wallet/MoneroWalletWasm";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import MoneroWalletConfig from "haven-wallet-core/src/main/js/wallet/model/MoneroWalletConfig";
import bigInt from "big-integer";
import { ICreateWallet, IOpenWallet } from "typings";
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
    const balance:bigInt.BigInteger =  await wallet.getBalance(accountIdx, subaddressIdx);
    return balance;
}

export const getOffshoreBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:bigInt.BigInteger = await wallet.getOffshoreBalance(accountIdx, subaddressIdx);
    return balance;
}

export const getUnlockedBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:bigInt.BigInteger =  await wallet.getUnlockedBalance(accountIdx, subaddressIdx);
    return balance;
}

export const getUnlockedOffshoreBalance = async (accountIdx: number | undefined = undefined, subaddressIdx: number | undefined = undefined) => {

    if (!wallet) {

        throw Error('no wallet exist')
    }
    //@ts-ignore
    const balance:bigInt.BigInteger = await wallet.getUnlockedOffshoreBalance(accountIdx, subaddressIdx);
    return balance;
}

export const transfer = async () => {


}

export const onshore = async() => {


}

export const offshore = async() => {


}



const BigIntegerToBigInt = (value: BigInteger):bigInt.BigInteger => {

        return  bigInt(value.toString(10));


}
