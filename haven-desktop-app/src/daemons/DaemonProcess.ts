import {ChildProcess, spawn} from "child_process";
import {IDaemonManager} from "./IDaemonManager";
import {DaemonType, IDaemonConfig} from "../types";
import {RPCHRequestHandler, RPCRequestObject} from "../rpc/RPCHRequestHandler";
import {appEventBus, HAVEND_LOCATION_CHANGED} from "../EventBus";
import {isLocalDaemon, updateDaemonUrlInConfig} from "../daemons/config/config";
import {isDevMode} from "../env";



export abstract class DaemonProcess implements IDaemonManager {

    protected type: DaemonType;
    protected filePath: string;
    protected startArgs: Object;
    protected port: number;
    protected daemonProcess: ChildProcess;
    protected rpcHandler: RPCHRequestHandler = new RPCHRequestHandler();
    protected _isRunning: boolean = false;
    protected _isHavendLocal: boolean;

    constructor(type: DaemonType) {

        this._isHavendLocal = isLocalDaemon(this.getConfig().daemonUrl);
        this.type = type;
        appEventBus.on(HAVEND_LOCATION_CHANGED, (havendLocation: string) => this.onHavendLocationChanged(havendLocation));
        this.init();
    }

    abstract getConfig(): IDaemonConfig;
    abstract requestHandler(requestObject: RPCRequestObject): Promise<any>
    abstract setRPCHandler(): void;


    protected init() {
        this.setRPCHandler();
    }

    protected startLocalProcess(): void {


       const config = this.getConfig();
       this.filePath = config.path;
       this.startArgs = config.args;
       this.port = config.port;

        const args: ReadonlyArray<string> = Object.entries(this.startArgs)
            .map(([key, value]) => {
                return '--' + key + (value !== '' ? '=' + value : '');
            });
        if (isDevMode) {
            console.log(args);
            console.log(this.filePath);
        }
        this._isRunning = true;
        this.daemonProcess = spawn(this.filePath, args);

        this.daemonProcess.stdout.on('data', (chunk) => this.onstdoutData(chunk));
        this.daemonProcess.stderr.on('data', (chunk) => this.onstderrData(chunk));
        this.daemonProcess.on('exit', (code: number | null, signal: string | null) => this.onDaemonExit(code, signal));
        this.daemonProcess.on('error', (error: Error) => this.onDaemonError(error));

    }

    public killDaemon(): void {
        this.daemonProcess.kill();
    }

    public isRunning(): boolean {
        return this._isRunning;
    }

    protected onDaemonError(error: Error): void {

        if (isDevMode) {
            console.error('daemon error : ' + error );
        }

    }

    protected onstdoutData(chunk: any): void {

    }



    protected onHavendLocationChanged(address: string): void {

        this._isHavendLocal = isLocalDaemon(address);
        updateDaemonUrlInConfig(address);

    }

    protected onstderrData(chunk: any): void {

    }


    protected onDaemonExit(code: number | null, signal: string | null): void {
        this._isRunning = false;

        if (isDevMode) {
            console.log('daemon exit : ' + code);
        }
    }

    getState(): any {
    }


}

