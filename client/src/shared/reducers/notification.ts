import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/types";
import {AnyAction} from "redux";

interface HavenNotification {
  id: string;
  type: string;
  message: string;
}

const INITIAL_STATE: {notifications: HavenNotification[]} = { notifications:[] };

export default function(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { notifications: [...state.notifications, action.payload] };
    case REMOVE_NOTIFICATION:
      return { notifications: state.notifications.filter((not: HavenNotification) => not.id !== action.payload)};
    default:
      return state;
  }
}

export const getNotification = (state: any) => {
  if (state.notification.notifications.length > 0) {
    return state.notification.notifications[0];
  }
  return undefined;
};
