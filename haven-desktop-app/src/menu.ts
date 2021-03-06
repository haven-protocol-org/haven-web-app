import { app } from "electron";
import { isDevMode } from "./env";
import { KeyType, showKey } from "./keys";
import { isClosed } from "./shared/wallet";
import { Menu, MenuItemConstructorOptions } from "electron";
import { logInDevMode } from "./dev";


const isMac = process.platform === "darwin";


const havenMenu: MenuItemConstructorOptions[] = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "hide" },
            // @ts-ignore
            ...(isDevMode ? [{ role: "forcereload" }] : []),
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },

  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  {
    label: "View",
    submenu: [
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },

  {
    label: "Social",
    submenu: [
      {
        label: "Twitter",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://twitter.com/havenxhv");
        },
      },

      {
        label: "Medium",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://havenprotocol.medium.com/");
        },
      },
      { type: "separator" },
      {
        label: "Discord",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://discordapp.com/invite/CCtNxfG");
        },
      },
      {
        label: "Reddit",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://www.reddit.com/r/havenprotocol/");
        },
      },
      {
        label: "Telegram",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://web.telegram.org/#/im?p=s1273047334_13986713956461503950",
          );
        },
      },
      { type: "separator" },
      {
        label: "Github",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/haven-protocol-org");
        },
      },
    ],
  },

  {
    label: "Knowledge",
    submenu: [
      {
        label: "White Papers",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://havenprotocol.org/whitepaper/",
          );
        },
      },
     {
        label: "Knowledge Base",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://havenprotocol.org/knowledge/",
          );
        },
      },
    ],
  },

  {
    label: "Keys",
    id:"Keys",
    submenu: [
      {
        label: "Show Public Spend Key",
        click: () => showKey(KeyType.PUBLIC_SPEND),
      },
      {
        label: "Show Public View Key",
        click: () => showKey(KeyType.PUBLIC_VIEW),
      },
      {
        label: "Show Private View Key",
        click: () => showKey(KeyType.PRIVATE_VIEW),
      },
      {
        label: "Show Private Spend Key",
        click: () => showKey(KeyType.PRIVATE_SPEND),
      },
      {
        label: "Show Mnemonic Seed",
        click: () => showKey(KeyType.MNEMONIC),
      },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Discord Support Channel",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://discordapp.com/channels/536838513182638090/570818940553527296",
          );
        },
      },
    ],
  },
] as MenuItemConstructorOptions[];

export const createMenu = () => {
  
  const menu = Menu.buildFromTemplate(havenMenu);

  Menu.setApplicationMenu(menu);

  enableKeysMenu(false);



}

export const enableKeysMenu = (enable: boolean) => {

  const menu = Menu.getApplicationMenu();

  const menuItem = menu.getMenuItemById("Keys");
  menuItem.enabled = enable;
  Menu.setApplicationMenu(menu);
}

