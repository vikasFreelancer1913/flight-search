export const FLIGHT_SEARCH_START = "FLIGHT_SEARCH_START";

export const onSearchInputEnter = (value) => {
    return dispatch => {
        dispatch(submitFlightSearch(value))
    }
}

const submitFlightSearch = (value) => ({
    type: FLIGHT_SEARCH_START,
    payload: value
});
