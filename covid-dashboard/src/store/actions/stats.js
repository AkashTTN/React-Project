import * as actionTypes from './actionTypes';

import { getTrendStatus } from '../../components/Utilities/GetTrendStatus';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'http://corona.lmao.ninja/v2';

export const setWorld = () => {
    return {
        type: actionTypes.SET_WORLD
    };
}

export const setCountryMode = (searchedCountry, searchedCountryData) => {
    return dispatch => {
        dispatch(setCountryData(searchedCountryData));
        dispatch({
            type: actionTypes.SET_COUNTRY_MODE
        });
        dispatch(getHistoricalData(searchedCountry));
    }
}

export const setCountryData = (data) => {
    return {
        type: actionTypes.SET_COUNTRY_DATA,
        payload: data
    };
}

export const fetchedStats = (stats) => {
    return {
        type: actionTypes.GET_STATS,
        payload: stats
    };
}

export const fetchedHistoricalData = (newHistoricalData, showCountry = null) => {

    if (showCountry) {
        return {
            type: actionTypes.GET_COUNTRY_HISTORICAL_DATA,
            payload: newHistoricalData
        };
    }

    return {
        type: actionTypes.GET_HISTORICAL_DATA,
        payload: newHistoricalData
    };

}

export const getStats = () => {
    return dispatch => {

        const stats = { globalStats: {}, statsByCountry: {} };

        let previousDayGlobalStats = null;

        fetch(PROXY_URL + BASE_URL + '/historical/all?lastdays=1')
            .then(res => res.json())
            .then((data) => {

                const { cases, deaths, recovered } = data;

                previousDayGlobalStats = {
                    cases: Object.values(cases)[0],
                    deaths: Object.values(deaths)[0],
                    recovered: Object.values(recovered)[0]
                }

            })
            .catch(err => console.log('Error fetching previous day global stats'))

        const globalStats = (
            fetch(PROXY_URL + BASE_URL + '/all')
                .then(res => res.json())
                .then(data => {

                    console.log('Stats Data Request Success');

                    const {
                        cases,
                        recovered,
                        active,
                        deaths,
                        todayDeaths
                    } = data;

                    let trendStatus = getTrendStatus({
                        cases,
                        recovered,
                        active,
                        deaths,
                        todayDeaths
                    }, previousDayGlobalStats);

                    return {
                        cases,
                        recovered,
                        active,
                        deaths,
                        ...trendStatus
                    };

                })
                .catch(err => console.log('ERROR fetching global stats data', err))
        );

        const statsByCountry = (
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

        Promise.all([globalStats, statsByCountry])
            .then((values) => {
                stats['globalStats'] = values[0];
                stats['statsByCountry'] = values[1];
                dispatch(fetchedStats(stats));
                dispatch({ type: actionTypes.GET_STATS_SUCCESS })
            })
            .catch(() => {
                dispatch({ type: actionTypes.GET_STATS_FAILED })
            })

    }
}

export const getHistoricalData = (country = null) => {
    return dispatch => {
        if (country) {
            fetch(PROXY_URL + BASE_URL + `/historical/${country}?lastdays=8`)
                .then(res => res.json())
                .then(({ timeline = null }) => {
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

// Not used currently
export const getPreviousDayData = (country = null) => {

    let previousDayGlobalStats = null;

    if (country) {

        fetch(PROXY_URL + BASE_URL + `/historical/${country}?lastdays=1`)
            .then(res => res.json())
            .then((data) => {

                const { cases, deaths, recovered } = data;

                previousDayGlobalStats = {
                    cases: Object.values(cases)[0],
                    deaths: Object.values(deaths)[0],
                    recovered: Object.values(recovered)[0]
                }

                return previousDayGlobalStats;

            })
            .catch(err => {
                console.log('Error fetching previous day country stats');
                return previousDayGlobalStats;
            })

    } else {
        fetch(PROXY_URL + BASE_URL + '/historical/all?lastdays=1')
            .then(res => res.json())
            .then((data) => {
    
                const { cases, deaths, recovered } = data;
    
                previousDayGlobalStats = {
                    cases: Object.values(cases)[0],
                    deaths: Object.values(deaths)[0],
                    recovered: Object.values(recovered)[0]
                }
    
                return previousDayGlobalStats;
    
            })
            .catch(err => {
                console.log('Error fetching previous day global stats');
                return previousDayGlobalStats;
            })
    }

}