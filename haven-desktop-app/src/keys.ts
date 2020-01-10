
// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

// modified 2017 for some CN functions by luigi1111

import {isMainnet} from "./env";
import {RPCHRequestHandler} from "./rpc/RPCHRequestHandler";
import {daemonConfig} from "./daemonConfig";
import {dialog} from "electron";
import {decode_address} from "./xmr-core/addressUtils";

export enum KeyType {

    PRIVATE_VIEW,PUBLIC_VIEW,PRIVATE_SPEND, PUBLIC_SPEND, MNEMONIC
};


// const rpcUrl = process.env.REACT_APP_RPC_URL;


const MNEMONIC = 'mnemonic';
const PRIVATE_VIEW_KEY = 'view_key';
const PRIVATE_SPEND_KEY = 'spend_key';


const rpcKeyHandler = new RPCHRequestHandler();
rpcKeyHandler.port = daemonConfig.wallet.port;


export const showKey = (key: KeyType) => {


    console.log('show key called');

    switch(key) {

        case KeyType.MNEMONIC:
            fetchKey(MNEMONIC);
            return;
        case KeyType.PRIVATE_VIEW:
            fetchKey(PRIVATE_VIEW_KEY);
            return;
        case KeyType.PRIVATE_SPEND:
            fetchKey(PRIVATE_SPEND_KEY);
            return;

        case KeyType.PUBLIC_VIEW:
            fetchAdress();
            return;
        case KeyType.PUBLIC_SPEND:
            fetchAdress();
            return;

    }
};

const showDialog = (title: string, message: string) => {

    dialog.showMessageBox(null,{title, message});
};


const fetchAdress = async() => {

    const objRequest = {
        id: 0,
        jsonrpc: "2.0",
        method: 'get_address',
        params: {"account_index":0}
    };


    const response = await rpcKeyHandler.sendRequest(objRequest);

    if (response.data.result) {

        const pubKeys = decode_address(response.data.result.address);

        showDialog('juhu', pubKeys.spend);

    }


};


const fetchKey = async(keyType: string) => {


    const objRequest = {
        id: 0,
        jsonrpc: "2.0",
        method: 'query_key',
        params: {'key_type': ''}
    };

    objRequest.params.key_type = keyType;
    const response = await rpcKeyHandler.sendRequest(objRequest);

    console.log(response);
    if (response.data.result) {

        const key = response.data.result.key;
        showDialog('test', key);
    }
};
