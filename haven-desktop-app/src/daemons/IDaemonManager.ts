import {IDaemonConfig} from "../daemonConfig";
import {DaemonState} from "../ipc/types";
import {EventEmitter} from "events";


export interface IDaemonManager {

    startDaemon():void
    killDaemon():void
    setConfig(config: IDaemonConfig):void;
    getDaemonState():DaemonState;
    getDaemonStatusEventEmitter():EventEmitter;


}

