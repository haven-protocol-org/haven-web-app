import {APP_DATA_PATH, getNetType, NET} from "../../env";
import {daemonConfigMainnet, daemonConfigStagenet, daemonConfigTestnet} from "../../daemons/config/default";
import * as path from "path";
import * as fs from "fs";
import {DaemonType, IConfig, IDaemonConfig} from "../../types";



export const LOCAL_HOST: string = "";
export const LOCAL_HOST_URL: string = "http://localhost";
const configFileName = 'daemon_config.json';

const configFilePath = path.join(
    APP_DATA_PATH,
    configFileName
);


const DEFAULT_CONFIG: IConfig =  {

  [NET.Stagenet]:daemonConfigStagenet,
  [NET.Testnet]: daemonConfigTestnet,
  [NET.Mainnet]: daemonConfigMainnet
};


// if daemon config not exists yet, create and store the default one
export const checkAndCreateDaemonConfig = () => {



  if (!fs.existsSync(configFilePath)) {

    const configJson = JSON.stringify(DEFAULT_CONFIG);

    fs.writeFileSync(configFilePath, configJson, 'utf8');
  }


};



export const updateDaemonConfig = (updatedDaemonConfig: IDaemonConfig, nettype: NET, daemonType: DaemonType) => {

  const config = getDaemonConfig();

  config[nettype][daemonType] = updatedDaemonConfig;

  const configJson = JSON.stringify(config);

  fs.writeFileSync(configFilePath, configJson, 'utf8');



};


export const getDaemonConfig = (): IConfig => {

    const fileBuffer = fs.readFileSync(configFilePath);

    return JSON.parse(fileBuffer.toString())


};



export const config = () => getDaemonConfig()[getNetType()];
