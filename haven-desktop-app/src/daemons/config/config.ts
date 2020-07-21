import * as fs from "fs";
import * as path from "path";
import {daemonConfigMainnet, daemonConfigStagenet, daemonConfigTestnet} from "../../daemons/config/default";
import {LOCAL_DAEMON_MAP} from "../../daemons/config/enum";
import {APP_DATA_PATH, getNetTypeId, isDevMode} from "../../env";
import {IConfig, NET} from "../../types";

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

  const storedConfig = getDaemonConfig();

  const daemonConfigNet = storedConfig[getNetTypeId()];

  daemonConfigNet.havend.daemonUrl = daemonUrl;
  daemonConfigNet.wallet.daemonUrl = daemonUrl;

  if (isLocal) {
    delete daemonConfigNet.wallet.args["daemon-address"];
  } else {
    daemonConfigNet.wallet.args["daemon-address"] = daemonUrl;
  }

  const configJson = JSON.stringify(storedConfig);

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
  return LOCAL_DAEMON_MAP.get(getNetTypeId());
};

export const config = () => getDaemonConfig()[getNetTypeId()];


