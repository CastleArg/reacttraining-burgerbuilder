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
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 12
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                // placeholder: 'Your Name'
            },
            value: 'fastest',
            valid: true
        },
    })
    const [loading, setLoading] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const orderHandler = (evt) => {
        evt.preventDefault();
        setLoading(true);
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = { ingredients: props.ingredients, price: props.price, orderData: formData };
        axios.post('/orders.json', order)
            .then(props.history.push('/orders'))
            .catch(err => console.log('err!!!!!!!!!! ' + err))
            .finally(() => {
                setLoading(false);
            });

    }

    const checkValidity = (value, rules) => {
        if (!rules) {
            return true;
        }
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== ''
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = { ...orderForm }
        const updatedOrderFormElement = { ...updatedOrderForm[inputId] };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputId] = updatedOrderFormElement;
        updatedOrderForm[inputId].valid = checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        setOrderForm(updatedOrderForm);
        let newFormIsValid = true;
        for (let input in updatedOrderForm) {
            newFormIsValid = updatedOrderForm[input].valid && newFormIsValid
        }
        setFormIsValid(newFormIsValid);
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
            <form onSubmit={orderHandler}>
                {formELementsArray.map((element, i) => <Input
                    key={i} elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={(e) => inputChangedHandler(e, element.id)}
                    isValid={element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                />)}
                <Button disabled={!formIsValid} btnType="Success">ORDER</Button>

            </form>
        </div>
    );
}


export default ContactData;