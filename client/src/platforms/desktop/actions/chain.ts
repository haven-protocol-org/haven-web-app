import {
 GET_BLOCK_INFO_FAILED,
    GET_BLOCK_INFO_SUCEED
} from "./types";
import {getInfoRPC} from "../ipc/rpc/rpc";
import {Dispatch} from "redux";




interface NodeInfoHeights {

    nodeHeight:number;
    chainHeight:number;
}



export const getNodeInfo = () => {

    return (dispatch: Dispatch) => {

        getInfoRPC()
            .then((res: any) => parseHeight(res))
            .then( (nodeInfoHeights: NodeInfoHeights) => dispatch(getNodeInfoSucceed(nodeInfoHeights)))
            .catch((err: any) => dispatch((getNodeInfoFailed(err))));

    }
};


const getNodeInfoSucceed = (nodeInfo: NodeInfoHeights) => ({type: GET_BLOCK_INFO_SUCEED, payload:nodeInfo});
const getNodeInfoFailed = (error: any) => ({type: GET_BLOCK_INFO_FAILED, payload: error});



const parseHeight = (rawNodeInfo: any): NodeInfoHeights => {

    return {chainHeight: rawNodeInfo.height, nodeHeight: rawNodeInfo.height_without_bootstrap};
};
