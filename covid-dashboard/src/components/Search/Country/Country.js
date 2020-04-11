import React from 'react';

import classes from './Country.module.css';
import up from '../../../assets/Images/Up.png';
import down from '../../../assets/Images/Down.png';

const Country = props => {

    return (
        <div className={classes.Country} >
            <div className={classes.Data} >
                <img src={props.flag} alt={props.countryName} />
                <p>{props.countryName}</p>
                <div>
                    <span>{props.affected} Affected &#124; {props.recovered} Recovered</span>
                </div>
            </div>
            <div>
                <img src={up} alt="arrow" />
            </div>
        </div>
    )
}

export default Country;