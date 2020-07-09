import {IDaemonManager} from "./IDaemonManager";
import {appEventBus, DAEMONS_STOPPED_EVENT} from "../EventBus";
import {HavendProcess} from "./havend/HavendProcess";
import {WalletRPCProcess} from "./wallet-rpc/WalletRPCProcess";
import {ipcMain, BrowserWindow} from "electron";
import {CommunicationChannel} from "../types";
import {RPCRequestObject} from "../rpc/RPCHRequestHandler";
import {DAEMON_METHODS, WALLET_METHODS} from "../daemons/enum";



export class DaemonHandler {

    private havend:IDaemonManager;
    private rpcWallet:IDaemonManager;

    public startDaemons() {

        this.havend = new HavendProcess('havend');
        this.rpcWallet = new WalletRPCProcess('wallet');

        ipcMain.handle( CommunicationChannel.HAVEND, (event, args) => this.havend.getState());
        ipcMain.handle( CommunicationChannel.WALLET_RPC, (event, args) => this.rpcWallet.getState());
        ipcMain.handle(CommunicationChannel.RPC, (event, args) => this.requestHandler( args));

    }

    public stopDaemons() {

        ipcMain.removeHandler( CommunicationChannel.HAVEND );
        ipcMain.removeHandler( CommunicationChannel.WALLET_RPC );
        ipcMain.removeHandler( CommunicationChannel.RPC );


        if (this.havend.isRunning()) {
            this.havend.killDaemon();
        }

        if (this.rpcWallet.isRunning()){

            this.rpcWallet.killDaemon();
        }

         this.checkIfDaemonsQuit();

    }


    private requestHandler(requestObject: RPCRequestObject): Promise<any> {


        const isWalletMethod =  WALLET_METHODS.some(
            (walletMethod: string) => walletMethod === requestObject.method);

        if (isWalletMethod) {
            return this.rpcWallet.requestHandler(requestObject);
        }


        const isHavendMethod =  DAEMON_METHODS.some(
            (havendMethod: string) => havendMethod === requestObject.method);

        if (isHavendMethod) {
            return this.havend.requestHandler(requestObject);
        }
        return {data:{error: 'method not found'}} as any;
    }


    public checkIfDaemonsQuit(): void {

        if (this.daemonsKilled()) {
            appEventBus.emit(DAEMONS_STOPPED_EVENT);
            return;
        }

        this.addDaemonsQuitChecker();
    }


    private daemonsKilled () {
        return this.rpcWallet.isRunning() === false && this.havend.isRunning() === false
    }

    private addDaemonsQuitChecker() {



        const i = setInterval( () => {

            if (this.daemonsKilled()) {
                clearInterval(i);
                appEventBus.emit(DAEMONS_STOPPED_EVENT);
            }
        }, 500 )

    }
}
