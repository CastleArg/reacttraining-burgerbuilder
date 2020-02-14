import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({ bacon: 2, banana: 1, cheese: 0, meat: 3, salad: 0 })
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                setPrice(param[1]);
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        setIngredients(ingredients);

    }, []);
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (<div>
        <CheckoutSummary ingredients={ingredients} onCheckoutCancelled={checkoutCancelledHandler} onCheckoutContinued={checkoutContinuedHandler} />
        <Route path={props.match.path + '/contact-data'} render={() => (<ContactData ingredients={ingredients} price={price} {...props} />)} />
    </div>);
}

export default Checkout;