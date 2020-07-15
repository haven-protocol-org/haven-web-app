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


 const REMOTE_NODES = [
  {
    address: "http://remote.haven.miner.rocks",
    port: "17750",
  },
  {
    address:'http://nodes.hashvault.pro',
    port: "17750",
  },
  {
    address:'http://remote.eu.havenprotocol.org',
    port: "17750",
  }
];


const nodeIndex =  Math.floor(Math.random() * 3);
const remoteNode = REMOTE_NODES[nodeIndex];

export const daemonConfigMainnet = {
  havend: {
    path: HAVEND_PATH_MAINNET,
    //daemonUrl: LOCAL_DAEMON_MAP.get(NET.Mainnet),
    daemonUrl: `${remoteNode.address}:${remoteNode.port}`,
    port: HAVEND_STANDARD_PORT.Mainnet,
    args: {},
  },
  wallet: {
      path: WALLET_RPC_PATH_MAINNET,
      daemonUrl: `${remoteNode.address}:${remoteNode.port}`,
      port: 12345,
      args: {
          "max-log-file-size":100000,
          "daemon-address": "http://remote.eu.havenprotocol.org:17750",
          "max-log-files":2,
          "rpc-bind-port": 12345,
          "disable-rpc-login": "",
          "wallet-dir": WALLET_PATH_MAINNET,
           "log-level":"2"
      }
  }

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
      "offline":"",
      "fixed-difficulty": 50
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

