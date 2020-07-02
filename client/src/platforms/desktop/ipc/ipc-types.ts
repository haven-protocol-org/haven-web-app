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

export interface DAEMON_STATUS_MESSAGE {
  wallet: DAEMON_STATUS;
  node: DAEMON_STATUS;
}

export interface AVAILABLE_WALLETS {
  wallets: { name: string; address: string }[];
}
