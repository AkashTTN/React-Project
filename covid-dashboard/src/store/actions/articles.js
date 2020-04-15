import * as actionTypes from './actionTypes';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = "https://newsapi.org/v2/everything";

const apiConfig = {
    apiKey: '2a76899e907c4e2fad14de930d121e75',
    q: 'coronavirus',
    language: 'en',
    sortBy: 'publishedAt',
    from: new Date().toISOString(),
}

// Smartable AI API Key
// const SUBSCRIPTION_KEY = '5ac2ea7a3606407ca26144c333554ec1';


export const fetchedArticles = articles => {
    return {
        type: actionTypes.GET_ARTICLES,
        articles
    }
}

export const getArticles = () => {
    return dispatch => {
        const url = BASE_URL + `?q=${apiConfig.q}&apiKey=${apiConfig.apiKey}&language=${apiConfig.language}&sortBy=${apiConfig.sortBy}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.totalResults >= 20) {
                    dispatch(fetchedArticles(data.articles.slice(0,20)));
                } else {
                    dispatch(fetchedArticles(data.articles));
                }
            })
            .catch(err => {
                console.log('error fetching articles', err);
            })
    }
}