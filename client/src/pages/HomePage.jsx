import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch top products for the spotlight section
                const { data } = await axios.get('/api/products/top');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Helper to get a spotlight product (fallback to first item)
    const spotlightItem = products.length > 0 ? products[0] : null;

    return (
        <div className="editorial-layout">
            {/* 1. Cinematic Hero Section */}
            <section className="hero-fullscreen">
                <div className="overlay-gradient"></div>
                <img
                    src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=2574&auto=format&fit=crop"
                    alt="Campaign"
                    className="hero-bg"
                />
                <div className="hero-text-container">
                    <h1 className="hero-title antigravity-float">MAZAHANO <br /><span className="outline-text">STUDIOS</span></h1>
                    <div className="hero-meta antigravity-float-sm">
                        <p>FALL / WINTER 2026</p>
                        <p>EST. TOKYO</p>
                    </div>
                    <div className="antigravity-float-sm" style={{ animationDelay: '1s' }}>
                        <Link to="/shop" className="btn-main">EXPLORE COLLECTION</Link>
                    </div>
                </div>
            </section>

            {/* 2. Scrolling Marquee (Streetwear Vibe) */}
            <div className="marquee-container">
                <div className="marquee-content">
                    NEW ARRIVALS — FREE SHIPPING WORLDWIDE — LIMITED DROPS — NEW ARRIVALS — FREE SHIPPING WORLDWIDE —
                </div>
            </div>

            {/* 3. The Spotlight (Split Screen) */}
            {spotlightItem && (
                <section className="split-spotlight">
                    <div className="spotlight-image">
                        <img src={spotlightItem.image} alt={spotlightItem.name} />
                    </div>
                    <div className="spotlight-details">
                        <span className="label">TRENDING NOW</span>
                        <h2>{spotlightItem.name}</h2>
                        <p className="description">{spotlightItem.description}</p>
                        <div className="price-tag">${spotlightItem.price}</div>
                        <Link to={`/product/${spotlightItem._id}`} className="btn-link">SHOP VISUAL &rarr;</Link>
                    </div>
                </section>
            )}

            {/* 4. Asymmetric "Lookbook" Grid instead of standard Category Grid */}
            <section className="container mb-4">
                <h2 className="section-title">THE EDIT</h2>
                <div className="editorial-grid">
                    <Link to="/shop?category=outerwear" className="grid-item large">
                        <img src="https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=1800&auto=format&fit=crop" alt="Outerwear" />
                        <div className="item-overlay">
                            <h3>OUTERWEAR</h3>
                        </div>
                    </Link>
                    <div className="grid-column">
                        <Link to="/shop?category=accessories" className="grid-item small">
                            <img src="https://images.unsplash.com/photo-1551488852-080175b22596?q=80&w=1500&auto=format&fit=crop" alt="Accessories" />
                            <div className="item-overlay">
                                <h3>ACCESSORIES</h3>
                            </div>
                        </Link>
                        <Link to="/shop?category=footwear" className="grid-item small">
                            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1800&auto=format&fit=crop" alt="Footwear" />
                            <div className="item-overlay">
                                <h3>FOOTWEAR</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Minimal Newsletter */}
            <section className="newsletter-minimal">
                <h3>JOIN THE CULT.</h3>
                <p>Be the first to know about archived restocks.</p>
                <div className="input-group">
                    <input type="email" placeholder="ENTER EMAIL" />
                    <button>SUBSCRIBE</button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
