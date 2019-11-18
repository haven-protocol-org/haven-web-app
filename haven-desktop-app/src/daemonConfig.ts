import {isMainnet} from "./env";
import { app } from 'electron';
import * as fs  from 'fs';

const MAINNET_WALLET_PATH = '/wallet/main';
const TESTNET_WALLET_PATH = '/wallet/test';


const pathToAppLib = app.getPath('userData');


if (isMainnet) {

    if (!fs.existsSync(pathToAppLib + MAINNET_WALLET_PATH)) {
        fs.mkdir(pathToAppLib + MAINNET_WALLET_PATH, (error)=> console.log(error));
    }
} else {

    if (!fs.existsSync(pathToAppLib + TESTNET_WALLET_PATH)) {

        fs.mkdir(pathToAppLib + TESTNET_WALLET_PATH, (error)=> console.log(error));
    }
}



const daemonConfigMainnet = {

    havend: {
        path:"../haven-node/mainnet/havend",
        port:17750,
        args:{
            'mainnet':'',
            'rpc-bind-port': 17750,
        }
    },
    wallet: {
        path:"../haven-node/mainnet/haven-wallet-rpc",
        port:12345,
        args: {

            'mainnet':'',
            'rpc-bind-port': 12345,
            'disable-rpc-login': '',
            'wallet-dir': pathToAppLib + MAINNET_WALLET_PATH,
        }
    }

};

const daemonConfigTestnet = {

    havend: {
        path:"./haven-node/testnet/havend",
        port:27750,
        args:{
            'testnet':'',
            'rpc-bind-port': 27750,
        }
    },
    wallet: {
        path:"./haven-node/testnet/haven-wallet-rpc",
        port:12345,
        args: {

            'testnet':'',
            'rpc-bind-port': 12345,
            'disable-rpc-login': '',
            'wallet-dir': pathToAppLib + TESTNET_WALLET_PATH,
        }

    },

};

export interface IDaemonConfig {
        path:string,
        port:number,
        args:{}
}

export const daemonConfig:{havend: IDaemonConfig, wallet:IDaemonConfig} = isMainnet? daemonConfigMainnet : daemonConfigTestnet;














