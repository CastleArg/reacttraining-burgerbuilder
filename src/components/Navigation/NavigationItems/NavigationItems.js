import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItem}>
            <nav>
                <NavigationItem link="/" active>Burger Builder</NavigationItem>
                <NavigationItem link="/">Checkout</NavigationItem>
            </nav>
        </ul>

    );
}

export default NavigationItems;