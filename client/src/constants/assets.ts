import { Ticker } from "shared/reducers/types";

// id matches Ticker enum
export const AssetList = [
  {
    id: Ticker.xUSD,
    token: "United States Dollar",
    ticker: "USD",
    symbol: "$",
  },
  {
    id: Ticker.xEUR,
    token: "Euro",
    ticker: "EUR",
    symbol: "€",
  },
  {
    id: Ticker.xCNY,
    token: "Chinese Yuan",
    ticker: "CNY",
    symbol: "¥",
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
];

