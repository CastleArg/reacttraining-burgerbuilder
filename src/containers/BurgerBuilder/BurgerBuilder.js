import React, { Fragment, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const BurgerBuilder = (props) => {
    const [ingredients, setIngredients] = useState({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    return (
        <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls />

        </Fragment>);
}

export default BurgerBuilder;