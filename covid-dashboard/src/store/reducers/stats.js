import * as actionTypes from '../actions/actionTypes';

const initialState = {
    globalStats: null,
    statsByCountry: null,
    historicalData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_STATS:
            const { globalStats, statsByCountry } = action.payload;
            return {
                ...state,
                globalStats,
                statsByCountry
            }

        case actionTypes.GET_HISTORICAL_DATA:
            const historicalData = action.payload;
            return {
                ...state,
                historicalData
            };
            
        default:
            return state;
    }
}

export default reducer;