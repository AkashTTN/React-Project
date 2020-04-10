import * as actionTypes from '../actions/actionTypes';
import { formatNumbers } from '../utility';

const initialState = {
    globalStats: null,
    statsByCountry: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_STATS:
            const { globalStats, statsByCountry } = action.payload;
            return {
                ...state,
                globalStats: formatNumbers(globalStats),
                statsByCountry
            }

        default:
            return state;
    }
}

export default reducer;