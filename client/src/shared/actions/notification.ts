import { notificationList, NotificationType } from "constants/notificationList";
import { uuidv4 } from "utility/utility";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./types";
import { Ticker } from "../reducers/types";
import { NotificationDuration } from "shared/reducers/notification";

export const addNotificationByKey = (
  key: any,
  duration = NotificationDuration.DEFAULT,
  id = uuidv4(), templateVars: Array<string> | null = null
) => {
  const messageObject: any = notificationList.find(
    (notification) => notification.key === key
  );
  messageObject.id = id;


  if (typeof messageObject.message === "function") {
    messageObject.message = templateVars? messageObject.message(...templateVars): messageObject.message();
  }

  return { type: ADD_NOTIFICATION, payload: messageObject };
};

export const addNotificationByMessage = (
  type: NotificationType,
  message: string,
  duration = NotificationDuration.DEFAULT
) => {
  const statusObj = { type, message, id: uuidv4(), duration };
  return { type: ADD_NOTIFICATION, payload: statusObj };
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

  if (errorNotification)
    return {
      type: ADD_NOTIFICATION,
      payload: { ...errorNotification, id: uuidv4() },
    };

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



  return {
    type: ADD_NOTIFICATION,
    payload: { type, message :notificationMessage, id: uuidv4(), duration },
  };
};
