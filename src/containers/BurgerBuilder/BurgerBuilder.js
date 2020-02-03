import React, { Fragment, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 0.8
}
const BurgerBuilder = (props) => {
    const [ingredients, setIngredients] = useState({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    const [price, setPrice] = useState(4);
    const [purchaseable, setPurchaseable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const addIngredientHandler = (type) => {
        const newCount = ingredients[type] + 1;
        const newIngredients = { ...ingredients };
        newIngredients[type] = newCount;
        setIngredients(newIngredients);

        const priceAddition = INGREDIENT_PRICES[type];
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
        alert('purchase successful!!!!!!!!!!!!!!!!!!!');
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
    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
                <OrderSummary price={price} purchaseContinued={purchaseContinueHandler} purchaseCancelled={() => setPurchasing(false)} ingredients={ingredients} />
            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls
                price={price}
                disabled={disabledInfo}
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                purchaseable={purchaseable}
                purchaseHandler={() => setPurchasing(true)}
            />
        </Fragment>);
}

export default BurgerBuilder;