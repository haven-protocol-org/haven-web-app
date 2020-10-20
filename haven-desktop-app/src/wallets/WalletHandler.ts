import { ipcMain } from "electron";
import * as core from "../../../client/src/shared/core/wallet";
import { CommunicationChannel } from "../types";
import { getAvailableWallets } from "../userSettings";

interface WalletRequest {
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
    ipcMain.handle(CommunicationChannel.STORED_WALLETS, (event, args) =>
      getAvailableWallets()
    );
    ipcMain.handle(CommunicationChannel.WALLET_RPC, (event, args) =>
      this.handleWalletCoreRequest(args as WalletRequest)
    );
  }

  private removeHandlers() {
    ipcMain.removeHandler(CommunicationChannel.STORED_WALLETS);
    ipcMain.removeHandler(CommunicationChannel.WALLET_RPC);
  }

  private handleWalletCoreRequest = (request: WalletRequest) => {
    const methodName: keyof typeof core = request.methodName as keyof typeof core;
    const params = request.params;

    return core[methodName].call(null, ...params);
  };
}
