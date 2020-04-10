import React from 'react';
import Button from '../UI/Button/Button';

import classes from './Trends.module.css';

const Trends = () => (
    <>
        <header>
            <span>Spread Trends</span>
            <ul className={classes.ButtonList}>
                <Button btnType='Regular' >Confirmed</Button>
                <Button btnType='Regular' >Recovered</Button>
                <Button btnType='Regular' >Deceased</Button>
            </ul>
        </header>
    </>
)

export default Trends;