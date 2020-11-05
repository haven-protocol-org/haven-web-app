import { ipcMain } from "electron";
import { getWhitespaceTokens } from "haven-wallet-core/src/main/js/common/GenUtils";
import { appEventBus, LOCAL_NODE_STOPPED_EVENT } from "../EventBus";
import { CommunicationChannel, LocalNodeRequest, ProcessState } from "../types";
import { LocalNodeProcess } from "./process/LocalNodeProcess";

export class LocalNodeHandler {
  private localNode: LocalNodeProcess;

  constructor() {
    ipcMain.handle(CommunicationChannel.LocalNode, (event, args) =>
      this.handleRequest(args)
    );
  }

  /**
   * Starts local node process
   */
  public start(): void {
    this.localNode = new LocalNodeProcess();
  }

  /**
   * Terminates local node and removes handler
   */
  public stop(): void {
    ipcMain.removeHandler(CommunicationChannel.LocalNode);

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

  private handleRequest(typeOfRequest: LocalNodeRequest) {
    switch (typeOfRequest) {
      case "start":
        this.start();
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
