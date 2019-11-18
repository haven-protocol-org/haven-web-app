#!/usr/bin/env bash

#electron envs
HAVEN_DESKTOP_DEVELOPMENT=true
NET_TYPE=Testnet
BROWSER=none

# start rpc client
#cd client && npm run start:desktop:testnet & (cd .. &&
cd haven-desktop-app && npm run start
#)

#start electron
