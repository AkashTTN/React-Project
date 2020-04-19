import React from 'react';
import {connect} from 'react-redux';

import classes from './Country.module.css';
import up from '../../../assets/Images/Up.png';
import down from '../../../assets/Images/Down.png';

const Country = props => {

    return (
        <div className={classes.Country} >
            <div className={classes.Data} >
                <div className={classes.FlexContainer}>
                    <img src={props.flag} alt={props.countryName} />
                    <p className={classes.CountryName}>{props.countryName}</p>
                </div>
                <p>{props.affected} Affected &#124; {props.recovered} Recovered</p>
            </div>
            <div>
                <img src={props.increasing ? up : down} alt="arrow" />
            </div>
        </div>
    )
}

export default connect()(Country);