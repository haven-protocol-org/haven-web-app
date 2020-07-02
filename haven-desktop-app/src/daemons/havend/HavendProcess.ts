import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel, IDaemonConfig} from "../../types";
import {config} from "../config/config";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;


const  DAEMON_METHODS: ReadonlyArray<string>= [
    "mining_status",
    "get_info",
    "get_last_block_header",
    "get_block_count",
    "get_block_header_by_height",
];


export class HavendProcess extends DaemonProcess {



    init(): void {

        // check if we have

    }


    setRPCHandler(): void {
        const config = this.getConfig();

        this.rpcHandler.setURL(config.daemonUrl);
        this.rpcHandler.port = config.port;

    }

    onDaemonError(error: Error): void {
    }



    onstderrData(chunk: any): void {
    }

    onstdoutData(chunk: any): void {
    }

    getConfig(): IDaemonConfig {

        return config().havend;
    }

    getCommunicationChannel(): CommunicationChannel {
        return CommunicationChannel.HAVEND;
    }

    requestHandler(event: IpcMainInvokeEvent, requestObject: RPCRequestObject): Promise<any> {

        const isLegitMethod =  DAEMON_METHODS.some(
            (walletMethod) => walletMethod === requestObject.method);

        if (isLegitMethod) {
            return this.rpcHandler.sendRequest(requestObject);
        }

        return null;
    }


    protected onHavendLocationChanged(address: string): void {
        super.onHavendLocationChanged(address);

        // in havend we must set the rpc handler again
        this.setRPCHandler();

        if ((!this._isHavendLocal) && this._isRunning) {
            this.killDaemon();
        }
        else if (this._isHavendLocal && (!this._isRunning)) {
            this.startLocalProcess();
        }

    }


}
