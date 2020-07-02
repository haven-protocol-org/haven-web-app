import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel, IDaemonConfig} from "../../types";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {config} from "../config/config";


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


export class WalletRPCProcess extends DaemonProcess {


    init(): void {
    }

    setRPCHandler(): void {

        const config = this.getConfig();

        // wallet-rpc is always local - never remote
        this.rpcHandler.port = config.port;

    }

    onDaemonError(error: Error): void {

        //TODO check for that output to detect non detection;
        const checkConnection = "error::no_connection_to_daemon";


    }
    

    onstderrData(chunk: any): void {


        //TODO check for that output to detect non detection;
        const checkConnection = "error::no_connection_to_daemon";


    }

    onstdoutData(chunk: any): void {
    }


    getCommunicationChannel(): CommunicationChannel {
        return CommunicationChannel.WALLET_RPC;
    }

    requestHandler(event: IpcMainInvokeEvent, requestObject: RPCRequestObject): Promise<any> {

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





}
