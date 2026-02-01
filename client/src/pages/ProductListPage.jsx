import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchProducts();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data.products); // UPDATED: Handle paginated response
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

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
        <div className="container" style={{ padding: '2rem 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Products</h1>
                <button
                    onClick={createProductHandler}
                    style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    + CREATE PRODUCT
                </button>
            </div>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>NAME</th>
                                <th style={{ padding: '12px' }}>PRICE</th>
                                <th style={{ padding: '12px' }}>CATEGORY</th>
                                <th style={{ padding: '12px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{product._id}</td>
                                    <td style={{ padding: '12px' }}>{product.name}</td>
                                    <td style={{ padding: '12px' }}>${product.price}</td>
                                    <td style={{ padding: '12px' }}>{product.category}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                            style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            style={{ padding: '5px 10px', color: 'red', cursor: 'pointer' }}
                                        >
                                            Delete
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
