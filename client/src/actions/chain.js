import {GET_BLOCK_HEIGHT_FETCHING, GET_BLOCK_HEIGHT_SUCEED} from "./types";
import {getHeightRPC, refreshRPC} from "../rpc/rpc";
import {getBalances} from "./balance";
import {getTransfers} from "./transferHistory";
import {addNotificationByMessage} from "./notification";
import {SUCCESS} from "../constants/notificationMessages";




export const refresh = () => {

    return (dispatch, getState) => {

        refreshRPC(getState().chain.height)
            .then(result => {

                const {blocks_fetched, received_money} = result;

                if (blocks_fetched) {
                    dispatch(getHeight());
                    dispatch(getBalances());
                    dispatch(getTransfers());
                }

                if (received_money) {
                    addNotificationByMessage(SUCCESS, 'Congrats,  there is a some underway to you');
                }
            });


    };

};


export const getHeight = () => {

    return (dispatch, getState) => {
        dispatch({type:GET_BLOCK_HEIGHT_FETCHING});
        getHeightRPC()
            .then(result => {

                if (result.height > getState().chain.height)
                {

                }
                return result;
            })
            .then(result => dispatch(getHeightSucceed(result.height)))
            .catch(error => dispatch(getHeightFailed(error)));
    }
};



const getHeightSucceed = (height) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload:height});
const getHeightFailed = (error) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload: error});
