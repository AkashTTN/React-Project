import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import logo from '../../assets/images/virus.png'

import classes from './NavigationItems.module.css';

const NavigationItems = props => {

    // const [isActive, setIsActive] = useState('home');

    // onButtonClickHandler = e => {
    //     setIsActive(e.target.)
    // }

    return (
        < div className={classes.NavBar} >
            <a href="/">
                <img src={logo} alt="logo" />
                <h1 className={classes.Logo}>COVID'19</h1>
                {/* <div className={classes.Logo}></div> */}
            </a>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" >HOME</NavigationItem>
                <NavigationItem link="/faqs" >FAQ</NavigationItem>
                <NavigationItem link="/help-links" >HELPFUL LINKS</NavigationItem>
            </ul>
        </div >
    )

}


export default NavigationItems;