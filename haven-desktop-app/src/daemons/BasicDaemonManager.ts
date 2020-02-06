import {ChildProcess, execFile} from "child_process";
import {IDaemonManager} from "./IDaemonManager";
import {IDaemonConfig} from "../daemonConfig";
import {DaemonState} from "../ipc/types";
import {EventEmitter} from "events";



export const UPDATE_DAEMON_STATUS_EVENT = 'updateDaemonEvent';


export class BasicDaemonManager implements IDaemonManager {

    private filePath: string;
    private startArgs: Object;

    private currentDaemonState: DaemonState;
    private daemonProcess:ChildProcess;

    private daemonStatusEmmitter: EventEmitter = new EventEmitter();




    public startDaemon():void {


        const args: ReadonlyArray<string> = Object.entries(this.startArgs)
            .map( ([key, value]) => {
                return '--' +  key + ( value !=='' ? '=' + value :'');
            } );
        console.log(args);
        this.daemonProcess = execFile(this.filePath, args,(error, stdout, stderr) => {
            if (error) {

            }
            console.log(stdout);
        } );
        this.daemonProcess.on('exit', (code: number | null, signal: string | null) => this.onDaemonStopped(code, signal));
        this.daemonProcess.on('error', (error: Error) => this.onDaemonError(error));
        this.currentDaemonState = {isRunning:true};
        this.daemonStatusEmmitter.emit(UPDATE_DAEMON_STATUS_EVENT, this.currentDaemonState);
    }


    public killDaemon(): void {

        this.daemonProcess.kill();

    }

    public getDaemonState(): DaemonState {
        return this.currentDaemonState;
    }


    private onDaemonStopped(code: number | null, signal: string | null) {

        this.currentDaemonState = {isRunning: false, code, signal}
        this.daemonStatusEmmitter.emit(UPDATE_DAEMON_STATUS_EVENT, this.currentDaemonState);


    }

    private onDaemonError(error: Error) {

        console.log(error.message);

    }

    public setConfig(config: IDaemonConfig): void {

        this.filePath = config.path;
        this.startArgs = config.args;

    }

    public getDaemonStatusEventEmitter(): EventEmitter {

        return this.daemonStatusEmmitter;

    }


}
