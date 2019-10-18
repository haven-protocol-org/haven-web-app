


export const getForex = () => {
    const endDate = new Date();
    // const startDate = endDate - 14 * 3600 * 24;
    const isoEndDate = endDate.toISOString().split("T")[0];
    const isoStartDate = endDate.toISOString().split("T")[0];

    const forexUrl = `https://api.exchangeratesapi.io/latest?base=USD`;

    return dispatch => {
        dispatch(getForexFetching());
        fetch(forexUrl)
            .then(res => res.json())
            .then(res => dispatch(getForexSucceed(res)))
            .catch(error => dispatch(getForexFailed(error)));
    };
};

const getForexFetching = () => {};

const getForexSucceed = () => {};

const getForexFailed = () => {};
