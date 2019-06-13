import { USER } from "../actions/types.js";

const INITIAL_STATE = {
  auth: false,
  seedPhrase: "",
  privateKey: "",
  spendKey: "",
  viewKey: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return action.payload;
    default:
      return state;
  }
}
