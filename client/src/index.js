// Library Imports
import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./globalStyle.js";
import * as serviceWorker from "./serviceWorker";




// Relative Imports
import App from "./App.js";

// Redux Setup
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import {loadState} from "./localStorage";
import {saveState} from "./localStorage";
import {isDevMode} from "./constants/env";

const logger = store => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

if (isDevMode()) {



            const persistedState = loadState();
            const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(
                createStore
            );
            const store = createStoreWithMiddleware(reducers, persistedState);

            store.subscribe(() => {
                saveState(store.getState()
                );
            });
            ReactDOM.render(
                <Provider store={store}>
                    <GlobalStyle />
                    <App />
                </Provider>,
                document.querySelector("#root")
            );


}
else
{

    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(
        createStore
    );
    const store = createStoreWithMiddleware(reducers);

    ReactDOM.render(
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>,
        document.querySelector("#root")
    );

}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
