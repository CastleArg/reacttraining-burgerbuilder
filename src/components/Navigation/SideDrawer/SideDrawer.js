import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    const attatchedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close]
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attatchedClasses.join(' ')}>
                <Logo className={classes.Logo} height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>);
}

export default SideDrawer;