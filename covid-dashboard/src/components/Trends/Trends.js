import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import Graph from './Graph/Graph';

import classes from './Trends.module.css';

const Trends = (props) => {

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
            {props.error ? <p>Something went wrong</p> : <Graph dataKey={clickedType} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: !state.status.stats['Historical Data']
    };
}

export default connect(mapStateToProps)(Trends);