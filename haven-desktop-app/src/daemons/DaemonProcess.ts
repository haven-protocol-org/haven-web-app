import {ChildProcess, spawn} from "child_process";
import {IDaemonManager} from "./IDaemonManager";
import {CommunicationChannel, DaemonType, IDaemonConfig} from "../types";
import ipcMain = Electron.ipcMain;
import {RPCHRequestHandler, RPCRequestObject} from "../rpc/RPCHRequestHandler";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {appEventBus, HAVEND_LOCATION_CHANGED} from "../EventBus";
import {isLocalDaemon} from "../daemons/config/config";




export const UPDATE_DAEMON_STATUS_EVENT = 'updateDaemonEvent';


export abstract class DaemonProcess implements IDaemonManager {

    constructor(type: DaemonType) {

        this.type = type;
        appEventBus.on(HAVEND_LOCATION_CHANGED, (havendLocation: string) => this.onHavendLocationChanged(havendLocation));
        this.init();
    }

    protected type: DaemonType;
    protected filePath: string;
    protected startArgs: Object;
    protected port: number;
    protected daemonProcess: ChildProcess;
    protected rpcHandler: RPCHRequestHandler = new RPCHRequestHandler();
    protected _isRunning: boolean = false;
    protected _isHavendLocal: boolean;



    abstract getConfig(): IDaemonConfig;

    abstract onDaemonError(error: Error): void;

    abstract onstdoutData(chunk: any): void;

    abstract onstderrData(chunk: any): void;

    abstract requestHandler(event: IpcMainInvokeEvent, requestObject: RPCRequestObject): Promise<any>

    abstract getCommunicationChannel(): CommunicationChannel;

    abstract setRPCHandler(): void;


    protected init() {
        this.setRPCHandler();
        this.addIPCHandler();
    }

    public addIPCHandler () {
        ipcMain.handle(this.getCommunicationChannel(), (event, args) =>
            this.requestHandler(event, args)
        );
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
        console.log(args);
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

    protected  onHavendLocationChanged(address: string): void {

        this._isHavendLocal = isLocalDaemon(address);

    }

    protected onDaemonExit(code: number | null, signal: string | null): void {
        this._isRunning = false;
    }

    getState(): any {
    }


}

