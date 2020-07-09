import {DaemonProcess} from "../DaemonProcess";
import { HavendState, IDaemonConfig, NodeLocation} from "../../types";
import {config} from "../config/config";
import {RPCRequestObject} from "../../rpc/RPCHRequestHandler";
import {isDevMode} from "../../env";




export class HavendProcess extends DaemonProcess {

    private isReachable: boolean = true;

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

    async requestHandler(requestObject: RPCRequestObject): Promise<any> {

        let connectionRefused = false;

        try {
            const response = await this.rpcHandler.sendRequest(requestObject);
            return response.data;
        }
        catch(e) {
            connectionRefused = true;
            if (isDevMode) {
                console.log('havend seems not reachable');
                console.log(e.code)
            }

            const message = this._isRunning? 'Local node is too busy' : 'Local node is not running';
            return {'error':{message}} as any
        }
        finally {
            this.isReachable = !connectionRefused;
        }
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
            isReachable: this.isReachable,
            location: (this._isHavendLocal)?  NodeLocation.Local : NodeLocation.Remote,
            address : this.getConfig().daemonUrl

        }
    }

    onDaemonError(error: Error): void {
        super.onDaemonError(error);
    }

    onstderrData(chunk: any): void {
        if (isDevMode) {
            console.error('havend stderr : ' + chunk.toString());
        }
    }

    onstdoutData(chunk: any): void {
        if (isDevMode) {
            console.error('havend stdout : ' + chunk.toString());
        }
    }



}
