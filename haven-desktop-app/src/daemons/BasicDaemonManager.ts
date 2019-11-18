import {ChildProcess, execFile} from "child_process";
import {BehaviorSubject, Observable} from "rxjs";
import {IDaemonManager} from "./IDaemonManager";
import {IDaemonConfig} from "../daemonConfig";




export class BasicDaemonManager implements IDaemonManager {



    private filePath: string;
    private startArgs: Object;

    private daemonProcess:ChildProcess;
    private isDaemonRunnigSubject:BehaviorSubject<{ isRunning: boolean; code?: number; signal?: string }> =
        new BehaviorSubject<{ isRunning: boolean; code?: number; signal?: string }>({isRunning:false});





    public daemonStatus(): Observable<{ isRunning: boolean; code?: number; signal?: string }> {
        return this.isDaemonRunnigSubject.asObservable();
    }

    public startDaemon():void {


        const args: ReadonlyArray<string> = Object.entries(this.startArgs)
            .map( ([key, value]) => {
                console.log('key : ' +  key);
                console.log('value : ' +  value);
                return '--' +  key + ( value !=='' ? '=' + value :'');
            } );
        console.log(args);
        this.daemonProcess = execFile(this.filePath, args,(error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            console.log(stdout);
        } );
        this.daemonProcess.on('exit', (code: number | null, signal: string | null) => this.onDaemonStopped(code, signal));
        this.daemonProcess.on('error', (error: Error) => this.onDaemonError(error));
        this.isDaemonRunnigSubject.next({isRunning:true});
    }


    public killDaemon(): void {

        this.daemonProcess.kill();

    }


    private onDaemonStopped(code: number | null, signal: string | null) {


        console.log(code, signal);

        this.isDaemonRunnigSubject.next({isRunning:false, code, signal})

    }

    private onDaemonError(error: Error) {

        console.log(error.message);

    }

    public setConfig(config: IDaemonConfig): void {

        this.filePath = config.path;
        this.startArgs = config.args;

    }


}
