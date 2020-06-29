import { ipcMain } from "electron";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {
  RPCHRequestHandler,
  RPCRequestObject,
} from "../rpc/RPCHRequestHandler";
import { config } from "../daemons/config";
import { CommunicationChannels } from "./types";
import { getAvailableWallets } from "../userSettings";

/**
 * this class establishes the communication between client app and daemons
 */
export class IPCHandler {
  private readonly WALLET_METHODS: string[] = [
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

  private readonly DAEMON_METHODS: string[] = [
    "mining_status",
    "get_info",
    "get_last_block_header",
    "get_block_count",
    "get_block_header_by_height",
  ];

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
    ipcMain.handle(CommunicationChannels.RPC, (event, args) =>
      this.handleRPCRequests(event, args)
    );
    ipcMain.handle(CommunicationChannels.WALLETS, (event, args) =>
      this.handleWalletRequest()
    );
  }

  private removeHandlers() {
    ipcMain.removeHandler(CommunicationChannels.RPC);
    ipcMain.removeHandler(CommunicationChannels.WALLETS);
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
