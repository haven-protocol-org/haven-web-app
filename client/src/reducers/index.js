import { combineReducers } from "redux";

// Reduceers
import theme from "./currentTheme.js";
import address from "./address.js";
import { balance } from "./balance.js";
import keys from "./keys";
import { transferList } from "./transferList";
import { priceHistory } from "./priceHistory";
import notification from "./notification";
import { CLOSE_WALLET } from "../actions/types";
import { account } from "./account";
import { simplePrice } from "./simplePrice";
import { chain } from "./chain";
import txProcess from "./txProcess";

const appReducer = combineReducers({
  theme,
  address,
  balance,
  chain,
  keys,
  transferList,
  priceHistory,
  notification,
  account,
  simplePrice,
    txProcess
});

const rootReducer = (state, action) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
