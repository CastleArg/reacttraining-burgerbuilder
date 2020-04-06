import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
const Checkout = (props) => {
    const { ingredients } = props;


    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (<div>
        <CheckoutSummary ingredients={ingredients} onCheckoutCancelled={checkoutCancelledHandler} onCheckoutContinued={checkoutContinuedHandler} />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </div>);
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);