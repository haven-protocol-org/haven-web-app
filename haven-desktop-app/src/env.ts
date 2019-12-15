import {app} from "electron";

export enum NET {
    Mainnet=0,
    Testnet=1
}

export const NET_TYPE_ID = parseInt(process.env.NET_TYPE_ID);
export const isMainnet = NET_TYPE_ID === NET.Mainnet;
export const APP_DATA_PATH = app.getPath('userData');
export const isDevMode = process.env.HAVEN_DESKTOP_DEVELOPMENT;
