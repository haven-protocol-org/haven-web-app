import { getAddressRPC } from "../rpc/rpc";

import {
  GET_ADDRESS_FAILED,
  GET_ADDRESS_FETCHING,
  GET_ADDRESS_SUCCEED
} from "./types";

export * from "./prices";
export * from "./wallet";
export * from "./balance";
export * from "./transfer";
export * from "./key";
export * from "./theme";
export * from "./transferHistory";
export * from "./chain";

export const getAddress = () => {
  return dispatch => {
    dispatch(getAddressFetching());
    getAddressRPC()
      .then(result => dispatch(getAddressSucceed(result)))
      .catch(error => dispatch(getAddressFailed(error)));
  };
};

const getAddressFetching = () => ({ type: GET_ADDRESS_FETCHING });
const getAddressSucceed = result => ({
  type: GET_ADDRESS_SUCCEED,
  payload: result
});
const getAddressFailed = error => ({
  type: GET_ADDRESS_FAILED,
  payload: error
});

export const getForex = () => {
  // https://api.exchangeratesapi.io/latest?base=USD
  // GET https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01 HTTP/1.1

  //   https://api.exchangeratesapi.io/history?start_at=2019-07-23&end_at=2019-07-30&base=USD

  const endDate = new Date();
  const startDate = endDate - 14 * 3600 * 24;
  const isoEndDate = endDate.toISOString().split("T")[0];
  const isoStartDate = endDate.toISOString().split("T")[0];

  const forexUrl = `https://api.exchangeratesapi.io/history?start_at=${isoStartDate}&end_at=${isoEndDate}&base=USD`;

  return dispatch => {
    dispatch(getForexFetching());
    fetch(forexUrl)
      .then(res => res.json())
      .then(res => dispatch(getForexSucceed(res)))
      .catch(error => dispatch(getForexFailed(error)));
  };
};

const getForexFetching = () => {};

const getForexSucceed = () => {};

const getForexFailed = () => {};
