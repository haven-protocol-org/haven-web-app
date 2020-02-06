import {THEME} from "./types";

export const selectTheme = theme => ({
    type: THEME,
    payload: theme
});
