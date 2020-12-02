import { selectTheme } from "shared/actions";
import { WebAppState } from "../reducers";

export const setWebConfig = () => {
  return async (dispatch: any) => {
    let config: any = localStorage.getItem("config");

    if (!config) {
      return;
    }

    config = JSON.parse(config);

    if (config && config.theme) {
      dispatch(selectTheme(config.theme));
    }
  };
};

export const updateWebConfig = () => {
  return async (dispatch: any, getState: () => WebAppState) => {
    const selectedTheme = getState().theme;

    let config: any = {
      theme: selectedTheme,
    };

    config = JSON.stringify(config);
    localStorage.setItem("config", config);
  };
};
