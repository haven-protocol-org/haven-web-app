import { ipcMain } from "electron";
import { appEventBus, DAEMONS_STOPPED_EVENT } from "../EventBus";
import { CommunicationChannel, DaemonType } from "../types";
import { HavendProcess } from "./havend/HavendProcess";
import { IDaemonManager } from "./IDaemonManager";

export class DaemonHandler {
  private havend: IDaemonManager;

  /**
   * Starts the Havend, WalletRPC processes, and adds ipc handlers
   */
  public startDaemons(): void {
    this.havend = new HavendProcess(DaemonType.havend);

    ipcMain.handle(CommunicationChannel.HAVEND, (event, args) =>
      this.havend.getState()
    );
  }

  /**
   * Terminates the daemon and removes handler
   */
  public stopDaemons(): void {
    ipcMain.removeHandler(CommunicationChannel.HAVEND);

    if (this.havend.isRunning()) {
      this.havend.killDaemon();
    }

    this.checkIfDaemonsQuit();
  }

  public checkIfDaemonsQuit(): void {
    if (this.daemonsKilled()) {
      appEventBus.emit(DAEMONS_STOPPED_EVENT);
      return;
    }

    this.addDaemonsQuitChecker();
  }
  /**
   * Checks if daemons have been killed
   */
  private daemonsKilled(): boolean {
    return this.havend.isRunning() === false;
  }

  /**
   * Validates daemon is killed and emits stop event
   */
  private addDaemonsQuitChecker(): void {
    const i = setInterval(() => {
      if (this.daemonsKilled()) {
        clearInterval(i);
        appEventBus.emit(DAEMONS_STOPPED_EVENT);
      }
    }, 500);
  }
}
