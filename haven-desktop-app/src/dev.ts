import * as net from "net";
import { BehaviorSubject } from "rxjs";
import {isDevMode} from "./env";

const devServerStartedObservable: BehaviorSubject<boolean> = new BehaviorSubject<
  boolean
>(false);

export const devServerStarted = devServerStartedObservable.asObservable();

const client = new net.Socket();
const tryConnection = (): void => {
  client.connect({ port: 3000 }, () => {
    devServerStartedObservable.next(true);
  });
};
tryConnection();

client.on("error", (error) => {
  devServerStartedObservable.next(false);
  setTimeout(tryConnection, 1000);
});



export const logInDevMode = (mes: string) => {

  if (isDevMode) {
    console.log(mes);
  }

};
