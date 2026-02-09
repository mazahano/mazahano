import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { FaArrowLeft } from 'react-icons/fa';

const ProductEditPage = () => {
    const { id: productId } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, userInfo, navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(`/api/products/${productId}`, {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            }, config);

            setUpdateLoading(false);
            navigate('/admin/productlist');
        } catch (err) {
            setUpdateError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setUpdateLoading(false);
        }
    };

    return (
        <div className="admin-form-container">
            <Link to="/admin/productlist" className="back-link">
                <FaArrowLeft style={{ marginRight: '8px' }} /> GO BACK
            </Link>

            <h1 className="admin-form-title">Edit Product</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <form onSubmit={submitHandler}>
                    {updateError && <p style={{ color: 'red', marginBottom: '1rem' }}>{updateError}</p>}

                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Count In Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Image</label>
                        <input
                            type="text"
                            className="form-control"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Uploading...</p>}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label className="form-label">Brand</label>
                            <input
                                type="text"
                                className="form-control"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-black" style={{ width: '100%', marginTop: '1rem' }} disabled={updateLoading}>
                        {updateLoading ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductEditPage;
