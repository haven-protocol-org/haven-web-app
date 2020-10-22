import { ChildProcess, spawn } from "child_process";
import { dialog } from "electron";
import { getLocalDaemonPath } from "../daemonPaths";
import {
  isLocalDaemon,
  updateDaemonUrlInConfig,
} from "../daemons/config/config";
import { isDevMode } from "../env";
import { appEventBus, HAVEND_LOCATION_CHANGED } from "../EventBus";
import { DaemonType, IDaemonConfig } from "../types";
import { IDaemonManager } from "./IDaemonManager";

export abstract class DaemonProcess implements IDaemonManager {
  protected type: DaemonType;
  protected filePath: string;
  protected startArgs: object;
  protected port: number;
  protected daemonProcess: ChildProcess;
  protected _isRunning: boolean = false;
  protected _isHavendLocal: boolean;
  protected _shutDownRequested: boolean = false;

  constructor(type: DaemonType) {
    this._isHavendLocal = isLocalDaemon(this.getConfig().daemonUrl);
    this.type = type;
    appEventBus.on(HAVEND_LOCATION_CHANGED, (havendLocation: string) =>
      this.onHavendLocationChanged(havendLocation)
    );
  }

  public abstract getConfig(): IDaemonConfig;

  public killDaemon(): void {
    if (isDevMode) {
      console.log(`try to kill ${this.type}`);
    }
    this._shutDownRequested = true;
    this.daemonProcess.kill();

    // if deamon doesn't die, we kill it hard
    setTimeout(() => this._isRunning && this.killHard(), 10000);
  }

  public isRunning(): boolean {
    return this._isRunning;
  }

  public getState(): void {}

  protected startLocalProcess(): void {
    const config = this.getConfig();
    this.filePath = getLocalDaemonPath(this.type);
    this.startArgs = config.args;
    this.port = config.port;

    const args: ReadonlyArray<string> = Object.entries(this.startArgs).map(
      ([key, value]) => {
        return "--" + key + (value !== "" ? "=" + value : "");
      }
    );
    if (isDevMode) {
      console.log(args);
      console.log(this.filePath);
    }
    this._isRunning = true;
    this.daemonProcess = spawn(this.filePath, args);
    this.daemonProcess.on(
      "exit",
      (code: number | null, signal: string | null) =>
        this.onDaemonExit(code, signal)
    );
    this.daemonProcess.on("error", (error: Error) => this.onDaemonError(error));
  }

  protected onDaemonError(error: Error): void {
    if (isDevMode) {
      console.error("daemon error : " + error);
    }
  }

  protected onHavendLocationChanged(address: string): void {
    this._isHavendLocal = isLocalDaemon(address);
    updateDaemonUrlInConfig(address);
  }

  protected onDaemonExit(code: number | null, signal: string | null): void {
    this._isRunning = false;

    if (code !== 0 && code !== null) {
      dialog.showErrorBox(
        `${this.type} not running`,
        "Process was stopped or did not even start"
      );
    }

    if (isDevMode) {
      console.log(`${this.type} exit with code ${code} and signal ${signal}`);
    }
  }

  private killHard() {
    this.daemonProcess.kill("SIGKILL");
  }
}
