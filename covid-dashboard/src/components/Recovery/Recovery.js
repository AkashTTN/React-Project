import React from 'react';
import { connect } from 'react-redux';

import classes from './Recovery.module.css';

const Recovery = (props) => {

    let data = null;

    if (props.globalStats) {
        data = (
            <p className={classes.RecoveryData}>
                {`${props.globalStats.active} Affected | ${props.globalStats.recovered} Recovered`}
            </p>
        );
    }

    return (
        <div className={classes.Recovery}>
            <p className={classes.RecoveryHeading}>Ratio of Recovery</p>
            {data}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        globalStats: state.stats.globalStats
    };
}


export default connect(mapStateToProps)(Recovery);