import React from 'react';
import burgerLogo from './burger-logo.png';
import classes from './Logo.module.css';
const Logo = (props) => {
    return (
    <div className={classes.Logo} >
        <img src={burgerLogo} />
    </div>);
}

export default Logo;