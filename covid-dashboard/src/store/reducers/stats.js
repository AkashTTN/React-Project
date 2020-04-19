import * as actionTypes from '../actions/actionTypes';

const initialState = {
    globalStats: null,
    statsByCountry: null,
    historicalData: null,
    showCountry: {
        mode: false,
        data: null,
        historicalData: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_WORLD:
            return {
                ...state,
                showCountry: {
                    ...state.showCountry,
                    mode: false
                }
            };

        case actionTypes.SET_COUNTRY_DATA:
            return {
                ...state,
                showCountry: {
                    ...state.showCountry,
                    mode: true,
                    data: action.payload
                }
            };

        case actionTypes.GET_STATS:
            const { globalStats, statsByCountry } = action.payload;
            return {
                ...state,
                globalStats,
                statsByCountry
            };

        case actionTypes.GET_HISTORICAL_DATA:
            return {
                ...state,
                historicalData: action.payload
            };

        case actionTypes.GET_COUNTRY_HISTORICAL_DATA:
            return {
                ...state,
                showCountry: {
                    ...state.showCountry,
                    historicalData: action.payload
                }
            };

        default:
            return state;
    }
}

export default reducer;