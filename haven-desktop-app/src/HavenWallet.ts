/**
 * responsible to wire everything together
 */

import {WalletHandler} from "./wallets/WalletHandler";
import {CommunicationChannel} from "./types";
import {BrowserWindow, ipcMain} from "electron";
import {getNetType, NET, setNetType} from "./env";
import {DaemonHandler} from "./daemons/DaemonHandler";
import {checkAndCreateWalletDir} from "./wallets/walletPaths";
import {appEventBus, DAEMONS_STOPPED_EVENT} from "./EventBus";
import {checkAndCreateDaemonConfig} from "./daemons/config/config";
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import * as path from "path";

export class HavenWallet {
  private _isRunning: boolean = false;

  private walletHandler: WalletHandler = new WalletHandler();
  private daemonHandler: DaemonHandler = new DaemonHandler();

  private isSwitchingNet: boolean = false;
  private requestShutDown: boolean = false;
  private shutDownWindow:BrowserWindow;


  public start() {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true;

    checkAndCreateWalletDir();
    checkAndCreateDaemonConfig();

    this.daemonHandler.startDaemons();
    this.walletHandler.start();

  }

  private onSwitchNetwork(netType: NET) {
    if (!(netType in NET)) {
      return;
    }

    //for the case clients is doing dumb stuff
    if (this.isSwitchingNet) {
      return;
    }

    // no need to switch
    if (netType === getNetType()) {
      return;
    }

    this.isSwitchingNet = true;
    setNetType(netType);
    appEventBus.once(DAEMONS_STOPPED_EVENT, () => this.start());
    this.quit();
  }

  public quit() {
    this.requestShutDown = true;
    this.showShutDownWindow();
    this.daemonHandler.stopDaemons();
    this.walletHandler.quit();
    this._isRunning = false;
  }



  private addNetworkSwitchHandling() {
    ipcMain.handle(CommunicationChannel.SWITCH_NET, (event, args) =>
      this.onSwitchNetwork(args)
    );
  }


  private showShutDownWindow() {

    const shutDownConctruction: BrowserWindowConstructorOptions = {

      width:400,
      height:200,
      center: true,
      alwaysOnTop: true,
      closable: true,
      resizable: false,
      movable: false,
      frame: false,
      fullscreenable: false,
      kiosk: true
    };
    this.shutDownWindow = new BrowserWindow(shutDownConctruction);
    this.shutDownWindow.loadURL(path.join(`file://${__dirname}`, "../sites/shutdown/index.html"));

    this.shutDownWindow.on("ready-to-show", () => {
      this.shutDownWindow.show();
    });

    appEventBus.once(DAEMONS_STOPPED_EVENT, () => this.shutDownWindow.destroy());
  }


}
