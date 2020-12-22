import { ChildProcess, spawn } from "child_process";
import { dialog } from "electron";
import { getLocalDaemonPath } from "../localNodeSettings";
import { isDevMode } from "../../env";
import { IDaemonConfig, NET, ProcessState } from "../../types";

export class LocalNodeProcess {
  protected filePath: string;
  protected startArgs: object;
  protected port: number;
  protected daemonProcess: ChildProcess;
  protected _isRunning: boolean = false;
  protected _shutDownRequested: boolean = false;
  private _netTypeId: NET;
  private config: IDaemonConfig;

  public setNetypId(value: NET) {
    this._netTypeId = value;
  }

  public getNetypId() {
    return this._netTypeId;
  }


  public getConfig(): IDaemonConfig {
    return this.config;
  }

  public setConfig(config: IDaemonConfig): void {
    this.config = config;
  }

  public getState(): ProcessState {
    return {
      isRunning: this._isRunning,
    };
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

  public killDaemon(): void {
    if (isDevMode) {
      console.log(`try to kill havend`);
    }
    this._shutDownRequested = true;
    this.daemonProcess.kill();

    // if deamon doesn't die, we kill it hard
    setTimeout(() => this._isRunning && this.killHard(), 10000);
  }

  public isRunning(): boolean {
    return this._isRunning;
  }

  public startLocalProcess(): void {
    const config = this.getConfig();
    this.filePath = getLocalDaemonPath(this._netTypeId);
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
    this.daemonProcess.stdout.on("data", (chunk) => this.onstdoutData(chunk));
    this.daemonProcess.stderr.on("data", (chunk) => this.onstderrData(chunk));
    this.daemonProcess.on(
      "exit",
      (code: number | null, signal: string | null) =>
        this.onDaemonExit(code, signal)
    );
    this.daemonProcess.on("error", (error: Error) => this.onDaemonError(error));
  }

  private onDaemonError(error: Error): void {
    if (isDevMode) {
      console.error("daemon error : " + error);
    }
  }

  private onDaemonExit(code: number | null, signal: string | null): void {
    this._isRunning = false;

    if (code !== 0 && code !== null) {
      dialog.showErrorBox(
        `havend not running`,
        "Process was stopped or did not even start"
      );
    }

    if (isDevMode) {
      console.log(`havend exit with code ${code} and signal ${signal}`);
    }
  }

  private killHard() {
    this.daemonProcess.kill("SIGKILL");
  }
}
