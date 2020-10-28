import { isDesktop } from "constants/env";
import { callWallet } from "platforms/desktop/ipc/wallet";
import * as walletCore from "./wallet";
import * as havendCore from "./havend";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";

const walletHandler: ProxyHandler<typeof walletCore> = {
  get: (
    target: typeof walletCore,
    name: keyof typeof walletCore,
    receiver: any
  ) => {
    if (isDesktop()) {
      return async function (...args: any[]) {
        // we need to handle serialization of data as ipcrenderer cannot transport classes, only raw objects

        const response = await callWallet(name, args);
        console.log(response);

        if (name === "transfer") {
          const txs: MoneroTxWallet[] = response.map(
            (jsonTx: any) => new MoneroTxWallet(jsonTx)
          );

          return txs;
        }

        return response;
      };
    }
    return Reflect.get(target, name, receiver);
  },
};

const havendHandler: ProxyHandler<typeof havendCore> = {
  get: (target: typeof havendCore, name: string, receiver: any) => {
    if (isDesktop()) {
      return function (...args: any[]) {
        //  return callWallet(name, args);
      };
    }
    return Reflect.get(target, name, receiver);
  },
};

export const havendProxy = new Proxy(havendCore, havendHandler);
export const walletProxy = new Proxy(walletCore, walletHandler);
