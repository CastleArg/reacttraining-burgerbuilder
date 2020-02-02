import React from 'react';
import classes from './BuildControl.module.css';
const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.label}>{props.label}</div>
            <button disabled={props.disabled} className={classes.Less} onClick={props.removed}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>);
}

export default BuildControl;