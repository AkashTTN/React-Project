import React from 'react';
import greenGraph from '../../../assets/Images/green-graph.png';
import redGraph from '../../../assets/Images/red-graph.png'
import down from '../../../assets/Images/Down.png';
import up from '../../../assets/Images/Up.png'

import classes from './Card.module.css';

const Card = props => (
    <div className={classes.Card}>
        <div className={classes.Data}>
            <span>{props.name}</span>
            <img 
                src={props.graphType === 'red' ? up : down} 
                alt="arrow" 
            />
            <p>{props.magnitude}</p>
        </div>
        <img 
            src={props.graphType === 'red' ? redGraph : greenGraph} 
            alt='kpi'    
        />
    </div>
)

export default Card;