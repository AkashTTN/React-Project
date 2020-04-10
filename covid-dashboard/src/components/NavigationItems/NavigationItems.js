import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >HOME</NavigationItem>
        <NavigationItem link="/faqs" >FAQ</NavigationItem>
        <NavigationItem link="/help-links" >HELPFUL LINKS</NavigationItem>
    </ul>
)

export default NavigationItems;