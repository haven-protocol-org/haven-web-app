import React from "react";
import { HavenApp } from "../../shared/App";

import { applyMiddleware, createStore, Store } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import {
  loadState,
  logger,
  saveDesktopState,
} from "vendor/clipboard/dev-helper";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "globalStyle";

let store: Store;

export const startDesktopApp = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  store = createStoreWithMiddleware(reducers);
  render();
};

export const startDesktopAppInDevMode = () => {
  const persistedState = loadState();
  const createStoreWithMiddleware = applyMiddleware(
    reduxThunk,
    logger
  )(createStore);
  store = createStoreWithMiddleware(reducers, persistedState);
  store.subscribe(() => {
    saveDesktopState(store.getState());
  });

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
