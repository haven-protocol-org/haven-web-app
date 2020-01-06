import {app, BrowserWindow, Menu} from "electron";
import * as path from "path";
import { devServerStarted } from "./dev";
import { HavenWallet, QUIT_EVENT } from "./HavenWallet";
import { BrowserWindowConstructorOptions } from "electron";
import {isDevMode} from "./env";
import {havenMenu} from "./menu";

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


const menu = Menu.buildFromTemplate(havenMenu);
Menu.setApplicationMenu(menu);

const startApp = () => {
  const browserOptions: BrowserWindowConstructorOptions = {
    width: 992,
    minWidth: 470,
    minHeight: 720,
    height: 600
  };

  browserOptions.webPreferences = {
    nodeIntegration: false,
    preload: path.join(__dirname, "../preload.js")
  };
  // Create the browser window.
  mainWindow = new BrowserWindow(browserOptions);

  if (isDevMode) {
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

    mainWindow.maximize();


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

let willQuit = false;

app.on("will-quit", event => {
  if (!willQuit) {
    willQuit = true;
    event.preventDefault();
    onAppQuit();
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

const onAppQuit = () => {
  console.log("on App quit called");

  wallet.getAppStatus().once(QUIT_EVENT, () => {
    app.quit();
  });

  wallet.quit();
};
