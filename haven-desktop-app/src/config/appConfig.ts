import { ipcMain } from "electron";
import { CommunicationChannel, DesktopConfig, NodeLocation } from "../types";
import * as fs from "fs";
import * as path from "path";
import { APP_DATA_PATH } from "../env";

const CONFIG_FILE_NAME = "haven_config.json"
const configFilePath = path.join(APP_DATA_PATH, CONFIG_FILE_NAME);

export const addConfigHandler = () => {

  if (!isConfigCreated()) {
    createDefaultConfig();
  }
    ipcMain.handle(CommunicationChannel.CONFIG, (event, args) =>
        getConfig(args),
  );
  
}


const getConfig = (update:Partial<DesktopConfig> = undefined): DesktopConfig => {

  const fileBuffer = fs.readFileSync(configFilePath);
  const currentConfig =  JSON.parse(fileBuffer.toString());

    // if args sent by client, update config
     if (update) {

      const updatedConfig = {...currentConfig, ...update};
      const configJson = JSON.stringify(updatedConfig);
      fs.writeFileSync(configFilePath, configJson, "utf8");
      return updatedConfig;
      
     }
      return currentConfig
   }

   const isConfigCreated = () => {
    return fs.existsSync(configFilePath)
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
    fs.writeFileSync(configFilePath, configJson, "utf8");
   }
