import * as actionTypes from './actionTypes';

export const setTrendStatus = (country = null) => {

    return dispatch => {

        let previousDayData;

        if (country) {
            return getPreviousDayData(country);
        } else {
            return previousDayData = getPreviousDayData();
        }

        previousDayData
            .then((previousData) => {
                const trendStatus = getTrendStatus(stats, previousData);
                let stats;
                if (country) {
                    stats = 
                }

                stats = { ...stats, ...trendStatus };

                stats = {
                    cases: [stats['cases'], stats['isCasesIncreasing']],
                    recovered: [stats['recovered'], stats['isRecoveredIncreasing']],
                    active: [stats['active'], stats['isActiveIncreasing']],
                    deaths: [stats['deaths'], stats['isDeathsIncreasing']],
                };
            })
    }
}

export const getPreviousDayData = (country = null) => {

    let previousDayGlobalStats = null;

    if (country) {

        return fetch(PROXY_URL + BASE_URL + `/historical/${country}?lastdays=1`)
            .then(res => res.json())
            .then((data) => {

                const { cases, deaths, recovered } = data.timeline;

                previousDayGlobalStats = {
                    cases: Object.values(cases)[0],
                    deaths: Object.values(deaths)[0],
                    recovered: Object.values(recovered)[0]
                }

                return previousDayGlobalStats;

            })
            .catch(err => {
                console.log('Error fetching previous day country stats')
                return previousDayGlobalStats;
            })

    } else {

        return fetch(PROXY_URL + BASE_URL + '/historical/all?lastdays=1')
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
                console.log('Error fetching previous day global stats')
                return previousDayGlobalStats;
            })
    }

}