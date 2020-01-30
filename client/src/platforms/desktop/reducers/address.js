import { ADD_PUB_ADDRESS } from "../actions/types";

const INITIAL_STATE = { main: null, subs: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PUB_ADDRESS:
      return { ...state, main: action.payload };
    default:
      return state;
  }
}
