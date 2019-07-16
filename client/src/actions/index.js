import {
  THEME,
  CLOSE_WALLET,
  CREATE_WALLET_FAILED,
  CREATE_WALLET_FETCHING,
  CREATE_WALLET_SUCCEED,
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED,
  QUERY_MNEMONIC_FETCHING,
  QUERY_MNEMONIC_SUCCEED,
  QUERY_PRIVATE_VIEW_KEY_FAILED,
  QUERY_PRIVATE_VIEW_KEY_FETCHING,
  QUERY_PRIVATE_VIEW_KEY_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_SUCCEED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED,
  GET_TRANSFERS_FAILED,
  GET_PRICE_DATA_FAILED,
  GET_PRICE_DATA_SUCCEED,
  GET_PRICE_DATA_FETCHING, VALIDATE_MNEMONIC_SUCCEED, VALIDATE_MNEMONIC_FAILED, QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED
} from "./types";

import {
  createWalletRPC,
  getBalanceRPC,
  getTransferRPC,
  queryMnemonicKeyRPC,
  queryViewKeyRPC,
  restoreWalletRPC,
  resetSessionId,
  transferRPC
} from "../rpc/rpc";
import { lowerPricePoints } from "../utility";

export const selectTheme = theme => ({
  type: THEME,
  payload: theme
});

export const restoreWallet = seed => {
  return dispatch => {

    dispatch(closeWallet());
    const language = "English";
    const seed_offset = "";

    const params = { seed, language, seed_offset };

    dispatch(restoreWalletFetching());
    restoreWalletRPC(params)
      .then(result => dispatch(restoreWalletSucceed(result)))
      .catch(error => dispatch(restoreWalletFailed(error)));
  };
};

const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = result => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
  payload: result
});
const restoreWalletFailed = error => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error
});

export const getBalances = () => {
  return (dispatch, getState) => {
    dispatch(getBalancesFetching());

    const account_index = 0;

    getBalanceRPC({ account_index })
      .then(result => dispatch(getBalancesSucceed(result)))
      .catch(error => dispatch(getBalancesFailed(error)));
  };
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });
const getBalancesSucceed = result => ({
  type: GET_BALANCES_SUCCEED,
  payload: result
});
const getBalancesFailed = error => ({
  type: GET_BALANCES_FAILED,
  payload: error
});

export const queryKeys = () => {
  return (dispatch, getState) => {
    dispatch(queryPrivateKey());
    dispatch(queryMnemonic());

    queryMnemonicKeyRPC()
      .then(result => dispatch(queryMnemonicSucceed(result.key)))
      .catch(error => dispatch(queryMnemonicFailed(error)));

    queryViewKeyRPC()
      .then(result => dispatch(queryPrivateKeySucceed(result.key)))
      .catch(error => dispatch(queryPrivateKeyFailed(error)));
  };
};

const queryPrivateKey = () => ({ type: QUERY_PRIVATE_VIEW_KEY_FETCHING });
const queryMnemonic = () => ({ type: QUERY_MNEMONIC_FETCHING });
const queryMnemonicSucceed = result => ({
  type: QUERY_MNEMONIC_SUCCEED,
  payload: result
});
const queryMnemonicFailed = error => ({
  type: QUERY_MNEMONIC_SUCCEED,
  payload: error
});
const queryPrivateKeySucceed = result => ({
  type: QUERY_PRIVATE_VIEW_KEY_SUCCEED,
  payload: result
});
const queryPrivateKeyFailed = error => ({
  type: QUERY_PRIVATE_VIEW_KEY_FAILED,
  payload: error
});

export const transfer = (address, amount) => {
  amount = amount * 1e12;
  return (dispatch, getState) => {
    dispatch(transferFetch({ address, amount }));
    const params = { destinations: [{ address, amount }], ring_size: 11 };

    transferRPC(params)
      .then(result => {
        dispatch(transferSucceed(result));
        dispatch(getTransfers());
        dispatch(getBalances());
      })
      .catch(error => dispatch(transferFailed(error)));
  };
};

export const getTransfers = () => {
  return dispatch => {
    dispatch(getTransfersFetching());
    const params = { in: true, out: true, pending: true };
    getTransferRPC(params)
      .then(result => {
        dispatch(getTransfersSucceed(result));
      })
      .catch(error => dispatch(getTransfersFailed(error)));
  };
};

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true }
});

const getTransfersSucceed = result => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: result
});

const getTransfersFailed = error => ({
  type: GET_TRANSFERS_FAILED,
  payload: error
});

const transferFetch = params => ({
  type: TRANSFER_FETCHING,
  payload: { ...params, isFetching: true }
});
const transferSucceed = result => ({
  type: TRANSFER_SUCCEED,
  payload: { ...result, isFetching: false }
});
const transferFailed = error => ({
  type: TRANSFER_FAILED,
  payload: { ...error, isFetching: false }
});

export const createWallet = seed => {
  return dispatch => {

    dispatch(closeWallet());
    dispatch(createWalletFetch());

      const language = "English";
      const params = {language};

    createWalletRPC(params)
        .then(result => dispatch(createWalletSucceed(result)))
        .then(result => queryMnemonicKeyRPC())
        .then(result => dispatch(queryMnemonicForWalletGenerationSucceed(result.key)))
        .catch(error => dispatch(createWalletFailed(error)))

  };
};

const queryMnemonicForWalletGenerationSucceed = (key) => ({type: QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED, payload:key});
export const mnenomicVerificationSucceed = () =>  ({type: VALIDATE_MNEMONIC_SUCCEED});
export const mneomicVerifcationFailed = () => ({type: VALIDATE_MNEMONIC_FAILED});


const createWalletFetch = () => ({ type: CREATE_WALLET_FETCHING });
const createWalletSucceed = result => ({
  type: CREATE_WALLET_SUCCEED,
  payload: result
});
const createWalletFailed = error => ({
  type: CREATE_WALLET_FAILED,
  payload: error
});

export const closeWallet = () => {
  resetSessionId();
  return { type: CLOSE_WALLET };
};

export const getPriceData = () => {
  return dispatch => {
    dispatch(getPriceDataFetching());
    fetch(
      "https://api.coingecko.com/api/v3/coins/haven/market_chart?vs_currency=usd&days=14"
    )
      .then(response => response.json())
      .then(lowerPricePoints)
      .then(priceData => dispatch(getPriceDataSucceed(priceData)))
      .catch(error => dispatch(getPriceDataFailed(error)));
  };
};

const getPriceDataFetching = () => ({ type: GET_PRICE_DATA_FETCHING });
const getPriceDataFailed = error => ({
  type: GET_PRICE_DATA_FAILED,
  payload: error
});
const getPriceDataSucceed = priceData => {
  const lastPrice = priceData.prices[priceData.prices.length - 1][1];
  return {
    type: GET_PRICE_DATA_SUCCEED,
    payload: { prices: priceData.prices, lastPrice }
  };
};
