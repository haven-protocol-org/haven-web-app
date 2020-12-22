import { selectTheme, setTheme } from "shared/actions";
import { WebAppState } from "../reducers";

export const setWebConfig = () => {
  return async (dispatch: any) => {
    let config: any = localStorage.getItem("config");

    if (!config) {
      return;
    }

    config = JSON.parse(config);

    if (config && config.theme) {
      dispatch(setTheme(config.theme));
    }
  };
};

export const updateWebConfig = (theme: string) => {
    let config: any = {
      theme,
    };
    config = JSON.stringify(config);
    localStorage.setItem("config", config);

};
