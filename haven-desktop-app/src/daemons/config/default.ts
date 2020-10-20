import { NET } from "../../types";
import { HAVEND_STANDARD_PORT, LOCAL_DAEMON_MAP } from "./enum";

const REMOTE_NODES = [
  {
    address: "http://remote.haven.miner.rocks",
    port: "17750",
  },
  {
    address: "http://nodes.hashvault.pro",
    port: "17750",
  },
  {
    address: "http://xhv-pst.minershive.ca",
    port: "17750",
  },
];

const nodeIndex = Math.floor(Math.random() * REMOTE_NODES.length);
const remoteNode = REMOTE_NODES[nodeIndex];

export const daemonConfigMainnet = {
  havend: {
    // daemonUrl: LOCAL_DAEMON_MAP.get(NET.Mainnet),
    daemonUrl: `${remoteNode.address}:${remoteNode.port}`,
    port: HAVEND_STANDARD_PORT.Mainnet,
    args: {},
  },
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
};

export const daemonConfigStagenet = {
  havend: {
    daemonUrl: LOCAL_DAEMON_MAP.get(NET.Stagenet),
    port: HAVEND_STANDARD_PORT.Stagenet,
    args: {
      stagenet: "",
      offline: "",
      "fixed-difficulty": 50,
    },
  },
};
