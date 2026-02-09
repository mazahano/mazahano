import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Header = () => {
    const { userInfo, logout } = useContext(ShopContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header-wrapper">
            {/* Utility Nav (Nike style top bar) */}
            <div className="utility-nav">
                <Link to="#">Find a Store</Link>
                <Link to="#">Help</Link>
                <Link to="#">Join Us</Link>
                {userInfo ? (
                    <span onClick={logout} style={{ cursor: 'pointer' }}>Sign Out</span>
                ) : (
                    <Link to="/login">Sign In</Link>
                )}
            </div>

            {/* Main Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <Link to="/" className="nav-brand">
                    {/* Placeholder for Logo - using Text for now */}
                    MAZAHANO
                </Link>

                <div className="nav-center">
                    <Link to="/shop">Shop</Link>
                    <Link to="/shop?category=men">Men</Link>
                    <Link to="/shop?category=women">Women</Link>
                    <Link to="/shop?category=kids">Kids</Link>
                    <Link to="/shop?category=sale">Sale</Link>
                </div>

                <div className="nav-icons">
                    <div className="search-bar-wrapper" style={{ position: 'relative' }}>
                        <FaSearch style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
                    </div>
                    {/* Wishlist Icon */}
                    <Link to="/wishlist"><FaHeart /></Link>

                    <Link to="/cart">
                        <FaShoppingCart />
                    </Link>

                    {userInfo && userInfo.isAdmin && (
                        <div className="admin-nav-item">
                            <Link to="/admin/productlist" className="admin-pill-link">
                                ADMIN DASHBOARD
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
