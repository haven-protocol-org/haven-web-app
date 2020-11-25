import { isWeb } from "constants/env";
import { updateDesktopConfig } from "platforms/desktop/actions/config";
import { updateWebConfig } from "platforms/web/actions/config";
import { THEME } from "./types";

export const selectTheme = (theme: any) => {
  
  return (dispatch: any) => {

    dispatch(setThemeInApp(theme));

    if (isWeb()) {
      dispatch(updateWebConfig());
    } else {
      dispatch(updateDesktopConfig());
    }

  }
}



const setThemeInApp = (theme: any) => ({ type: THEME, payload: theme });