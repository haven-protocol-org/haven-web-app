

export enum CommunicationChannels {

    RPC="rpc",
    DAEMON="daemon",
    WALLETS="wallets"
}


export interface DAEMON_STATUS  {

    isRunning: boolean,
    code?: number,
    signal?: string,

}


export interface DAEMON_STATUS_MESSAGE {
    wallet: DAEMON_STATUS,
    node:DAEMON_STATUS
}


export interface AVAILABLE_WALLETS {

    wallets:{name:string,address: string}[];

};
