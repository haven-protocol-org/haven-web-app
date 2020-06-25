import {DesktopAppState} from "platforms/desktop/reducers";
import {WebAppState} from "platforms/web/reducers";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveDesktopState = (state: DesktopAppState ) => {
  try {
    const serializedState = JSON.stringify({
      walletSession: state.walletSession,
      address: state.address,
    });
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const saveWebState = (state:  WebAppState) => {
  try {
    const serializedState = JSON.stringify({
      address: state.address,
      account: state.account
    });
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const logger = (store:any) => (next:any) => (action: any) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
