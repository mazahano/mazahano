import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import AdminNav from '../components/AdminNav';
import { FaTimes } from 'react-icons/fa';

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
        <div className="admin-container">
            <h1 className="mb-4">Admin Dashboard</h1>
            <AdminNav />

            <div className="admin-header">
                <h2>All Orders</h2>
            </div>

            {error && <div className="status-badge status-danger mb-2">{error}</div>}

            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            <span className="status-badge status-success">
                                                {order.paidAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="status-badge status-danger">
                                                <FaTimes style={{ marginRight: '4px' }} /> Not Paid
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            <span className="status-badge status-success">
                                                {order.deliveredAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="status-badge status-danger">
                                                <FaTimes style={{ marginRight: '4px' }} /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/order/${order._id}`} className="action-btn">
                                            Details
                                        </Link>
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
