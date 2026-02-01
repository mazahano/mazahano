import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/orders', config);
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchOrders();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    return (
        <div className="container" style={{ padding: '2rem 20px' }}>
            <h1>Orders</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>USER</th>
                                <th style={{ padding: '12px' }}>DATE</th>
                                <th style={{ padding: '12px' }}>TOTAL</th>
                                <th style={{ padding: '12px' }}>PAID</th>
                                <th style={{ padding: '12px' }}>DELIVERED</th>
                                <th style={{ padding: '12px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{order._id}</td>
                                    <td style={{ padding: '12px' }}>{order.user && order.user.name}</td>
                                    <td style={{ padding: '12px' }}>{order.createdAt.substring(0, 10)}</td>
                                    <td style={{ padding: '12px' }}>${order.totalPrice}</td>
                                    <td style={{ padding: '12px' }}>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <span style={{ color: 'red' }}>No</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <span style={{ color: 'red' }}>No</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => navigate(`/order/${order._id}`)}
                                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListPage;
