import { ADD_PUB_ADDRESS } from "../actions/types";

type AdressEntry = {
  label: string;
  used: boolean;
  address: string;
  index: number;
};

const INITIAL_STATE = { main: null, subs: [] };

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_PUB_ADDRESS:
      return { ...state, main: action.payload };
    default:
      return state;
  }
}
