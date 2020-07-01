export enum CommunicationChannel {
  HAVEND = "havend",
  WALLET_RPC = "wallet-rpc",
  STORED_WALLETS = "wallets",
  SWITCH_NET = "switch_net"
}


export type DaemonState = {
  isRunning: boolean;
  code?: number;
  signal?: string;
};
