import {ChildProcess, spawn} from "child_process";
import {IDaemonManager} from "./IDaemonManager";
import {CommunicationChannel} from "../ipc/types";
import {IDaemonConfig} from "../daemons/config";



export const UPDATE_DAEMON_STATUS_EVENT = 'updateDaemonEvent';


export abstract class DaemonProcess implements IDaemonManager {

    protected filePath: string;
    protected startArgs: Object;
    protected port: number;
    protected daemonProcess: ChildProcess;

    abstract getConfig(): IDaemonConfig;

    abstract onDaemonExit(code: number | null, signal: string | null): void;

    abstract onDaemonError(error: Error): void;

    abstract onstdoutData(chunk: any): void;

    abstract onstderrData(chunk: any): void;

    abstract requestHandler(): void;

    abstract getCommunicationChannel(): CommunicationChannel;


    public startDaemon(): void {

       const config = this.getConfig();
       this.filePath = config.path;
       this.startArgs = config.args;
       this.port = config.port;

        const args: ReadonlyArray<string> = Object.entries(this.startArgs)
            .map(([key, value]) => {
                return '--' + key + (value !== '' ? '=' + value : '');
            });
        console.log(args);
        this.daemonProcess = spawn(this.filePath, args);

        this.daemonProcess.stdout.on('data', (chunk) => this.onstdoutData(chunk));
        this.daemonProcess.stderr.on('data', (chunk) => this.onstderrData(chunk));
        this.daemonProcess.on('exit', (code: number | null, signal: string | null) => this.onDaemonExit(code, signal));
        this.daemonProcess.on('error', (error: Error) => this.onDaemonError(error));
    }

    public killDaemon(): void {
        this.daemonProcess.kill();
    }



}

