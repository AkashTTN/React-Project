import React from 'react';
import inputClasses from './Button.module.css';

const Button = props => {

    let classes = [inputClasses.Button, inputClasses[props.btnType]];

    if (props.isActive) {
        classes.push(inputClasses.Active);
    }

    return (
        <button
            className={classes.join(' ')}
            onClick={props.clicked}
            value={props.children.toString()}
        >{props.children}</button>
    )
}

export default Button;