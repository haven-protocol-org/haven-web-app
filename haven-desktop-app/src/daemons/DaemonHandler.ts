import {DaemonProcess, UPDATE_DAEMON_STATUS_EVENT} from "./DaemonProcess";
import {IDaemonManager} from "./IDaemonManager";
import {config} from "./config/config";
import {HavenWallet} from "../HavenWallet";
import {appEventBus, DAEMONS_STOPPED_EVENT} from "../EventBus";
import {HavendProcess} from "./havend/HavendProcess";
import {WalletRPCProcess} from "./wallet-rpc/WalletRPCProcess";



export class DaemonHandler {


    private havend:IDaemonManager = new HavendProcess();
    private rpcWallet:IDaemonManager = new WalletRPCProcess();


    public startDaemons() {

        this.havend = new HavendProcess();
        this.rpcWallet = new WalletRPCProcess();
    }


    public stopDaemons() {


        if (this.havend.isRunning()) {
            this.havend.killDaemon();
        }

        if (this.rpcWallet.isRunning()){

            this.rpcWallet.killDaemon();
        }

         this.checkIfDaemonsQuit();

    }


    public checkIfDaemonsQuit(): void {

        if (this.rpcWallet.isRunning() === false && this.havend.isRunning() === false) {
            appEventBus.emit(DAEMONS_STOPPED_EVENT);
        }

    }


}
