import * as fs from "fs";
import * as path from "path";
import { APP_DATA_PATH } from "../env";
import { NET } from "../types";

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
const checkAndCreateWalletDir = (path: string) => {

    if (!fs.existsSync(path)) {
      fs.mkdirSync(WALLET_PATH_MAINNET, { recursive: true });
    }
};

const getWalletPath = (netTypeId: NET) => {
  const path = [WALLET_PATH_MAINNET, WALLET_PATH_TESTNET, WALLET_PATH_STAGENET][netTypeId];
  checkAndCreateWalletDir(path);
  return path;

};


export const getAvailableWallets = (netTypeId: NET): {
  storePath: string;
  wallets: string[];
} => {
  const walletPath: string = getWalletPath(netTypeId);
  let availableWallets: string[];

  const files = fs.readdirSync(walletPath);

  availableWallets = files
    .filter((file) => file.endsWith(".keys"))

    .map((walletName) => {
      walletName = walletName.replace(".keys", "");
      return walletName;
    });

  return {
    storePath: walletPath,
    wallets: availableWallets,
  };
};
