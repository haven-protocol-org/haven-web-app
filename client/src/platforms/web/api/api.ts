// API layer for communication with an adjusted MyMonero-API-compatible server

import { API_URL } from "constants/env";
import {Credentials} from "platforms/web/types/types";

const INIT_REQUEST = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export const login = (
  address: string,
  view_key: string,
  generated_locally: boolean,
  create_account = true
) => {
  const params = { address, view_key, generated_locally, create_account };
  return fetch(`${API_URL}/login`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

/**
 * ping the backend to keep the tx search thread on backend alive for this account
 * @param credentials
 */
export const ping = (credentials:Credentials) => {
  return fetch(`${API_URL}/ping`, {
    ...INIT_REQUEST,
    body: JSON.stringify(credentials)
  }).then(handleError);
};

/**
 * get the list of all possible spendings, used when calculate the wallet balance
 * @param credentials
 */
export const getAddressInfo = (credentials: Credentials) => {
  return fetch(`${API_URL}/get_address_info`, {
    ...INIT_REQUEST,
    body: JSON.stringify(credentials)
  }).then(handleError);
};

/**
 * return all txs for account ( for the scanned block height )
 * @param credentials
 */
export const getAddressTxs = (credentials: Credentials) => {
  return fetch(`${API_URL}/get_address_txs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(credentials)
  }).then(handleError);
};

//
// API endpoints for sending funds
//

export const getUnspentOuts = (params: any) => {
  //const params = {address, view_key, amount, mixin, use_dust, dust_threshold};
  return fetch(`${API_URL}/get_unspent_outs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

export const getRandomOuts = (params: any) => {
  return fetch(`${API_URL}/get_random_outs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

export const submitRawTx = (signedTx: any) => {
  return fetch(`${API_URL}/submit_raw_tx`, {
    ...INIT_REQUEST,
    body: JSON.stringify(signedTx)
  }).then(handleError);
};

export const handleError = async (response: any) => {
  // intercept error on protocol level
  if (!response.ok) return Promise.reject(response.statusText);

  const responseBody = await response.json();

  //intercept error on application level
  if (responseBody.status && responseBody.status !== "success") {
    return Promise.reject(responseBody.reason);
  } else {
    return responseBody;
  }
};


export const getExchangeRatesFromNode = (remoteNodeUrl: string) => {


  const params = {"id":0,"jsonrpc":"2.0","method":"get_last_block_header"};
  //@ts-ignore
  const client = new window.DigestClient('user', 'user');

  return client.fetch(`${remoteNodeUrl}`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)});



};
