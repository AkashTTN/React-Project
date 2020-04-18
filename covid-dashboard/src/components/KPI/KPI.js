import React from 'react';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { formatNumbers } from '../Utilities/FormatNumbers';

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

    if(props.error) {
        cards = <p>Something went wrong</p>;
    }

    if (props.stats) {
        const stats = {
            cases: props.stats['cases'],
            recovered: props.stats['recovered'],
            active: props.stats['active'],
            deaths: props.stats['deaths']
        };
        cards = Object.entries(stats).map(item => {
            let [name, magnitude] = [...item];
            return <Card key={name} name={nameMap[name]} magnitude={formatNumbers(magnitude)} graphType='red' />
        })
    }

    return (
        <div className={classes.KPI}>
            {cards}
        </div>
    )
}

const mapStateToProps = (state) => {

    if(state.stats.showCountry.mode) {
        return {
            stats: state.stats.showCountry.data,
            error: state.status.stats['Stats']
        };
    };

    return {
        stats: state.stats.globalStats,
        error: state.status.stats['Stats']
    };

}

export default connect(mapStateToProps)(KPI);