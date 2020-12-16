import { setTheme } from "shared/actions";
import {
  getConfigIPC,
  updateConfigIPC,
} from "../ipc/misc";

export const setDesktopConfig = () => {
  return async (dispatch: any) => {
    const config: any = await getConfigIPC();
    //  dispatch(setNodeForWallet())

    if (config && config.theme) {
      dispatch(setTheme(config.theme));
    }
  };
};

export const updateDesktopConfig = (config: any) => {
     updateConfigIPC(config);
};
