import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <div>Price: <strong>${props.price.toFixed(2)}</strong></div>
        {props.ingredients.map(x =>
            <BuildControl key={x}
                label={x}
                added={() => props.ingredientAdded(x)}
                removed={() => props.ingredientRemoved(x)}
                disabled={props.disabled[x]}
            />)}
        <button onClick={props.purchaseHandler} className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
)

export default BuildControls;

