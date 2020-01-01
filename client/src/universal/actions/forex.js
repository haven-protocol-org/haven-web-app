import {
  GET_FOREX_FAILED,
  GET_FOREX_FETCHING,
  GET_FOREX_SUCCEED
} from "./types";

export const getForex = () => {


  const forexUrl = `https://api.exchangeratesapi.io/latest?base=USD`;

  return dispatch => {
    dispatch(getForexFetching());
    fetch(forexUrl)
      .then(res => res.json())
      .then(res => dispatch(getForexSucceed(res.rates)))
      .catch(error => dispatch(getForexFailed(error)));
  };
};

const getForexFetching = () => ({ type: GET_FOREX_FETCHING });

const getForexSucceed = res => ({ type: GET_FOREX_SUCCEED, payload: res });

const getForexFailed = error => ({ type: GET_FOREX_FAILED, payload: error });
