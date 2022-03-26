import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "../../globalStyle";
import React from "react";
import { applyMiddleware, createStore, Store, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { logger } from "../../vendor/clipboard/dev-helper";
import { HavenApp } from "shared/App";
import { addStoreWatchers } from "./watcher";

let store: Store;
export const startWebApp = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  store = createStoreWithMiddleware(reducers);
  addStoreWatchers(store);
  render();
};

export const startWebAppInDevMode = () => {
  store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(reduxThunk, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  addStoreWatchers(store);
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
