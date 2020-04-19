import React from 'react';

import greenGraph from '../../../assets/images/green-graph.png';
import redGraph from '../../../assets/images/red-graph.png'
import down from '../../../assets/images/Down.png';
import up from '../../../assets/images/Up.png'

import classes from './Card.module.css';

const Card = props => (
    <div className={classes.Card}>
        <div className={classes.Data} >
            <span>{props.name}</span>
            {
                props.increasing == null
                    ? null
                    : <img
                        src={props.increasing ? up : down}
                        alt="arrow"
                    />
            }
            <p>{props.magnitude}</p>
        </div>
        {
            props.increasing == null
                ? null
                : <img
                    src={props.increasing ? redGraph : greenGraph}
                    alt='kpi'
                />
        }
    </div>
)

export default Card;