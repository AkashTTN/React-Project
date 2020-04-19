import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: false,
    tweets: false,
    stats: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNTRY_HISTORICAL_DATA_SUCCESS:
            return {
                ...state,
                stats: { ...state.stats, 'Country Historical Data': true }
            };

        case actionTypes.GET_HISTORICAL_DATA_SUCCESS:
            return {
                ...state,
                stats: { ...state.stats, 'Historical Data': true }
            };

        case actionTypes.GET_STATS_SUCCESS:
            return {
                ...state,
                stats: { ...state.stats, 'Stats': true }
            };

        case actionTypes.GET_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: true
            };

        case actionTypes.GET_TWEETS_SUCCESS:
            return {
                ...state,
                tweets: true
            };

        case actionTypes.GET_COUNTRY_HISTORICAL_DATA_FAILED:
            return {
                ...state,
                stats: { ...state.stats, 'Country Historical Data': false }
            };

        case actionTypes.GET_HISTORICAL_DATA_FAILED:
            return {
                ...state,
                stats: { ...state.stats, 'Historical Data': false }
            };

        case actionTypes.GET_STATS_FAILED:
            return {
                ...state,
                stats: { ...state.stats, 'Stats': false }
            };

        case actionTypes.GET_ARTICLES_FAILED:
            return {
                ...state,
                articles: false
            };

        case actionTypes.GET_TWEETS_FAILED:
            return {
                ...state,
                tweets: false
            };

        default:
            return state;
    }
}

export default reducer;