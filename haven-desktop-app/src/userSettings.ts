import * as fs from "fs";
import { config } from "./daemons/config";

export const getAvailableWallets = (): string[] => {
  const walletPath: string = config().wallet.args["wallet-dir"] as string;
  let availableWallets: string[];

  const files = fs.readdirSync(walletPath);

  availableWallets = files
    .filter((file) => file.endsWith(".keys"))

    .map((walletName) => {
      walletName = walletName.replace(".keys", "");
      return walletName;
    });

  return availableWallets;
};
