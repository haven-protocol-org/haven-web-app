import { app, BrowserWindow } from "electron";
import * as path from "path";
import { devServerStarted } from "./dev";
import { HavenWallet, QUIT_EVENT } from "./HavenWallet";
import { BrowserWindowConstructorOptions } from "electron";

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



  const browserOptions: BrowserWindowConstructorOptions = {
    width: 992,
    minWidth: 380,
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
  } else {
    // and load the index.html of the app.
    mainWindow.loadURL(
      path.join(`file://${__dirname}`, "../client/index.html")
    );
  }

  // start the app
  wallet.start();
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", startApp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  onAppQuit();
});

const onAppQuit = () => {
  // show dialog
  // add quite listener
  // quiet wallet
  //quiet app

  // dialog.showMessageBox(null, {type:'info', title:'Shutting down node', message:'Shutting down node'});

  wallet.getAppStatus().once(QUIT_EVENT, () => {
    console.log("quit app");
    app.quit();
  });

  wallet.quit();
};
