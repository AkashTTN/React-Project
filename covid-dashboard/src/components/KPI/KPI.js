import React from 'react';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { formatNumbers, getTrendStatus } from '../Utilities';
import { getPreviousDayData } from '../../store/actions';

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
    }

    if (props.stats) {
        const stats = {
            cases: [props.stats['cases'], props.stats['isCasesIncreasing']],
            recovered: [props.stats['recovered'], props.stats['isRecoveredIncreasing']],
            active: [props.stats['active'], props.stats['isActiveIncreasing']],
            deaths: [props.stats['deaths'], props.stats['isDeathsIncreasing']],
        };

        cards = Object.entries(stats).map(item => {
            let [prop, value] = [...item];
            return <Card
                key={prop}
                name={nameMap[prop]}
                magnitude={formatNumbers(value[0])}
                increasing={value[1]}
            />
        })
    }

    return (
        <div className={classes.KPI}>
            {cards}
        </div>
    )
}

const mapStateToProps = (state) => {

    const { stats: { showCountry }, status } = state;

    if (showCountry.mode) {

        // const previousDayData = getPreviousDayData(showCountry.data.country);

        // const trendStatus = getTrendStatus(showCountry.data, previousDayData);

        // return {
        //     stats: {...showCountry.data, ...trendStatus},
        //     error: status.stats['Stats']
        // };

        return {
            stats: showCountry.data,
            error: status.stats['Stats']
        };
        
    };

    return {
        stats: state.stats.globalStats,
        error: state.status.stats['Stats']
    };

}

export default connect(mapStateToProps)(KPI);