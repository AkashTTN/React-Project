import React from 'react';
import { connect } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { formatNumbers } from '../Utilities/FormatNumbers';

import 'react-circular-progressbar/dist/styles.css';
import classes from './Recovery.module.css';

const Recovery = (props) => {

    let data = null;

    if (props.globalStats) {

        let { cases, recovered } = props.globalStats;

        let ratioOfRecovery = ((recovered / cases) * 100).toFixed(1);
        data = (
            <>
                <CircularProgressbar
                    strokeWidth="1"
                    value={ratioOfRecovery}
                    text={`${ratioOfRecovery}%`}
                    background="true"
                    styles={{
                        root: {
                            width: '200px'
                        },

                        path: {
                            stroke: '#BAFAEB'
                        },
                        
                        trail: {
                            stroke: '#FFFFFF'
                        },

                        text: {
                            fontFamily: 'inherit',
                            fontWeight: 'bold',
                            fontSize: '10px',
                            fill: '#30313A'
                        },

                        background: {
                            fill: '#F5F5F5'
                        }
                    }}
                >
                </CircularProgressbar>
                <p className={classes.RecoveryData}>
                    {`${formatNumbers(cases)} Affected | ${formatNumbers(recovered)} Recovered`}
                </p>
            </>
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