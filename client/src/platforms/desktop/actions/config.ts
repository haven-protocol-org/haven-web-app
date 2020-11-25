import { selectTheme } from "shared/actions";
import {
  getConfigIPC,
  updateConfigIPC,
} from "../ipc/misc";

export const setDesktopConfig = () => {
  return async (dispatch: any) => {
    const config: any = await getConfigIPC();
    //  dispatch(setNodeForWallet())

    if (config.theme) {
      dispatch(selectTheme(config.theme));
    }
  };
};

export const updateDesktopConfig = () => {
//  updateConfigIPC(config);
};
