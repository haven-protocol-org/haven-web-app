
import {
  WALLET_PATH_MAINNET,
  WALLET_PATH_STAGENET,
  WALLET_PATH_TESTNET,
} from "../../wallets/walletPaths";
import { HAVEND_STANDARD_PORT, LOCAL_DAEMON_MAP } from "./enum";
import { NET } from "../../types";


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
  },
  {
    address:'Http://xhv-pst.minershive.ca',
    port:"17750"

  }
];


const nodeIndex =  Math.floor(Math.random() * REMOTE_NODES.length);
const remoteNode = REMOTE_NODES[nodeIndex];

export const daemonConfigMainnet = {
  havend: {
    //daemonUrl: LOCAL_DAEMON_MAP.get(NET.Mainnet),
    daemonUrl: `${remoteNode.address}:${remoteNode.port}`,
    port: HAVEND_STANDARD_PORT.Mainnet,
    args: {},
  },
  wallet: {
      daemonUrl: `${remoteNode.address}:${remoteNode.port}`,
      port: 12345,
      args: {
          "max-log-file-size":100000,
          "daemon-address": `${remoteNode.address}:${remoteNode.port}`,
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
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Testnet),
    port: HAVEND_STANDARD_PORT.Testnet,
    args: {
      testnet: "",
      "add-priority-node": "seed01.testnet.havenprotocol.org",
    },
  },
  wallet: {
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
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Stagenet),
    port: HAVEND_STANDARD_PORT.Stagenet,
    args: {
      stagenet: "",
      "offline":"",
      "fixed-difficulty": 50
    },
  },
  wallet: {
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

