import * as path from "path";
import {getNetTypeName} from "./env";
import {DaemonType} from "./types";


const PLATFORM = process.platform;



function checkForUnpackedPath(path: string) {
    if (!path.includes("app.asar.unpacked")) {
        return path.replace("app.asar", "app.asar.unpacked");
    }
    return path;
}


export const getLocalDaemonPath  = (type: DaemonType) => {
    if (type === DaemonType.havend) {

       return  checkForUnpackedPath(
            path.resolve(__dirname, `../haven-node/${PLATFORM}/${getNetTypeName()}/havend`),
        );

    } else if (type === DaemonType.wallet) {

        return  checkForUnpackedPath(
            path.resolve(__dirname, `../haven-node/${PLATFORM}/${getNetTypeName()}/haven-wallet-rpc`),
        );
    }
};
