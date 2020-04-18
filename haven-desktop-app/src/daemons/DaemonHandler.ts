import {BasicDaemonManager, UPDATE_DAEMON_STATUS_EVENT} from "./BasicDaemonManager";
import {IDaemonManager} from "./IDaemonManager";
import {config} from "./config";
import {DAEMONS_STOPPED_EVENT} from "../HavenWallet";
import {appEventBus} from "../EventBus";



export class DaemonHandler {


    private havend:IDaemonManager = new BasicDaemonManager();
    private rpcWallet:IDaemonManager = new BasicDaemonManager();




    public startDaemons() {

        this.havend.setConfig(config().havend);
        this.rpcWallet.setConfig(config().wallet);

        this.havend.startDaemon();
        this.rpcWallet.startDaemon();

    }



    public stopDaemons() {


        if (this.havend.getDaemonState().isRunning) {
            this.havend.getDaemonStatusEventEmitter().on(UPDATE_DAEMON_STATUS_EVENT, (status) => this.checkIfDaemonsQuit());
            this.havend.killDaemon();
        }

        if (this.rpcWallet.getDaemonState().isRunning){

            this.rpcWallet.getDaemonStatusEventEmitter().on(UPDATE_DAEMON_STATUS_EVENT, (status) => this.checkIfDaemonsQuit());
            this.rpcWallet.killDaemon();
        }

         this.checkIfDaemonsQuit();

    }


    public getDaemonsState() {

        const nodeState = this.havend.getDaemonState();
        const walletState = this.rpcWallet.getDaemonState();
        return {node: nodeState, wallet: walletState};

    }



    public checkIfDaemonsQuit(): void {

        if (this.rpcWallet.getDaemonState().isRunning === false && this.havend.getDaemonState().isRunning === false) {
            appEventBus.emit(DAEMONS_STOPPED_EVENT);
        }

    }


}
