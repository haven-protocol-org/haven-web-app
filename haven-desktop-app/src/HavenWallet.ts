/**
 * responsible to wire everything together
 */

import { IPCHandler } from "./ipc/IPCHandler";
import { CommunicationChannel, DaemonsState } from "./ipc/types";
import { ipcMain } from "electron";
import { getNetType, NET, setNetType } from "./env";
import { DaemonHandler } from "./daemons/DaemonHandler";
import { checkAndCreateWalletDir } from "./daemons/daemonPaths";
import { appEventBus } from "./EventBus";

export const DAEMONS_STOPPED_EVENT: string = "daemons_stopped_event";

export class HavenWallet {
  private _isRunning: boolean = false;

  private ipcHandler: IPCHandler = new IPCHandler();
  private daemonHandler: DaemonHandler = new DaemonHandler();

  private isSwitchingNet: boolean = false;
  private requestShutDown: boolean = false;

  public start() {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true;

    checkAndCreateWalletDir();

    this.daemonHandler.startDaemons();
    this.ipcHandler.start();

    this.addDaemonStateHandling();
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
    this.daemonHandler.stopDaemons();
    this.ipcHandler.quit();
    this.removeDaemonStateHandling();
    this._isRunning = false;
  }

  private addDaemonStateHandling() {
    ipcMain.handle(CommunicationChannel.DAEMON, (event, args) =>
      this.onDaemonStateRequest()
    );
  }

  private addNetworkSwitchHandling() {
    ipcMain.handle(CommunicationChannel.SWITCH_NET, (event, args) =>
      this.onSwitchNetwork(args)
    );
  }

  private removeDaemonStateHandling() {
    ipcMain.removeHandler(CommunicationChannel.DAEMON);
  }

  private onDaemonStateRequest(): DaemonsState {
    return this.daemonHandler.getDaemonsState();
  }
}
