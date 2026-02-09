import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch all products for now, filter client-side if needed or add API filter
                const { data } = await axios.get('/api/products');
                if (categoryQuery && categoryQuery !== 'sale') {
                    // Simple client-side filter
                    const filtered = data.filter(p =>
                        p.category.toLowerCase().includes(categoryQuery.toLowerCase()) ||
                        (p.description && p.description.toLowerCase().includes(categoryQuery.toLowerCase()))
                    );
                    setProducts(filtered);
                } else if (categoryQuery === 'sale') {
                    // For sale, maybe filter by price < some value or flag? 
                    // For now, show all but maybe sort by price
                    setProducts(data.sort((a, b) => a.price - b.price));
                } else {
                    setProducts(data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryQuery]);

    return (
        <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
            <h1 className="mb-4" style={{ textTransform: 'uppercase' }}>
                {categoryQuery ? `${categoryQuery} Collection` : 'All Products'}
            </h1>

            {loading ? (
                <p>Loading collection...</p>
            ) : products.length === 0 ? (
                <p>No products found in this collection.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <Link to={`/product/${product._id}`}>
                                <div className="product-wrapper">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <span className="product-price">${product.price}</span>
                                </div>
                                <p className="product-category">{product.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
