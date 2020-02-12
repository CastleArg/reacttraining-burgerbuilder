import React, { Fragment, useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const Layout = (props) => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(true);
    return (
        <Fragment>
            <Toolbar toggleSideDrawerOpen={() => setSideDrawerOpen(x=> !x)} ></Toolbar>
            <SideDrawer show={sideDrawerOpen} closed={() => setSideDrawerOpen(false)} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>);
}


export default Layout;