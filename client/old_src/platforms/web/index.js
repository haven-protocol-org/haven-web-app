import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {GlobalStyle} from "../../globalStyle";
import {AppWeb} from "./App";
import React from "react";
import {loadState, saveState} from "../../utility/dev-helper";
import {applyMiddleware, createStore} from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import {logger} from "../../utility/dev-helper";

let store  = null;




export const startWebApp = () => {

    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
    store = createStoreWithMiddleware(reducers);
    render();
};


export const startWebAppInDevMode = () => {

    const persistedState = loadState();
    const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(
        createStore
    );
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
            <AppWeb />
        </Provider>,
        document.querySelector("#root")
    );

};
