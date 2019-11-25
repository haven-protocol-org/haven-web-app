type XFetchingStats = {isFetching: boolean, failed: boolean, error:object|null|string}
export enum Ticker {

    xUSD='xUSD', XHV='XHV'
}
export type XFetchingItem = Partial<{[key in Ticker] : XFetchingStats}>
export type XFetching = Record<Ticker, XFetchingStats>
const INITAL_FETCH_STATS: XFetchingStats = {isFetching: false, failed: false, error: null};


export const INITAL_FETCHING_STATE:XFetching = {

    xUSD:INITAL_FETCH_STATS,
    XHV: INITAL_FETCH_STATS

};
