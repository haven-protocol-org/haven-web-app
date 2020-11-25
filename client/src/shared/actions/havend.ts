import { webWalletConnection } from "platforms/web/nodes";
import { createDaemonConnection } from "shared/core/havend";
import { DAEMON_CONECTION_CREATED } from "./types";

export const connectAppToDaemon = () => {
  return (dispatch: any) => {
    createDaemonConnection(webWalletConnection());
    dispatch({ type: DAEMON_CONECTION_CREATED });
  };
};
