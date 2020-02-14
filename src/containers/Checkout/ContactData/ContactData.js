import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
const ContactData = (props) => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState();
    const orderHandler = (evt) => {
        evt.preventDefault();

        const order = { ingredients: props.ingredients, price: props.price };// { ingredients, price, customer: { name: 'Mark', address: { street: 'bob st', postCode: '0110' } } }
        setLoading(true);
        axios.post('/orders.json', order)
            .then(props.history.push('/orders'))
            .catch(err => console.log('err!!!!!!!!!! ' + err))
            .finally(() => {
                setLoading(false);
            });

    }
    if (loading) {
        return <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Contact details</h4>
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="PostCode" />
                <Button clicked={orderHandler} btnType="Success">ORDER</Button>
            </form>
        </div>
    );
}


export default ContactData;