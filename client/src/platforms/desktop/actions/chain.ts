import {GET_BLOCK_HEIGHT_FAILED, GET_BLOCK_HEIGHT_FETCHING, GET_BLOCK_HEIGHT_SUCEED} from "./types";
import {getInfoRPC} from "../rpc/rpc";
import {Dispatch} from "redux";




interface NodeInfoHeights {

    nodeHeight:number;
    chainHeight:number;


}



export const getNodeInfo = () => {


    return (dispatch: Dispatch) => {

        getInfoRPC()
            .then((res: any) => parseHeight(res))
            .then( (nodeInfoHeights: NodeInfoHeights) => getNodeInfoSucceed(nodeInfoHeights))
            .catch((err: any) => console.log(err));


    }
};


const getNodeInfoSucceed = (nodeInfo: NodeInfoHeights) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload:nodeInfo});
const getNodeInfoFailed = (error: any) => ({type: GET_BLOCK_HEIGHT_FAILED, payload: error});



const parseHeight = (rawNodeInfo: any): NodeInfoHeights => {

    return {chainHeight: rawNodeInfo.height, nodeHeight: rawNodeInfo.height_without_bootstrap};
};
