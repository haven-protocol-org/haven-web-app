import {Observable} from "rxjs";


export interface IDaemonManager {

    startDaemon():void
    killDaemon():void
    isDaemonRunning():Observable<{isRunning: boolean, code?: number, signal?:string}>;
    setConfig(config: IDaemonConfig):void;


}

export interface IDaemonConfig {
    filePath: string;
    startArgs:string[];
}
