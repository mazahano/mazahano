import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(ShopContext);

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes && product.sizes.length > 0) {
            alert('Please select a size');
            return;
        }
        addToCart(product, qty, selectedSize);
        navigate('/cart');
    };

    if (loading) return <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-2xl)' }}>
            {/* Product Images (Left) */}
            <div className="product-images">
                <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
                {/* Simulated additional images */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
                    <img src={product.image} alt="detail" style={{ width: '100%', borderRadius: 'var(--radius-sm)' }} />
                    <img src={product.image} alt="detail" style={{ width: '100%', borderRadius: 'var(--radius-sm)' }} />
                </div>
            </div>

            {/* Product Details (Right) */}
            <div className="product-details">
                <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>{product.name}</h1>
                <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: 'var(--spacing-md)' }}>Men's Shoes</div>

                <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)', fontWeight: '500' }}>${product.price}</h2>

                <p style={{ marginBottom: 'var(--spacing-xl)', lineHeight: '1.7', color: 'var(--color-gray-800)' }}>{product.description}</p>

                {product.sizes && product.sizes.length > 0 && (
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1rem' }}>Select Size</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-xs)' }}>
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        padding: '12px',
                                        background: selectedSize === size ? 'var(--color-black)' : 'transparent',
                                        color: selectedSize === size ? 'var(--color-white)' : 'var(--color-black)',
                                        border: '1px solid var(--color-gray-200)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    {product.countInStock > 0 ? (
                        <button onClick={handleAddToCart} className="btn" style={{ width: '100%', padding: '18px' }}>
                            Add to Bag
                        </button>
                    ) : (
                        <button disabled className="btn btn-outline" style={{ width: '100%', padding: '18px', cursor: 'not-allowed', opacity: 0.5 }}>
                            Out of Stock
                        </button>
                    )}

                    <button className="btn btn-outline" style={{ width: '100%', padding: '18px', marginTop: 'var(--spacing-sm)' }}>
                        Favorite <span style={{ marginLeft: '8px' }}>♡</span>
                    </button>
                </div>

                <div style={{ borderTop: '1px solid var(--color-gray-100)', paddingTop: 'var(--spacing-lg)' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>Free Delivery and Returns</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)' }}>
                        Reviews functionality coming soon.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ProductPage;
