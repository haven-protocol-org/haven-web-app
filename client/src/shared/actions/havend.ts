import { createDaemonConnection as createDaemonConnectionCore } from "shared/core/havend";
import { webWalletConnection } from "platforms/web/nodes";
import { DAEMON_CONECTION_CREATED } from "./types";

export const createDaemonConnection = () => {
  return (dispatch: any) => {
    createDaemonConnectionCore(webWalletConnection());
    dispatch({ type: DAEMON_CONECTION_CREATED });
  };
};
