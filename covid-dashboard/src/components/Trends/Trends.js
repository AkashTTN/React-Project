import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Graph from './Graph/Graph';

import classes from './Trends.module.css';

const Trends = () => {

    const [clickedType, setClickedType] = useState('');


    const onButtonClick = (e) => {
        setClickedType(e.target.value.toLowerCase());
    }

    return (
        <div className={classes.Trends}>
            <header>
                <span>Spread Trends</span>
                <ul className={classes.ButtonList}>
                    <Button btnType='Regular' clicked={onButtonClick} >Confirmed</Button>
                    <Button btnType='Regular' clicked={onButtonClick} >Recovered</Button>
                    <Button btnType='Regular' clicked={onButtonClick} >Deceased</Button>
                </ul>
            </header>
            {/* <Graph dataKey={clickedType} /> */}
        </div>
    )
}


export default Trends;