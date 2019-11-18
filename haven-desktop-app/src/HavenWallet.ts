/**
 * responsible to wire everything together
 */
import {IDaemonManager} from "./daemons/IDaemonManager";
import {BasicDaemonManager} from "./daemons/BasicDaemonManager";
import {daemonConfig} from "./daemonConfig";
import {IPCHandler} from "./ipc/IPCHandler";


export class HavenWallet {

    private _isRunning:boolean = false;

    private havend:IDaemonManager = new BasicDaemonManager();
    private rpcWallet:IDaemonManager = new BasicDaemonManager();
    private ipcHandler: IPCHandler = new IPCHandler();


    public start() {

        if (this._isRunning) {
            return;
        }


        this.havend.setConfig(daemonConfig.havend);
        this.rpcWallet.setConfig(daemonConfig.wallet);
        this.havend.startDaemon();
        this.rpcWallet.startDaemon();
        this.ipcHandler.start();

        this._isRunning = true;



    }


    public quit() {

        this.havend.killDaemon();
        this.rpcWallet.killDaemon();
        this.ipcHandler.quit();

        this._isRunning = false;

    }













}
