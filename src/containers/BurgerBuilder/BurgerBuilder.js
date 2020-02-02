import React, { Fragment, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 0.8
}
const BurgerBuilder = (props) => {
    const [ingredients, setIngredients] = useState({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    const [price, setPrice] = useState(4);
    const addIngredientHandler = (type) => {
        const newCount = ingredients[type] + 1;
        const newIngredients = { ...ingredients };
        newIngredients[type] = newCount;
        setIngredients(newIngredients);

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = price + priceAddition;
        setPrice(newPrice);
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
    }
    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls disabled={disabledInfo} ingredientAdded={addIngredientHandler} ingredientRemoved={removeIngredientHandler} />

        </Fragment>);
}

export default BurgerBuilder;