import { combineReducers } from "redux";

// Reduceers
import theme from "./currentTheme.js";
import address from "./address.js";
import walletSession from "./walletSession.js";
import balance from "./balance.js";

const rootReducer = combineReducers({
  theme,
  address,
  walletSession,
  balance
});

export default rootReducer;
