import { FLIGHT_SEARCH_START } from '../actions/flight-search-action';

const INITIAL_STATE = {
    searchData: {}
};

const fligthSearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FLIGHT_SEARCH_START: 
                return {
                    ...state,
                    searchData: action.payload
                };
        
        default: 
                return state;
    }
};

export default fligthSearchReducer;