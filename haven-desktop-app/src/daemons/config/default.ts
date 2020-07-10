import {
  HAVEND_PATH_MAINNET,
  HAVEND_PATH_STAGENET,
  HAVEND_PATH_TESTNET,
  WALLET_RPC_PATH_MAINNET,
  WALLET_RPC_PATH_STAGENET,
  WALLET_RPC_PATH_TESTNET,
} from "../../daemonPaths";
import {
  WALLET_PATH_MAINNET,
  WALLET_PATH_STAGENET,
  WALLET_PATH_TESTNET,
} from "../../wallets/walletPaths";
import { HAVEND_STANDARD_PORT, LOCAL_DAEMON_MAP } from "./enum";
import { NET } from "../../env";

export const daemonConfigMainnet = {
  havend: {
    path: HAVEND_PATH_MAINNET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Mainnet),
    port: HAVEND_STANDARD_PORT.Mainnet,
    args: {},
  },
  wallet: {
    path: WALLET_RPC_PATH_MAINNET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Mainnet),
    port: 12345,
    args: {
      "max-log-file-size": 0,
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_MAINNET,
      "log-level": "2",
    },
  },
};

export const daemonConfigTestnet = {
  havend: {
    path: HAVEND_PATH_TESTNET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Testnet),
    port: HAVEND_STANDARD_PORT.Testnet,
    args: {
      testnet: "",
      "add-priority-node": "seed01.testnet.havenprotocol.org",
    },
  },
  wallet: {
    path: WALLET_RPC_PATH_TESTNET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Testnet),
    port: 12345,
    args: {
      testnet: "",
      "max-log-file-size": 0,
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_TESTNET,
      "log-level": "2",
    },
  },
};

export const daemonConfigStagenet = {
  havend: {
    path: HAVEND_PATH_STAGENET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Stagenet),
    port: HAVEND_STANDARD_PORT.Stagenet,
    args: {
      stagenet: "",
      "add-priority-node": "seed01.stagenet.havenprotocol.org",
    },
  },
  wallet: {
    path: WALLET_RPC_PATH_STAGENET,
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Stagenet),
    port: 12345,
    args: {
      stagenet: "",
      "max-log-file-size": 0,
      "rpc-bind-port": 12345,
      "disable-rpc-login": "",
      "wallet-dir": WALLET_PATH_STAGENET,
      "log-level": "2",
    },
  },
};
