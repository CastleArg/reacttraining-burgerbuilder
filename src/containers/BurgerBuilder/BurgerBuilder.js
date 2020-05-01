import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = (props) => {
    // const [ingredients, setIngredients] = useState({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    const ingredients = props.ingredients;
    const price = props.price;
    const [purchasing, setPurchasing] = useState(false);
    console.log(props);
    const purchaseContinueHandler = () => {
        props.history.push({
            pathname: '/checkout'
        });
    }

    useEffect(() => {
        console.log('init ingredients');
        props.onInitIngredients()
    }, [])

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
    if (props.error) {
        console.log('error');
        return <div>Oh no, there was an error</div>
    }
    if (!ingredients) {
        return <Spinner />
    }
    console.log(ingredients);
    console.log('they were ings');

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
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));