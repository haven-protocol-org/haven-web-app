#!/usr/bin/env bash

#electron envs
HAVEN_DESKTOP_DEVELOPMENT=true
HAVEN_NET=Testnet

# start rpc client
cd client && npm run start:desktop:testnet

cd ..

#start electron
cd haven-desktop-app && npm run start
