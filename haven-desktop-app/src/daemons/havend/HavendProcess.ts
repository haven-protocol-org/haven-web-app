import {DaemonProcess} from "../DaemonProcess";
import {CommunicationChannel, HavendState, IDaemonConfig} from "../../types";
import {config} from "../config/config";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {isDevMode} from "../../env";


const  DAEMON_METHODS: ReadonlyArray<string>= [
    "mining_status",
    "get_info",
    "get_last_block_header",
    "get_block_count",
    "get_block_header_by_height",
];


export class HavendProcess extends DaemonProcess {


    private isReachable: boolean;


    init(): void {

        super.init();
        this.checkHavendLocationToggle();

    }

    setRPCHandler(): void {
        const config = this.getConfig();
        this.rpcHandler.setFullUrl(config.daemonUrl);

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
            return this.rpcHandler.sendRequest(requestObject)
                .then(res => {
                    this.isReachable = true;
                    return res;
                })
                .catch(err => {
                    this.isReachable = false;
                    if (isDevMode) {
                        console.log(err);
                    }
                    throw new Error(err);
                })
        }

        return null;
    }


    protected onHavendLocationChanged(address: string): void {

        super.onHavendLocationChanged(address);
        // in havend we must set the rpc handler again
        this.setRPCHandler();

        // and start or stop the local process
        this.checkHavendLocationToggle();

    }

    checkHavendLocationToggle() {

        if ((!this._isHavendLocal) && this._isRunning) {
            this.killDaemon();
        }
        else if (this._isHavendLocal && (!this._isRunning)) {
            this.startLocalProcess();
        }
    }

    getState() : HavendState {
        return {
            isRunning: this._isRunning,
            isReachable: this.isReachable
        }
    }

    onDaemonError(error: Error): void {
    }

    onstderrData(chunk: any): void {
    }

    onstdoutData(chunk: any): void {
    }



}
