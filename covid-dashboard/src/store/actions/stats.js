import * as actionTypes from './actionTypes';


export const fetchedStats = (newStats) => {
    return {
        type: actionTypes.GET_STATS,
        payload: newStats
    };
}

export const getStats = () => {
    return dispatch => {
        console.log('dispatching fetch')
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const baseUrl = 'http://corona.lmao.ninja/';
        const newStats = {};
        fetch(proxyurl + baseUrl + 'all')
            .then(res => res.json())
            .then(data => {
                console.log('Request Success');
                const { cases, recovered, active, deaths } = data;
                newStats['globalStats'] = {
                    'Total Cases': cases,
                    'Recovered': recovered,
                    'Active Cases': active,
                    'Total Deaths': deaths
                };
            })
            .catch(err => console.log('ERROR fetching global stats data', err))
            
        fetch(proxyurl + baseUrl + 'countries?sort=critical')
            .then(res => res.json())
            .then((data) => {
                newStats['statsByCountry'] = data;
                dispatch(fetchedStats(newStats));
            })
            .catch(err => console.log('ERROR fetching country stats data', err))
    }
}