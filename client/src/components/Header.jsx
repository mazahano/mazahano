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
                    <Link to="/">New & Featured</Link>
                    <Link to="/">Men</Link>
                    <Link to="/">Women</Link>
                    <Link to="/">Kids</Link>
                    <Link to="/">Sale</Link>
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
                        <div className="admin-nav" style={{ fontSize: '14px', marginLeft: '10px' }}>
                            <Link to="/admin/productlist">ADMIN</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
