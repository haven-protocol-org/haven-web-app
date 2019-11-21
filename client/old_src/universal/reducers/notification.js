import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/types";

const INITIAL_STATE = { notifications: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { notifications: [...state.notifications, action.payload] };
    case REMOVE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          not => not.id !== action.payload
        )
      };
    default:
      return state;
  }
}

export const getNotification = state => {
  if (state.notification.notifications.length > 0) {
    return state.notification.notifications[0];
  }
  return undefined;
};
