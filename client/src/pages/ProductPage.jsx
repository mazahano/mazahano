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

    if (loading) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading product details...</div>;

    return (
        <div className="product-page-container">
            {/* Product Images (Left) */}
            <div className="product-images-col">
                <div className="antigravity-float">
                    <img src={product.image} alt={product.name} className="product-image-main" />
                </div>
                {/* Simulated additional images */}
                <div className="product-image-grid">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1800&auto=format&fit=crop" alt="detail" className="product-image-main" />
                    <img src="https://images.unsplash.com/photo-1551488852-080175b22596?q=80&w=1500&auto=format&fit=crop" alt="detail" className="product-image-main" />
                </div>
            </div>

            {/* Product Details (Right) */}
            <div className="product-details-col">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-subtitle">Premium Collection</div>

                <div className="product-price">${product.price}</div>

                <p className="product-description">{product.description}</p>

                {product.sizes && product.sizes.length > 0 && (
                    <div className="size-selector">
                        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Size</h4>
                        <div className="size-grid">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '2rem' }}>
                    {product.countInStock > 0 ? (
                        <button onClick={handleAddToCart} className="add-to-cart-btn">
                            ADD TO BAG
                        </button>
                    ) : (
                        <button disabled className="add-to-cart-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            OUT OF STOCK
                        </button>
                    )}

                    <button className="favorite-btn">
                        Favorite <span style={{ marginLeft: '8px' }}>♡</span>
                    </button>
                </div>

                <div style={{ borderTop: '1px solid var(--color-gray-100)', paddingTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Free Delivery and Returns</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', lineHeight: '1.5' }}>
                        Free standard delivery on all orders. Returns are accepted within 30 days of purchase.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
