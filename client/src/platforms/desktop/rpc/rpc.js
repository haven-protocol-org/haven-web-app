const ipcRenderer = window.ipcRenderer;


const INIT_REQUEST = {
  method: "POST",
  // mode: "cors",
 // cache: "no-cache",
  //credentials: "omit",
  //redirect: "follow",
 // referrer: "no-referrer"
};


//const headers = new Headers();
//headers.append( 'Content-Type', 'application/json');

//INIT_REQUEST.headers = headers;


const client = new window.DigestFetch('monero', 'monero', { logger:console });

export function openWalletRPC(params) {
    return callRpc("open_wallet", params)
}

export function restoreWalletRPC(params) {
  return callRpc("restore_deterministic_wallet", params);
}

export function getBalanceRPC(params) {
  return callRpc("get_balance", params);
}

export function queryMnemonicKeyRPC() {
    return callRpc("query_key", { key_type: "mnemonic" });
}

export function transferRPC(params) {
  return callRpc("transfer", params);
}

export function getTransferRPC(params) {
  return callRpc('get_transfers', params);
}

export function createWalletRPC(params) {
  return callRpc("create_wallet", params);
}

export function getHeightRPC() {
  return callRpc('get_height');
}

export function refreshRPC(start_height = 0) {
  return callRpc('refresh' ,{start_height});
}

function callRpc(method, params) {

    // const rpcUrl = process.env.REACT_APP_RPC_URL;
    const objRequest = {
        id: 0,
        jsonrpc: "2.0",
        method: method,
        params: params
    };



    return ipcRenderer.invoke('rpc', objRequest)
        .then(response => handleError(response));



 /*   return client.fetch(rpcUrl, { ...INIT_REQUEST, body: JSON.stringify(objRequest) })
       // .then(response => response.json())
        .then(response => handleError(response));*/
}



export const handleError = async (response) => {


    console.log(response);
    // intercept error on protocol level
    if (response.data.error)
        return Promise.reject (response.data.error);


    return response.data.result;

};
