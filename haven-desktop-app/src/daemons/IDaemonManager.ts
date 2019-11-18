import {Observable} from "rxjs";
import {IDaemonConfig} from "../daemonConfig";


export interface IDaemonManager {

    startDaemon():void
    killDaemon():void
    daemonStatus():Observable<{isRunning: boolean, code?: number, signal?:string}>;
    setConfig(config: IDaemonConfig):void;


}

