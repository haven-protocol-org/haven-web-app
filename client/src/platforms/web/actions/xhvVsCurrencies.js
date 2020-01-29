import currencies from "../../../constants/assets";
import {
  XHV_VS_CURRENCIES_FAILED,
  XHV_VS_CURRENCIES_SUCCEED
} from "../actions/types";

export const xhvVsCurrenciesFetch = () => {
  return dispatch => {
    dispatch(btcVsUsdHistory());
    dispatch(fetchFromForexHistoricPrices());
    dispatch(xhvVsUsdHistory());
  };
};

const xhvVsUsdHistory = () => {
  const XHV = {
    token: "Haven",
    ticker: "XHV",
    price: "$1.00",
    change: "~ 0.00",
    symbol: "$"
  };

  const URL = `https://api.coingecko.com/api/v3/coins/haven/market_chart?vs_currency=usd&days=14`;

  return dispatch => {
    fetch(URL)
      .then(res => res.json())
      .then(res => dispatch(xhvVsCurrenciesSucceed(res, XHV)))
      .catch(error => dispatch(xhvVsCurrenciesFailed(error)));
  };
};

const btcVsUsdHistory = () => {
  const BTC = currencies.find(currency => currency.ticker === "BTC");

  if (!BTC) return;
  const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14`;

  return dispatch => {
    fetch(URL)
      .then(res => res.json())
      .then(res => dispatch(xhvVsCurrenciesSucceed(res, BTC)))
      .catch(error => dispatch(xhvVsCurrenciesFailed(error)));
  };
};

const fetchFromForexHistoricPrices = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 14);
  const isoEndDate = endDate.toISOString().split("T")[0];
  const isoStartDate = startDate.toISOString().split("T")[0];

  const url = `https://api.exchangeratesapi.io/history?start_at=${isoStartDate}&end_at=${isoEndDate}&base=USD`;

  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(res => dispatch(fetchFromForexHistoricPricesSucceed(res)));
    // .catch(error => dispatch(xhvVsCurrenciesFailed(error)));
  };
};

const fetchFromForexHistoricPricesSucceed = res => {
  const rates = res.rates;
  const dates = Object.keys(rates);
  dates.sort((a, b) => Date.parse(a) - Date.parse(b));
  return dispatch => {
    currencies.forEach(currency => {
      const ticker = currency.ticker;

      let prices = dates.filter(date => rates[date][ticker]);
      prices = prices.map(date => rates[date][ticker]);

      if (prices.length > 0) {
        const lastPrice = prices[prices.length - 1];
        const change = ((lastPrice - prices[0]) / prices[0]) * 100;

        const payload = {
          [currency.ticker]: {
            prices,
            change,
            token: currency.token,
            lastPrice,
            symbol: currency.symbol
          }
        };

        dispatch({ type: XHV_VS_CURRENCIES_SUCCEED, payload });
      }
    });
  };
};

const xhvVsCurrenciesSucceed = (result, currency) => {
  const prices = result.prices.map(price => price[1]);
  const lastPrice = prices[prices.length - 1];
  const change = ((lastPrice - prices[0]) / prices[0]) * 100;

  const payload = {
    [currency.ticker]: {
      prices,
      change,
      lastPrice,
      token: currency.token,
      symbol: currency.symbol
    }
  };
  return { type: XHV_VS_CURRENCIES_SUCCEED, payload };
};

const xhvVsCurrenciesFailed = error => {
  return { type: XHV_VS_CURRENCIES_FAILED, error };
};
