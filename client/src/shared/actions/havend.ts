import { webWalletConnection } from "platforms/web/nodes";
import { havendProxy } from "shared/core/proxy";
import { DAEMON_CONECTION_CREATED } from "./types";

export const connectAppToDaemon = () => {
  return (dispatch: any) => {
    havendProxy.createDaemonConnection(webWalletConnection());
    dispatch({ type: DAEMON_CONECTION_CREATED });
  };
};
