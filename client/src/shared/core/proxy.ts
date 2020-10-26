import { isDesktop } from "constants/env";
import { callWallet } from "platforms/desktop/ipc/wallet";
import * as walletCore from "./wallet";
import * as havendCore from "./havend";

const walletHandler: ProxyHandler<typeof walletCore> = {
  get: (target: typeof walletCore, name: string, receiver: any) => {
    if (isDesktop()) {
      return async function (...args: any[]) {
        const response = await callWallet(name, args);
        console.log(response);
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
