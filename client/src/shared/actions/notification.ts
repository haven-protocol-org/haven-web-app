import {notificationList, NotificationType} from "constants/notificationList";
import {uuidv4} from "utility/utility";
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";
import {Ticker} from "../reducers/types";
import {NotificationDuration} from "shared/reducers/notification";

export const addNotificationByKey = (
  key: any,
  duration = NotificationDuration.DEFAULT,
  id = uuidv4(), templateVars: Array<string> | null = null
) => {
  const messageObject: any = notificationList.find(
    (notification) => notification.key === key
  );
  messageObject.id = id;
  messageObject.duration = duration;


  if (typeof messageObject.message === "function") {
    messageObject.message = templateVars? messageObject.message(...templateVars): messageObject.message();
  }




  return (dispatch: any) =>  {

    dispatch(  { type: ADD_NOTIFICATION, payload: messageObject });

    if ( duration !== NotificationDuration.STICKY ) {
      dispatch(removeNotification(messageObject.id))
    }

    }


};

export const addNotificationByMessage = (
  type: NotificationType,
  message: string,
  duration = NotificationDuration.DEFAULT
) => {
  const statusObj = { type, message, id: uuidv4(), duration };

  return (dispatch: any) =>  {

    dispatch(  { type: ADD_NOTIFICATION, payload: statusObj });

    if ( duration !== NotificationDuration.STICKY ) {
      dispatch(removeNotification(statusObj.id))
    }
  }

};

export const addExchangeSucceedMessage = (
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number
) => {
  const message = `You exchanged ${fromAmount} ${fromTicker} to ${toAmount} ${toTicker} `;
  return addNotificationByMessage(NotificationType.SUCCESS, message);
};

export const removeNotification = (id: string) => {
  return { type: REMOVE_NOTIFICATION, payload: id };
};

export const addErrorNotification = (
  error: any,
  duration: NotificationDuration = NotificationDuration.DEFAULT
) => {
  const errorNotification = notificationList.find(
    (notification) => notification.code === error.code
  );

  if (errorNotification) {
    const id = uuidv4();
    return (dispatch: any) =>  {

      dispatch(  { type: ADD_NOTIFICATION, payload: {...errorNotification, id} });

      if ( duration !== NotificationDuration.STICKY ) {
        dispatch(removeNotification(id))
      }
    }

  }
  const message = error.message || error.err_msg;
  return buildNotification(message, NotificationType.ERROR, duration);
};

const buildNotification = (
  message: string | Function,
  type: string,
  duration: NotificationDuration, templateVars: Array<string> | null = null
) => {

  let notificationMessage: string;
  if (typeof message === "function") {
    notificationMessage = templateVars? message(...templateVars): message();
  } else{
    notificationMessage = message;
  }
  const id = uuidv4();
  return (dispatch: any) =>  {

    dispatch(  { type: ADD_NOTIFICATION, payload: { type, message :notificationMessage, id, duration }, });

    if ( duration !== NotificationDuration.STICKY ) {
      dispatch(removeNotification(id))
    }
  }

};

