import { app } from 'electron';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import {isDevMode} from "./env";

const isMac = process.platform === 'darwin';


export const havenMenu: Array<(MenuItemConstructorOptions)> = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            //@ts-ignore
            ...(isDevMode ? [{role:'forcereload'}]:[]),
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },

        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]

    },

    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' }
                    ]
                }
            ] : [
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ])
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },


    {
        label: 'Social',
        submenu: [

            {
                label: 'Twitter',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://twitter.com/HavenXHV')
                }
            },

            {
                label: 'Medium',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://medium.com/@havencurrency')
                }
            },
            { type: 'separator' },
            {
                label: 'Discord',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://discordapp.com/invite/CCtNxfG')
                }
            },
            {
                label: 'Reddit',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://www.reddit.com/r/havenprotocol/')
                }
            },
            {
                label: 'Telegram',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://web.telegram.org/#/im?p=s1273047334_13986713956461503950')
                }
            },
            { type: 'separator' },
            {
                label: 'Github',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://github.com/haven-protocol-org')
                }
            }
        ]
    },

    {
        label:'White Papers',
        submenu: [

            {
                label: 'English',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('http://docs.havenprotocol.org/whitepapers/english.pdf')
                }
            },

            {
                label: 'French',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('http://docs.havenprotocol.org/whitepapers/french.pdf')
                }
            },
            {
                label: '中文',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('http://docs.havenprotocol.org/whitepapers/chinese.pdf')
                }
            }

        ]

    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Discord Support Channel',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://discordapp.com/channels/536838513182638090/570818940553527296')
                }
            }
        ]
    }
] as Array<(MenuItemConstructorOptions)>;

