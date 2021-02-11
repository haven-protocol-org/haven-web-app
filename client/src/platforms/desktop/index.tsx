import React from "react";
import { HavenApp } from "../../shared/App";

import { Action, AnyAction, applyMiddleware, createStore, Store } from "redux";
import reduxThunk, { ThunkDispatch } from "redux-thunk";
import reducers, { DesktopAppState } from "./reducers";
import {
  loadState,
  logger,
  saveDesktopState,
} from "vendor/clipboard/dev-helper";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "globalStyle";
import { addDesktopStoreWatchers } from "./watcher";


export type DispatchFunctionType = ThunkDispatch<DesktopAppState, undefined, AnyAction>

let store: Store<DesktopAppState, Action<DesktopAppState>> & {dispatch: DispatchFunctionType};

export const startDesktopApp = () => {
  const createStoreWithMiddleware = applyMiddleware<DispatchFunctionType, DesktopAppState>(reduxThunk)(createStore);
  store = createStoreWithMiddleware(reducers);
  addDesktopStoreWatchers(store);
  render();
};

export const startDesktopAppInDevMode = () => {
  const persistedState = loadState();
  const createStoreWithMiddleware = applyMiddleware<DispatchFunctionType, DesktopAppState>(
    reduxThunk,
    logger
  )(createStore);
  store = createStoreWithMiddleware(reducers, persistedState);
  store.subscribe(() => {
    saveDesktopState(store.getState());
  });
  addDesktopStoreWatchers(store);
  render();
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle />
      <HavenApp />
    </Provider>,
    document.querySelector("#root")
  );
};

export { store };
