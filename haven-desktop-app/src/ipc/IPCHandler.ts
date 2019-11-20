import {ipcMain} from 'electron';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {RPCHRequestHandler, RPCRequestObject} from "../rpc/RPCHRequestHandler";
import {daemonConfig} from "../daemonConfig";

enum CommunicationChannels {

    RPC="rpc",
    DAEMON="daemon"

}


/**
 * this class establishes the communication between client app and daemons
 */
export class IPCHandler {


    private readonly WALLET_METHODS:string[] = ['refresh','open_wallet','restore_deterministic_wallet',
        'get_balance', 'get_offshore_balance', 'get_offshore_transfers', 'query_key','transfer','get_transfers','create_wallet', 'offshore_transfer' ,'refresh', 'onshore', 'offshore'];


    private readonly DAEMON_METHODS: string[] = ['get_last_block_header','get_block_count','get_height', 'get_block_header_by_height'] ;


    private havendRpcHandler: RPCHRequestHandler = new RPCHRequestHandler();
    private walletRpcHandler: RPCHRequestHandler = new RPCHRequestHandler();


    constructor() {

        this.havendRpcHandler.port = daemonConfig.havend.port;
        this.walletRpcHandler.port = daemonConfig.wallet.port;

    }

    public start() {

        this.addHandlers()
    }

    public quit() {
        this.removeHandlers();
    }

    private addHandlers() {

        ipcMain.handle(CommunicationChannels.RPC,(event, args) => this.handleRPCRequests(event, args) );
       // ipcMain.handle(CommunicationChannels.DAEMON,(event, args) => this.handleRPCRequests(event, args) );
    }

    private removeHandlers() {

        ipcMain.removeHandler(CommunicationChannels.RPC );
    }


    private handleRPCRequests(event:IpcMainInvokeEvent, requestObject: RPCRequestObject):Promise<any> {

        if (this.DAEMON_METHODS.some( daemonMethod => daemonMethod === requestObject.method)) {
            return this.havendRpcHandler.sendRequest(requestObject);
        }
        else if (this.WALLET_METHODS.some( walletMethod => walletMethod === requestObject.method)) {
            return this.walletRpcHandler.sendRequest(requestObject);
        }
    }


    public  sendToClientApp() {


    }


}
