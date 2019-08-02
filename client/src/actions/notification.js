import { list, ERROR} from "../constants/notificationList";
import {uuidv4} from "../utility";
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";


export const addNotificationByKey = (key) => {
    const statusObj = list.find( notification => notification.key === key );
    statusObj.id = uuidv4();
    return {type: ADD_NOTIFICATION, payload:statusObj};
};

export const addNotificationByCode = (code) => {
    const statusObj = list.find( notification => notification.code === code );
    statusObj.id = uuidv4();
    return {type: ADD_NOTIFICATION, payload:statusObj};

};

export const addNotificationByMessage = (type, message) => {
    const statusObj = {type, message, id:uuidv4()};
    return {type: ADD_NOTIFICATION, payload:statusObj};
};


export const removeNotification = (id) => {
    return {type: REMOVE_NOTIFICATION, payload:id};
};


export const addErrorNotification = (error) => {
    const statusObj = {id:uuidv4(), type:ERROR, msg: error.message};
    return {type:ADD_NOTIFICATION, payload:statusObj};
};



