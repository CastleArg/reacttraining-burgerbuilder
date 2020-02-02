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
        {controls.map(x =>
            <BuildControl key={x.label}
                label={x.label}
                added={() => props.ingredientAdded(x.type)}
                removed={() => props.ingredientRemoved(x.type)}
                disabled={props.disabled[x.type]}
            />)}
    </div>
)

export default BuildControls;

