import MoneroDaemonRpc from "haven-wallet-core/src/main/js/daemon/MoneroDaemonRpc";
import { IMonerRPCConnection } from "typings";



let daemon: MoneroDaemonRpc;


export const createDaemonConnection = (rpcConnection: IMonerRPCConnection) => {

    //@ts-ignore
    daemon = new MoneroDaemonRpc(rpcConnection);

}

export const getLastBlockHeader = () => {

    return daemon.getLastBlockHeader();
}

export const isDaemonConnected = () => {

    return daemon.isConnected()

}