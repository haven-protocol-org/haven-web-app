/**
 * responsible to wire everything together
 */

import { BrowserWindow } from "electron";
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import * as path from "path";
import { checkAndCreateDaemonConfig } from "./daemons/config/config";
import { DaemonHandler } from "./daemons/DaemonHandler";
import { appEventBus, DAEMONS_STOPPED_EVENT } from "./EventBus";
import { WalletHandler } from "./wallets/WalletHandler";
import { checkAndCreateWalletDir } from "./wallets/walletPaths";

export class HavenWallet {
  private _isRunning: boolean = false;

  private walletHandler: WalletHandler = new WalletHandler();
  private daemonHandler: DaemonHandler = new DaemonHandler();

  private shutDownWindow: BrowserWindow;
  private requestShutDown: boolean = false;

  /**
   * Initializes the wallet by creating wallet dir, starting the Daemon, and initializing wallet handlers
   */
  public start(): void {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true;

    checkAndCreateWalletDir();
    checkAndCreateDaemonConfig();

    this.daemonHandler.startDaemons();
    this.walletHandler.start();
  }

  public quit() {
    this.requestShutDown = true;
    this.showShutDownWindow();
    this.daemonHandler.stopDaemons();
    this.walletHandler.quit();
    this._isRunning = false;
  }

  /**
   * display shut down window and once stop event is emitted destroys the window
   */
  private showShutDownWindow() {
    const shutDownConctruction: BrowserWindowConstructorOptions = {
      width: 500,
      height: 280,
      center: true,
      alwaysOnTop: true,
      closable: true,
      resizable: false,
      movable: true,
      frame: false,
      fullscreenable: false,
      kiosk: true,
    };
    this.shutDownWindow = new BrowserWindow(shutDownConctruction);
    this.shutDownWindow.loadURL(
      path.join(`file://${__dirname}`, "../sites/shutdown/index.html")
    );

    this.shutDownWindow.on("ready-to-show", () => {
      this.shutDownWindow.show();
    });

    appEventBus.once(DAEMONS_STOPPED_EVENT, () =>
      this.shutDownWindow.destroy()
    );
  }
}
