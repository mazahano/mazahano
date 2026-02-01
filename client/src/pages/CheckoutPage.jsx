import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
    const { cartItems, userInfo } = useContext(ShopContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 20;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        try {
            const order = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('/api/orders', order, config);
            alert('Order Placed Successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container" style={{ padding: '4rem 20px', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 2 }}>
                <h1>Checkout</h1>
                <form onSubmit={placeOrderHandler}>
                    <h3>Shipping Address</h3>
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Postal Code</label>
                        <input type="text" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Country</label>
                        <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>

                    <h3 style={{ marginTop: '2rem' }}>Payment Method</h3>
                    <div className="form-group">
                        <label>
                            <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            {' '} PayPal or Credit Card
                        </label>
                    </div>

                    <button type="submit" className="btn btn-block" style={{ marginTop: '2rem' }}>PLACE ORDER</button>
                </form>
            </div>

            <div style={{ flex: 1, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
                <h3>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Items</span>
                    <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Shipping</span>
                    <span>${shippingPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Tax</span>
                    <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
