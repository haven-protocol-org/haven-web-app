import { ipcMain } from "electron";
import * as core from "../shared/wallet";
import * as daemon from "../shared/havend";
import { logInDevMode } from "../dev";
import { mainWindow } from "../index";
import { CommunicationChannel, NET } from "../types";
import { getAvailableWallets } from "./walletPaths";
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

    ipcMain.handle(CommunicationChannel.STORED_WALLETS, (event, netTypeID: NET) =>
       getAvailableWallets(netTypeID),
    );
    ipcMain.handle(CommunicationChannel.WALLET, (event, args) =>
      this.handleWalletCoreRequest(args as WalletRequest),
    );
    ipcMain.handle(CommunicationChannel.DAEMON, (event, args) =>
      this.handleDaemonCoreRequest(args as WalletRequest),
    );
  }

  private removeHandlers() {
    ipcMain.removeHandler(CommunicationChannel.WALLET);
    ipcMain.removeHandler(CommunicationChannel.DAEMON);
    ipcMain.removeHandler(CommunicationChannel.STORED_WALLETS);
  }

  private handleWalletCoreRequest = async (request: WalletRequest) => {
    const methodName: keyof typeof core = request.methodName as keyof typeof core;
    const params = request.params;

    if (methodName === "addWalletListener") {
      this.addWalletListener();
      return;
    }

    try {

    if (methodName === "getTxs") {
      const txClassObjects = await core[methodName].call(null, ...params);
      const txJsonObjects = txClassObjects.map((tx: MoneroTxWallet) => {
        // little workaround to preserve block data ( height, timestamp ) in tx
        const block = tx.getBlock().toJson();
        delete block.txs;
        const txJson = tx.toJson();
        txJson.block = block;
        return txJson;
      });
      return txJsonObjects;
    }

    if (methodName === "transfer") {
      const txClassObjects = await core[methodName].call(null, ...params);
      const txJsonObjects = txClassObjects.map((tx: MoneroTxWallet) => {
        // serialize tx data
        return tx.toJson();
      });
      return txJsonObjects;
    }
    return core[methodName].call(null, ...params);
  }
  catch(e) {
    return e;
  }

  };

  private handleDaemonCoreRequest = async (request: WalletRequest) => {
    const methodName: keyof typeof daemon = request.methodName as keyof typeof daemon;
    const params = request.params;

   logInDevMode(request);

    try {
       const response = await daemon[methodName].call(null, ...params);
      if (response.toJson) {
        logInDevMode('response will be serialzed');
        const jsonResponse = response.toJson();
        logInDevMode(jsonResponse);
        return jsonResponse;
      }

       return response;
    }
    catch (e) {
      logInDevMode(e);
      return e;
    }

  };


  addWalletListener = () => {

    const listener = new HavenWalletListener(mainWindow.webContents);
    core.addWalletListener(listener);
  };


}


