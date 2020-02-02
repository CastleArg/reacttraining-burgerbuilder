import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((x, i) => {
                    return (<BurgerIngredient key={igKey + i} type={igKey} />);
                })
        })
        .reduce((arr, current) => {
            return (arr.concat(current))
        }, []);
    console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;