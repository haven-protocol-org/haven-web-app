import { isDevMode } from "../../env";
import { RPCRequestObject } from "../../rpc/RPCHRequestHandler";
import { HavendState, IDaemonConfig, NodeLocation } from "../../types";
import { config } from "../config/config";
import { DaemonProcess } from "../DaemonProcess";

export class HavendProcess extends DaemonProcess {
  private isReachable: boolean = true;

  public init(): void {
    super.init();
    this.checkHavendLocationToggle();
  }

  public setRPCHandler(): void {
    const config = this.getConfig();
    this.rpcHandler.setFullUrl(config.daemonUrl);
  }

  public getConfig(): IDaemonConfig {
    return config().havend;
  }

  public async requestHandler(requestObject: RPCRequestObject): Promise<any> {
    let connectionRefused = false;

    try {
      const response = await this.rpcHandler.sendRequest(requestObject);
      return response.data;
    } catch (e) {
      connectionRefused = true;
      if (isDevMode) {
        console.log("havend seems not reachable");
        console.log(e.code);
      }

      const message = this._isRunning
        ? "Local node is too busy"
        : "Local node is not running";
      return { error: { message } } as any;
    } finally {
      this.isReachable = !connectionRefused;
    }
  }

  public checkHavendLocationToggle() {
    if (!this._isHavendLocal && this._isRunning) {
      this.killDaemon();
    } else if (this._isHavendLocal && !this._isRunning) {
      this.startLocalProcess();
    }
  }

  public getState(): HavendState {
    return {
      isRunning: this._isRunning,
      isReachable: this.isReachable,
      location: this._isHavendLocal ? NodeLocation.Local : NodeLocation.Remote,
      address: this.getConfig().daemonUrl,
    };
  }

  public onDaemonError(error: Error): void {
    super.onDaemonError(error);
  }

  public onstderrData(chunk: any): void {
    if (isDevMode) {
      console.error("havend stderr : " + chunk.toString());
    }
  }

  public onstdoutData(chunk: any): void {
    if (isDevMode) {
      console.error("havend stdout : " + chunk.toString());
    }
  }

  protected onHavendLocationChanged(address: string): void {
    super.onHavendLocationChanged(address);
    // and start or stop the local process
    this.checkHavendLocationToggle();
  }
}
