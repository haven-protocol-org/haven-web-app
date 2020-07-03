import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel, IDaemonConfig, WalletState} from "../../types";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {config, getLocalDaemon} from "../config/config";
import {appEventBus, HAVEND_LOCATION_CHANGED} from "../../EventBus";


const  WALLET_METHODS: ReadonlyArray<string> = [
    "stop_mining",
    "start_mining",
    "rescan_blockchain",
    "get_address",
    "refresh",
    "open_wallet",
    "close_wallet",
    "restore_deterministic_wallet",
    "get_balance",
    "get_offshore_balance",
    "store",
    "relay_tx",
    "get_height",
    "query_key",
    "transfer_split",
    "get_transfers",
    "create_wallet",
    "offshore_transfer",
    "refresh",
    "onshore",
    "offshore",
    "set_daemon"
];


const SYNC_HEIGHT_REGEX = /.*D.*height (.*),/gm;
const NO_CONNECTION_MESSAGE = "error::no_connection_to_daemon";
const REFRESH_DONE_MESSAGE = "Refresh done";


export class WalletRPCProcess extends DaemonProcess {

    private isConnectedToDaemon: boolean;
    private isSyncing: boolean;
    private syncHeight: number;


    init(): void {
        super.init();
        this.startLocalProcess();
    }

    setRPCHandler(): void {

        const config = this.getConfig();

        // wallet-rpc is always local - never remote
        this.rpcHandler.port = config.port;

    }

    onDaemonError(error: Error): void {



    }


    onstderrData(chunk: any): void {

        if ((chunk as string).includes(NO_CONNECTION_MESSAGE)) {
            this.isConnectedToDaemon = false;
        }


    }

    onstdoutData(chunk: any): void {

        let m;
        while ((m = SYNC_HEIGHT_REGEX.exec(chunk)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === SYNC_HEIGHT_REGEX.lastIndex) {
                SYNC_HEIGHT_REGEX.lastIndex++;
            }

            // The result can be accessed through the 'm'-variable.
            m.forEach((match, groupIndex) => {
                console.log('Found match, group ${groupIndex}: ${match}');
                this.isConnectedToDaemon = true;
                this.isSyncing = true;
            });
        }


        if ((chunk as string).includes(REFRESH_DONE_MESSAGE)){
            this.isSyncing = false;
        }
    }


    getCommunicationChannel(): CommunicationChannel {
        return CommunicationChannel.WALLET_RPC;
    }

    requestHandler(event: IpcMainInvokeEvent, requestObject: RPCRequestObject): Promise<any> {


        if (requestObject.method === "set_daemon") {

            const {address} = requestObject.params;
            // if address is empty we use the local daemon
            if (address === "") {
                appEventBus.emit(HAVEND_LOCATION_CHANGED, getLocalDaemon());
            } else {
                appEventBus.emit(HAVEND_LOCATION_CHANGED, address);
            }

        }

       const isLegitMethod =  WALLET_METHODS.some(
            (walletMethod) => walletMethod === requestObject.method);

       if (isLegitMethod) {
           return this.rpcHandler.sendRequest(requestObject);
       }

       return null;

    }

    getConfig(): IDaemonConfig {
        return config().wallet;
    }


    getState() : WalletState {

        return {
            isRunning:this._isRunning,
            isConnectedToDaemon: this.isConnectedToDaemon,
            isSyncing: this.isSyncing,
            syncHeight: this.syncHeight
        }

    }

    onHavendLocationChanged(address: string): void {

        super.onHavendLocationChanged(address);

    }





}
