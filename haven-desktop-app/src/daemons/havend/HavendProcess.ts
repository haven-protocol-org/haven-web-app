import { isDevMode } from "../../env";
import { HavendState, IDaemonConfig, NodeLocation } from "../../types";
import { config } from "../config/config";
import { DaemonProcess } from "../DaemonProcess";

export class HavendProcess extends DaemonProcess {
  private isReachable: boolean = true;

  public init(): void {
    this.checkHavendLocationToggle();
  }

  public getConfig(): IDaemonConfig {
    return config().havend;
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
