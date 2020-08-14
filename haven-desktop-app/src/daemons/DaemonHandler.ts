import { BrowserWindow, ipcMain } from "electron";
import { DAEMON_METHODS, WALLET_METHODS } from "../daemons/enum";
import { appEventBus, DAEMONS_STOPPED_EVENT } from "../EventBus";
import { RPCRequestObject } from "../rpc/RPCHRequestHandler";
import { CommunicationChannel, DaemonType } from "../types";
import { HavendProcess } from "./havend/HavendProcess";
import { IDaemonManager } from "./IDaemonManager";
import { WalletRPCProcess } from "./wallet-rpc/WalletRPCProcess";

export class DaemonHandler {
  private havend: IDaemonManager;
  private rpcWallet: IDaemonManager;

  /**
   * Starts the HavenD, WalletRPC processes, and adds ipc handlers
   */
  public startDaemons(): void {
    this.havend = new HavendProcess(DaemonType.havend);
    this.rpcWallet = new WalletRPCProcess(DaemonType.wallet);

    ipcMain.handle(CommunicationChannel.HAVEND, (event, args) =>
      this.havend.getState(),
    );
    ipcMain.handle(CommunicationChannel.WALLET_RPC, (event, args) =>
      this.rpcWallet.getState(),
    );
    ipcMain.handle(CommunicationChannel.RPC, (event, args) =>
      this.requestHandler(args),
    );
  }

  /**
   * Terminates the daemons and removes handlers
   */
  public stopDaemons(): void {
    ipcMain.removeHandler(CommunicationChannel.HAVEND);
    ipcMain.removeHandler(CommunicationChannel.WALLET_RPC);
    ipcMain.removeHandler(CommunicationChannel.RPC);

    if (this.havend.isRunning()) {
      this.havend.killDaemon();
    }

    if (this.rpcWallet.isRunning()) {
      this.rpcWallet.killDaemon();
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
   * Takes in a request and delegates it to the appropriate handler
   * @param requestObject
   */
  private requestHandler(requestObject: RPCRequestObject): Promise<any> {
    const isWalletMethod = WALLET_METHODS.some(
      (walletMethod: string) => walletMethod === requestObject.method,
    );

    if (isWalletMethod) {
      return this.rpcWallet.requestHandler(requestObject);
    }

    const isHavendMethod = DAEMON_METHODS.some(
      (havendMethod: string) => havendMethod === requestObject.method,
    );

    if (isHavendMethod) {
      return this.havend.requestHandler(requestObject);
    }
    return { data: { error: "method not found" } } as any;
  }

  /**
   * Checks if daemons have been killed
   */
  private daemonsKilled(): boolean {
    return (
      this.rpcWallet.isRunning() === false && this.havend.isRunning() === false
    );
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
