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
        let url = 'http://corona.lmao.ninja/';
        const newStats = {};
        fetch(url + 'all')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { cases, recovered, active, deaths } = data;
                newStats['globalStats'] = {
                    'Total Cases': cases,
                    'Recovered': recovered,
                    'Active Cases': active,
                    'Total Deaths': deaths
                };
            })
            .catch(err => console.log('ERROR fetching global stats data', err))
            
        fetch(url + 'yesterday?sort=critical')
            .then(res => res.json())
            .then((data) => {
                newStats['statsByCountry'] = data;
            })
            .catch(err => console.log('ERROR fetching country stats data', err))
            
        dispatch(fetchedStats(newStats));
    }
}