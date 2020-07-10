import { APP_DATA_PATH, getNetType, isDevMode, NET } from "../../env";
import {
  daemonConfigMainnet,
  daemonConfigStagenet,
  daemonConfigTestnet,
} from "../../daemons/config/default";
import * as path from "path";
import * as fs from "fs";
import { IConfig } from "../../types";
import { LOCAL_DAEMON_MAP } from "../../daemons/config/enum";

const configFileName = "daemon_config.json";

let daemonConfig: IConfig;

const configFilePath = path.join(APP_DATA_PATH, configFileName);

const DEFAULT_CONFIG: IConfig = {
  [NET.Stagenet]: daemonConfigStagenet,
  [NET.Testnet]: daemonConfigTestnet,
  [NET.Mainnet]: daemonConfigMainnet,
};

// if daemon config not exists yet, create and store the default one
export const checkAndCreateDaemonConfig = () => {
  if (!fs.existsSync(configFilePath)) {
    const configJson = JSON.stringify(DEFAULT_CONFIG);

    fs.writeFileSync(configFilePath, configJson, "utf8");
  }
};

export const updateDaemonUrlInConfig = (daemonUrl: string) => {
  const isLocal = isLocalDaemon(daemonUrl);

  const config = getDaemonConfig();

  const daemonConfigNet = config[getNetType()];

  daemonConfigNet.havend.daemonUrl = daemonUrl;
  daemonConfigNet.wallet.daemonUrl = daemonUrl;

  if (isLocal) {
    delete daemonConfigNet.wallet.args["daemon-address"];
  } else {
    daemonConfigNet.wallet.args["daemon-address"] = daemonUrl;
  }

  const configJson = JSON.stringify(config);

  fs.writeFileSync(configFilePath, configJson, "utf8");
  daemonConfig = readDaemonConfig();
};

export const getDaemonConfig = (): IConfig => {
  if (!daemonConfig) {
    daemonConfig = readDaemonConfig();
  }
  return daemonConfig;
};

const readDaemonConfig = (): IConfig => {
  if (isDevMode) {
    console.log(configFilePath);
  }

  const fileBuffer = fs.readFileSync(configFilePath);

  return JSON.parse(fileBuffer.toString());
};

export const isLocalDaemon = (url: string) => {
  return url === getLocalDaemon();
};

export const getLocalDaemon = (): string => {
  return LOCAL_DAEMON_MAP.get(getNetType());
};

export const config = () => getDaemonConfig()[getNetType()];
