import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';
const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>
                    {key}
                </span>: {props.ingredients[key]}
            </li>
        })
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Your burger contains:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>
                Continue to checkout?
            </p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>Continue</Button>
        </Fragment>);
}

export default OrderSummary;