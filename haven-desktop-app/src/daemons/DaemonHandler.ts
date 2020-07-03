import {IDaemonManager} from "./IDaemonManager";
import {appEventBus, DAEMONS_STOPPED_EVENT} from "../EventBus";
import {HavendProcess} from "./havend/HavendProcess";
import {WalletRPCProcess} from "./wallet-rpc/WalletRPCProcess";
import ipcMain = Electron.ipcMain;
import {CommunicationChannel} from "../types";



export class DaemonHandler {


    private havend:IDaemonManager;
    private rpcWallet:IDaemonManager;


    public startDaemons() {

        this.havend = new HavendProcess('havend');
        this.rpcWallet = new WalletRPCProcess('wallet');

        ipcMain.handle( CommunicationChannel.HAVEND, (event, args) => this.havend.getState());
        ipcMain.handle( CommunicationChannel.WALLET_RPC, (event, args) => this.rpcWallet.getState());
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
