import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/types";
import { AnyAction } from "redux";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";

export enum NotificationDuration {
  STICKY = -1,
  DEFAULT = 3000,
}

export interface HavenNotification {
  id: string;
  type: string;
  message: string;
  duration: NotificationDuration;
}

const INITIAL_STATE: { notifications: HavenNotification[] } = {
  notifications: [],
};

export default function (state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { notifications: [...state.notifications, action.payload] };
    case REMOVE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          (not: HavenNotification) => not.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const getNotification = (
  state: DesktopAppState | WebAppState
): HavenNotification[] => {
  return state.notification.notifications;
};
