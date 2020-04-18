import * as path from "path";
import {APP_DATA_PATH, isMainnet} from "../env";
import * as fs from "fs";


const MAINNET_WALLET_PATH = "/wallet/main";
const TESTNET_WALLET_PATH = "/wallet/test";
const STAGENET_WALLET_PATH = "/wallet/stage";

const PLATFORM = process.platform;

export const WALLET_PATH_TESTNET: string = path.join(
    APP_DATA_PATH,
    TESTNET_WALLET_PATH
);
export const WALLET_PATH_MAINNET: string = path.join(
    APP_DATA_PATH,
    MAINNET_WALLET_PATH
);

export const WALLET_PATH_STAGENET: string = path.join(
    APP_DATA_PATH,
    STAGENET_WALLET_PATH
);


export const HAVEND_PATH_TESTNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/testnet/havend`)
);
export const HAVEND_PATH_MAINNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/mainnet/havend`)
);

export const HAVEND_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/stagenet/havend`)
);


export const WALLET_RPC_PATH_TESTNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/testnet/haven-wallet-rpc`)
);
export const WALLET_RPC_PATH_MAINNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/mainnet/haven-wallet-rpc`)
);
export const WALLET_RPC_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../../haven-node/${PLATFORM}/stagenet/haven-wallet-rpc`)
);



export const checkAndCreateWalletDir = () => {
    if (isMainnet()) {
        if (!fs.existsSync(WALLET_PATH_MAINNET)) {
            fs.mkdirSync(WALLET_PATH_MAINNET, { recursive: true });
        }
    } else {
        if (!fs.existsSync(WALLET_PATH_TESTNET)) {
            fs.mkdirSync(WALLET_PATH_TESTNET, { recursive: true });
        }
    }
};

function checkForUnpackedPath(path: string) {
    if (!path.includes("app.asar.unpacked")) {
        return path.replace("app.asar", "app.asar.unpacked");
    }
    return path;
}
