import * as actionTypes from '../actions/actionTypes';

const initialState = { articles: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTICLES:
            return {
                ...state,
                articles: action.articles
            }

        default:
            return state;
    }
}

export default reducer;