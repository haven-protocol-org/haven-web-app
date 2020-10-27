import { ipcMain } from "electron";
import * as core from "../shared/wallet";
import { logInDevMode } from "../dev";
import { mainWindow } from "../index";
import { CommunicationChannel } from "../types";
import { getAvailableWallets } from "../userSettings";
import { HavenWalletListener } from "./HavenWalletListener";
import MoneroTxWallet = require("haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet");

export interface WalletRequest {
  methodName: string;
  params: any[];
}

/**
 * this class establishes the communication between client app and wallet
 */
export class WalletHandler {
  public start() {
    this.addHandlers();
  }

  public quit() {
    this.removeHandlers();
  }

  private addHandlers() {
    logInDevMode("handlers added");
    ipcMain.handle(CommunicationChannel.STORED_WALLETS, (event, args) =>
      getAvailableWallets()
    );
    ipcMain.handle(CommunicationChannel.WALLET, (event, args) =>
      this.handleWalletCoreRequest(args as WalletRequest)
    );
  }

  private removeHandlers() {
    logInDevMode("handlers removed");
    ipcMain.removeHandler(CommunicationChannel.STORED_WALLETS);
    ipcMain.removeHandler(CommunicationChannel.WALLET);
  }

  private handleWalletCoreRequest = async (request: WalletRequest) => {
    console.log(request);
    const methodName: keyof typeof core = request.methodName as keyof typeof core;
    const params = request.params;

    if (methodName === "addWalletListener") {
      addWalletListener();
      return;
    }

    if (methodName === "getTxs") {
      let txs = await core[methodName].call(null, ...params);
      txs = txs.map((tx: MoneroTxWallet) => tx.toJson());
      return txs;
    }

    return core[methodName].call(null, ...params);
  };
}

const addWalletListener = () => {
  const listener = new HavenWalletListener(mainWindow.webContents);
  core.addWalletListener(listener);
};
