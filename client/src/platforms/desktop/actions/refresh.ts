import { getBalance } from "./balance";
import { getNodeInfo } from "./chain";
import { getTransfers } from "./transferHistory";
import { refreshRPC } from "../ipc/rpc/rpc";
import { getOffshoreBalance } from "./offshoreBalance";
import { getOffshoreTransfers } from "./offshoreTransferHistory";
import { getDaemonStates } from "./daemonState";

export const refresh = () => {
  return (dispatch: any) => {
    refreshRPC().then(() => dispatch(updateApp()));
  };
};

export const updateApp = () => {
  return (dispatch: any) => {
    dispatch(getDaemonStates());
    dispatch(getNodeInfo());
    dispatch(getBalance());
    dispatch(getOffshoreBalance());
    dispatch(getTransfers());
    dispatch(getOffshoreTransfers());
  };
};
