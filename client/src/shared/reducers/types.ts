type XFetchingStats = {
  isFetching: boolean;
  failed: boolean;
  error: object | null | string;
};

export enum BalanceTypes {
  locked = "locked",
  unLocked = "unLocked",
  balance = "balance",
}

export enum Ticker {
  XHV = "XHV",
  xUSD = "xUSD",
  xBTC = "xBTC",
}
export type XFetchingItem = Partial<{ [key in Ticker]?: XFetchingStats }>;
export type XFetching = { [key in Ticker]?: XFetchingStats };
const INITAL_FETCH_STATS: XFetchingStats = {
  isFetching: false,
  failed: false,
  error: null,
};

export const INITAL_FETCHING_STATE: { [key in Ticker]?: XFetchingStats } = {
  xUSD: INITAL_FETCH_STATS,
  XHV: INITAL_FETCH_STATS,
};
