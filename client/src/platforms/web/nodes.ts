import { getPort } from "constants/env";
import { IMonerRPCConnection } from "typings";

export const webWalletConnection = (): IMonerRPCConnection => {
  const uri =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    getPort();
  return { uri, username: "super", password: "super" };
};
