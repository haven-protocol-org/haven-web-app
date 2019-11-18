#!/usr/bin/env bash

trap "kill 0" EXIT

#electron envs
HAVEN_DESKTOP_DEVELOPMENT=true
NET_TYPE=Testnet
BROWSER=none

# start rpc client
npm run start:desktop:testnet --prefix client & npm run start --prefix haven-desktop-app

#start electron

wait
