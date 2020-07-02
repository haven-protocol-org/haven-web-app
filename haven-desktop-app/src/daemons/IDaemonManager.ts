import {IDaemonConfig} from "./config/config";



export interface IDaemonManager {

    killDaemon():void
    isRunning(): boolean

}

