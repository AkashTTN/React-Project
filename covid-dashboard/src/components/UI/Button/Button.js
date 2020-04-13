import React from 'react';
import classes from './Button.module.css';

const Button = props => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        value={props.children.toString()}
    >{props.children}</button>
)

export default Button;