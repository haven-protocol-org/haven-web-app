import { combineReducers } from "redux";

// Reduceers
import currentTheme from "./currentTheme.js";
import currentUser from "./currentUser.js";
import auth from "./auth.js";

const rootReducer = combineReducers({
  theme: currentTheme,
  user: currentUser,
  auth: auth
});

export default rootReducer;
