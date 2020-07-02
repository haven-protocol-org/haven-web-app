import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel} from "../../types";
import {config, IDaemonConfig} from "../config/config";
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


    setRPCHandler(): void {
        const config = this.getConfig();

        // daemon can be remote
        this.rpcHandler
    }

    onDaemonError(error: Error): void {
    }

    onDaemonExit(code: number | null, signal: string | null): void {
    }

    onstderrData(chunk: any): void {
    }

    onstdoutData(chunk: any): void {
    }

    getConfig(): IDaemonConfig {

        return config().wallet;
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








}
