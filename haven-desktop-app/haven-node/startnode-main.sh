#!/usr/bin/env bash

trap 'kill %1;' SIGINT
# ./mainnet/havend & sleep '5' &
./mainnet/haven-wallet-rpc '--rpc-bind-port=12345' '--log-level=0' '--disable-rpc-login' '--wallet-dir=./' '--prompt-for-password'
