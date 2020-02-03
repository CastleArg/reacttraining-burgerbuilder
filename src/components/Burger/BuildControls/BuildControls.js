import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <div>Price: <strong>${props.price.toFixed(2)}</strong></div>
        {controls.map(x =>
            <BuildControl key={x.label}
                label={x.label}
                added={() => props.ingredientAdded(x.type)}
                removed={() => props.ingredientRemoved(x.type)}
                disabled={props.disabled[x.type]}
            />)}
        <button onClick={props.purchaseHandler} className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
)

export default BuildControls;

