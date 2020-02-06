#!/usr/bin/env bash

trap "kill 0" EXIT

#electron envs
export HAVEN_DESKTOP_DEVELOPMENT=true
export NET_TYPE=Mainnet
export NET_TYPE_ID=0
export BROWSER=none
export NODE_INSTALLER=npm

# start rpc client
# npm run start:desktop:testnet --prefix client &
npm run start --prefix haven-desktop-app

#start electron

wait
