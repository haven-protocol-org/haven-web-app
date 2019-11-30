import {IDaemonConfig} from "../daemonConfig";
import {DaemonState} from "../ipc/types";


export interface IDaemonManager {

    startDaemon():void
    killDaemon():void
    setConfig(config: IDaemonConfig):void;
    getDaemonState():DaemonState;


}

