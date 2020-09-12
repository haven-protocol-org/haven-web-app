import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "../../globalStyle";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { logger } from "../../vendor/clipboard/dev-helper";
import {HavenApp} from "shared/App"

let store = null;

export const startWebApp = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  store = createStoreWithMiddleware(reducers);
  render();
};

export const startWebAppInDevMode = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(
    createStore
  );
  store = createStoreWithMiddleware(reducers);


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
