export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


export const saveState = (state) => {

    try {
        const serializedState = JSON.stringify({walletSession : state.walletSession, address:state.address});
        localStorage.setItem('state', serializedState);
    } catch(e) {
        console.log(e);
    }
};

export const logger = store => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};
