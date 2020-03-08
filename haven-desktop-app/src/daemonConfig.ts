import {APP_DATA_PATH, isMainnet, NET, NET_TYPE_ID} from "./env";
import * as fs from "fs";
import * as path from "path";

const MAINNET_WALLET_PATH = "/wallet/main";
const TESTNET_WALLET_PATH = "/wallet/test";
const STAGENET_WALLET_PATH = "/wallet/stage";

const PLATFORM = process.platform;

const WALLET_PATH_TESTNET: string = path.join(
  APP_DATA_PATH,
  TESTNET_WALLET_PATH
);
const WALLET_PATH_MAINNET: string = path.join(
  APP_DATA_PATH,
  MAINNET_WALLET_PATH
);

const WALLET_PATH_STAGENET: string = path.join(
    APP_DATA_PATH,
    STAGENET_WALLET_PATH
);


const HAVEND_PATH_TESTNET: string = checkForUnpackedPath(
  path.resolve(__dirname, `../haven-node/${PLATFORM}/testnet/havend`)
);
const HAVEND_PATH_MAINNET: string = checkForUnpackedPath(
  path.resolve(__dirname, `../haven-node/${PLATFORM}/mainnet/havend`)
);

const HAVEND_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/stagenet/havend`)
);


const WALLET_RPC_PATH_TESTNET: string = checkForUnpackedPath(
  path.resolve(__dirname, `../haven-node/${PLATFORM}/testnet/haven-wallet-rpc`)
);
const WALLET_RPC_PATH_MAINNET: string = checkForUnpackedPath(
  path.resolve(__dirname, `../haven-node/${PLATFORM}/mainnet/haven-wallet-rpc`)
);
const WALLET_RPC_PATH_STAGENET: string = checkForUnpackedPath(
    path.resolve(__dirname, `../haven-node/${PLATFORM}/stagenet/haven-wallet-rpc`)
);

export const checkAndCreateWalletDir = () => {
  if (isMainnet) {
    if (!fs.existsSync(WALLET_PATH_MAINNET)) {
      fs.mkdirSync(WALLET_PATH_MAINNET, { recursive: true });
    }
  } else {
    if (!fs.existsSync(WALLET_PATH_TESTNET)) {
      fs.mkdirSync(WALLET_PATH_TESTNET, { recursive: true });
    }
  }
};

function checkForUnpackedPath(path: string) {
  if (!path.includes("app.asar.unpacked")) {
    return path.replace("app.asar", "app.asar.unpacked");
  }
  return path;
}

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

export const daemonConfig: {
  havend: IDaemonConfig;
  wallet: IDaemonConfig;
} = NET_CONFIG_MAP[NET_TYPE_ID];
