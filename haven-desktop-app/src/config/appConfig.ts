import { ipcMain } from "electron";
import { CommunicationChannel, DesktopConfig, NET, NodeLocation } from "../types";
import * as fs from "fs";
import * as path from "path";
import { APP_DATA_PATH } from "../env";
import { logInDevMode } from "../dev";

const CONFIG_FILE_NAME = "haven_config"
const configFilePath = path.join(APP_DATA_PATH, CONFIG_FILE_NAME);

export const addConfigHandler = () => {

  if (!isConfigCreated()) {
    createDefaultConfig();
  }
    ipcMain.handle(CommunicationChannel.CONFIG, (event, args) => {

      logInDevMode(args);
      if (Array.isArray(args)) {
        return getConfig(args[0], args[1]);
      }
      return getConfig(args); 
      
    }

  );
  
}


const getConfig = ( netTypeID: number,update:Partial<DesktopConfig> = undefined): DesktopConfig => {

  const fileBuffer = fs.readFileSync(configFilePath + `_${netTypeID}`);
  const currentConfig =  JSON.parse(fileBuffer.toString());

    // if args sent by client, update config
     if (update) {

      const updatedConfig = {...currentConfig, ...update};
      const configJson = JSON.stringify(updatedConfig);
      fs.writeFileSync(configFilePath + `_${netTypeID}`, configJson, "utf8");
      return updatedConfig;
      
     }
      return currentConfig
   }

   const isConfigCreated = () => {
    return fs.existsSync(configFilePath + `_${NET.Mainnet}`)
   }

   const createDefaultConfig = () => {


    // we just create a simple default config
    const defaultConfig: DesktopConfig = {

      selectedNode:{
        location: NodeLocation.None
      },
      theme:"dark"

    }
    const configJson = JSON.stringify(defaultConfig);
    fs.writeFileSync(configFilePath + `_${NET.Mainnet}`, configJson, "utf8");
    fs.writeFileSync(configFilePath + `_${NET.Testnet}`, configJson, "utf8");
    fs.writeFileSync(configFilePath + `_${NET.Stagenet}`, configJson, "utf8");
   }
