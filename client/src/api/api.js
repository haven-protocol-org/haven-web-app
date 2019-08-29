// API layer for communication with an adjusted MyMonero-API-compatible server


import axios from "axios";

const API_URL = "";

export const login = (address, view_key, generated_locally, create_account = true) => {

};

/**
 * ping the backend to keep the tx search thread on backend alive for this account
 * @param address
 * @param view_key
 */
export const keepAlive = (address, view_key) => {

};


/**
 * get the list of all possible spendings, used when calculate the wallet balance.
 * @param address
 * @param view_key
 */
export const get_address_info = (address, view_key) => {

};


/**
 * return all txs for account ( for the scanned block height )
 * @param address
 * @param view_key
 */
export const get_address_txs = (address, view_key) => {

};



//
// API endpoints for sending funds
//

export const get_unspent_outs = (address, view_key ) => {

    const amount = 0;
    const mixin = 0;
    const use_dust = false;
    const dust_threshold = "1000000000";

};


export const get_random_outs = () => {

};


export const submit_raw_tx = (tx) => {

};