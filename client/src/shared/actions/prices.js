import { decreasePricePoints } from "../../utility/utility";
import {
  GET_BITCOIN_SUCEED,
  GET_PRICE_HISTORY_FAILED,
  GET_PRICE_HISTORY_FETCHING,
  GET_PRICE_HISTORY_SUCCEED,
  GET_SIMPLE_PRICE_SUCCEED
} from "./types";
import { handleError } from "../../platforms/web/api/api";

export const getPriceHistory = rangeInDays => {
  return (dispatch, getState) => {
    const hasPricesForRange = getState().priceHistory.prices.some(
      priceRangeEntry =>
        priceRangeEntry.rangeInDays === rangeInDays &&
        priceRangeEntry.prices.length > 0
    );

    // if we have these prices, we are done
    if (hasPricesForRange) {
      return;
    }

    dispatch(getPriceDataFetching());
    fetch(
      `https://api.coingecko.com/api/v3/coins/haven/market_chart?vs_currency=usd&days=${rangeInDays}`
    )
      .then(response => response.json())
      .then(decreasePricePoints)
      .then(priceData =>
        dispatch(getPriceDataSucceed(priceData.prices, rangeInDays))
      )
      .catch(error => dispatch(getPriceDataFailed(error)));
  };
};

const getPriceDataFetching = () => ({ type: GET_PRICE_HISTORY_FETCHING });
const getPriceDataFailed = error => ({
  type: GET_PRICE_HISTORY_FAILED,
  payload: error
});
const getPriceDataSucceed = (prices, rangeInDays) => {
  return {
    type: GET_PRICE_HISTORY_SUCCEED,
    payload: { prices, rangeInDays }
  };
};

export const getSimplePrice = () => {
  return dispatch => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=haven,bitcoin&vs_currencies=usd"
    )
      .then(handleError)
      .then(priceData => {
        dispatch(getSimplePriceSucceed(priceData.haven.usd));
        const BTC = { BTC: priceData.bitcoin.usd };
        dispatch(getBitcoinSucceed(BTC));
      })
      .catch(error => dispatch(getSimplePriceFailed(error)));
  };
};

const getSimplePriceSucceed = result => ({
  type: GET_SIMPLE_PRICE_SUCCEED,
  payload: result
});
const getSimplePriceFailed = error => ({
  type: GET_SIMPLE_PRICE_SUCCEED,
  payload: error
});
const getBitcoinSucceed = btc => ({ type: GET_BITCOIN_SUCEED, payload: btc });
