import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {RPCHRequestHandler, RPCRequestObject } from "../rpc/RPCHRequestHandler";
import { config } from "../daemons/config";
import { CommunicationChannel } from "./types";
import { getAvailableWallets } from "../userSettings";

/**
 * this class establishes the communication between client app and daemons
 */
export class IPCHandler {




  private havendRpcHandler: RPCHRequestHandler = new RPCHRequestHandler();
  private walletRpcHandler: RPCHRequestHandler = new RPCHRequestHandler();

  constructor() {
    this.havendRpcHandler.port = config().havend.port;
    this.walletRpcHandler.port = config().wallet.port;
  }

  public start() {
    this.addHandlers();
  }

  public quit() {
    this.removeHandlers();
  }

  private addHandlers() {
    ipcMain.handle(CommunicationChannel.RPC, (event, args) =>
      this.handleRPCRequests(event, args)
    );
    ipcMain.handle(CommunicationChannel.STORED_WALLETS, (event, args) =>
      this.handleWalletRequest()
    );
  }

  private removeHandlers() {
    ipcMain.removeHandler(CommunicationChannel.RPC);
    ipcMain.removeHandler(CommunicationChannel.STORED_WALLETS);
  }

  private handleRPCRequests(
    event: IpcMainInvokeEvent,
    requestObject: RPCRequestObject
  ): Promise<any> {
    if (
      this.DAEMON_METHODS.some(
        (daemonMethod) => daemonMethod === requestObject.method
      )
    ) {
      return this.havendRpcHandler.sendRequest(requestObject);
    } else if (
      this.WALLET_METHODS.some(
        (walletMethod) => walletMethod === requestObject.method
      )
    ) {
      return this.walletRpcHandler.sendRequest(requestObject);
    }
  }

  private handleWalletRequest() {
    return getAvailableWallets();
  }
}
