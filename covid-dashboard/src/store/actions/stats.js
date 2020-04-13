import * as actionTypes from './actionTypes';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export const fetchedStats = (newStats) => {
    return {
        type: actionTypes.GET_STATS,
        payload: newStats
    };
}

export const fetchedHistoricalData = (newHistoricalData) => {
    return {
        type: actionTypes.GET_HISTORICAL_DATA,
        payload: newHistoricalData
    }
}

export const getStats = () => {
    return dispatch => {
        const baseUrl = 'http://corona.lmao.ninja/';
        const newStats = { globalStats: {}, statsByCountry: {} };
        const newGlobalStats = (
            fetch(PROXY_URL + baseUrl + 'all')
                .then(res => res.json())
                .then(data => {
                    console.log('Stats Data Request Success');
                    const { cases, recovered, active, deaths } = data;
                    return {
                        cases,
                        recovered,
                        active,
                        deaths
                    };
                })
                .catch(err => console.log('ERROR fetching global stats data', err))
        );

        const newStatsByCountry = (
            fetch(PROXY_URL + baseUrl + 'countries?sort=critical')
                .then(res => res.json())
                .then((data) => {
                    return data;
                })
                .catch(err => console.log('ERROR fetching country stats data', err))
        );

        Promise.all([newGlobalStats, newStatsByCountry])
            .then((values) => {
                newStats['globalStats'] = values[0];
                newStats['statsByCountry'] = values[1];
                dispatch(fetchedStats(newStats));
            })

    }
}

export const getHistoricalData = () => {
    return dispatch => {
        const baseUrl = 'https://corona.lmao.ninja/v2/historical?lastdays=8';
        fetch(PROXY_URL + baseUrl)
            .then(res => res.json())
            .then(data => {
                console.log('Historical Data Request Success');
                dispatch(fetchedHistoricalData(data));
            })
            .catch(err => console.log('ERROR fetching historical data', err))
    }
}