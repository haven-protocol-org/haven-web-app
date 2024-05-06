#!/usr/bin/env bash


export HAVEN_DESKTOP_DEVELOPMENT=false
export NODE_INSTALLER=npm

if [ "$ACTION_OS" == "macos-13" ]
then
    npm run make --prefix haven-desktop-app -- --arch="arm64,x64" 
else 
    npm run make --prefix haven-desktop-app
fi


