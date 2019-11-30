/**
 * responsible to wire everything together
 */
import {IDaemonManager} from "./daemons/IDaemonManager";
import {BasicDaemonManager} from "./daemons/BasicDaemonManager";
import {checkAndCreateWalletDir, daemonConfig} from "./daemonConfig";
import {IPCHandler} from "./ipc/IPCHandler";
import {CommunicationChannels, DAEMON_STATUS_MESSAGE} from "./ipc/types";
import {ipcMain} from 'electron';


export class HavenWallet {

    private _isRunning:boolean = false;
    private havend:IDaemonManager = new BasicDaemonManager();
    private rpcWallet:IDaemonManager = new BasicDaemonManager();
    private ipcHandler: IPCHandler = new IPCHandler();


    public start() {

        if (this._isRunning) {
            return;
        }

        checkAndCreateWalletDir();

        this.havend.setConfig(daemonConfig.havend);
        this.rpcWallet.setConfig(daemonConfig.wallet);
        this.havend.startDaemon();
        this.rpcWallet.startDaemon();
        this.ipcHandler.start();
        this._isRunning = true;
        this.addDaemonStateHandling();




    }


    public quit() {

        this.havend.killDaemon();
        this.rpcWallet.killDaemon();
        this.ipcHandler.quit();
        this.removeDaemonStateHandling();
        this._isRunning = false;

    }


    private addDaemonStateHandling() {

        ipcMain.handle(CommunicationChannels.DAEMON, (event, args) => this.onDaemonStateRequest());

    }

    private removeDaemonStateHandling() {

        ipcMain.removeHandler(CommunicationChannels.DAEMON);

    }

    private onDaemonStateRequest():DAEMON_STATUS_MESSAGE  {

        const nodeState = this.havend.getDaemonState();
        const walletState = this.rpcWallet.getDaemonState();
        return {node: nodeState, wallet: walletState};

    }













}
