import * as path from "path";


const PLATFORM = process.platform;


export const HAVEND_PATH_TESTNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/testnet/havend`)
);
export const HAVEND_PATH_MAINNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/mainnet/havend`)
);

export const HAVEND_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/stagenet/havend`)
);


export const WALLET_RPC_PATH_TESTNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/testnet/haven-wallet-rpc`)
);
export const WALLET_RPC_PATH_MAINNET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/mainnet/haven-wallet-rpc`)
);
export const WALLET_RPC_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/stagenet/haven-wallet-rpc`)
);



function checkForUnpackedPath(path: string) {
    if (!path.includes("app.asar.unpacked")) {
        return path.replace("app.asar", "app.asar.unpacked");
    }
    return path;
}
