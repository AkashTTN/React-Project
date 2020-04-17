import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';
import Graph from './Graph/Graph';

import classes from './Trends.module.css';

const Trends = () => {

    const [clickedType, setClickedType] = useState('confirmed');

    const onButtonClick = (e) => {
        setClickedType(e.target.value.toLowerCase());
    }

    // const onButtonClick = (e) => {
    //     console.log('fired');
    //     console.log(isActiveButton);
    //     setClickedType(e.target.value.toLowerCase());
    //     switch (clickedType) {
    //         case 'confirmed':
    //             setIsActiveButton( 
    //                 {
    //                     confirmed: !isActiveButton.confirmed,
    //                     recovered: false,
    //                     deceased: false
    //                 }
    //             )
    //             break;

    //         case 'recovered':
    //             setIsActiveButton( 
    //                 {
    //                     recovered: !isActiveButton.recovered,
    //                     confirmed: false,
    //                     deceased: false
    //                 }
    //             )
    //             break;

    //         case 'deceased':
    //             setIsActiveButton( 
    //                 {
    //                     deceased: !isActiveButton.deceased,
    //                     confirmed: false,
    //                     recovered: false
    //                 }
    //             )
    //     }
    // }

    return (
        <div className={classes.Trends}>
            <header>
                <span>Spread Trends</span>
                <ul className={classes.ButtonList}>
                    <Button btnType='Regular' isActive={clickedType === 'confirmed'} clicked={onButtonClick} >Confirmed</Button>
                    <Button btnType='Regular' isActive={clickedType === 'recovered'} clicked={onButtonClick} >Recovered</Button>
                    <Button btnType='Regular' isActive={clickedType === 'deceased'} clicked={onButtonClick} >Deceased</Button>
                </ul>
            </header>
            <Graph dataKey={clickedType} />
        </div>
    )
}


export default Trends;