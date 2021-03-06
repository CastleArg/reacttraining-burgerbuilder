import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import PropTypes from 'prop-types';
const Burger = (props) => {
    console.log(props.ingredients);
    
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

Burger.propTypes = {
    ingredients: PropTypes.object.isRequired
}

export default Burger;