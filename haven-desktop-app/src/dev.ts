import { BrowserWindow } from "electron";
import * as net from "net";
import { BehaviorSubject } from "rxjs";
import { isDevMode } from "./env";
import * as path from "path";

const devServerStartedObservable: BehaviorSubject<boolean> = new BehaviorSubject<
  boolean
>(false);

const devServerStarted = devServerStartedObservable.asObservable();

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

export const destroySocket = (): void => {
  client.destroy();
};

export const logInDevMode = (mes: any): void => {
  if (isDevMode) {
    console.log(mes);
  }
};

export const startInDevMode = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.openDevTools();

  devServerStarted.subscribe((hasStarted) => {
    console.log("hasStarted : ", hasStarted);
    if (hasStarted) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      mainWindow.loadURL(
        path.join(`file://${__dirname}`, "../sites/dev/index.html")
      );
    }
  });
};
