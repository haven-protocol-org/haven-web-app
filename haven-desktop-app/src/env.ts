import { app } from "electron";

export enum NET {
  Mainnet = 0,
  Testnet = 1,
  Stagenet = 2,
}

export const APP_DATA_PATH = app.getPath("userData");
export const isDevMode = process.env.HAVEN_DESKTOP_DEVELOPMENT;

let NET_TYPE_ID: NET = parseInt(process.env.NET_TYPE_ID);

export const isMainnet = () => NET_TYPE_ID === NET.Mainnet;
export const isStagenet = () => NET_TYPE_ID === NET.Stagenet;
export const isTestnet = () => NET_TYPE_ID === NET.Testnet;

export const getNetType = () => {
  return NET_TYPE_ID;
};

export const setNetType = (netType: NET) => {
  if (netType in NET) {
    NET_TYPE_ID = netType;
  }
};
