import { Ticker } from "shared/reducers/types";

// id matches Ticker enum
export const AssetList = [
  {
    id: Ticker.xUSD,
    token: "U.S. Dollar",
    ticker: "USD",
    symbol: "$",
  },
  {
    id: Ticker.xBTC,
    token: "Bitcoin",
    ticker: "BTC",
    symbol: "$",
  },
  {
    id: Ticker.XAU,
    token: "Gold",
    ticker: "GOLD",
    symbol: "$",
  },
  {
    id: Ticker.XAG,
    token: "Silver",
    ticker: "SILV",
    symbol: "$",
  },
  {
    id: Ticker.xAUD,
    token: "Australian Dollar",
    ticker: "AUD",
    symbol: "$",
  },
  {
    id: Ticker.xGBP,
    token: "British Pound",
    ticker: "GBP",
    symbol: "£",
  },
  {
    id: Ticker.xCNY,
    token: "Chinese Yuan",
    ticker: "CNY",
    symbol: "¥",
  },
  {
    id: Ticker.xEUR,
    token: "Euro",
    ticker: "EUR",
    symbol: "€",
  },
  {
    id: Ticker.xCHF,
    token: "Swiss Franc",
    ticker: "CHF",
    symbol: "₣",
  },
];
