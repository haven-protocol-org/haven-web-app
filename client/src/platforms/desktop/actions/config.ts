import { selectTheme } from "shared/actions";
import { getConfigIPC, updateConfigIPC } from "../ipc/misc"
import { setNodeForWallet } from "./selectNode";



export const getConfig = () => {


    return async(dispatch: any) => {

        const config: any = await getConfigIPC();
      //  dispatch(setNodeForWallet())

        if (config.theme) {
            dispatch(selectTheme(config.theme))
        }


    }
}

export const updateConfig = (config: any) => {
    
    updateConfigIPC(config);
}