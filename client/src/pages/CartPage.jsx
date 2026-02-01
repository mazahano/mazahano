import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const { cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty <Link to="/" style={{ textDecoration: 'underline' }}>Go Back</Link></p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
                    <div style={{ flex: '2' }}>
                        {cartItems.map((item) => (
                            <div key={`${item.product}-${item.size}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <Link to={`/product/${item.product}`} style={{ fontWeight: 600 }}>{item.name}</Link>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Size: {item.size}</p>
                                </div>
                                <div>${item.price}</div>
                                <div>x {item.qty}</div>
                                <button onClick={() => removeFromCart(item.product, item.size)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '1', border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
                        <h3>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <button onClick={checkoutHandler} className="btn btn-block">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
