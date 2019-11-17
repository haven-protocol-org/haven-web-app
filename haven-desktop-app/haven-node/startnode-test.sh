#!/usr/bin/env bash

trap 'kill %1;' SIGINT

./testnet/haven-wallet-rpc '--log-level=4' '--rpc-access-control-origins=http://localhost:3000' '--testnet' '--rpc-bind-port=12345' '--rpc-login=monero:monero' '--wallet-dir=./wallets' & ./testnet/havend '--testnet' '--add-priority-node=seed01.testnet.havenprotocol.org' '--add-priority-node=node3.havenprotocol.org'
