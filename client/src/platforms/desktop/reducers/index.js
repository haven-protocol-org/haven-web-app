import { combineReducers } from "redux";

// Reduceers
import theme from "./currentTheme.js";
import address from "./address.js";
import {appState} from "./appState.js";
import { balance } from "./balance.js";
import keys from "./keys";
import transfer from "./transfer";
import { transferList } from "./transferList";
import { priceHistory } from "./priceHistory";
import notification from "./notification";
import walletCreation from "./walletCreation";
import { CLOSE_WALLET } from "../actions/types";
import chain from "./chain";
import {simplePrice} from "./simplePrice";

const appReducer = combineReducers({
  theme,
  address,
  appState,
  balance,
  keys,
  transfer,
  transferList,
  walletCreation,
  priceHistory,
  notification,
  chain,
  simplePrice
});

const rootReducer = (state, action) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
