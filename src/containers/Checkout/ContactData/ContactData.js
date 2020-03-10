import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                // placeholder: 'Your Name'
            },
            value: ''
        },


    })
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

    const inputChangedHandler = (event, inputId) => {
        console.log(event.target.value);
        console.log(inputId);
        const updatedOrderForm = { ...orderForm }
        const updatedOrderFormElement = { ...updatedOrderForm[inputId] };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[inputId] = updatedOrderFormElement;
        setOrderForm(updatedOrderForm);
    }
    if (loading) {
        return <Spinner />
    }
    const formELementsArray = [];
    for (let key in orderForm) {
        formELementsArray.push({ id: key, config: orderForm[key] });
    }
    return (
        <div className={classes.ContactData}>
            <h4>Contact details</h4>
            <form>
                {formELementsArray.map((element, i) => <Input
                    key={i} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} changed={(e) => inputChangedHandler(e, element.id)} />)}
                <Button clicked={orderHandler} btnType="Success">ORDER</Button>
            </form>
        </div>
    );
}


export default ContactData;