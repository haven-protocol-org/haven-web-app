const { app, contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("havenProcess", {
  invoke: (channel, data) => {
    // whitelist channels
    let validChannels = ["localNode", "wallet", "daemon", "config", "stored_wallets"];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
  },
  on: (channel, listener) => {
    let validChannels = ["wallet"];
    if (validChannels.includes(channel)) {
      return ipcRenderer.on(channel, listener);
    }
  },
  removeAllListeners: () => {
    return ipcRenderer.removeAllListeners();
  },
  platform: process.platform,
  appVersion: process.argv[process.argv.length - 1],
});
