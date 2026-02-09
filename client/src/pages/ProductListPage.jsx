import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import AdminNav from '../components/AdminNav';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    const fetchProducts = React.useCallback(async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data.products);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    }, [setProducts, setLoading, setError]);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchProducts();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate, fetchProducts]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/products/${id}`, config);
                setMessage('Product deleted successfully');
                fetchProducts();
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('/api/products', {}, config);
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="mb-4">Admin Dashboard</h1>
            <AdminNav />

            <div className="admin-header">
                <h2>Product Inventory</h2>
                <button onClick={createProductHandler} className="btn">
                    <FaPlus style={{ marginRight: '8px' }} /> Create Product
                </button>
            </div>

            {message && <div className="status-badge status-success mb-2">{message}</div>}
            {error && <div className="status-badge status-danger mb-2">{error}</div>}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id.substring(0, 10)}...</td>
                                    <td style={{ fontWeight: '500' }}>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Link to={`/admin/product/${product._id}/edit`} className="action-btn">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="action-btn delete"
                                        >
                                            <FaTrash />
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

export default ProductListPage;
