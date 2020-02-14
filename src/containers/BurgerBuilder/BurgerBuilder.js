import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 0.8
}

const DEFAULT_INGREDIENT_PRICE = 0.5; //todo all this should come from backend
const BurgerBuilder = (props) => {
    const [ingredients, setIngredients] = useState();
    const [price, setPrice] = useState(4);
    const [purchaseable, setPurchaseable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/ingredients.json')
            .then(x => { console.log(x); setIngredients(x.data); updatePurchaseState(x.data); })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [])

    const addIngredientHandler = (type) => {
        const newCount = ingredients[type] + 1;
        const newIngredients = { ...ingredients };
        newIngredients[type] = newCount;
        setIngredients(newIngredients);

        const priceAddition = INGREDIENT_PRICES[type] || DEFAULT_INGREDIENT_PRICE;
        const newPrice = price + priceAddition;
        setPrice(newPrice);
        updatePurchaseState(newIngredients);
    };
    const removeIngredientHandler = (type) => {
        if (ingredients[type] <= 0) {
            return;
        }
        const newCount = ingredients[type] - 1;
        const newIngredients = { ...ingredients };
        newIngredients[type] = newCount;
        setIngredients(newIngredients);
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = price - priceAddition;
        setPrice(newPrice);
        updatePurchaseState(newIngredients);
    }

    const purchaseContinueHandler = () => {   
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
        }
        queryParams.push('price=' + encodeURIComponent(price));
        props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    }

    const updatePurchaseState = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map(key => {
                return newIngredients[key];
            })
            .reduce((a, b) => { return a + b }, 0)
        setPurchaseable(sum > 0);
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
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                purchaseable={purchaseable}
                purchaseHandler={() => setPurchasing(true)}
            />
        </Fragment>);
}

export default withErrorHandler(BurgerBuilder, axios);