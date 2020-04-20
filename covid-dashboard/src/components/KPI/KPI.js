import React from 'react';
import { connect } from 'react-redux';

import { formatNumbers, getTrendStatus } from '../Utilities';

import { getPreviousDayData, setTrendStatus  } from '../../store/actions';

import Card from './Card/Card';

import classes from './KPI.module.css';

const nameMap = {
    cases: 'Total Cases',
    recovered: 'Recovered',
    active: 'Active Cases',
    deaths: 'Total Deaths'
}

const KPI = (props) => {

    // const { globalStats } = useContext(store);
    // const cards = [];
    // for (let prop of globalStats){
    //     cards.push(
    //         <Card name={prop} magnitude={globalStats.prop} graphType='red' />
    //     )
    // }

    // console.log(globalStats);

    let cards = <p>Waiting for data...</p>;

    if (props.error) {
        cards = <p>Something went wrong</p>;
    } else {

        let stats = { ...props.stats };

        let previousDayData = null;

        if (props.mode) {

            previousDayData = getPreviousDayData(stats.country);
        } else {
            previousDayData = getPreviousDayData();
        }

        previousDayData
            .then((previousData) => {
                const trendStatus = getTrendStatus(stats, previousData);

                stats = { ...stats, ...trendStatus };

                stats = {
                    cases: [stats['cases'], stats['isCasesIncreasing']],
                    recovered: [stats['recovered'], stats['isRecoveredIncreasing']],
                    active: [stats['active'], stats['isActiveIncreasing']],
                    deaths: [stats['deaths'], stats['isDeathsIncreasing']],
                };

                console.log(stats);

                cards = Object.entries(stats).map(item => {
                    let [prop, value] = [...item];
                    return <Card
                        key={prop}
                        name={nameMap[prop]}
                        magnitude={formatNumbers(value[0])}
                        increasing={value[1]}
                    />
                })

            })
    }

    return (
        <div className={classes.KPI}>
            {cards}
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        mode: state.stats.showCountry.mode,
        stats: state.stats.showCountry.mode ? state.stats.showCountry.data : state.stats.globalStats,
        error: !state.status.stats['Stats'],
        trendStatus: state.stats.showCountry.mode ? state.trendStatus[state.stats.showCountry.data.country] : state.trendStatus['world']
    };

}

const mapDispatchToProps = dispatch => {
    return {
        onSetTrendStatus: (country=null) => dispatch(setTrendStatus(country))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KPI);