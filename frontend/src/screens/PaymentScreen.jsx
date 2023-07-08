import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePayementMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [payementMethod, setPayementMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayementMethod(payementMethod));
        navigate('/placeorder');
    }
 
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payement Method</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type='radio'
                    className='my-2'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='payementMethod'
                    value='Paypal'
                    checked
                    onChange={(e) => setPayementMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen