
const INIT_REQUEST = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
        "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",

}



export function restoreWalletRPC(params) {

    return callRpc('restore_deterministic_wallet', params)
}


export function getBalanceRPC(params, sessionID) {
    return callRpc('get_balance', params, sessionID)
}


function callRpc(method, params, sessionID = null) {


    const objRequest = {
        id:0,
        jsonrpc:"2.0",
        method:method,
        params:params
    };

    if (sessionID)
        objRequest.sessionID = sessionID;

    return fetch("https://nelliekins.zapto.org:5000/rpc", {...INIT_REQUEST,  body: JSON.stringify(objRequest)} )
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            if (response.result.error)
                throw new Error(response.result.error);
            return response.result;
        });

}
