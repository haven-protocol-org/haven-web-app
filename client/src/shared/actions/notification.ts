import {notificationList, ERROR, SUCCESS} from "../../constants/notificationList";
import {uuidv4} from "../../utility/utility";
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";
import {Ticker} from "../reducers/types";


export const addNotificationByKey = (key: any) => {
    const statusObj: any = notificationList.find( notification => notification.key === key );
    statusObj.id = uuidv4();
    return {type: ADD_NOTIFICATION, payload:statusObj};
};

export const addNotificationByCode = (code: any) => {
    const statusObj: any = notificationList.find( notification => notification.code === code );
    statusObj.id = uuidv4();
    return {type: ADD_NOTIFICATION, payload:statusObj};

};

export const addNotificationByMessage = (type: string, message: string) => {
    const statusObj = {type, message, id:uuidv4()};
    return {type: ADD_NOTIFICATION, payload:statusObj};
};

export const addExchangeSucceedMessage = (fromTicker: Ticker, toTicker: Ticker, fromAmount: number, toAmount: number) => {

    const message = `You exchanged ${fromAmount} ${fromTicker} to ${toAmount} ${toTicker} `;
    return addNotificationByMessage(SUCCESS, message);

};


export const removeNotification = (id: string) => {
    return {type: REMOVE_NOTIFICATION, payload:id};
};


export const addErrorNotification = (error: any) => {

    const errorNotification = notificationList.find( notification => notification.code === error.code );

    if (errorNotification)
        return {type:ADD_NOTIFICATION, payload: {...errorNotification, id:uuidv4()}};

    const message = error.message || error.err_msg;
    return buildNotification(message, ERROR);
};


const buildNotification = (message: string, type: string) => {

    return {type:ADD_NOTIFICATION, payload :{type, message, id:uuidv4()}};

};






