import * as fs from "fs";
import * as path from "path";
import { APP_DATA_PATH, isMainnet, isStagenet, isTestnet } from "../env";

const MAINNET_WALLET_PATH = "/wallet/main";
const TESTNET_WALLET_PATH = "/wallet/test";
const STAGENET_WALLET_PATH = "/wallet/stage";
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
export const checkAndCreateWalletDir = () => {
  if (isMainnet()) {
    if (!fs.existsSync(WALLET_PATH_MAINNET)) {
      fs.mkdirSync(WALLET_PATH_MAINNET, { recursive: true });
    }
  }
  if (isTestnet()) {
    if (!fs.existsSync(WALLET_PATH_TESTNET)) {
      fs.mkdirSync(WALLET_PATH_TESTNET, { recursive: true });
    }
  }
  if (isStagenet()) {
    if (!fs.existsSync(WALLET_PATH_STAGENET)) {
      fs.mkdirSync(WALLET_PATH_STAGENET, { recursive: true });
    }
  }
};

export const getWalletPath = () => {
  return isMainnet()
    ? WALLET_PATH_MAINNET
    : isTestnet()
    ? WALLET_PATH_TESTNET
    : WALLET_PATH_STAGENET;
};
