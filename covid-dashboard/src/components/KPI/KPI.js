import React, { useState, useEffect } from 'react';
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

    const [globalStats, setGlobalStats]  = useState(props.globalStats);

    useEffect(() => {
        setGlobalStats(props.globalStats);
    }, [props.globalStats]);

    // console.log(globalStats);

    let cards = [];

    if (globalStats) {
        // console.log('inside if')
        console.log(nameMap)
        cards = Object.entries(globalStats).map(item => {
            let [name, magnitude] = [...item];
            return <Card key={name} name={nameMap[name]} magnitude={formatNumbers(magnitude)} graphType='red' />
        })
    }

    return (
        <div className={classes.KPI}>
            {cards ? cards : <p>Waiting for data...</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        globalStats: state.stats.globalStats
    };
}

export default connect(mapStateToProps)(KPI);