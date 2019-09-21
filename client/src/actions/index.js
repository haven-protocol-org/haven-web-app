import {ADD_PUB_ADDRESS} from "./types";

export * from "./prices";
export * from "./account";
export * from "./balance";
export * from "./key";
export * from "./theme";
export * from "./transferHistory";
export * from "./sendFunds";



export const addPubAddress = (address) => ({type: ADD_PUB_ADDRESS, payload:address});


export const getForex = () => {

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
