import {notificationList, NotificationType} from "constants/notificationList";
import {uuidv4} from "utility/utility";
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./types";
import {Ticker} from "../reducers/types";
import {NotificationDuration} from "shared/reducers/notification";

export const addNotificationByKey = (key: any, duration = NotificationDuration.DEFAULT, id = uuidv4()) => {
  const statusObj: any = notificationList.find(
    (notification) => notification.key === key
  );
  statusObj.id = id;
  return { type: ADD_NOTIFICATION, payload: statusObj };
};

export const addNotificationByMessage = (type: NotificationType, message: string, duration = NotificationDuration.DEFAULT) => {
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

export const addErrorNotification = (error: any, duration: NotificationDuration = NotificationDuration.DEFAULT) => {
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

const buildNotification = (message: string, type: string, duration: NotificationDuration) => {
  return { type: ADD_NOTIFICATION, payload: { type, message, id: uuidv4(), duration } };
};
