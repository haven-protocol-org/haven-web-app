import { THEME, AUTH, USER } from "./types.js";
import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING, GET_BALANCES_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED
} from "./types";


import {getBalanceRPC, restoreWalletRPC} from "../rpc/rpc";

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
const getBalancesFailed = (error) => ({type: GET_BALANCES_FAILED, error});





