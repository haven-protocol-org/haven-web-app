import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "../actions/types";

const INITIAL_STATE = {
  out: [],
  in: [],
  all: null,
  pending: [],
  isFetching: false,
  error: {},
  isEmpty: true,
  maxHeight: -1,
  minHeight: -1
};

export function transferList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TRANSFERS_FETCHING:
      return { ...state, isFetching: true };
    case GET_TRANSFERS_SUCCEED:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        error: "",
        isEmpty: false
      };
    case GET_TRANSFERS_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}
