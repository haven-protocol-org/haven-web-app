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

let sessionID = -1;

function parseSessionID(result) {

  sessionID = result.sessionid;
  localStorage.setItem('sessionID', result.sessionid);

  return result;
}

export function resetSessionId() {
  localStorage.clear();
  sessionID = -1;
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

export function querySpendKeyRPC() {
  return callRpc("query_key", { key_type: "spend_key" });
}

export function transferRPC(params) {
  return callRpc("transfer", params);
}

export function getTransferRPC(params) {
  return callRpc('get_transfers', params);
}

export function createWalletRPC(params) {
  return callRpc("create_wallet", params).then(parseSessionID);
}

export function getHeightRPC() {
  return callRpc('get_height');
}

function callRpc(method, params) {
  const rpcUrl = process.env.REACT_APP_RPC_URL;
  const objRequest = {
    id: 0,
    jsonrpc: "2.0",
    method: method,
    params: params
  };

  if (sessionID === -1) {
    sessionID = localStorage.getItem('sessionID')? localStorage.getItem('sessionID') : -1;
  }

  if (sessionID !== -1) objRequest.sessionID = sessionID;

  return fetch(rpcUrl, { ...INIT_REQUEST, body: JSON.stringify(objRequest) })
    .then(response => response.json())
    .then(function(response) {
        const error = response.error || response.result.error;
        if (error)
          throw error;
      return response.result;
    });
}
