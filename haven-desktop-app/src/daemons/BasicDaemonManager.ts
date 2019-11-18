import {ChildProcess, execFile} from "child_process";
import {BehaviorSubject, Observable} from "rxjs";
import {IDaemonManager, IDaemonConfig} from "./IDaemonManager";




export class BasicDaemonManager implements IDaemonManager {



    private filePath: string;
    private startArgs: string[];

    private daemonProcess:ChildProcess;
    private isDaemonRunnigSubject:BehaviorSubject<{ isRunning: boolean; code?: number; signal?: string }> =
        new BehaviorSubject<{ isRunning: boolean; code?: number; signal?: string }>({isRunning:false});





    public isDaemonRunning(): Observable<{ isRunning: boolean; code?: number; signal?: string }> {
        return this.isDaemonRunnigSubject.asObservable();
    }

    public startDaemon():void {

        this.daemonProcess = execFile(this.filePath);
        this.daemonProcess.on('exit', (code: number | null, signal: string | null) => this.onDaemonStopped(code, signal));
        this.isDaemonRunnigSubject.next({isRunning:true});
    }


    public killDaemon(): void {

        this.daemonProcess.kill();

    }


    private onDaemonStopped(code: number | null, signal: string | null) {

        this.isDaemonRunnigSubject.next({isRunning:false, code, signal})

    }

    public setConfig(config: IDaemonConfig): void {

        this.filePath = config.filePath;
        this.startArgs = config.startArgs;

    }


}
