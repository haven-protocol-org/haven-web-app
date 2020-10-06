import { IMonerRPCConnection } from "typings";

export const webWalletConnection = (): IMonerRPCConnection => {
  const uri =
    window.location.protocol + "//" + window.location.hostname + ":37750";
  console.log(uri);
  return { uri, username: "super", password: "super" };
};
