import * as path from "path";
import { getNetTypeName } from "./env";
import { DaemonType } from "./types";

const PLATFORM = process.platform;

export function checkForUnpackedPath(pathName: string): string {
  if (!pathName.includes("app.asar.unpacked")) {
    return pathName.replace("app.asar", "app.asar.unpacked");
  }
  return pathName;
}

export const getLocalDaemonPath = (type: DaemonType): string => {
  if (type === DaemonType.havend) {
    return checkForUnpackedPath(
      path.resolve(
        __dirname,
        `../haven-node/${PLATFORM}/${getNetTypeName()}/havend`
      )
    );
  }
};
