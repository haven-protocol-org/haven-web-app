import { isDesktop } from "constants/env";
import { callWalletBackend } from "platforms/desktop/ipc/wallet";
import * as walletCore from "./wallet";
import * as havendCore from "./havend";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { CommunicationChannel } from "platforms/desktop/ipc/ipc-types";
import MoneroBlockHeader from "haven-wallet-core/src/main/js/daemon/model/MoneroBlockHeader";
import MoneroSubaddress from "haven-wallet-core/src/main/js/wallet/model/MoneroSubaddress";
import { logM } from "utility/utility";
import MoneroBlock from "haven-wallet-core/src/main/js/daemon/model/MoneroBlock";

const walletHandler: ProxyHandler<typeof walletCore> = {
  get: (
    target: typeof walletCore,
    name: keyof typeof walletCore,
    receiver: any
  ) => {
    if (isDesktop()) {
      return async function (...args: any[]) {
        // we need to handle serialization of data as ipcrenderer cannot transport classes, only raw objects


        try {


        const response = await callWalletBackend(
          name,
          args,
          CommunicationChannel.WALLET
        );

        if (response && response.status && response.status === "error") {
          throw new Error(response.message);
        }


        if (name === "transfer") {
          const txs: MoneroTxWallet[] = response.map(
            (jsonTx: any) => new MoneroTxWallet(jsonTx)
          );

          return txs;
        }

        if (name === "getTxs") {


        const transfers: MoneroTxWallet[] = response.map((state: any) => {
          //workaround to pull in block info into the core lib architecture
          const txWallet = new MoneroTxWallet(state);
          if (state.block) {
            //@ts-ignore
            const block = new MoneroBlock(state.block);
            txWallet.setBlock(block);
          }

          return txWallet;
        });
          
          return transfers


        }

        if (name === "getSubAddresses") {

            const addresses: MoneroSubaddress[] = response.map(
            (jsonAddress: any) => new MoneroSubaddress(jsonAddress)
          );

          return addresses;
        }

        logM(response);
        return response;

      }
      catch(e) {
        
        throw (e.message);

        }
      };
    }
    return Reflect.get(target, name, receiver);
  },
};

const havendHandler: ProxyHandler<typeof havendCore> = {
  get: (target: typeof havendCore, name: keyof typeof havendCore, receiver: any) => {
    if (isDesktop()) {
      return async function (...args: any[]) {
        try {
        const response = await callWalletBackend(
          name,
          args,
          CommunicationChannel.DAEMON
        );

        if (name==="getLastBlockHeader") {
          const headerResponse: MoneroBlockHeader = new MoneroBlockHeader(response);
          return headerResponse;
        }
        return response;
      }
      catch(e) {
        throw e;
      }
      };
    }
    return Reflect.get(target, name, receiver);
  },
};

export const havendProxy = new Proxy(havendCore, havendHandler);
export const walletProxy = new Proxy(walletCore, walletHandler);
