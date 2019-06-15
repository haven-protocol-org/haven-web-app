import { THEME, AUTH, USER } from "./types.js";
import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED,
  QUERY_MNEMONIC_FETCHING,
  QUERY_MNEMONIC_SUCCEED, QUERY_PRIVATE_VIEW_KEY_FAILED,
  QUERY_PRIVATE_VIEW_KEY_FETCHING, QUERY_PRIVATE_VIEW_KEY_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED, TRANSFER_FAILED, TRANSFER_FETCHING, TRANSFER_SUCCEED
} from "./types";


import {getBalanceRPC, queryMnemonicKeyRPC, queryViewKeyRPC, restoreWalletRPC, transferRPC} from "../rpc/rpc";

export const selectTheme = theme => ({
  type: THEME,
  payload: theme
});


export const restoreWallet = seed => {

  return (dispatch) => {

    const language = "English";
    const seed_offset = "";

    const params = {seed,language, seed_offset};

    dispatch(restoreWalletFetching());
    restoreWalletRPC(params)
        .then(result => dispatch(restoreWalletSucceed(result)))
        .catch(error => dispatch(restoreWalletFailed(error)));

  }
};


const restoreWalletFetching = () => ({type:RESTORE_WALLET_BY_SEED_FETCHING});
const restoreWalletSucceed = (result) => ({type:RESTORE_WALLET_BY_SEED_SUCCEED, payload: result});
const restoreWalletFailed = (error) => ({type:RESTORE_WALLET_BY_SEED_FAILED, payload: error});


export const getBalances = () => {

  return (dispatch, getState) => {
    dispatch(getBalancesFetching());

    const account_index = 0;
    const sessionID = getState().walletSession.id;

    getBalanceRPC({account_index}, sessionID)
        .then(result => dispatch(getBalancesSucceed(result)))
        .catch(error => dispatch(getBalancesFailed(error)))
  }
};

const getBalancesFetching = () => ({type: GET_BALANCES_FETCHING});
const getBalancesSucceed = (result) => ({type: GET_BALANCES_SUCCEED, payload:result});
const getBalancesFailed = (error) => ({type: GET_BALANCES_FAILED, payload: error});


export const queryKeys = () => {

  return (dispatch, getState) =>  {

      dispatch(queryPrivateKey());
      dispatch(queryMnemonic());
      const sessionID = getState().walletSession.id;

      queryMnemonicKeyRPC(sessionID)
          .then(result => dispatch(queryMnemonicSucceed(result.key)))
          .catch(error => dispatch(queryMnemonicFailed(error)));

    queryViewKeyRPC(sessionID)
          .then(result => dispatch(queryPrivateKeySucceed(result.key)))
          .catch(error => dispatch(queryPrivateKeyFailed(error)));


  }

};


const queryPrivateKey = () => ({type: QUERY_PRIVATE_VIEW_KEY_FETCHING});
const queryMnemonic = () => ({type: QUERY_MNEMONIC_FETCHING});
const queryMnemonicSucceed = (result) => ({type:QUERY_MNEMONIC_SUCCEED, payload: result});
const queryMnemonicFailed = (error) => ({type:QUERY_MNEMONIC_SUCCEED, payload: error});
const queryPrivateKeySucceed = (result) => ({type: QUERY_PRIVATE_VIEW_KEY_SUCCEED, payload: result});
const queryPrivateKeyFailed = (error) => ({type: QUERY_PRIVATE_VIEW_KEY_FAILED, payload: error});



export const transfer = (address, amount) => {



  return (dispatch, getState) => {

    dispatch(transferFetch({address, amount}));
    const sessionID = getState().walletSession.id;
    const params = {destinations: [{address, amount}], ring_size:12};

    transferRPC(params, sessionID)
        .then(result => dispatch(transferSucceed(result)))
        .catch(error => dispatch(transferFailed(error)));
  }

};


const transferFetch = (params) => ({type: TRANSFER_FETCHING, payload: {...params, isFetching: true}});
const transferSucceed = (result) => ({type: TRANSFER_SUCCEED, payload: {...result, isFetching: false}});
const transferFailed = (error) => ({type: TRANSFER_FAILED, payload: {...error, isFetching: false}});






