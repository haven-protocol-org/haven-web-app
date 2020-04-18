
export enum CommunicationChannels {

    RPC="rpc",
    DAEMON="daemon",
    WALLETS="wallets",
    SWITCH_NET="switch_net"
}


export interface DaemonsState {
    wallet: DaemonState,
    node:DaemonState
}


export type DaemonState = {
    isRunning:boolean,
    code?:number,
    signal?: string
}
