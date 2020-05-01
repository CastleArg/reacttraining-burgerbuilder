import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        console.log('init ing');
        axios.get('/ingredients.json')
            .then(x => {
                dispatch(setIngredients(x.data))
            })
            .catch(() => { console.log('woop'); dispatch(fetchIngredientsFailed) })
    }
}

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get('/ingredients.json')
    //         .then(x => { console.log(x); setIngredients(x.data); updatePurchaseState(x.data); })
    //         .catch(() => setError(true))
    //         .finally(() => setLoading(false));
    // }, [])