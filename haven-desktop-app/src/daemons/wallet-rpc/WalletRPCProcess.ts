import {DaemonProcess} from "../DaemonProcess";
import {IDaemonConfig, WalletState} from "../../types";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import {config, getLocalDaemon} from "../config/config";
import {appEventBus, HAVEND_LOCATION_CHANGED} from "../../EventBus";
import {isDevMode} from "../../env";
import {logInDevMode} from "../../dev";




const SYNC_HEIGHT_REGEX = /.*D.*height (.*),/gm;
const NO_CONNECTION_MESSAGE = "error::no_connection_to_daemon";
const REFRESH_DONE_MESSAGE = "Refresh done";
const CONNECTION_TO_DAEMON_SUCCESS = "SSL handshake success";

export class WalletRPCProcess extends DaemonProcess {

    private isConnectedToDaemon: boolean = true;
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
        super.onDaemonError(error);
    }


    onstderrData(chunk: any): void {

        if (isDevMode) {
            console.error('wallet stderr : ' + chunk.toString());
        }

    }

    onstdoutData(chunk: any): void {

        if (isDevMode) {
          //  console.error('wallet stdout : ' + chunk.toString());
        }


        if ((chunk.toString()).includes(CONNECTION_TO_DAEMON_SUCCESS)) {
            this.isConnectedToDaemon = true;
        }


        if ((chunk.toString()).includes(NO_CONNECTION_MESSAGE)) {
            this.isConnectedToDaemon = false;
        }

        if (this._isHavendLocal) {
            return;
        }

        let m;
        while ((m = SYNC_HEIGHT_REGEX.exec(chunk.toString())) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === SYNC_HEIGHT_REGEX.lastIndex) {
                SYNC_HEIGHT_REGEX.lastIndex++;
            }

            // The result can be accessed through the 'm'-variable.
            m.forEach((match, groupIndex) => {
                logInDevMode("Found match, group" + groupIndex + " : "+ match);
                this.isConnectedToDaemon = true;
                this.isSyncing = true;
                this.syncHeight = Number(match);
            });
        }

        if ((chunk as string).includes(REFRESH_DONE_MESSAGE)){
            this.isSyncing = false;
        }
    }


    async requestHandler(requestObject: RPCRequestObject): Promise<any> {

        const setsDaemon = requestObject.method === "set_daemon";

        if (setsDaemon) {



            const {address} = requestObject.params;
            logInDevMode('set daemon to ' + address);

            // if address is empty we use the local daemon
            if (address === "") {
                requestObject.params.address = getLocalDaemon();
                appEventBus.emit(HAVEND_LOCATION_CHANGED, getLocalDaemon());
            } else {
                appEventBus.emit(HAVEND_LOCATION_CHANGED, address);
            }

        }

            try {
                const response = await this.rpcHandler.sendRequest(requestObject);

                // if that was a successfull daemon change we are disconnected to a daemon right away
                if(setsDaemon) {
                    this.isConnectedToDaemon = false;
                }

                return response;

            }
            catch(e) {

                if (isDevMode) {
                    console.log('wallet seems not reachable');
                }
                return {'error': 'wallet refused connection'} as any
            }



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
