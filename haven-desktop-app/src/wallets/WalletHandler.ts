import { ipcMain } from "electron";
import { CommunicationChannel } from "../types";
import { getAvailableWallets } from "../userSettings";

/**
 * this class establishes the communication between client app and daemons
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
      this.handleWalletRequest(),
    );
  }

  private removeHandlers() {
    ipcMain.removeHandler(CommunicationChannel.STORED_WALLETS);
  }

  private handleWalletRequest() {
    return getAvailableWallets();
  }
}
