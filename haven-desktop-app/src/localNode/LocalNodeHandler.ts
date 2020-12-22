import { ipcMain } from "electron";
 import { appEventBus, LOCAL_NODE_STOPPED_EVENT } from "../EventBus";
import { CommunicationChannel, LocalNodeRequest, NET, ProcessState } from "../types";
import { LocalNodeProcess } from "./process/LocalNodeProcess";

export class LocalNodeHandler {
  private localNode: LocalNodeProcess;

  constructor() {
    this.localNode = new LocalNodeProcess();
    ipcMain.handle(CommunicationChannel.LOCALNODE, (event, typeOfRequest, netTypeId?) =>
      this.handleRequest(typeOfRequest,netTypeId),
    );
  }

  /**
   * Starts local node process
   */
  public start(netTypeId: NET): void {
    this.localNode.setNetypId(netTypeId);
    this.localNode.startLocalProcess();
  }

  /**
   * Terminates local node and removes handler
   */
  public stop(): void {
    ipcMain.removeHandler(CommunicationChannel.LOCALNODE);

    if (this.localNode.isRunning()) {
      this.localNode.killDaemon();
    }

    this.checkIfDaemonsQuit();
  }

  public checkIfDaemonsQuit(): void {
    if (this.daemonsKilled()) {
      appEventBus.emit(LOCAL_NODE_STOPPED_EVENT);
      return;
    }

    this.addDaemonsQuitChecker();
  }

  private handleRequest(typeOfRequest: LocalNodeRequest, netTypeId?: NET) {
    switch (typeOfRequest) {
      case "start":
        this.start(netTypeId);
        return true;
      case "stop":
        this.stop();
        return true;
      case "state":
        return this.getLocalNodeState();
    }
  }

  private getLocalNodeState(): ProcessState {
    return this.localNode.getState();
  }
  /**
   * Checks if daemons have been killed
   */
  private daemonsKilled(): boolean {
    return this.localNode.isRunning() === false;
  }

  /**
   * Validates daemon is killed and emits stop event
   */
  private addDaemonsQuitChecker(): void {
    const i = setInterval(() => {
      if (this.daemonsKilled()) {
        clearInterval(i);
        appEventBus.emit(LOCAL_NODE_STOPPED_EVENT);
      }
    }, 500);
  }
}
