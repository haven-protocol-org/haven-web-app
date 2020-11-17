import { selectTheme } from "shared/actions";
import { getConfigIPC, updateConfigIPC } from "../../platforms/desktop/ipc/misc"
import { setNodeForWallet } from "../../platforms/desktop/actions/selectNode";



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