import { RPCRequestObject } from "../rpc/RPCHRequestHandler";

export interface IDaemonManager {
  killDaemon(): void;
  isRunning(): boolean;
  getState(): any;
  requestHandler(requestObject: RPCRequestObject): Promise<any>;
}
