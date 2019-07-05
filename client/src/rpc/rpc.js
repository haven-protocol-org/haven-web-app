const INIT_REQUEST = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "omit",
  headers: {
    "Content-Type": "application/json"
  },
  redirect: "follow",
  referrer: "no-referrer"
};

let sessionID;

function parseSessionID(result) {
  sessionID = result.sessionid;
  return result;
}

export function restoreWalletRPC(params) {
  return callRpc("restore_deterministic_wallet", params).then(parseSessionID);
}

export function getBalanceRPC(params) {
  return callRpc("get_balance", params);
}

export function queryViewKeyRPC() {
  return callRpc("query_key", { key_type: "view_key" });
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

export function createWalletRPC() {
  return callRpc("create_wallet").then(parseSessionID);
}

function callRpc(method, params) {
  const rpcUrl = process.env.REACT_APP_RPC_URL;
  const objRequest = {
    id: 0,
    jsonrpc: "2.0",
    method: method,
    params: params
  };

  if (sessionID) objRequest.sessionID = sessionID;

  return fetch(rpcUrl, { ...INIT_REQUEST, body: JSON.stringify(objRequest) })
    .then(response => response.json())
    .then(function(response) {
      console.log(response);
      if (response.result.error) throw new Error(response.result.error);
      return response.result;
    });
}
