


import {lowerPricePoints} from "../utility";
import {GET_PRICE_DATA_FAILED, GET_PRICE_DATA_FETCHING, GET_PRICE_DATA_SUCCEED} from "./types";

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
