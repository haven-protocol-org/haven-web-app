


import {lowerPricePoints} from "../utility";
import {GET_PRICE_HISTORY_FAILED, GET_PRICE_HISTORY_FETCHING, GET_PRICE_HISTORY_SUCCEED} from "./types";

export const getPriceHistory = () => {
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

const getPriceDataFetching = () => ({ type: GET_PRICE_HISTORY_FETCHING });
const getPriceDataFailed = error => ({
    type: GET_PRICE_HISTORY_FAILED,
    payload: error
});
const getPriceDataSucceed = priceData => {
    const lastPrice = priceData.prices[priceData.prices.length - 1][1];
    return {
        type: GET_PRICE_HISTORY_SUCCEED,
        payload: { prices: priceData.prices, lastPrice }
    };
};


export const getSimplePrice = () => {


    fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd")

};
