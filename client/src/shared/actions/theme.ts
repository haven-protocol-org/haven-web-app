import { isWeb } from "constants/env";
import { updateDesktopConfig } from "platforms/desktop/actions/config";
import { updateWebConfig } from "platforms/web/actions/config";
import { THEME } from "./types";

export const selectTheme = (theme: string) => {
  
  return (dispatch: any) => {

    dispatch(setThemeInApp(theme));

    if (isWeb()) {
      dispatch(updateWebConfig());
    } else {
      dispatch(updateDesktopConfig({theme}));
    }

  }
}

export const setTheme = (theme: string) => {
  
  return (dispatch: any) => {
    dispatch(setThemeInApp(theme));
  }
}

const setThemeInApp = (theme: string) => ({ type: THEME, payload: theme });