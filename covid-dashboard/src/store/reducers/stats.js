import * as actionTypes from '../actions/actionTypes';

const initialState = { globalStats: null, statsByCountry: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_STATS:
            const { globalStats, statsByCountry } = action.payload;
            return {
                ...state,
                globalStats,
                statsByCountry
            }

        default:
            return state;
    }
}

export default reducer;