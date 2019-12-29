import {logM} from "../../../../utility/utility";
import {ipcRenderer} from "electron";
import {CommunicationChannels} from "../ipc-types";


// @ts-ignore
const ipcRender:typeof ipcRenderer= window.ipcRenderer;




export function openWalletRPC(params:object) {
    return callRpc("open_wallet", params)
}

export function restoreWalletRPC(params: object) {
  return callRpc("restore_deterministic_wallet", params);
}

export function getAddressRPC(params = {account_index: 0}) {
    return callRpc("get_address", params);
}


export function getBalanceRPC(params: object) {
  return callRpc("get_balance", params);
}

export function queryMnemonicKeyRPC() {
    return callRpc("query_key", { key_type: "mnemonic" });
}

export function transferRPC(params: object) {
  return callRpc("transfer", params);
}

export function getTransferRPC(params: object) {
  return callRpc('get_transfers', params);
}

export function createWalletRPC(params: object) {
  return callRpc("create_wallet", params);
}

export function getWalletHeightRPC() {
  return callRpc('get_height');
}

export function refreshRPC(start_height = 0) {
  return callRpc('refresh' ,{start_height});
}

export function rescanBlockchainRPC() {
    return callRpc('rescan_blockchain');
}


export function onshoreRPC(params: object) {
    return callRpc('onshore', params)
}

export function offshoreRPC(params: object) {
    return callRpc('offshore', params)
}

export function getOffshoreBalanceRPC() {

    return callRpc('get_offshore_balance')

}

export function getOffshoreTransfersRPC(params: object) {
    return callRpc('get_offshore_transfers', params)
}


export function offshoreTransferRPC(params: object) {
    return callRpc('offshore_transfer', params)
}


export function getLastBlockHeaderRPC() {

    return callRpc('get_last_block_header');

}
export function getBlockHeaderByHeightRPC(params: object) {

    return callRpc('get_block_header_by_height');
}

export function storeWalletRPC() {
    return callRpc('store');
}

export function closeWalletRPC() {
    return callRpc('close_wallet');
}

export function getInfoRPC() {

    return callRpc('get_info');

}


export function startMiningRPC(params:object) {
    return callRpc('start_mining', params);
}

export function stopMiningRPC() {
    return callRpc('stop_mining');
}

export function miningStatusRPC() {
    return callRpc('mining_status');
}



function callRpc(method: string, params: object | undefined = undefined) {

    // const rpcUrl = process.env.REACT_APP_RPC_URL;
    const objRequest = {
        id: 0,
        jsonrpc: "2.0",
        method: method,
        params: params
    };


    logM(objRequest);


    return ipcRender.invoke(CommunicationChannels.RPC, objRequest)
        .then(response => handleError(response));

}



export const handleError = async (response: any) => {


    console.log(response);
    // intercept error on protocol level

    if (response.data.error)
        return Promise.reject (response.data.error);




    // we must distinguish between two reponse styles from monero daemon rpc, oldschool vs new school
    if (response.data.result) {
        return response.data.result;
    }

    return response.data;

};
