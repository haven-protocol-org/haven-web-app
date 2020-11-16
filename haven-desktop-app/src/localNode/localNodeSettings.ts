import * as path from "path";
import { getNetTypeId, getNetTypeName } from "../env";
import { NET } from "../types";

const PLATFORM = process.platform;

export function checkForUnpackedPath(pathName: string): string {
  if (!pathName.includes("app.asar.unpacked")) {
    return pathName.replace("app.asar", "app.asar.unpacked");
  }
  return pathName;
}

export const getLocalDaemonPath = (): string => {
  return checkForUnpackedPath(
    path.resolve(
      __dirname,
      `../haven-node/${PLATFORM}/${getNetTypeName()}/havend`
    )
  );
};


export const getLocalNodeArguments = (): object => {

  switch (getNetTypeId()) {
    case NET.Mainnet:
      return {};
    case NET.Testnet:
      return {
        "testnet": "",
        "add-priority-node": "seed01.testnet.havenprotocol.org",
      };
    case NET.Stagenet:
      return {
        "stagenet": "",
        "offline": "",
        "fixed-difficulty": 50,
      };
    }
}


