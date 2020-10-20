import { NetworkType } from "../typings";

export const NET_TYPE_ID = parseInt(process.env.REACT_APP_NET_TYPE_ID!);
export const APP_VERSION = process.env.REACT_APP_VERSION;
export const NET_TYPE_NAME = process.env.REACT_APP_NET_TYPE_NAME;
export const MODE = process.env.NODE_ENV;
export const PLATFORM = process.env.REACT_APP_PLATFORM;

export const DEV_MODE = "development";
export const PRODUCTION_MODE = "production";

export const isMainnet = () => {
  return NET_TYPE_ID === NetworkType.mainnet;
};

export const isTestnet = () => {
  return NET_TYPE_ID === NetworkType.testnet;
};

export const isDevMode = () => {
  return DEV_MODE === MODE;
};

export const isWeb = () => {
  return PLATFORM === "web";
};

export const isDesktop = () => {
  return PLATFORM === "desktop";
};

export const getPort = () => {
  return isMainnet() ? 17750 : isTestnet() ? 27750 : 37750;
};

let apiUrl;

if (isWeb()) {
  apiUrl = isDevMode()
    ? process.env.REACT_APP_API_URL_DEVELOP
    : process.env.REACT_APP_API_URL;
}

export const getNetworkByName = (): string => {
  return ["mainnet", "testnet", "stagenet"][NET_TYPE_ID];
};

export const API_URL = apiUrl;
