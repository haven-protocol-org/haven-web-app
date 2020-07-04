import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel, IDaemonConfig, WalletState} from "../../types";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import {config, getLocalDaemon} from "../config/config";
import {appEventBus, HAVEND_LOCATION_CHANGED} from "../../EventBus";
import {isDevMode} from "../../env";




const SYNC_HEIGHT_REGEX = /.*D.*height (.*),/gm;
const NO_CONNECTION_MESSAGE = "error::no_connection_to_daemon";
const REFRESH_DONE_MESSAGE = "Refresh done";


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

        super.onstderrData(chunk);

        if ((chunk.toString()).includes(NO_CONNECTION_MESSAGE)) {
            this.isConnectedToDaemon = false;
        }


    }

    onstdoutData(chunk: any): void {

        super.onstdoutData(chunk);
        let m;
        while ((m = SYNC_HEIGHT_REGEX.exec(chunk.toString())) !== null) {
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
        return CommunicationChannel.RPC;
    }

    async requestHandler(requestObject: RPCRequestObject): Promise<any> {


        if (requestObject.method === "set_daemon") {

            const {address} = requestObject.params;
            // if address is empty we use the local daemon
            if (address === "") {
                appEventBus.emit(HAVEND_LOCATION_CHANGED, getLocalDaemon());
            } else {
                appEventBus.emit(HAVEND_LOCATION_CHANGED, address);
            }

            }

            try {
                const response = await this.rpcHandler.sendRequest(requestObject);
                return response;

            }
            catch(e) {

                if (isDevMode) {
                    console.log('daemon seems not reachable');
                }
                return {'data': {'error': 'daemon refused connection'}} as any
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
