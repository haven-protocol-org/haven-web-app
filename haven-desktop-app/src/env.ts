import { app } from "electron";
import * as path from "path";
import { NET, NetTypeName } from "./types";

export const APP_DATA_PATH = app ? app.getPath("userData") : path.join(__dirname, "../__tests__/");
export const isDevMode = process.env.HAVEN_DESKTOP_DEVELOPMENT;


export const getNetTypeName = (netTypeID: NET): NetTypeName => {

  return [NetTypeName.mainnet, NetTypeName.testnet, NetTypeName.stagenet][netTypeID];

};

