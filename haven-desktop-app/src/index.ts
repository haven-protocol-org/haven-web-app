import { app, BrowserWindow } from "electron";
import * as path from "path";
import { devServerStarted } from "./dev";
import { HavenWallet } from "./HavenWallet";
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;

const wallet = new HavenWallet();

app.enableSandbox();
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;

const startApp = () => {
  // start the app
  wallet.start();

  const browserOptions: BrowserWindowConstructorOptions = {
    width: 800,
    minWidth: 500,
    height: 600
  };

  browserOptions.webPreferences = {
    nodeIntegration: false,
    preload: path.join(__dirname, "../preload.js")
  };
  // Create the browser window.
  mainWindow = new BrowserWindow(browserOptions);
  console.log("Haven development ? " + process.env.HAVEN_DESKTOP_DEVELOPMENT);

  if (process.env.HAVEN_DESKTOP_DEVELOPMENT) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    devServerStarted.subscribe(hasStarted => {
      console.log("hasStarted : ", hasStarted);
      if (hasStarted) {
        mainWindow.loadURL("http://localhost:3000");
      } else {
        mainWindow.loadURL(path.join(`file://${__dirname}`, "../index.html"));
      }
    });
  }

  // TODO copy over build files from client app
  else {
    // and load the index.html of the app.
    mainWindow.loadURL(path.join(`file://${__dirname}`, "..client/index.html"));
  }
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", startApp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    wallet.quit();
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    startApp();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
