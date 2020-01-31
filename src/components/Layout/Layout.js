import React, { Fragment } from 'react';
import classes from './Layout.css'
const Layout = (props) => (
    <Fragment>
        <div>Toolbar, SIdebar, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Fragment>
)


export default Layout;