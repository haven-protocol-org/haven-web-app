import { combineReducers } from "redux";

// Reduceers
import theme from "./currentTheme.js";
import address from "./address.js";
import appState from "./appState.js";
import balance from "./balance.js";
import keys from "./keys";
import transfer from "./transfer";
import walletCreation from "./walletCreation";

const rootReducer = combineReducers({
  theme,
  address,
  appState,
  balance,
  keys,
  transfer,
  walletCreation
});

export default rootReducer;
