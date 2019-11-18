import {isMainnet} from "./env";


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
            'wallet-dir': './',
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
            'wallet-dir': './',
        }

    },

};

export interface IDaemonConfig {
        path:string,
        port:number,
        args:{}
}


export const daemonConfig:{havend: IDaemonConfig, wallet:IDaemonConfig} = isMainnet? daemonConfigMainnet : daemonConfigTestnet;














