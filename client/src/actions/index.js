import { THEME, AUTH, USER } from "./types.js";

export const selectTheme = theme => ({
  type: THEME,
  payload: theme
});

export const authUser = auth => ({
  type: AUTH,
  payload: auth
});

export const currentUser = user => ({
  type: USER,
  payload: user
});
