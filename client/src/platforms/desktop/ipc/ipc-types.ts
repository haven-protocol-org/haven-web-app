export enum CommunicationChannel {
  HAVEND = "havend",
  WALLET_RPC = "wallet-rpc",
  RPC="rpc",
  STORED_WALLETS = "wallets",
  SWITCH_NET = "switch_net"
}

export interface DAEMON_STATUS {
  isRunning: boolean;
  code?: number;
  signal?: string;
}


export interface AVAILABLE_WALLETS {
  wallets: { name: string; address: string }[];
}

export interface WalletState extends ProcessState  {

  isConnectedToDaemon: boolean;
  isSyncing: boolean;
  syncHeight: number;

}

export interface HavendState extends ProcessState {

  address: string;
  isReachable: boolean;
  isRemote: boolean;

}


export interface ProcessState  {
  isRunning: boolean;
  code?: number;
  signal?: string;
};
