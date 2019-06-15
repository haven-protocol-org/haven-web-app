import { combineReducers } from "redux";

// Reduceers
import theme from "./currentTheme.js";
import address from "./address.js";
import walletSession from "./walletSession.js";
import balance from "./balance.js";
import keys from "./keys";
import transfer from "./transfer";

const rootReducer = combineReducers({
  theme,
  address,
  walletSession,
  balance,
  keys,
  transfer
});

export default rootReducer;
