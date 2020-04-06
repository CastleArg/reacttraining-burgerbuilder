import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const BurgerBuilder = (props) => {
    // const [ingredients, setIngredients] = useState({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    const ingredients = props.ingredients;
    const price = props.price;
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get('/ingredients.json')
    //         .then(x => { console.log(x); setIngredients(x.data); updatePurchaseState(x.data); })
    //         .catch(() => setError(true))
    //         .finally(() => setLoading(false));
    // }, [])


    const purchaseContinueHandler = () => {
        props.history.push({
            pathname: '/checkout'
        });
    }

    const updatePurchaseState = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map(key => {
                return newIngredients[key];
            })
            .reduce((a, b) => { return a + b }, 0)
        return sum > 0;
    }
    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    if (loading) {
        return <Spinner />
    }
    if (!ingredients) {
        return <Spinner />
    }
    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
                <OrderSummary price={price} purchaseContinued={purchaseContinueHandler} purchaseCancelled={() => setPurchasing(false)} ingredients={ingredients} />
            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls
                ingredients={Object.keys(ingredients)}
                price={price}
                disabled={disabledInfo}
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                purchaseable={updatePurchaseState(ingredients)}
                purchaseHandler={() => setPurchasing(true)}
            />
        </Fragment>);
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));