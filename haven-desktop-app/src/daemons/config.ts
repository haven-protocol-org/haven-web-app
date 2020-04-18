import {getNetType, NET} from "../env";

import {
  HAVEND_PATH_MAINNET, HAVEND_PATH_STAGENET,
  HAVEND_PATH_TESTNET,
  WALLET_PATH_MAINNET, WALLET_PATH_STAGENET,
  WALLET_RPC_PATH_MAINNET, WALLET_RPC_PATH_STAGENET, WALLET_RPC_PATH_TESTNET
} from "../daemons/daemonPaths";



const daemonConfigMainnet = {

  havend: {
    path: HAVEND_PATH_MAINNET,
    port: 17750,
    args: {}
  },
  wallet: {
    path: WALLET_RPC_PATH_MAINNET,
    port: 12345,
    args: {
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_MAINNET
    }
  }
};

const daemonConfigTestnet = {
  havend: {
    path: HAVEND_PATH_TESTNET,
    port: 27750,
    args: {
      testnet: "",
      "add-priority-node": "seed01.testnet.havenprotocol.org"
    }
  },
  wallet: {
    path: WALLET_RPC_PATH_TESTNET,
    port: 12345,
    args: {
      testnet: "",
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_STAGENET
    }
  }
};


const daemonConfigStagenet = {
  havend: {
    path: HAVEND_PATH_STAGENET,
    port:37750,
    args: {
      stagenet: "",
      "add-priority-node": "seed01.stagenet.havenprotocol.org"
    }
  },
  wallet: {
    path: WALLET_RPC_PATH_STAGENET,
    port: 12345,
    args: {
      stagenet: "",
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_STAGENET
    }
  }
};

const NET_CONFIG_MAP =  {

  [NET.Stagenet]:daemonConfigStagenet,
  [NET.Testnet]: daemonConfigTestnet,
  [NET.Mainnet]: daemonConfigMainnet
};


export interface IDaemonConfig {
  path: string;
  port: number;
  args: { [key: string]: string | number };
}

export const config = (): {
  havend: IDaemonConfig;
  wallet: IDaemonConfig;
} => NET_CONFIG_MAP[getNetType()];
