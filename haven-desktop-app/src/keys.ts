
// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

// modified 2017 for some CN functions by luigi1111

import {RPCHRequestHandler} from "./rpc/RPCHRequestHandler";
import {daemonConfig} from "./daemonConfig";
import {dialog} from "electron";
import {decode_address} from "./xmr-core/addressUtils";

export enum KeyType {

    PRIVATE_VIEW,PUBLIC_VIEW,PRIVATE_SPEND, PUBLIC_SPEND, MNEMONIC
};



const MNEMONIC = 'mnemonic';
const PRIVATE_VIEW_KEY = 'view_key';
const PRIVATE_SPEND_KEY = 'spend_key';
const PUBLIC_VIEW_KEY = 'public_view_key';
const PUBLIC_SPEND_KEY = 'public_spend_key';


const rpcKeyHandler = new RPCHRequestHandler();
rpcKeyHandler.port = daemonConfig.wallet.port;


export const showKey = (key: KeyType) => {


    console.log('show key called');

    switch(key) {

        case KeyType.MNEMONIC:
            fetchKey('Seed', MNEMONIC);
            return;
        case KeyType.PRIVATE_VIEW:
            fetchKey('Private View Key', PRIVATE_VIEW_KEY);
            return;
        case KeyType.PRIVATE_SPEND:
            fetchKey('Private Spend Key', PRIVATE_SPEND_KEY);
            return;

        case KeyType.PUBLIC_VIEW:
            fetchAdress(PUBLIC_VIEW_KEY);
            return;
        case KeyType.PUBLIC_SPEND:
            fetchAdress(PUBLIC_SPEND_KEY);
            return;

    }
};

const showDialog = (title: string, message: string) => {

    dialog.showMessageBox(null,{title, message});
};


const fetchAdress = async(keyType: string) => {

    const objRequest = {
        id: 0,
        jsonrpc: "2.0",
        method: 'get_address',
        params: {"account_index":0}
    };


    const response = await rpcKeyHandler.sendRequest(objRequest);

    if (response.data.result) {
        const pubKeys = decode_address(response.data.result.address);

        if (keyType === PUBLIC_SPEND_KEY ) {
            showDialog('Public Spend Key', pubKeys.spend);
        } else {
            showDialog('Public View Key', pubKeys.view);
        }
    }
};


const fetchKey = async(title: string, keyType: string) => {


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
        showDialog(title, key);
    }
};
