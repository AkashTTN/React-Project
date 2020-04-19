import * as actionTypes from './actionTypes';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'http://corona.lmao.ninja/v2';

export const setWorld = () => {
    return {
        type: actionTypes.SET_WORLD
    }
}

export const setCountryData = (data) => {
    return {
        type: actionTypes.SET_COUNTRY_DATA,
        payload: data
    }
}

export const fetchedStats = (newStats) => {
    return {
        type: actionTypes.GET_STATS,
        payload: newStats
    };
}

export const fetchedHistoricalData = (newHistoricalData, showCountry=null) => {

    if(showCountry) {
        return {
            type: actionTypes.GET_COUNTRY_HISTORICAL_DATA,
            payload: newHistoricalData
        }
    } 

    return {
        type: actionTypes.GET_HISTORICAL_DATA,
        payload: newHistoricalData
    }

}

export const getStats = () => {
    return dispatch => {
        const newStats = { globalStats: {}, statsByCountry: {} };
        const newGlobalStats = (
            fetch(PROXY_URL + BASE_URL + '/all')
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
            fetch(PROXY_URL + BASE_URL + '/countries?sort=critical')
                .then(res => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        return data;
                    } else {
                        throw new Error(data);
                    }
                })
                .catch(err => console.log('ERROR fetching country stats data', err))
        );

        Promise.all([newGlobalStats, newStatsByCountry])
            .then((values) => {
                newStats['globalStats'] = values[0];
                newStats['statsByCountry'] = values[1];
                dispatch(fetchedStats(newStats));
                dispatch({ type: actionTypes.GET_STATS_SUCCESS })
            })
            .catch(
                dispatch({ type: actionTypes.GET_STATS_FAILED })
            )

    }
}

export const getHistoricalData = (country = null) => {
    return dispatch => {
        if (country) {
            fetch(PROXY_URL + BASE_URL + `/historical/${country}?lastdays=8`)
                .then(res => res.json())
                .then(({timeline}=null) => {
                    console.log('Historical Country Data Request Success');
                    dispatch(fetchedHistoricalData(timeline, true));
                    dispatch({ type: actionTypes.GET_COUNTRY_HISTORICAL_DATA_SUCCESS })
                })
                .catch(err => {
                    console.log('ERROR fetching historical data', err)
                    dispatch({ type: actionTypes.GET_COUNTRY_HISTORICAL_DATA_FAILED })
                })
        } else {
            fetch(PROXY_URL + BASE_URL + '/historical/all?lastdays=8')
                .then(res => res.json())
                .then(data => {
                    console.log('Historical Data Request Success');
                    dispatch(fetchedHistoricalData(data));
                    dispatch({ type: actionTypes.GET_HISTORICAL_DATA_SUCCESS })
                })
                .catch(err => {
                    console.log('ERROR fetching historical data', err)
                    dispatch({ type: actionTypes.GET_HISTORICAL_DATA_FAILED })
                })
        }
    }
}