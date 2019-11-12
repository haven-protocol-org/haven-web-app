import {
  GET_BITCOIN_SUCEED,
  GET_FOREX_FAILED, GET_FOREX_FETCHING, GET_FOREX_SUCCEED,
} from "../actions/types";

const INITIAL_STATE = { rates: {}, isFetching: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_FOREX_SUCCEED:
    case GET_BITCOIN_SUCEED:
      return { rates: {...state.rates,...action.payload}, isFetching: false };
    case GET_FOREX_FAILED:
      return {...state,isFetching:false};
    case GET_FOREX_FETCHING:
      return {...state,isFetching:true};
    default:
      return state;
  }
}
