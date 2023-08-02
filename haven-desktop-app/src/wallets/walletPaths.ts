import * as fs from "fs";
import * as path from "path";
import { APP_DATA_PATH } from "../env";
import { NET } from "../types";

const oldPaths = ["/xvault3/main", "/xvault3/test","/xvault3/stage"];
const newPaths = ["/xvault4/main", "/xvault4/test","/xvault4/stage"];

const getOldWalletPath = (netTypeId: NET) => {

    return path.join(APP_DATA_PATH, oldPaths[netTypeId]);
}

const getWalletPath = (netTypeId: NET) => {
  return path.join(APP_DATA_PATH, newPaths[netTypeId]);
}

const getOrConstructWalletPath = (netTypeId: NET) => {

  const walletPath = getWalletPath(netTypeId);
  if (!fs.existsSync(walletPath)) {
    // create new wallet folder
    fs.mkdirSync(walletPath, { recursive: true });

    //check for old wallet folder and copy over keys files
    const oldPath = getOldWalletPath(netTypeId);

    if (fs.existsSync(oldPath)) {

      const oldWallets = fs.readdirSync(oldPath);

      const keyFiles = oldWallets
        .filter((file: string) => file.endsWith(".keys"))

        for (const file of keyFiles) {

          const oldFile = path.join(oldPath, file);
          const newFile = path.join(walletPath, file)
          fs.copyFileSync(oldFile, newFile);
        }
    }
  }
  return walletPath;
};


export const getAvailableWallets = (netTypeId: NET): {
  storePath: string;
  wallets: string[];
} => {
  const walletPath: string = getOrConstructWalletPath(netTypeId);
  let availableWallets: string[];

  const files = fs.readdirSync(walletPath);

  availableWallets = files
    .filter((file: string) => file.endsWith(".keys"))

    .map((walletName: string) => {
      walletName = walletName.replace(".keys", "");
      return walletName;
    });

  return {
    storePath: walletPath,
    wallets: availableWallets,
  };
};
