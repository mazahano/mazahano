import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-col">
                    <h3>MAZAHANO</h3>
                    <p>Modern. Minimal. Premium.</p>
                    <p>&copy; 2026 MAZAHANO. All rights reserved.</p>
                </div>

                <div className="footer-col">
                    <h3>Shop</h3>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Men</a></li>
                        <li><a href="#">Women</a></li>
                        <li><a href="#">Accessories</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Help</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Size Guide</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Facebook</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
