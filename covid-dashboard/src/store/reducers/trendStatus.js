import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TREND_STATUS:
            return state;

        case actionTypes.SET_TREND_STATUS_SUCCESS:
            return {
                ...state,
                [action.payload]: true
            };

        case actionTypes.SET_TREND_STATUS_FAILED:
            return {
                ...state,
                [action.payload]: false
            };

        default:
            return state;
    }
}

export default reducer;