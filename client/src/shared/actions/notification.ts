import { notificationList, NotificationType } from "constants/notificationList";
import { uuidv4 } from "utility/utility";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./types";
import { Ticker } from "../reducers/types";
import { NotificationDuration } from "shared/reducers/notification";

export const addNotificationByKey = (
  key: any,
  duration = NotificationDuration.DEFAULT,
  id = uuidv4(),
  templateVars: Array<string> | null = null
) => {
  const notification: any = notificationList.find(
    (notification) => notification.key === key
  );

  const shownMessage = { ...notification };
  shownMessage.id = id;
  shownMessage.duration = duration;

  if (typeof shownMessage.message === "function") {
    shownMessage.message = templateVars
      ? shownMessage.message(...templateVars)
      : shownMessage.message();
  }

  return (dispatch: any) => {
    dispatch({ type: ADD_NOTIFICATION, payload: shownMessage });

    if (duration !== NotificationDuration.STICKY) {
      dispatch(removeNotificationAfterDelay(shownMessage.id, duration));
    }
  };
};

export const addNotificationByMessage = (
  type: NotificationType,
  message: string,
  duration = NotificationDuration.DEFAULT
) => {
  const statusObj = { type, message, id: uuidv4(), duration };

  return (dispatch: any) => {
    dispatch({ type: ADD_NOTIFICATION, payload: statusObj });

    if (duration !== NotificationDuration.STICKY) {
      dispatch(removeNotificationAfterDelay(statusObj.id, duration));
    }
  };
};

export const addExchangeSucceedMessage = (
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number | bigint | bigInt.BigInteger,
  toAmount: number | bigint | bigInt.BigInteger
) => {
  const message = `Your exchange was successfully submitted`;
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
    return (dispatch: any) => {
      dispatch({
        type: ADD_NOTIFICATION,
        payload: { ...errorNotification, id },
      });

      if (duration !== NotificationDuration.STICKY) {
        dispatch(removeNotificationAfterDelay(id, duration));
      }
    };
  } else {
    const message = error.message || error.err_msg || error;
    return buildNotification(message, NotificationType.ERROR, duration);
  }

};

const buildNotification = (
  message: string | Function,
  type: string,
  duration: NotificationDuration,
  templateVars: Array<string> | null = null
) => {
  let notificationMessage: string;
  if (typeof message === "function") {
    notificationMessage = templateVars ? message(...templateVars) : message();
  } else {
    notificationMessage = message;
  }
  const id = uuidv4();
  return (dispatch: any) => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { type, message: notificationMessage, id, duration },
    });

    if (duration !== NotificationDuration.STICKY) {
      dispatch(removeNotificationAfterDelay(id, duration));
    }
  };
};

const removeNotificationAfterDelay = (
  id: string,
  duration: NotificationDuration
) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  };
};
