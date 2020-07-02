import {
    HAVEND_PATH_MAINNET, HAVEND_PATH_STAGENET,
    HAVEND_PATH_TESTNET,
    WALLET_RPC_PATH_MAINNET, WALLET_RPC_PATH_STAGENET,
    WALLET_RPC_PATH_TESTNET
} from "../../daemons/config/daemonPaths";
import {WALLET_PATH_MAINNET, WALLET_PATH_STAGENET, WALLET_PATH_TESTNET} from "../../wallets/walletPaths";
import {LOCAL_HOST} from "../../daemons/config/config";

export const daemonConfigMainnet = {

    havend: {
        path: HAVEND_PATH_MAINNET,
        daemonUrl: LOCAL_HOST,
        port: 17750,
        args: {}
    },
    wallet: {
        path: WALLET_RPC_PATH_MAINNET,
        daemonUrl: LOCAL_HOST,
        port: 12345,
        args: {
            "rpc-bind-port": 12345,
            "disable-rpc-login": "",
            "wallet-dir": WALLET_PATH_MAINNET,
            // "log-level":"2"
        }
    }
};

export const daemonConfigTestnet = {
    havend: {
        path: HAVEND_PATH_TESTNET,
        daemonUrl: LOCAL_HOST,
        port: 27750,
        args: {
            testnet: "",
            "add-priority-node": "seed01.testnet.havenprotocol.org"
        }
    },
    wallet: {
        path: WALLET_RPC_PATH_TESTNET,
        daemonUrl:LOCAL_HOST,
        port: 12345,
        args: {
            testnet: "",
            "rpc-bind-port": 12345,
            "disable-rpc-login": "",
            "wallet-dir": WALLET_PATH_TESTNET
        }
    }
};


export const daemonConfigStagenet = {
    havend: {
        path: HAVEND_PATH_STAGENET,
        daemonUrl:LOCAL_HOST,
        port:37750,
        args: {
            stagenet: "",
            "add-priority-node": "seed01.stagenet.havenprotocol.org"
        }
    },
    wallet: {
        path: WALLET_RPC_PATH_STAGENET,
        daemonUrl:LOCAL_HOST,
        port: 12345,
        args: {
            stagenet: "",
            "rpc-bind-port": 12345,
            "disable-rpc-login": "",
            "wallet-dir": WALLET_PATH_STAGENET
        }
    }
};
