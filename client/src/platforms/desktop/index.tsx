import { applyMiddleware, createStore, Store } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { loadState, logger, saveState } from "utility/dev-helper";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "globalStyle";
import React from "react";
import { AppDesktop } from "./App";

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
    saveState(store.getState());
  });

  render();
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle />
      <AppDesktop />
    </Provider>,
    document.querySelector("#root")
  );
};

export { store };
