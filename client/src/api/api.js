// API layer for communication with an adjusted MyMonero-API-compatible server


const API_URL = "http://213.136.85.14:1984";

const INIT_REQUEST = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
};

export const login = (address, view_key, generated_locally, create_account = true) => {
    const params = {address, view_key, generated_locally, create_account};
    return fetch( `${API_URL}/login`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());
};

/**
 * ping the backend to keep the tx search thread on backend alive for this account
 * @param address
 * @param view_key
 */
export const keepAlive = (address, view_key) => {

    const params = {address, view_key};
   return fetch( `${API_URL}/ping`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
       .then(result => result.json());

};


/**
 * get the list of all possible spendings, used when calculate the wallet balance
 * @param address
 * @param view_key
 */
export const getAddressInfo = (params) => {
    return fetch( `${API_URL}/get_address_info`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());
};


/**
 * return all txs for account ( for the scanned block height )
 * @param address
 * @param view_key
 */
export const getAddressTxs = (params) => {
    return fetch( `${API_URL}/get_address_txs`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());
};



//
// API endpoints for sending funds
//

export const getUnspentOuts = (params ) => {


    //const params = {address, view_key, amount, mixin, use_dust, dust_threshold};
    return fetch( `${API_URL}/get_unspent_outs`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());

};


export const getRandomOuts = (params) => {

    return fetch( `${API_URL}/get_random_outs`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());
};


export const submitRawTx = (signedTx) => {

    return fetch( `${API_URL}/submit_raw_tx`, { ...INIT_REQUEST, body: JSON.stringify(signedTx) } )
        .then(result => result.json());
};
