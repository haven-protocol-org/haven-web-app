// API layer for communication with an adjusted MyMonero-API-compatible server

import { API_URL } from "../../../constants/env";

const INIT_REQUEST = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export const login = (
  address,
  view_key,
  generated_locally,
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
 * @param address
 * @param view_key
 */
export const ping = params => {
  return fetch(`${API_URL}/ping`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

/**
 * get the list of all possible spendings, used when calculate the wallet balance
 * @param address
 * @param view_key
 */
export const getAddressInfo = params => {
  return fetch(`${API_URL}/get_address_info`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

/**
 * return all txs for account ( for the scanned block height )
 * @param address
 * @param view_key
 */
export const getAddressTxs = params => {
  return fetch(`${API_URL}/get_address_txs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

//
// API endpoints for sending funds
//

export const getUnspentOuts = params => {
  //const params = {address, view_key, amount, mixin, use_dust, dust_threshold};
  return fetch(`${API_URL}/get_unspent_outs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

export const getRandomOuts = params => {
  return fetch(`${API_URL}/get_random_outs`, {
    ...INIT_REQUEST,
    body: JSON.stringify(params)
  }).then(handleError);
};

export const submitRawTx = signedTx => {
  return fetch(`${API_URL}/submit_raw_tx`, {
    ...INIT_REQUEST,
    body: JSON.stringify(signedTx)
  }).then(handleError);
};

export const handleError = async response => {
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
