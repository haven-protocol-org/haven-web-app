import { NetworkType } from "../typings";

export const NET_TYPE_ID = parseInt(process.env.REACT_APP_NET_TYPE_ID!);
export const APP_VERSION = process.env.REACT_APP_VERSION;
export const NET_TYPE_NAME = ["Mainnet", "Testnet", "Stagenet"][NET_TYPE_ID];
export const MODE = process.env.NODE_ENV;

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
  return process.env.REACT_APP_PLATFORM === "web";
};

export const isDesktop = () => {
  return process.env.REACT_APP_PLATFORM === "desktop";
};

export const getPort = () => {
  if (isDevMode()) {
    return isMainnet() ? 17750 : isTestnet() ? 27750 : 37750;
  }
  return 443;
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
