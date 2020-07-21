import { logInDevMode } from "../../dev";
import { isDevMode } from "../../env";
import { appEventBus, HAVEND_LOCATION_CHANGED } from "../../EventBus";
import { RPCRequestObject } from "../../rpc/RPCHRequestHandler";
import { IDaemonConfig, ThreeState, WalletState } from "../../types";
import { config, getLocalDaemon } from "../config/config";
import { DaemonProcess } from "../DaemonProcess";

const SYNC_HEIGHT_REGEX = /.*D.*height (.*),/gm;
const NO_CONNECTION_MESSAGE = "error::no_connection_to_daemon";
const REFRESH_DONE_MESSAGE = "Refresh done";
const CONNECTION_TO_DAEMON_SUCCESS = "SSL handshake success";

export class WalletRPCProcess extends DaemonProcess {
  private isConnectedToDaemon: ThreeState = ThreeState.Unset;
  private isSyncing: boolean;
  private syncHeight: number;
  private isReachable: boolean;

  public init(): void {
    super.init();
    this.startLocalProcess();
  }

  public setRPCHandler(): void {
    const config = this.getConfig();

    // wallet-rpc is always local - never remote
    this.rpcHandler.port = config.port;
  }

  public onDaemonError(error: Error): void {
    super.onDaemonError(error);
  }

  public onstderrData(chunk: any): void {
    if (isDevMode) {
      console.error("wallet stderr : " + chunk.toString());
    }
  }

  public onstdoutData(chunk: any): void {
    if (isDevMode) {
      console.error("wallet stdout : " + chunk.toString());
    }

    if (chunk.toString().includes(CONNECTION_TO_DAEMON_SUCCESS)) {
      this.isConnectedToDaemon = ThreeState.True;
      if (isDevMode) {
        //   console.error("wallet stdout : " + chunk.toString());
      }
    }

    if (chunk.toString().includes(NO_CONNECTION_MESSAGE)) {
      this.isConnectedToDaemon = ThreeState.False;
      if (isDevMode) {
        console.error("wallet stdout : " + chunk.toString());
      }
    }

    if (this._isHavendLocal) {
      return;
    }

    let m;
    while ((m = SYNC_HEIGHT_REGEX.exec(chunk.toString())) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === SYNC_HEIGHT_REGEX.lastIndex) {
        SYNC_HEIGHT_REGEX.lastIndex++;
      }

      // The result can be accessed through the 'm'-variable.
      m.forEach((match, groupIndex) => {
        logInDevMode("Found match, group" + groupIndex + " : " + match);
        this.isConnectedToDaemon = ThreeState.True;
        this.isSyncing = true;
        this.syncHeight = Number(match);
      });
    }

    if ((chunk as string).includes(REFRESH_DONE_MESSAGE)) {
      this.isSyncing = false;
    }
  }

  public async requestHandler(requestObject: RPCRequestObject): Promise<any> {
    try {
      const response = await this.rpcHandler.sendRequest(requestObject);

      const setsDaemon = requestObject.method === "set_daemon";

      if (setsDaemon) {
        const { address } = requestObject.params;
        logInDevMode("Set daemon to " + address);
        // if that was a successfull daemon change we are disconnected to a daemon right away
        this.isConnectedToDaemon = ThreeState.Unset;

        // if address is empty we use the local daemon
        if (address === "") {
          requestObject.params.address = getLocalDaemon();
          appEventBus.emit(HAVEND_LOCATION_CHANGED, getLocalDaemon());
        } else {
          appEventBus.emit(HAVEND_LOCATION_CHANGED, address);
        }
      }

      this.isReachable = true;
      return response.data;
    } catch (e) {
      if (isDevMode) {
        console.log("Wallet rpc isn't reachable");
      }
      this.isReachable = false;
      const message = this._isRunning
        ? "Vault is busy, wait and retry"
        : "Vault is not running";
      return { error: { message } } as any;
    }
  }

  public getConfig(): IDaemonConfig {
    return config().wallet;
  }

  public getState(): WalletState {
    return {
      isRunning: this._isRunning,
      isConnectedToDaemon: this.isConnectedToDaemon,
      isSyncing: this.isSyncing,
      syncHeight: this.syncHeight,
      isReachable: this.isReachable,
    };
  }

  public onHavendLocationChanged(address: string): void {
    super.onHavendLocationChanged(address);
  }
}
