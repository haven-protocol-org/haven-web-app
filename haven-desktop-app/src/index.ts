import { app, BrowserWindow, Menu, shell } from "electron";
import { BrowserWindowConstructorOptions } from "electron";
import * as path from "path";
import { startInDevMode } from "./dev";
import { isDevMode } from "./env";
import { appEventBus, LOCAL_NODE_STOPPED_EVENT } from "./EventBus";
import { HavenWallet } from "./HavenWallet";
import { havenMenu } from "./menu";

app.enableSandbox();
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// tslint:disable-next-line: no-var-requires
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;
const wallet = new HavenWallet();

const menu = Menu.buildFromTemplate(havenMenu);
Menu.setApplicationMenu(menu);

const startApp = (): void => {
  const browserOptions: BrowserWindowConstructorOptions = {
    width: 992,
    minWidth: 470,
    minHeight: 720,
    height: 750,
  };

  browserOptions.webPreferences = {
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
    additionalArguments: [app.getVersion()],
    preload: path.join(__dirname, "../sites/preload/preload.js"),
  };
  // Create the browser window.
  mainWindow = new BrowserWindow(browserOptions);

  if (isDevMode) {
    // Open the DevTools.
    startInDevMode(mainWindow);
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

let willQuit = false;

app.on("will-quit", (event) => {
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
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", async (event, navigationUrl) => {
    event.preventDefault();

    await shell.openExternal(navigationUrl);
  });
});

const onAppQuit = () => {
  console.log("on App quit called");

  appEventBus.once(LOCAL_NODE_STOPPED_EVENT, () => {
    app.quit();
  });

  wallet.quit();
};

export { mainWindow };
