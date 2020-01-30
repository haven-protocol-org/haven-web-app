
export enum CommunicationChannels {

    RPC="rpc",
    DAEMON="daemon",
    WALLETS="wallets"
}


export interface DAEMON_STATUS_MESSAGE {
    wallet: DaemonState,
    node:DaemonState
}


export type DaemonState = {
    isRunning:boolean,
    code?:number,
    signal?: string
}
