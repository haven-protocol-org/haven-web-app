/**
 * responsible to wire everything together
 */
import {IDaemonManager} from "./daemons/IDaemonManager";
import {BasicDaemonManager, UPDATE_DAEMON_STATUS_EVENT} from "./daemons/BasicDaemonManager";
import {checkAndCreateWalletDir, daemonConfig} from "./daemonConfig";
import {IPCHandler} from "./ipc/IPCHandler";
import {CommunicationChannels, DAEMON_STATUS_MESSAGE} from "./ipc/types";
import {ipcMain} from 'electron';
import {EventEmitter} from "events";


export const QUIT_EVENT: string = 'quietEvent';


export class HavenWallet {

    private _isRunning:boolean = false;
    private havend:IDaemonManager = new BasicDaemonManager();
    private rpcWallet:IDaemonManager = new BasicDaemonManager();
    private ipcHandler: IPCHandler = new IPCHandler();

    private appStatusEmitter:EventEmitter = new EventEmitter();

    private requestShutDown: boolean  = false;



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

        this.requestShutDown = true;
        if (this.havend.getDaemonState().isRunning) {

            this.havend.getDaemonStatusEventEmitter().on(UPDATE_DAEMON_STATUS_EVENT, (status) => this.checkIfAppQuit())

            this.havend.killDaemon();
        }

        if (this.rpcWallet.getDaemonState().isRunning){

            this.rpcWallet.getDaemonStatusEventEmitter().on(UPDATE_DAEMON_STATUS_EVENT, (status) => this.checkIfAppQuit())
            this.rpcWallet.killDaemon();
        }


        this.ipcHandler.quit();
        this.removeDaemonStateHandling();
        this._isRunning = false;

        this.checkIfAppQuit();

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

    public getAppStatus(): EventEmitter {
        return this.appStatusEmitter;
    }


    private checkIfAppQuit(): void {

        if (this.rpcWallet.getDaemonState().isRunning === false && this.havend.getDaemonState().isRunning === false) {
            this.appStatusEmitter.emit(QUIT_EVENT);
        }

    }













}
