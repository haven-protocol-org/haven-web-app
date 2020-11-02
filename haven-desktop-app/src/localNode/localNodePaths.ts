import * as path from "path";
import { getNetTypeName } from "../env";

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
