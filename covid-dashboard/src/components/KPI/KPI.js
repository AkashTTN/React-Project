import React from 'react';
import Card from './Card/Card';
import { connect } from 'react-redux';

import classes from './KPI.module.css';

const KPI = (props) => {

    // const { globalStats } = useContext(store);
    // const cards = [];
    // for (let prop of globalStats){
    //     cards.push(
    //         <Card name={prop} magnitude={globalStats.prop} graphType='red' />
    //     )
    // }

    const { globalStats } = props;

    // console.log(globalStats);

    let cards = [];

    if (globalStats) {
        // console.log('inside if')
        cards = Object.entries(globalStats).map(item => {
            let [name, magnitude] = [...item];
            return <Card key={name} name={name} magnitude={magnitude} graphType='red' />
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